import React from "react";
import Header from "../../../core/ui/layout/Header";
import FormCard from "./FormCard";

export default function SignupPaciente() {
  return (
    <div className="px-2">
      {/* Contenido  */}
      <h2 className="text-lg font-semibold text-[#4C575F] mb-6">
        Crea una cuenta gratuita
      </h2>

      <p className="text-sm font-medium text-[#4C575F] mb-4">
        Información Personal
      </p>

      <FormCard />
    </div>
  );
}
