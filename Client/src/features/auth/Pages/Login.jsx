import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import useAuth from "../../../features/auth/hooks/useAuth";
import apiClient from "../../../core/api/apiClient";

// Components
import FormInput from "../../../core/ui/Components/FormInput";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert";

export default function Login() {

      // Form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Alert State
  const [alert, setAlert] = useState({});

  // Auth
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setAlert({ type: "error", message: "Por favor completa todos los campos." });
      return;
    }

    try {
      setAlert({});

      const response = await apiClient.post("/auth/logIn", { email, password });
      const { token } = response.data.data;

      login(token);

      navigate("/user");
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.error || "Credenciales inválidas o error en el servidor." });
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8"> 
        <h2 className="text-center text-lg font-semibold mb-2 text-[#4C575F]">
            Inicia sesión en tu cuenta
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
            Bienvenido de nuevo, nos alegra verte otra vez
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
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

            {alert.message && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                />
            )}

            <button className="text-sm text-[#4C575F] " onClick={() => navigate('/reset-password')} type="button">
            ¿Olvidaste tu contraseña?
            </button>

            <div className="flex justify-between items-center pt-4 gap-5">
                <Button
                    text="Crear cuenta"
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/signup")}
                />

                <Button
                    icon="login"
                    iconPosition="right"
                    text="Iniciar Sesion"
                    type="submit"
                    variant="primary"
                    onClick={handleSubmit}
                />
            </div>
        </form>
    </div>
  );
}
