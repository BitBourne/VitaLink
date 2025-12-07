import React, { useState } from "react";
import { Bell } from "lucide-react";
import AppointmentCard from "../components/AppoinmentCard";
import AppointmentModal from "../../Citas/Modals/AppointmentModal";

import useAuth from "../../auth/hooks/useAuth"

import Calendar from "../../Citas/components/Calendar"


export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const { user } = useAuth();


  // const user = { id: 1, name: "Miguel", rol: "paciente" }; // usuario simulado

  const handleSave = (data) => {
    setAppointments([...appointments, data]);
    setShowModal(false);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-[#4C575F] mb-8">
        ¡Hola, {`${user.name} ${user.last_name}`}!
      </h2>

      <p className="text-[#4C575F]/70 mb-10">
        Tienes 1 cita próxima y 2 recordatorios pendientes
      </p>

      <div className="">
        <Calendar></Calendar>
      </div>

      {/* Tarjetas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <AppointmentCard key={i} onNewAppointment={() => setShowModal(true)} />
        ))}
      </section>

      
  </>
  )
}
