import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const InvalidLink = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center">
      <h2 className="text-2xl font-bold text-[#4C575F] mb-6">
        ¡Olvidaste tu contraseña?
      </h2>

      <div className="flex items-center justify-center gap-3 bg-red-50 border border-red-200 rounded-lg p-3 mb-8">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <div className="text-left">
          <h3 className="font-semibold text-red-700">Error</h3>
          <p className="text-red-600 text-sm">Enlace inválido o expirado</p>
        </div>
      </div>
    </div>
  );
};

export default InvalidLink;