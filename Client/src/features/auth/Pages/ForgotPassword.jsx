import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TextInput from "../../../core/ui/Components/TextInput";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert"; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setError("Por favor ingresa tu email");
      setShowAlert(true);
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError("Email no válido");
      setShowAlert(true);
      return;
    }
    
    // Si pasa la validación
    setError("");
    setShowAlert(false);
    console.log("Email válido:", email);
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-bold text-[#4C575F] mb-4">
        ¿Olvidaste tu contraseña?
      </h2>

      <p className="text-sm text-gray-600 mb-8 text-center">
        Coloca el email de tu cuenta y recupera tu contraseña
      </p>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
        />

        {/* Si hay error */}
        {showAlert && error && (
          <Alert type="error" message={error} className="mt-4" />
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-[#4C575F] text-sm rounded-lg hover:bg-gray-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </button>

          <Button type="submit">
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;