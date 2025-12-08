import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import apiClient from '../../../core/api/apiClient';

const AssignRoleModal = ({ isOpen, onClose, user, onSuccess }) => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchRoles();
        }
    }, [isOpen]);

    const fetchRoles = async () => {
        try {
            const response = await apiClient.get('/roles');
            setRoles(response.data || []);
        } catch (error) {
            console.error('Error al cargar roles:', error);
            setError('Error al cargar los roles disponibles');
        }
    };

    const handleAssign = async () => {
        if (!selectedRole) {
            setError('Por favor selecciona un rol');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await apiClient.post('/admin/assign-role', {
                userId: user.id,
                roleId: parseInt(selectedRole)
            });

            onSuccess();
            onClose();
            setSelectedRole('');
        } catch (error) {
            console.error('Error al asignar rol:', error);
            setError(error.response?.data?.message || 'Error al asignar el rol');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    // Obtener IDs de roles ya asignados
    const assignedRoleIds = user?.user_roles?.map(ur => ur.UR_role?.id) || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Asignar Rol</h3>
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
                        Seleccionar Rol
                    </label>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                    >
                        <option value="">-- Selecciona un rol --</option>
                        {roles.map(role => (
                            <option
                                key={role.id}
                                value={role.id}
                                disabled={assignedRoleIds.includes(role.id)}
                            >
                                {role.name} {assignedRoleIds.includes(role.id) ? '(Ya asignado)' : ''}
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
                        disabled={loading || !selectedRole}
                    >
                        {loading ? 'Asignando...' : 'Asignar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignRoleModal;
