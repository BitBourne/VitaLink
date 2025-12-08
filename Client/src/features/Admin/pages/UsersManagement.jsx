import React, { useState, useEffect } from 'react';
import { Users, Search, Edit2, Trash2, Loader } from 'lucide-react';
import apiClient from '../../../core/api/apiClient';
import Table from '../../../core/ui/Components/Table';
import EditUserModal from '../components/EditUserModal';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/admin/users');
            setUsers(response.data?.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = (userId) => {
        setSelectedUserId(userId);
        setShowEditModal(true);
    };

    const handleDeleteUser = async (userId, userName) => {
        if (!window.confirm(`¿Estás seguro de ELIMINAR permanentemente al usuario ${userName}? Esta acción no se puede deshacer.`)) {
            return;
        }

        try {
            await apiClient.delete(`/admin/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error al eliminar usuario');
        }
    };

    const getUserType = (user) => {
        const roles = user.user_roles?.map(ur => ur.UR_role?.name) || [];
        if (roles.includes('admin')) return 'admin';
        if (roles.includes('doctor')) return 'doctor';
        if (roles.includes('patient')) return 'patient';
        return 'unknown';
    };

    const filteredUsers = users.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            user.name?.toLowerCase().includes(searchLower) ||
            user.last_name?.toLowerCase().includes(searchLower) ||
            user.email?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;

        if (filterType === 'all') return true;
        return getUserType(user) === filterType;
    });

    const columns = [
        {
            header: 'Usuario',
            accessor: 'name',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#B490CA] flex items-center justify-center text-white font-bold">
                        {row.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">
                            {row.name} {row.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{row.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Tipo',
            accessor: 'type',
            render: (row) => {
                const type = getUserType(row);
                const typeMap = {
                    admin: { label: 'Administrador', class: 'bg-purple-100 text-purple-800' },
                    doctor: { label: 'Doctor', class: 'bg-blue-100 text-blue-800' },
                    patient: { label: 'Paciente', class: 'bg-green-100 text-green-800' },
                    unknown: { label: 'Desconocido', class: 'bg-gray-100 text-gray-800' }
                };
                const { label, class: className } = typeMap[type];

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
                        {label}
                    </span>
                );
            }
        },
        {
            header: 'Teléfono',
            accessor: 'phone',
            render: (row) => row.phone || '-'
        },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleEditUser(row.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Editar usuario"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteUser(row.id, `${row.name} ${row.last_name}`)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar usuario"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
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
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
                <p className="text-gray-600 mt-1">Administra todos los usuarios del sistema</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="admin">Administradores</option>
                            <option value="doctor">Doctores</option>
                            <option value="patient">Pacientes</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">Total Usuarios</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{users.length}</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-purple-800">Administradores</div>
                    <div className="text-2xl font-bold text-purple-900 mt-1">
                        {users.filter(u => getUserType(u) === 'admin').length}
                    </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-800">Doctores</div>
                    <div className="text-2xl font-bold text-blue-900 mt-1">
                        {users.filter(u => getUserType(u) === 'doctor').length}
                    </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-800">Pacientes</div>
                    <div className="text-2xl font-bold text-green-900 mt-1">
                        {users.filter(u => getUserType(u) === 'patient').length}
                    </div>
                </div>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={filteredUsers}
                emptyMessage="No se encontraron usuarios"
            />

            {/* Edit User Modal */}
            {showEditModal && selectedUserId && (
                <EditUserModal
                    userId={selectedUserId}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedUserId(null);
                    }}
                    onSuccess={() => {
                        fetchUsers();
                    }}
                />
            )}
        </div>
    );
};

export default UsersManagement;
