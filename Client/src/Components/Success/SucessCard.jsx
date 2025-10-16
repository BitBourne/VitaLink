import React from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-xl text-center">

      <h2 className="text-lg font-semibold text-[#4C575F] mb-2">
        ¡Listo!
      </h2>
      <p className="text-sm text-[#4C575F]/80 mb-8">
        Bienvenido a <span className="font-semibold">VitaLink</span>
      </p>

      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B490CA] to-[#5EE7DF]">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] mb-2">
        ¡Bienvenido a VitaLink!
      </h3>
      <p className="text-sm text-[#4C575F]/80 mb-8">
        Tu cuenta ha sido creada exitosamente. Ya puedes comenzar a usar la plataforma.
      </p>

      <hr className="border-t border-[#E0E6EA] mb-8" />

      <button
        onClick={() => navigate("/Dashboard")}
        className="flex items-center justify-center gap-2 px-8 py-2 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-medium text-sm rounded-md hover:opacity-90 transition mx-auto"
      >
        Siguiente →
      </button>
    </div>
  );
}
