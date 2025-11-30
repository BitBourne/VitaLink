import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import TextInput from "../../../core/ui/Components/FormInput";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert";

const NewPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.password || !formData.confirmPassword) {
      setError("Por favor completa todos los campos");
      setShowAlert(true);
      return;
    }

    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      setShowAlert(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setShowAlert(true);
      return;
    }

    // Si pasa la validación
    setError("");
    setShowAlert(false);
    console.log("Nueva contraseña establecida:", formData.password);
    
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-bold text-[#4C575F] mb-4">
        Crea una nueva contraseña
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-[#4C575F] mb-2">
            Password
          </label>
          <div className="relative">
            <TextInput
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu nueva contraseña"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4C575F] mb-2">
            Confirmar Password
          </label>
          <div className="relative">
            <TextInput
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirma tu nueva contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* alerta si hay error */}
        {showAlert && error && (
          <Alert type="error" message={error} />
        )}

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-[#4C575F] text-sm rounded-lg hover:bg-[#5EE7DF]/10 transition"
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

export default NewPassword;