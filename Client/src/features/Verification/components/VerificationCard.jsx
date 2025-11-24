import React from "react";
import Header from "../../../core/ui/layout/Header";
import CodeCard from "../pages/SignupVerification";
import SignupVerification from "../pages/SignupVerification";
import { CheckCircle } from "lucide-react";

export default function VerificationCard() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-2">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#4C575F] mb-3">
          Confirma Tu Identidad
        </h2>

        <p className="text-base text-[#4C575F]/80 leading-relaxed">
          Hemos enviado un código de verificación a tu email.<br />
          Revisa tu bandeja de entrada.
        </p>
      </div>
     
      <div className="flex justify-center mb-10">
        <CheckCircle className="w-20 h-20 text-[#5EE7DF]" strokeWidth={2} />
      </div>

      <SignupVerification />
    </div>
  );
}
