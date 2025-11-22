import React from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessCard() {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center">

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#4C575F] mb-3">
          ¡Listo!
        </h2>
        <p className="text-base text-[#4C575F]/80">
          Bienvenido a <span className="font-semibold text-[#B490CA]">VitaLink</span>
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] shadow-lg">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] mb-4">
          ¡Bienvenido a VitaLink!
        </h3>
        <p className="text-base text-[#4C575F]/80 leading-relaxed max-w-md mx-auto">
          Tu cuenta ha sido creada exitosamente. Ya puedes comenzar a usar la plataforma.
        </p>
      </div>

      <hr className="border-t border-[#E0E6EA] mb-10 mx-8" />

      
      <button
        onClick={() => navigate("/Dashboard")}
        className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-semibold text-base rounded-lg hover:opacity-90 transition-opacity shadow-lg mx-auto hover:scale-105 transform transition-transform"
      >
        Siguiente →
      </button>
    </div>
  );
}