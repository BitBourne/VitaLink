import React, { useState } from "react";
import { Calendar, Clock, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import BookAppointmentModal from "../../Citas/components/BookAppointmentModal";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isDoctor = user.role_id === 2;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#4C575F] mb-2">
          ¡Hola, {user.name} {user.last_name}!
        </h1>
        <p className="text-[#4C575F]/70">
          {isDoctor
            ? "Aquí está tu agenda para hoy."
            : "Gestiona tu salud y tus próximas citas."}
        </p>
      </header>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#4C575F] mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isDoctor ? (
            <>
              <div
                onClick={() => navigate('/user/schedule')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer group"
              >
                <div className="w-12 h-12 bg-[#E0F7FA] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Calendar className="w-6 h-6 text-[#26C6DA]" />
                </div>
                <h3 className="font-semibold text-lg text-[#4C575F] mb-1">Ver Agenda</h3>
                <p className="text-sm text-gray-500">Revisa tus citas programadas</p>
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer group"
              >
                <div className="w-12 h-12 bg-[#F3E5F5] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Plus className="w-6 h-6 text-[#AB47BC]" />
                </div>
                <h3 className="font-semibold text-lg text-[#4C575F] mb-1">Agendar Cita</h3>
                <p className="text-sm text-gray-500">Programa una nueva consulta</p>
              </div>

              <div
                onClick={() => navigate('/user/appointments')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer group"
              >
                <div className="w-12 h-12 bg-[#E0F7FA] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Calendar className="w-6 h-6 text-[#26C6DA]" />
                </div>
                <h3 className="font-semibold text-lg text-[#4C575F] mb-1">Mis Citas</h3>
                <p className="text-sm text-gray-500">Ver historial y próximas citas</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Recent Activity / Summary Placeholder */}
      <section>
        <h2 className="text-xl font-semibold text-[#4C575F] mb-4">
          {isDoctor ? "Resumen del Día" : "Próximas Citas"}
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500">
            {isDoctor
              ? "No tienes citas pendientes para hoy."
              : "No tienes citas próximas programadas."}
          </p>
        </div>
      </section>

      {/* Modals */}
      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
