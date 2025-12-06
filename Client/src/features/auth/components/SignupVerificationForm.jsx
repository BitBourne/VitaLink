import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Components
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert";
import FormInput from "../../../core/ui/Components/FormInput";
import apiClient from "../../../core/api/apiClient";

const SignupVerification = ({value, setValue}) => {
  const navigate = useNavigate();

  // Form Data
  const [formData, setFormData] = useState({
    token: ""
  });

  // Estado de alerta
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = formData;

    // Validaciones
    if (!token) {
      setAlert({ type: "error", message: "Por favor completa todos los campos." });
      return;
    }

    if (isNaN(token) || token.length !== 6) {
      setAlert({ type: "error", message: "El código de verificación debe ser un número de 6 dígitos." });
      return;
    }

    try {
      // Limpiar alerta
      setAlert({});

      const response = await apiClient.post("/auth/signUp/confirm-account", {token})

      // mostrar mensaje de éxito en componente padre
      setValue(!value);

    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.msg || "Ocurrió un error al enviar el codigo." });
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          id="token"
          label="Código de Verificación"
          type="number"
          value={formData.token}
          setValue={(value) => setFormData({ ...formData, token: value })}
          icon="Lock"
        />

        {/* Mostrar Alerta */}
        {alert.message && (
          <Alert
            type={alert.type}
            message={alert.message}
          />
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Button
            icon="arrowRight"
            iconPosition="right"
            type="submit"
            variant="primary"
            text="Siguiente"
          />
        </div>
      </form>
    </div>
  );
}

export default SignupVerification;