import React, { useState } from "react";
import { Form, useNavigate } from 'react-router-dom';
import apiClient from "../../../core/api/apiClient";


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
    medical_license_document: null,
    cedula_document: null
  });

  // estado de alerta
  const [alert, setAlert] = useState({});

  // Expresiones regulares
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;"'<>,.?/~`-]).{8,}$/;

    const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, last_name, email, password, confirmPassword, medical_license_document, cedula_document } = formData;

    // Validaciones
    if (!name || !last_name || !email || !password || !confirmPassword || !medical_license_document || !cedula_document) {
      setAlert({ type: "error", message: "Por favor completa todos los campos" });
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
      setAlert({});

      // CONSTRUCCIÓN DEL FORMDATA
      const dataToSend = new FormData();
      
      // Agregamos campos de texto
      dataToSend.append('name', name);
      dataToSend.append('last_name', last_name);
      dataToSend.append('email', email);
      dataToSend.append('password', password);
      dataToSend.append('role', "2"); // O formData.role

      // Agregamos los archivos
      dataToSend.append('medical_license_document', medical_license_document);
      dataToSend.append('cedula_document', cedula_document);

      // Enviar datos al backend
      const response = await apiClient.post('/auth/signUp', dataToSend)
      // const response = await axios.post("http://localhost:4000/api", {
      //   name: name,
      //   last_name: last_name,
      //   email,
      //   password,
      //   role: "2"
      // });

      // Redirigir a pantalla de verificación
      navigate("verify-account");

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
          id="medical_licence"
          label="Licencia Medica (PDF, JPG, PNG)"
          type="file"
          // value={formData.especialidad}
          setValue={(archivo) => setFormData({ ...formData, medical_license_document: archivo })}
        />

        <FormInput
          icon="CircleStar"
          id="cedula"
          label="Cedula (PDF, JPG, PNG)"
          type="file"
          // value={formData.especialidad}
          setValue={(archivo) => setFormData({ ...formData, cedula_document: archivo })}
        />

        {/* Mostrar Alerta */}
        {alert.message && (
          <Alert 
            type={alert.type}
            message={alert.message}
          />
        )}

        {/* Form Controls */}
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