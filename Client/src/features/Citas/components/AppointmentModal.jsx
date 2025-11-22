import React, { useState } from "react";
import { X } from "lucide-react";

export default function AppointmentModal({ onClose, onSave, user }) {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    doctor: "",
    motivo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // estructura del back
    const data = {
      paciente_id: user?.id || null,
      fecha: formData.fecha,
      hora: formData.hora,
      doctor: formData.doctor,
      motivo: formData.motivo,
      estado: "pendiente",
    };

    onSave(data); 
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#B490CA] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-[#4C575F] mb-6">
          Crear nueva cita
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[#4C575F]/80 mb-1">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4C575F]/80 mb-1">
              Hora
            </label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4C575F]/80 mb-1">
              Doctor
            </label>
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              placeholder="Ej. Dr. Victor"
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4C575F]/80 mb-1">
              Motivo
            </label>
            <textarea
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              rows="3"
              placeholder="Ej. Chequeo general"
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Guardar cita
          </button>
        </form>
      </div>
    </div>
  );
}
