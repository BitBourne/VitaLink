import React, { useState } from "react";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../auth/hooks/useAuth"
import apiClient from "../../api/apiClient";

export default function LoginCard() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setError("");
      // const response = await axios.post("http://localhost:4000/api/auth/login", {
      //   email,
      //   password,
      // });

      const response =  await apiClient.post('/auth/login', { email, password });
      const { token } = response.data;

      login(token);

      navigate("/user");
    } catch (err) {
      console.log("Error al iniciar sesión:", err);
      setError(err.response?.data?.msg || "Credenciales inválidas o error en el servidor.");
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md mx-auto">
      <h2 className="text-center text-lg font-semibold mb-2 text-[#4C575F]">
        Inicia sesión en tu cuenta
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Bienvenido de nuevo, nos alegra verte otra vez
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-[#4C575F]/70 w-5 h-5" />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-2.5 text-[#4C575F]/70 w-5 h-5" />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 px-4 py-2 border border-[#5EE7DF] text-[#4C575F] text-sm rounded-md hover:bg-[#5EE7DF]/10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Crear cuenta
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-medium text-sm rounded-md hover:opacity-90 transition"
          >
            Iniciar sesión
            <LogIn className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
