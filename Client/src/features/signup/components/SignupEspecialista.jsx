import React from "react";
import Header from "../../../core/ui/layout/Header";
import FormCardEspecialista from "./FormCardEspecialista";

export default function SignupEspecialista() {
  return (
    <div className="px-2">
      <h2 className="text-lg font-semibold text-[#4C575F] mb-6">
        Crea una cuenta gratuita
      </h2>

      <p className="text-sm font-medium text-[#4C575F] mb-4">
        Información Personal
      </p>

      {/* Formulario */}
      <FormCardEspecialista />
    </div>
  );
}
