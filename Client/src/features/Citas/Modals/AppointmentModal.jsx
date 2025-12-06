import React, { useState } from "react";


import apiClient from "../../../core/api/apiClient";



const AppointmentModal = ({ show, onClose, doctor, appointment }) => {
  if (!show) return null;

  const [date, setDate] = useState(appointment?.appointment_date || "");
  const [time, setTime] = useState(appointment?.appointment_time || "");
  const [reason, setReason] = useState(appointment?.reason || "");
  const [selectedClinic, setSelectedClinic] = useState(appointment?.clinic_id || "");

  const patientId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const isEditing = Boolean(appointment);


const times = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30"
];


  const handleSubmit = async () => {
    try {
      const payload = {
        clinic_id: selectedClinic,
        appointment_date: date,
        appointment_time: time,
        reason,
        is_telemedicine: false,
        doctor_profile_id: doctor.id,
        patient_id: patientId,
      };

      const url = isEditing
        ? `/appointments/${appointment.id}`
        : "/appointments";

      const method = isEditing ? "put" : "post";

      await apiClient[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(isEditing ? "Cita actualizada" : "Cita creada");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4">Agendar cita</h3>

        <label className="block mb-3">
          Sucursal:
          <select
            className="border p-2 w-full rounded mt-1"
            value={selectedClinic}
            onChange={(e) => setSelectedClinic(e.target.value)}
          >
            <option value="">Selecciona una sucursal</option>
            {doctor?.clinics?.map((clinic) => (
              <option key={clinic.id} value={clinic.id}>
                {clinic.name} — {clinic.city ?? "Sin ciudad"}
              </option>
            ))}
          </select>
        </label>


        <label className="block mb-3">
          Fecha:
          <input
            type="date"
            className="border p-2 w-full rounded mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="block mb-3">
          Hora:
          <select
            className="border p-2 w-full rounded mt-1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Selecciona una hora</option>
            {times.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="block mb-3">
          Motivo:
          <textarea
            className="border p-2 w-full rounded mt-1"
            placeholder="Motivo de la consulta"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Confirmar Cita
        </button>

      </div>
    </div>
  );
};

export default AppointmentModal;
