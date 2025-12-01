import React, { useState } from "react";
import { Form, useNavigate } from 'react-router-dom';
import { authService } from  '../../../core/Services/authService';


// Components
import Button from "../../../core/ui/Components/Button";
import FormInput from "../../../core/ui/Components/FormInput";
import Alert from "../../../core/ui/Components/Alert";


const SignupFormEspecialist = () => {
  const navigate = useNavigate();

  // Form Data
  const [formData, setFormData] = useState({
    role: "2",
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    especialidad: ""
  });

  // estado de alerta
  const [alert, setAlert] = useState({});

  // Expresiones regulares
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;"'<>,.?/~`-]).{8,}$/;

    const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, last_name, email, password, confirmPassword, especialidad } = formData;

    // Validaciones
    if (!name || !last_name || !email || !password || !confirmPassword || !especialidad) {
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
      // Limpiar alerta previa
      const response = await authService.registerEspecialista({
        name,
        last_name,
        email,
        password,
        especialidad, 
        role: "2"
      });

      navigate("/VerificationCard");

    } catch (error) {
      setAlert({ type: "error", message: error.response?.data?.message || "Ocurrió un error al crear la cuenta. Intenta más tarde." });
    }
  };
  
  return (
    <div className="">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-5 md:gap-4">
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

        <FormInput
          icon="CircleStar"
          id="especialidad"
          label="Especialidad"
          type="text"
          value={formData.especialidad}
          setValue={(value) => setFormData({ ...formData, especialidad: value })}
        />

        {/* Mostrar Alerta */}
        {alert.message && (
          <Alert 
            type={alert.type}
            message={alert.message}
          />
        )}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="secondary"
            text="Anterior"
            icon="arrowLeft"
            iconPosition="left"
            onClick={() => navigate(0)}
          />

          <Button
            type="submit"
            variant="primary"
            text="Siguiente"
            icon="arrowRight"
            iconPosition="right"
          />
        </div>
      </form>
    </div>
  );
}

export default SignupFormEspecialist;