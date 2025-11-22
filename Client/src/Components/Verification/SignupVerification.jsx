import React from "react";
import { CheckCircle, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignupVerification() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-xl text-center">

      <h2 className="text-xl font-semibold text-[#4C575F] mb-2">
        Confirma Tu Identidad
      </h2>

      <p className="text-sm text-[#4C575F]/80 mb-8">
        Hemos enviado un código de verificación a tu email. <br />
        Revisa tu bandeja de entrada.
      </p>

      <div className="flex justify-center mb-8">
        <CheckCircle className="w-16 h-16 text-[#5EE7DF]" strokeWidth={2.5} />
      </div>

      <div className="relative mb-10 w-3/4 mx-auto">
        <Lock className="absolute left-3 top-2.5 text-[#4C575F]/60 w-5 h-5" />
        <input
          type="text"
          placeholder="Código de verificación"
          className="w-full pl-10 pr-3 py-2.5 border border-[#E0E6EA] rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF] transition"
        />
      </div>

      <div className="flex justify-center gap-3 w-full sm:w-3/4 mx-auto">
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2 px-5 py-2 border border-[#B490CA] text-[#4C575F] text-sm rounded-md hover:bg-[#B490CA]/10 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </button>

        <button
          onClick={() => navigate("/Sucess")}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-medium text-sm rounded-md hover:opacity-90 transition"
        >
          Siguiente
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
