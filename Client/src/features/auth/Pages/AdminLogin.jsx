import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import apiClient from "../../../core/api/apiClient";
import FormInput from "../../../core/ui/Components/FormInput";
import Button from "../../../core/ui/Components/Button";
import Alert from "../../../core/ui/Components/Alert";

export default function AdminLogin() {

    // Datos del formulario
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Estado de la alerta
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            setAlert({ type: "error", message: "Por favor completa todos los campos." });
            return;
        }

        try {
            setLoading(true);
            setAlert({});

            // Petición de inicio de sesión (la cookie se establece automáticamente por el backend)
            await apiClient.post("/auth/login", { email, password });

            // Actualizar contexto de usuario
            const userData = await refreshUser();

            // Verificar si el usuario tiene rol de administrador
            const isAdmin = userData.roles && userData.roles.some(r => r.toLowerCase() === 'admin');

            if (!isAdmin) {
                setAlert({ type: "error", message: "Acceso solo para administradores. Por favor usa el login regular." });
                // Cerrar sesión del usuario ya que no es administrador
                await apiClient.post("/auth/logout");
                await refreshUser(); // Limpiar usuario del contexto
                setLoading(false);
                return;
            }

            // Navegar al panel de administración
            navigate("/admin");

            // Respaldo si la navegación no funciona (raro pero posible con algunos estados del router)
            setTimeout(() => {
                if (window.location.pathname !== '/admin') {
                    window.location.href = '/admin';
                }
            }, 1000);

        } catch (err) {
            console.error("Login error:", err);
            setAlert({ type: "error", message: err.response?.data?.error || err.response?.data?.msg || "Credenciales inválidas o error en el servidor." });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-transparent bg-clip-text mb-2">
                        VitaLink
                    </h1>
                    <p className="text-xl font-semibold text-gray-800">Panel de Administración</p>
                    <p className="text-sm text-gray-500 mt-2">Acceso exclusivo para administradores</p>
                </div>

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

                    <div className="w-full flex justify-center">
                        <Button
                            text={loading ? "Iniciando sesión..." : "Iniciar sesión"}
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        />
                    </div>


                </form>
            </div>
        </div>
    );
}
