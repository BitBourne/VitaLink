import React, { useState } from "react";
import { Form, useNavigate } from 'react-router-dom';
import axios from "axios";

// Components
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert";
import FormInput from "../../../core/ui/Components/FormInput";

const SignupFormPatient = () => {
  const navigate = useNavigate();

  // Form Data
  const [formData, setFormData] = useState({
    role: "1",
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;"'<>,.?/~`-]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, last_name, email, password, confirmPassword } = formData;
    // Validaciones
    if (!name || !last_name || !email || !password || !confirmPassword) {
      setAlert({ type: "error", message: "Por favor completa todos los campos." });
      return;
    }
    if (!emailRegex.test(email)) {
      setAlert({ type: "error", message: "Por favor ingresa un correo electrónico válido." });
      return;
    }
    if (!passwordRegex.test(password)) {
      setAlert({ type: "error", message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial." });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({ type: "error", message: "Las contraseñas no coinciden." });
      return;
    }

    try {
      // Eliminamos las posibles alertas previas
      setAlert({});

      // Crear usuario paciente
      const response = await axios.post("http://localhost:4000/api/auth/singUp", {
        name,
        last_name,
        email,
        password,
        role: "1", 
      });

      navigate("/VerificationCard"); // Redirigir a pantalla de verificación

    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.msg || "Ocurrió un error al crear la cuenta. Intenta más tarde." });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-5">

        <FormInput
          icon="User"
          id="name"
          label="Nombre"
          type="text"
          value={formData.name}
          setValue={(value) => setFormData({ ...formData, name: value })}
        />

        <FormInput
          icon="User"
          id="last_name"
          label="Apellidos"
          type="text"
          value={formData.last_name}
          setValue={(value) => setFormData({ ...formData, last_name: value })}
        />
      </div>

      <FormInput
        icon="Mail"
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        setValue={(value) => setFormData({ ...formData, email: value })}
      />

      <FormInput
        icon="Lock"
        id="password"
        label="Contraseña" 
        type="password"
        value={formData.password}
        setValue={(value) => setFormData({ ...formData, password: value })}
      />

      <FormInput
        icon="Lock"
        id="confirmPassword"
        label="Confirma contraseña" 
        type="password"
        value={formData.confirmPassword}
        setValue={(value) => setFormData({ ...formData, confirmPassword: value })}
      />

      {/* Mostrar alerta */}
      {alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
        />
      )}

      <div className="flex justify-between pt-4">
        <Button 
          icon="arrowLeft"
          iconPosition="left"
          type="button"
          variant="secondary"
          onClick={() => navigate(0)}>
          Anterior
        </Button>

        <Button 
          icon="arrowRight"
          iconPosition="right"
          type="submit">
          Siguiente
        </Button> 
      </div>
    </form>
  );
}

export default SignupFormPatient;