import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

// Components
import TextInput from "../../../core/ui/Components/FormInput";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert";
import apiClient from "../../../core/api/apiClient";

import { AlertCircle } from "lucide-react";

const NewPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Extraer token de la URL
  const params = useParams();
  const { token } = params;

  const [tokenValido, setTokenValido] = useState(false)
  const [alert, setAlert] = useState({})

  const [passwordModificado, setPasswordModificado] = useState(false)

  // Ejecuta este codigo cunando detecte el token de la URL
useEffect(() => {
    const comprobarToken = async () => {
        try {
            await apiClient.get(`/auth/reset-password/${token}`);

            setTokenValido(true);
        } catch (err) {
            setAlert({ 
                type: "error", 
                message: err.response?.data?.error || "Este enlace no es válido o ha expirado" 
            });
        }
    }

    comprobarToken();
}, [token]);





  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.password || !formData.confirmPassword) {
      setAlert({ type: "error", message: "Por favor completa todos los campos." });
      return;
    }

    if (formData.password.length < 8) {
      setAlert({ type: "error", message: "La contraseña debe tener al menos 8 caracteres" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({ type: "error", message: "Las contraseñas no coinciden" });
      return;
    }

    try {
      // Si pasa la validación
      setAlert({})

      const response = await apiClient.post(`/auth/reset-password/${token}`, {password: formData.password})
      setAlert({ type: "success", message: response.data.msg });
      setPasswordModificado(true)
      
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.error || "Ocurrió un error. Intenta más tarde." });
    }


  };

  return (
    <div className="w-full">
      <div className={ `${tokenValido ? 'block' : 'hidden'}`}>

        <h2 className="text-center text-2xl font-bold text-[#4C575F] mb-4">
          Crea una nueva contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <div className="relative">
              <TextInput
                id="password"
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={formData.password}
                setValue={(value) => setFormData({ ...formData, password: value })}
              />
              {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button> */}
            </div>
          </div>

          <div>
            <div className="relative">
              <TextInput
                id="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={formData.confirmPassword}
                setValue={(value) => setFormData({ ...formData, confirmPassword: value })}
              />
              {/* <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button> */}
            </div>
          </div>

          {/* Mostrar alerta */}
          {alert.message && (
            <Alert
              type={alert.type}
              message={alert.message}
            />
          )}

          <div className="flex justify-end items-center pt-4">
            

            {passwordModificado ? (
              <Button
                icon="login"
                iconPosition="right"
                text="Iniciar Sesión"
                type="button"
                variant="primary"
                onClick={() => navigate("/")}
              />
            ) : (     
              <Button
                icon="arrowRight"
                text="Siguiente"
                type="submit"
                variant="primary"
              />
            )}

        </div>
        </form>
      </div>

      <div className={`${tokenValido ? 'hidden' : 'block'} flex items-center justify-center gap-3 bg-red-50 border border-red-200 rounded-lg p-3`}>
        <AlertCircle className="w-5 h-5 text-red-500" />
        <div className="text-left">
          <h3 className="font-semibold text-red-700">Error</h3>
          <p className="text-red-600 text-sm">Enlace inválido o expirado</p>
        </div>
      </div>


    </div>
  );
};

export default NewPassword;