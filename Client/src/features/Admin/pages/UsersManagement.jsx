import React, { useState, useEffect } from "react";
import { Mail, Edit2, Trash2, Ban, CheckCircle, Loader, Filter } from "lucide-react";
import apiClient from "../../../core/api/apiClient";
import Table from "../../../core/ui/Components/Table";
import { useToast } from "../../../core/ui/Components/ToastProvider";

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roleFilter, setRoleFilter] = useState('all');
    const toast = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, roleFilter]);

    const filterUsers = () => {
        if (roleFilter === 'all') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
                user.user_roles?.some(ur => ur.UR_role?.name === roleFilter)
            );
            setFilteredUsers(filtered);
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/admin/users');
            setUsers(response.data?.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleSuspendUser = async (userId, userName) => {
        if (!confirm(`¿Suspender a ${userName}? El usuario no podrá acceder al sistema.`)) return;

        try {
            setActionLoading(true);
            await apiClient.put(`/admin/users/${userId}/suspend`);
            toast.success(`Usuario ${userName} suspendido`);
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al suspender usuario');
        } finally {
            setActionLoading(false);
        }
    };

    const handleActivateUser = async (userId, userName) => {
        if (!confirm(`¿Activar a ${userName}?`)) return;

        try {
            setActionLoading(true);
            await apiClient.put(`/admin/users/${userId}/activate`);
            toast.success(`Usuario ${userName} activado`);
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al activar usuario');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (!confirm(`¿ELIMINAR a ${userName}? Esta acción no se puede deshacer.`)) return;
        if (!confirm('¿Está completamente seguro? Se eliminarán todos los datos del usuario.')) return;

        try {
            setActionLoading(true);
            await apiClient.delete(`/admin/users/${userId}`);
            toast.success(`Usuario ${userName} eliminado`);
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al eliminar usuario');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updateData = {
            name: formData.get('name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };

        try {
            setActionLoading(true);
            await apiClient.put(`/admin/users/${selectedUser.id}`, updateData);
            toast.success('Usuario actualizado exitosamente');
            setShowEditModal(false);
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al actualizar usuario');
        } finally {
            setActionLoading(false);
        }
    };

    const columns = [
        {
            header: 'Usuario',
            accessor: 'name',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center text-white font-semibold text-sm">
                        {row.name?.charAt(0)}{row.last_name?.charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{row.name} {row.last_name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {row.email}
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'Rol',
            accessor: 'role',
            render: (row) => {
                const roles = row.user_roles?.map(ur => ur.UR_role?.name) || [];
                return roles.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {roles.map((role, idx) => (
                            <span key={idx} className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {role}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="text-sm text-gray-400">Sin rol</span>
                );
            }
        },
        {
            header: 'Estado',
            accessor: 'verified',
            render: (row) => {
                const isActive = row.verified;
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {isActive ? 'Activo' : 'Suspendido'}
                    </span>
                );
            }
        },
        {
            header: 'Fecha Registro',
            accessor: 'createdAt',
            sortable: true,
            render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString('es-MX') : '-'
        },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (row) => {
                const isActive = row.verified;
                const isAdmin = row.user_roles?.some(ur => ur.UR_role?.name === 'admin');

                return (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleEditUser(row)}
                            disabled={actionLoading}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                            title="Editar"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>

                        {isActive ? (
                            <button
                                onClick={() => handleSuspendUser(row.id, `${row.name} ${row.last_name}`)}
                                disabled={actionLoading || isAdmin}
                                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                title={isAdmin ? 'No se puede suspender admin' : 'Suspender'}
                            >
                                <Ban className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleActivateUser(row.id, `${row.name} ${row.last_name}`)}
                                disabled={actionLoading}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                title="Activar"
                            >
                                <CheckCircle className="w-4 h-4" />
                            </button>
                        )}

                        <button
                            onClick={() => handleDeleteUser(row.id, `${row.name} ${row.last_name}`)}
                            disabled={actionLoading || isAdmin}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                            title={isAdmin ? 'No se puede eliminar admin' : 'Eliminar'}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                );
            }
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-[#B490CA]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
                    <p className="text-gray-600 mt-1">Administra todos los usuarios del sistema</p>
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#B490CA] focus:border-transparent outline-none"
                    >
                        <option value="all">Todos los usuarios</option>
                        <option value="doctor">Doctores</option>
                        <option value="patient">Pacientes</option>
                        <option value="admin">Administradores</option>
                    </select>
                </div>
            </div>

            {/* Stats Mini Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">Total Usuarios</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{filteredUsers.length}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">Activos</div>
                    <div className="text-2xl font-bold text-green-600 mt-1">
                        {filteredUsers.filter(u => u.verified).length}
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">Suspendidos</div>
                    <div className="text-2xl font-bold text-gray-600 mt-1">
                        {filteredUsers.filter(u => !u.verified).length}
                    </div>
                </div>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={filteredUsers}
                searchPlaceholder="Buscar usuario..."
                emptyMessage="No hay usuarios registrados"
            />

            {/* Edit Modal */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Editar Usuario</h3>
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={selectedUser.name}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    defaultValue={selectedUser.last_name}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={selectedUser.email}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    defaultValue={selectedUser.phone || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    disabled={actionLoading}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="flex-1 px-4 py-2 bg-[#B490CA] text-white rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {actionLoading && <Loader className="w-4 h-4 animate-spin" />}
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersManagement;
