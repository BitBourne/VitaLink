import React from "react";
import Header from "../../../core/ui/layout/Header";
import FormCardEspecialista from "./FormCardEspecialista";

export default function SignupEspecialista() {
  return (
    <div>

      {/* Formulario */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <FormCardEspecialista />
      </main>
    </div>
  );
}
