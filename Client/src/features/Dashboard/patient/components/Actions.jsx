import { Calendar, MessageSquare, FileText, Video } from "lucide-react";
import React, { useState } from "react";

import AppointmentModal from "../../../Citas/Modals/AppointmentModal";

const actions = [
  {
    icon: Calendar,
    label: "Agendar Cita",
    description: "Nueva cita",
  },
  {
    icon: MessageSquare,
    label: "Mensajes",
    description: "Contactar doctor",
  },
  {
    icon: FileText,
    label: "Recetas",
    description: "Ver recetas",
  },
  {
    icon: Video,
    label: "Teleconsulta",
    description: "Video llamada",
  },
];

export function QuickActions() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // null si quieres seleccionar uno
  const [selectedAppointment, setSelectedAppointment] = useState(null); // null para nueva cita

  const handleActionClick = (actionLabel) => {
    if (actionLabel === "Agendar Cita") {
      setSelectedDoctor(null); // o asigna un doctor por default si quieres
      setSelectedAppointment(null); // nueva cita
      setShowModal(true);
    }
    // Aquí puedes manejar otras acciones si quieres
  };

  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Modal */}
      <AppointmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        doctor={selectedDoctor}
        appointment={selectedAppointment}
      />

      {actions.map((action) => (
        <div
          key={action.label}
          className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/80 backdrop-blur-xl shadow-md transition hover:shadow-xl"
          onClick={() => handleActionClick(action.label)}
        >
          <div className="flex items-center gap-4 p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white shadow-md transition-transform group-hover:scale-110">
              <action.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{action.label}</h3>
              <p className="mt-1 text-sm text-gray-600">{action.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
