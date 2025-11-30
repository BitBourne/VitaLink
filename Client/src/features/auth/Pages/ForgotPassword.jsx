import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



// Components
import TextInput from "../../../core/ui/Components/FormInput";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert"; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setAlert({ type: "error", message: "El email es obligatorio." });
      return;
    }
    
    if (!emailRegex.test(email)) {
      setAlert({ type: "error", message: "El email no es válido." });
      return;
    }

    // Limpiar alerta
    setAlert({});
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
          icon="Mail"
          id="email"
          label="Email"
          type="email"
          value={email}
          setValue={setEmail}
        />

        {/* Mostrar alerta */}
        {alert.message && (
          <div className="mt-4">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          <Button 
            icon="arrowLeft"
            iconPosition="left"
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}>
            Atrás
          </Button>

          <Button 
            icon="arrowRight"
            iconPosition="right"
            type="submit">
            Siguiente
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;