import React from "react";
import { Bell, Plus } from "lucide-react";
import AppointmentCard from "./AppoinmentCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">

      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-transparent bg-clip-text">
          VitaLink
        </h1>

        <div className="flex items-center gap-6">
          <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-indigo-500 transition" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] flex items-center justify-center text-white font-semibold">
            UP
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-10">
        <h2 className="text-2xl font-semibold text-[#4C575F] mb-8">
          ¡Hola, Miguel!
        </h2>

        <p className="text-[#4C575F]/70 mb-10">
          Tienes 1 cita próxima y 2 recordatorios pendientes
        </p>

        {/* tarjetas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <AppointmentCard key={i} />
          ))}
        </section>
      </main>
    </div>
  );
}
