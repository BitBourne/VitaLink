import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import apiClient from '../../../core/api/apiClient';

const AssignPermissionModal = ({ isOpen, onClose, user, onSuccess }) => {
    const [permissions, setPermissions] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchPermissions();
        }
    }, [isOpen]);

    const fetchPermissions = async () => {
        try {
            const response = await apiClient.get('/admin/permissions');
            setPermissions(response.data?.data || []);
        } catch (error) {
            console.error('Error al cargar permisos:', error);
            setError('Error al cargar los permisos disponibles');
        }
    };

    const handleAssign = async () => {
        if (!selectedPermission) {
            setError('Por favor selecciona un permiso');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await apiClient.post('/admin/assign-permission', {
                user_id: user.id,
                permission_id: parseInt(selectedPermission)
            });

            onSuccess();
            onClose();
            setSelectedPermission('');
        } catch (error) {
            console.error('Error al asignar permiso:', error);
            setError(error.response?.data?.message || 'Error al asignar el permiso');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    // Obtener IDs de permisos ya asignados
    const assignedPermissionIds = user?.user_permissions?.map(up => up.UP_permission?.id) || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Asignar Permiso</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        Usuario: <span className="font-semibold">{user?.name} {user?.last_name}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Email: <span className="font-semibold">{user?.email}</span>
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seleccionar Permiso
                    </label>
                    <select
                        value={selectedPermission}
                        onChange={(e) => setSelectedPermission(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                    >
                        <option value="">-- Selecciona un permiso --</option>
                        {permissions.map(permission => (
                            <option
                                key={permission.id}
                                value={permission.id}
                                disabled={assignedPermissionIds.includes(permission.id)}
                            >
                                {permission.name} {assignedPermissionIds.includes(permission.id) ? '(Ya asignado)' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAssign}
                        className="flex-1 px-4 py-2 bg-[#B490CA] text-white rounded-lg hover:bg-[#9a7ab3] disabled:opacity-50"
                        disabled={loading || !selectedPermission}
                    >
                        {loading ? 'Asignando...' : 'Asignar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignPermissionModal;
