import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert";

const PasswordUpdated = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center">
      <h2 className="text-2xl font-bold text-[#4C575F] mb-6">
        ¡Olvidaste tu contraseña?
      </h2>

      <h3 className="text-xl font-bold text-[#4C575F] mb-4">¡Listo!</h3>

      <Alert 
        type="success"
        message="Tu contraseña se ha actualizado con éxito"
        className="mb-8 w-full justify-start"
      />

      <hr className="border-t border-[#E0E6EA] mb-8" />

      <div className="flex justify-center">
        <Button
          onClick={() => navigate("/")}
          variant="primary"
        >
          Iniciar Sesión
        </Button>
      </div>
    </div>
  );
};

export default PasswordUpdated;