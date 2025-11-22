import React from "react";
import { Plus } from "lucide-react";

export default function AppointmentCard({ onNewAppointment }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold text-[#4C575F] mb-2">
        ¡Hola, Miguel!
      </h3>
      <p className="text-sm text-[#4C575F]/70 mb-4">
        Tienes 1 cita próxima y 2 recordatorios pendientes
      </p>
      <button
        onClick={onNewAppointment} 
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
      >
        <Plus className="w-4 h-4" />
        Nueva Cita
      </button>
    </div>
  );
}
