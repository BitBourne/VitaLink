import React, { useState, useEffect } from "react";
import apiClient from "../../../core/api/apiClient";

const AppointmentModal = ({ show, onClose, doctor, appointment }) => {

  const [date, setDate] = useState(appointment?.appointment_date || "");
  const [time, setTime] = useState(appointment?.appointment_time || "");
  const [reason, setReason] = useState(appointment?.reason || "");
  const [selectedClinic, setSelectedClinic] = useState(appointment?.clinic_id || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const patientId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const isEditing = Boolean(appointment);

  const times = [
    "09:00","09:30","10:00","10:30",
    "11:00","11:30","12:00","12:30",
    "13:00","13:30","14:00","14:30"
  ];

  // Limpiar mensajes cada vez que se abre el modal
  useEffect(() => {
    if (show) {
      setError("");
      setSuccess("");
    }
  }, [show]);


  if (!show) return null;

  const handleSubmit = async () => {
    // Limpiar mensajes previos al enviar
    setError("");
    setSuccess("");

    // Validación de campos
    if (!selectedClinic || !date || !time || !reason) {
      setError("Por favor completa todos los campos antes de continuar.");
      return;
    }

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

      // Mostrar mensaje de éxito según si es edición o creación
      setSuccess(isEditing ? "Cita actualizada exitosamente" : "Cita creada exitosamente");

      // Cerrar el modal después de 2 segundos
      setTimeout(() => {
        onClose();
        setSuccess(""); // Limpiar mensaje para la próxima vez
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al crear/actualizar la cita.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4">Agendar cita</h3>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 border border-green-400 rounded">
            {success}
          </div>
        )}

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
