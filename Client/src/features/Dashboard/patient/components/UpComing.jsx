import { CalendarDays } from "lucide-react";
import React, { useState, useEffect } from "react";
import apiClient from "../../../../core/api/apiClient";

export function UpcomingVisit() {
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await apiClient.get("/appointments");
        const appointments = res.data.appointments || [];

        const upcoming = appointments
          .filter(a => a.status === "scheduled" || a.status === "confirmed")
          .sort((a, b) => {
            const dateA = new Date(a.appointment_date + "T" + a.appointment_time);
            const dateB = new Date(b.appointment_date + "T" + b.appointment_time);
            return dateA - dateB;
          });

        const next = upcoming[0] || null;

        if (next) {
          const clinicRes = await apiClient.get(`/clinics/${next.clinic_id}`);
          const clinicName = clinicRes.data.clinic.name;
          const clinicAddress = clinicRes.data.clinic.address;
          const clinicCity = clinicRes.data.clinic.city;
          console.log(clinicRes.data.clinic);

          setNextAppointment({ ...next, clinicName, clinicAddress, clinicCity });
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  if (!nextAppointment) return null;

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] p-[2px] shadow-lg">
      <div className="rounded-2xl bg-white/80 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] text-white shadow-md">
            <CalendarDays className="h-6 w-6" />
          </div>

          <div>
            <h3 className="font-bold text-gray-900">Próxima Cita Médica</h3>

            <p className="mt-1 text-sm text-gray-700">
              {nextAppointment.A_doctor?.DP_user?.name || "Dr. Desconocido"}{" "}
              {nextAppointment.A_doctor?.DP_user?.last_name} · Medicina General
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              {new Date(
                nextAppointment.appointment_date + "T" + nextAppointment.appointment_time
              ).toLocaleString("es-MX", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <p className="mt-1 text-sm text-gray-700">
              Consultorio: {nextAppointment.clinicName}
            </p>
            <p>
              Domicilio: {nextAppointment.clinicAddress}, {nextAppointment.clinicCity}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium rounded-lg border border-[#B490CA] text-[#4A3265] bg-white transition hover:bg-[#B490CA] hover:text-white shadow-sm">
            Reagendar
          </button>

          <button className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] transition hover:opacity-90 shadow-md">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
}