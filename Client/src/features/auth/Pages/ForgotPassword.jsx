import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../../../core/api/axiosPublic"; 

// Components
import TextInput from "../../../core/ui/Components/FormInput";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert"; 

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

    const handleSubmit = async (e) => {
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

        // Limpiar alerta y empezar la petición
        setAlert({});
        setIsLoading(true);

        try {
            // PETICIÓN A LA API
            await axiosPublic.post('/auth/reset-password', { email });
            
            setAlert({ 
                type: "success", 
                message: "¡Correo enviado! Revisa tu bandeja de entrada o spam para restablecer tu contraseña."
            });
            setEmail(""); // Limpiar el campo si es exitoso
        } catch (error) {
            // Manejar errores de la API 
            const errorMessage = error.response?.data?.message || "Ocurrió un error al enviar el correo.";
            setAlert({ type: "error", message: errorMessage });
        } finally {
            setIsLoading(false); // Detener loading
        }
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
                        type="submit"
                        disabled={isLoading} // Deshabilitar durante la carga
                    >
                        {isLoading ? 'Enviando...' : 'Siguiente'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;