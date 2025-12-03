import React, { useState, useEffect } from 'react';
import { User, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';
import apiClient from '../../../core/api/apiClient';
import useAuth from '../../auth/hooks/useAuth';
import FormInput from '../../../core/ui/Components/FormInput';
import Button from '../../../core/ui/Components/Button';
import Alert from '../../../core/ui/Components/Alert';

const AdminProfile = () => {
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [passLoading, setPassLoading] = useState(false);
    const [alert, setAlert] = useState({});
    const [passAlert, setPassAlert] = useState({});

    const [profileData, setProfileData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    const [passData, setPassData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({});

        try {
            await apiClient.put('/auth/profile', {
                name: profileData.name,
                last_name: profileData.last_name,
                phone: profileData.phone
            });

            await refreshUser();
            setAlert({ type: 'success', message: 'Perfil actualizado correctamente' });
        } catch (error) {
            console.error('Error updating profile:', error);
            setAlert({
                type: 'error',
                message: error.response?.data?.error || 'Error al actualizar el perfil'
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passData.newPassword !== passData.confirmPassword) {
            setPassAlert({ type: 'error', message: 'Las contraseñas nuevas no coinciden' });
            return;
        }

        if (passData.newPassword.length < 6) {
            setPassAlert({ type: 'error', message: 'La contraseña debe tener al menos 6 caracteres' });
            return;
        }

        setPassLoading(true);
        setPassAlert({});

        try {
            await apiClient.post('/auth/change-password', {
                currentPassword: passData.currentPassword,
                newPassword: passData.newPassword
            });

            setPassAlert({ type: 'success', message: 'Contraseña actualizada correctamente' });
            setPassData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error changing password:', error);
            setPassAlert({
                type: 'error',
                message: error.response?.data?.error || error.response?.data?.msg || 'Error al cambiar la contraseña'
            });
        } finally {
            setPassLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
                <p className="text-gray-600 mt-1">Administra tu información personal y seguridad</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información Personal */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#B490CA]/10 rounded-lg">
                            <User className="w-6 h-6 text-[#B490CA]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Información Personal</h3>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                id="name"
                                label="Nombre"
                                value={profileData.name}
                                setValue={(val) => setProfileData({ ...profileData, name: val })}
                                required
                            />
                            <FormInput
                                id="last_name"
                                label="Apellidos"
                                value={profileData.last_name}
                                setValue={(val) => setProfileData({ ...profileData, last_name: val })}
                                required
                            />
                        </div>

                        <FormInput
                            id="email"
                            label="Email"
                            type="email"
                            value={profileData.email}
                            disabled={true}
                            setValue={() => { }}
                        />
                        <p className="text-xs text-gray-500 -mt-3">El email no se puede cambiar directamente.</p>

                        <FormInput
                            id="phone"
                            label="Teléfono"
                            value={profileData.phone}
                            setValue={(val) => setProfileData({ ...profileData, phone: val })}
                        />

                        {alert.message && (
                            <Alert type={alert.type} message={alert.message} />
                        )}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                text={loading ? 'Guardando...' : 'Guardar Cambios'}
                                variant="primary"
                                icon={Save}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>

                {/* Seguridad */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#5EE7DF]/10 rounded-lg">
                            <Lock className="w-6 h-6 text-[#5EE7DF]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Seguridad</h3>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <FormInput
                            id="currentPassword"
                            label="Contraseña Actual"
                            type="password"
                            value={passData.currentPassword}
                            setValue={(val) => setPassData({ ...passData, currentPassword: val })}
                            required
                        />

                        <FormInput
                            id="newPassword"
                            label="Nueva Contraseña"
                            type="password"
                            value={passData.newPassword}
                            setValue={(val) => setPassData({ ...passData, newPassword: val })}
                            required
                        />

                        <FormInput
                            id="confirmPassword"
                            label="Confirmar Nueva Contraseña"
                            type="password"
                            value={passData.confirmPassword}
                            setValue={(val) => setPassData({ ...passData, confirmPassword: val })}
                            required
                        />

                        {passAlert.message && (
                            <Alert type={passAlert.type} message={passAlert.message} />
                        )}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                text={passLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
                                variant="secondary" // Use a different variant to distinguish actions
                                icon={Lock}
                                disabled={passLoading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
