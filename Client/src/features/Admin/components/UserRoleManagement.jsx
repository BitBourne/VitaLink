import React, { useState, useEffect } from 'react';
import { Users, Shield, Key, Search, UserPlus, Trash2 } from 'lucide-react';
import apiClient from '../../../core/api/apiClient';
import AssignRoleModal from './AssignRoleModal';
import AssignPermissionModal from './AssignPermissionModal';

const UserRoleManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/admin/users');
            setUsers(response.data?.data || []);
            setError('');
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setError('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveRole = async (userId, roleId, roleName) => {
        if (!window.confirm(`¿Estás seguro de remover el rol "${roleName}"?`)) {
            return;
        }

        try {
            await apiClient.delete('/admin/remove-role', {
                data: { userId, roleId }
            });
            fetchUsers();
        } catch (error) {
            console.error('Error al remover rol:', error);
            alert('Error al remover el rol');
        }
    };

    const handleRemovePermission = async (userId, permissionId, permissionName) => {
        if (!window.confirm(`¿Estás seguro de remover el permiso "${permissionName}"?`)) {
            return;
        }

        try {
            await apiClient.delete('/admin/remove-permission', {
                data: { user_id: userId, permission_id: permissionId }
            });
            fetchUsers();
        } catch (error) {
            console.error('Error al remover permiso:', error);
            alert('Error al remover el permiso');
        }
    };

    const filteredUsers = users.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
            user.name?.toLowerCase().includes(searchLower) ||
            user.last_name?.toLowerCase().includes(searchLower) ||
            user.email?.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios y Permisos</h2>
                    <p className="text-gray-600 mt-1">Administra roles y permisos de los usuarios del sistema</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Users Table */}
            {loading ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <p className="text-gray-600">Cargando usuarios...</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Usuario
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Roles
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Permisos
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            No se encontraron usuarios
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-[#B490CA] rounded-full flex items-center justify-center">
                                                        <Users className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name} {user.last_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {user.user_roles?.map((ur) => (
                                                        <span
                                                            key={ur.id}
                                                            className="inline-flex items-center gap-1 px-2 py-1 bg-[#B490CA]/10 text-[#B490CA] rounded-full text-xs font-medium"
                                                        >
                                                            <Shield className="w-3 h-3" />
                                                            {ur.UR_role?.name}
                                                            <button
                                                                onClick={() => handleRemoveRole(user.id, ur.UR_role?.id, ur.UR_role?.name)}
                                                                className="ml-1 hover:text-red-600 cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                    {(!user.user_roles || user.user_roles.length === 0) && (
                                                        <span className="text-sm text-gray-400">Sin roles</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {user.user_permissions?.map((up) => (
                                                        <span
                                                            key={up.id}
                                                            className="inline-flex items-center gap-1 px-2 py-1 bg-[#5EE7DF]/10 text-[#5EE7DF] rounded-full text-xs font-medium"
                                                        >
                                                            <Key className="w-3 h-3" />
                                                            {up.UP_permission?.name}
                                                            <button
                                                                onClick={() => handleRemovePermission(user.id, up.UP_permission?.id, up.UP_permission?.name)}
                                                                className="ml-1 hover:text-red-600 cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                    {(!user.user_permissions || user.user_permissions.length === 0) && (
                                                        <span className="text-sm text-gray-400">Sin permisos</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowRoleModal(true);
                                                        }}
                                                        className="px-3 py-1 bg-[#B490CA] text-white rounded-lg hover:bg-[#9a7ab3] text-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <UserPlus className="w-4 h-4" />
                                                        Rol
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowPermissionModal(true);
                                                        }}
                                                        className="px-3 py-1 bg-[#5EE7DF] text-white rounded-lg hover:bg-[#4dd4cc] text-sm flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <Key className="w-4 h-4" />
                                                        Permiso
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modals */}
            <AssignRoleModal
                isOpen={showRoleModal}
                onClose={() => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
                onSuccess={fetchUsers}
            />

            <AssignPermissionModal
                isOpen={showPermissionModal}
                onClose={() => {
                    setShowPermissionModal(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
                onSuccess={fetchUsers}
            />
        </div>
    );
};

export default UserRoleManagement;
