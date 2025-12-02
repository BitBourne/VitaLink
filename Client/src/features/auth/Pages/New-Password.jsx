import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Importar useSearchParams
import { Eye, EyeOff } from "lucide-react";
import axiosPublic from "../../../core/api/axiosPublic"; // Importar axios público

// Components
import TextInput from "../../../core/ui/Components/FormInput";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert";

const NewPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // Hook para obtener parámetros de URL
    const token = searchParams.get('token'); // Extraer el token

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Opcional: useEffect para validar el token al cargar la página (changePassStep2)
    useEffect(() => {
        if (!token) {
            navigate('/invalid-link'); // Navegar si no hay token
            return;
        }
        
        // Se puede añadir aquí una llamada GET a /auth/reset-password/:token 
        // (changePassStep2Controller) para verificar si el token es válido ANTES de que el usuario escriba.
        // Si esa llamada falla, se navega a /invalid-link.
    }, [token, navigate]);

    const handleChange = (val, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: val
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones locales
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

        if (!token) {
            navigate('/invalid-link'); // Doble chequeo
            return;
        }
        
        // Limpiar errores locales y comenzar petición
        setError("");
        setShowAlert(false);
        setIsLoading(true);

        try {
            // PETICIÓN A LA API: Llama a changepassStep3Controller.js
            await axiosPublic.post(
                `/auth/reset-password/${token}`, 
                { newPassword: formData.password }
            );

            // Si tiene éxito, navegar a la pantalla de éxito
            navigate('/password-updated'); 

        } catch (error) {
            // Si el token es inválido o expiró, redirigir
            navigate('/invalid-link');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-center text-2xl font-bold text-[#4C575F] mb-4">
                Crea una nueva contraseña
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Campo Contraseña */}
                <div>
                    <TextInput
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        setValue={(val) => handleChange(val, 'password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                {/* Campo Confirmar Contraseña */}
                <div>
                    <TextInput
                        id="confirmPassword"
                        label="Confirmar Password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        setValue={(val) => handleChange(val, 'confirmPassword')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                {/* alerta si hay error */}
                {showAlert && error && (
                    <Alert type="error" message={error} />
                )}

                <div className="flex justify-between items-center pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(-1)}
                    >
                        Atrás
                    </Button>

                    <Button 
                        icon="arrowRight"
                        iconPosition="right"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Siguiente'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewPassword;