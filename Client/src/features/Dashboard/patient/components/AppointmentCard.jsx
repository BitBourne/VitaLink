import { CalendarDays, Clock, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import apiClient from "../../../../core/api/apiClient";

export function AppointmentCard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await apiClient.get("/appointments");
        const allAppointments = res.data.appointments || [];

        const upcoming = allAppointments
          .sort(
            (a, b) =>
              new Date(`${a.appointment_date}T${a.appointment_time}`) -
              new Date(`${b.appointment_date}T${b.appointment_time}`)
          );

        setAppointments(upcoming);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  if (appointments.length === 0)
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 text-gray-700">
        No tienes citas próximas.
      </div>
    );

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Próximas Citas</h3>
      </div>

      {/* Contenedor scrollable */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="rounded-xl border border-white/20 bg-gradient-to-r from-[#B490CA]/10 to-[#5EE7DF]/10 p-4 shadow-md hover:shadow-xl transition"
          >
            {/* Doctor y estado */}
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {apt.A_doctor?.DP_user?.name || "Dr. Desconocido"}{" "}
                  {apt.A_doctor?.DP_user?.last_name || ""}
                </h4>
                <p className="text-sm text-gray-600">
                  {apt.A_doctor?.DP_specialties?.[0]?.name || "Medicina General"}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  apt.status === "confirmed"
                    ? "bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {apt.status === "confirmed" ? "Confirmada" : "Pendiente"}
              </span>
            </div>

            {/* Fecha, hora y clínica */}
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#B490CA]" />
                <span>
                  {new Date(`${apt.appointment_date}T${apt.appointment_time}`).toLocaleDateString(
                    "es-MX",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#B490CA]" />
                <span>{apt.appointment_time}</span>
              </div>

              {apt.clinicName && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#B490CA]" />
                  <span>
                    {apt.clinicName} — {apt.clinicCity}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
