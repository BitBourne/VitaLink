import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function FormCardPaciente() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;"'<>,.?/~`-]).{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, apellidos, email, password, confirmPassword } = formData;

    // Validaciones
    if (!nombre || !apellidos || !email || !password || !confirmPassword) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setError(""); 

      const response = await axios.post("http://localhost:4000/api/auth/singUp", {
        name: nombre,
        last_name: apellidos,
        email,
        password,
        role: "1", 
      });

      console.log("Paciente creado:", response.data);
      navigate("/VerificationCard"); // Redirigir a pantalla de verificación

    } catch (err) {
      console.error("Error al registrar paciente:", err);
      setError(err.response?.data?.msg || "Ocurrió un error al crear la cuenta. Intenta más tarde.");
    }
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-[#4C575F] mb-6">
        Crea una cuenta gratuita
      </h2>

      <p className="text-sm font-medium text-[#4C575F] mb-4">
        Información Personal
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="sm:flex sm:gap-3">
          <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
            <User className="absolute left-3 top-2.5 text-[#4C575F]/70 w-5 h-5" />
            <input
              name="nombre"
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
            />
          </div>

          <div className="relative w-full sm:w-1/2">
            <User className="absolute left-3 top-2.5 text-[#4C575F]/70 w-5 h-5" />
            <input
              name="apellidos"
              type="text"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
            />
          </div>
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-[#4C575F]/70 w-5 h-5" />
          <input
            name="email"
            type="email"
            placeholder="Email"
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

        <div className="relative">
          <Lock className="absolute left-3 top-2.5 text-[#4C575F]/70 w-5 h-5" />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirma contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm text-[#4C575F] focus:outline-none focus:ring-2 focus:ring-[#5EE7DF]"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 px-4 py-2 border border-[#5EE7DF] text-[#4C575F] text-sm rounded-md hover:bg-[#5EE7DF]/10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-medium text-sm rounded-md hover:opacity-90 transition"
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
