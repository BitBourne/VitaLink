import React from "react";
import { CheckCircle, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignupVerification() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    token: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = formData;

    // Validaciones
    if (!token) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setError(""); 

      const response = await axios.post("http://localhost:4000/api/auth/singUp/confirm-account", {
        token
      });

      console.log("Paciente creado:", response.data);
      navigate("/login");

    } catch (err) {
      console.error("Error al registrar paciente:", err);
      setError(err.response?.data?.msg || "Ocurrió un error al crear la cuenta. Intenta más tarde.");
    }
  };

  return (
    <div className="w-full">

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

      <form className="space-y-6" onSubmit={handleSubmit}>

        <div className="relative">
          <Lock className="absolute left-4 top-3.5 text-[#4C575F]/60 w-5 h-5" />
          <input
            name="token"
            type="text"
            placeholder="Código de Verificación"
            value={formData.token}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF] focus:border-transparent text-center text-lg font-medium"
          />
        </div>

        {/* Alerta de error */}
        {error && (
          <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/SignupPaciente")}
            className="flex items-center gap-2 px-5 py-2 border border-gray-300 text-[#4C575F] font-medium rounded-lg hover:bg-gray-50 transition-colors flex-1 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg flex-1 justify-center"
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}