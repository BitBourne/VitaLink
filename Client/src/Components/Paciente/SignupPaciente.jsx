import React from "react";
import Header from "../Layout/Header";
import FormCard from "./FormCard";

export default function SignupPaciente() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F9FAFB] to-[#E9F4F6]">
      <Header />

      {/* Contenido  */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <FormCard />
      </main>
    </div>
  );
}
