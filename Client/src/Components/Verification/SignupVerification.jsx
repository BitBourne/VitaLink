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
      navigate("/Dashboard"); // Redirigir a pantalla de verificación

    } catch (err) {
      console.error("Error al registrar paciente:", err);
      setError(err.response?.data?.msg || "Ocurrió un error al crear la cuenta. Intenta más tarde.");
    }
  };


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

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative mb-5 w-3/4 mx-auto">
          <Lock className="absolute left-3 top-2.5 text-[#4C575F]/60 w-5 h-5" />
          <input
              name="token"
              type="text"
              placeholder="Código de Verificación"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
            />
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-3 w-full sm:w-3/4 mx-auto">
          <button
            onClick={() => navigate("/SignupPaciente")}
            className="flex items-center gap-2 px-5 py-2 border border-[#B490CA] text-[#4C575F] text-sm rounded-md hover:bg-[#B490CA]/10 transition"
            >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-medium text-sm rounded-md hover:opacity-90 transition"
            >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
