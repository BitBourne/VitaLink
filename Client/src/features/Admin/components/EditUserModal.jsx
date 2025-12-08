import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Calendar, Shield, Loader, AlertCircle } from 'lucide-react';
import apiClient from '../../../core/api/apiClient';

const EditUserModal = ({ userId, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.get(`/admin/users/${userId}/roles-permissions`);
            const user = response.data.data;

            setUserData(user);
            setFormData({
                name: user.name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError('Error al cargar los datos del usuario');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('El nombre es requerido');
            return false;
        }
        if (!formData.last_name.trim()) {
            setError('El apellido es requerido');
            return false;
        }
        if (!formData.email.trim()) {
            setError('El email es requerido');
            return false;
        }
        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('El email no es válido');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        try {
            setSaving(true);
            await apiClient.put(`/admin/users/${userId}`, formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.response?.data?.msg || 'Error al actualizar el usuario');
        } finally {
            setSaving(false);
        }
    };

    const getUserType = () => {
        if (!userData?.user_roles) return 'Desconocido';
        const roles = userData.user_roles.map(ur => ur.UR_role?.name) || [];
        if (roles.includes('admin')) return 'Administrador';
        if (roles.includes('doctor')) return 'Doctor';
        if (roles.includes('patient')) return 'Paciente';
        return 'Desconocido';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#B490CA] to-[#9f7ab5]">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#B490CA] font-bold text-xl">
                            {loading ? '...' : (formData.name?.charAt(0) || 'U')}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                {loading ? 'Cargando...' : `${formData.name} ${formData.last_name}`}
                            </h3>
                            <p className="text-sm text-white/80">{loading ? '' : getUserType()}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                        disabled={saving}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader className="w-8 h-8 animate-spin text-[#B490CA]" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            )}

                            {/* Basic Information - Editable */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Información Básica
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Apellido *
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                            <Phone className="w-4 h-4" />
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                            placeholder="Opcional"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Account Information - Read Only */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Información de Cuenta
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 mb-1">Tipo de Usuario</p>
                                        <p className="font-medium text-gray-900">{getUserType()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">Estado</p>
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${userData?.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {userData?.is_active ? 'Activo' : 'Suspendido'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1 flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            Fecha de Registro
                                        </p>
                                        <p className="font-medium text-gray-900">{formatDate(userData?.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">Email Verificado</p>
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${userData?.is_verified
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {userData?.is_verified ? 'Verificado' : 'Pendiente'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={saving}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-4 py-2 bg-[#B490CA] text-white rounded-lg hover:bg-[#9f7ab5] transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {saving && <Loader className="w-4 h-4 animate-spin" />}
                                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
