import React from "react";
import Header from "../../../core/ui/layout/Header";
import FormCard from "./FormCard";

export default function SignupPaciente() {
  return (
    <div>

      {/* Contenido  */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <FormCard />
      </main>
    </div>
  );
}
