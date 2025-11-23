import React from "react";
import Header from "../../../core/ui/layout/Header";
import FormCardEspecialista from "./FormCardEspecialista";

export default function SignupEspecialista() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F9FAFB] to-[#E9F4F6]">
      <Header />

      {/* Formulario */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <FormCardEspecialista />
      </main>
    </div>
  );
}
