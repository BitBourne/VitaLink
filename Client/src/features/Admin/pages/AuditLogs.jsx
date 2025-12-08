import React, { useState, useEffect } from "react";
import { Shield, Filter, ChevronLeft, ChevronRight, Loader, Download, Search } from "lucide-react";
import apiClient from "../../../core/api/apiClient";
import Table from "../../../core/ui/Components/Table";
import { useToast } from "../../../core/ui/Components/ToastProvider";
import LogDetailsModal from "../components/LogDetailsModal";

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1
    });

    // Filters
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        action: 'all',
        user: '',
        ip: ''
    });

    // Debounce for text search
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [selectedLog, setSelectedLog] = useState(null);

    const toast = useToast();

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    useEffect(() => {
        fetchAuditLogs();
    }, [pagination.page, debouncedFilters]);

    const fetchAuditLogs = async () => {
        try {
            setLoading(true);
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                ...debouncedFilters
            };

            // Remove empty filters
            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === 'all') {
                    delete params[key];
                }
            });

            const response = await apiClient.get('/audit/logs', { params });

            const logsData = response.data.data || [];
            const processedLogs = logsData.map(log => {
                let details = log.details;
                if (typeof details === 'string') {
                    try {
                        details = JSON.parse(details);
                    } catch (e) {
                        console.error("Error parsing log details:", e);
                        details = {};
                    }
                }
                return { ...log, details };
            });

            setLogs(processedLogs);
            setPagination(prev => ({
                ...prev,
                total: response.data.meta.total,
                totalPages: response.data.meta.totalPages
            }));
        } catch (error) {
            console.error("Error fetching audit logs:", error);
            toast.error('Error al cargar logs de auditoría');
            setLogs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on filter change
    };

    const resetFilters = () => {
        setFilters({
            dateFrom: '',
            dateTo: '',
            action: 'all',
            user: '',
            ip: ''
        });
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page }));
        }
    };

    const handleExportCSV = () => {
        if (logs.length === 0) {
            toast.error('No hay datos para exportar');
            return;
        }

        const headers = ['ID', 'Fecha', 'Usuario', 'Email', 'Acción', 'Recurso', 'ID Recurso', 'IP', 'Detalles'];
        const csvContent = [
            headers.join(','),
            ...logs.map(log => {
                const date = new Date(log.createdAt).toLocaleString('es-MX');
                const details = log.details ? JSON.stringify(log.details).replace(/,/g, ';') : '';
                return [
                    log.id,
                    `"${date}"`,
                    `"${log.user}"`,
                    `"${log.userEmail || ''}"`,
                    `"${log.action}"`,
                    `"${log.resource_type || ''}"`,
                    `"${log.resource_id || ''}"`,
                    `"${log.ip_address || ''}"`,
                    `"${details}"`
                ].join(',');
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Common actions for filter dropdown
    const commonActions = [
        'user_login', 'user_logout', 'user_signup',
        'admin_update_user', 'admin_suspend_user', 'admin_activate_user', 'admin_delete_user',
        'create_appointment', 'cancel_appointment', 'complete_appointment',
        'admin_cancel_appointment', 'admin_reassign_appointment'
    ];

    const columns = [
        {
            header: 'Fecha/Hora',
            accessor: 'createdAt',
            render: (row) => {
                // Handle both camelCase and snake_case
                const dateValue = row.createdAt || row.created_at;
                const date = new Date(dateValue);
                
                // Check if date is valid
                if (!dateValue || isNaN(date.getTime())) {
                    return <div className="text-sm text-gray-400">Fecha no disponible</div>;
                }
                
                return (
                    <div className="text-sm">
                        <div className="font-medium text-gray-900">{date.toLocaleDateString('es-MX')}</div>
                        <div className="text-gray-500">{date.toLocaleTimeString('es-MX')}</div>
                    </div>
                );
            }
        },
        {
            header: 'Usuario',
            accessor: 'user',
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{row.user}</span>
                    <span className="text-xs text-gray-500">{row.userEmail}</span>
                </div>
            )
        },
        {
            header: 'Acción',
            accessor: 'action',
            render: (row) => (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                    {row.action}
                </span>
            )
        },
        {
            header: 'Recurso',
            accessor: 'resource',
            render: (row) => (
                <div className="text-sm text-gray-600">
                    {row.resource_type && (
                        <span className="font-medium">{row.resource_type} #{row.resource_id}</span>
                    )}
                </div>
            )
        },
        {
            header: 'IP',
            accessor: 'ip_address',
            render: (row) => (
                <span className="text-sm text-gray-500 font-mono">{row.ip_address || '-'}</span>
            )
        },
        {
            header: 'Detalles',
            accessor: 'details',
            render: (row) => (
                <button
                    onClick={() => setSelectedLog(row)}
                    className="text-sm text-[#B490CA] hover:text-[#9f7ab5] font-medium hover:underline"
                >
                    Ver todo
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Registros de Auditoría</h2>
                    <p className="text-gray-600 mt-1">Historial de actividades del sistema</p>
                </div>
                <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    <Download className="w-4 h-4" />
                    Exportar CSV
                </button>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">Auditoría Activa</p>
                    <p className="text-sm text-blue-700 mt-1">
                        Todas las acciones administrativas están siendo registradas para garantizar la seguridad del sistema.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">Filtros Avanzados</h3>
                    </div>
                    <button
                        onClick={resetFilters}
                        className="text-sm text-[#B490CA] hover:underline cursor-pointer"
                    >
                        Limpiar filtros
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Acción</label>
                        <select
                            value={filters.action}
                            onChange={(e) => handleFilterChange('action', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        >
                            <option value="all">Todas</option>
                            {commonActions.map((action, idx) => (
                                <option key={idx} value={action}>{action}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nombre o Email..."
                                value={filters.user}
                                onChange={(e) => handleFilterChange('user', e.target.value)}
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">IP</label>
                        <input
                            type="text"
                            placeholder="192.168.1.1"
                            value={filters.ip}
                            onChange={(e) => handleFilterChange('ip', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">Total Registros</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{pagination.total}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">Página Actual</div>
                    <div className="text-2xl font-bold text-blue-600 mt-1">{pagination.page} / {pagination.totalPages}</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">Registros por página</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{pagination.limit}</div>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
                    <Loader className="w-8 h-8 animate-spin text-[#B490CA]" />
                </div>
            ) : logs.length > 0 ? (
                <div className="space-y-4">
                    <Table
                        columns={columns}
                        data={logs}
                        emptyMessage="No hay registros que coincidan con los filtros"
                    />

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-sm text-gray-600">
                                Mostrando página {pagination.page} de {pagination.totalPages}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => goToPage(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-1">
                                    {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                                        let pageNum;
                                        if (pagination.totalPages <= 5) {
                                            pageNum = idx + 1;
                                        } else if (pagination.page <= 3) {
                                            pageNum = idx + 1;
                                        } else if (pagination.page >= pagination.totalPages - 2) {
                                            pageNum = pagination.totalPages - 4 + idx;
                                        } else {
                                            pageNum = pagination.page - 2 + idx;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => goToPage(pageNum)}
                                                className={`px-3 py-1 rounded-lg cursor-pointer ${pagination.page === pageNum
                                                    ? 'bg-[#B490CA] text-white'
                                                    : 'border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => goToPage(pagination.page + 1)}
                                    disabled={pagination.page === pagination.totalPages}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No hay registros de auditoría disponibles</p>
                    <p className="text-sm text-gray-500">
                        {filters.dateFrom || filters.dateTo || filters.action !== 'all' || filters.user || filters.ip
                            ? 'Intenta ajustar los filtros para ver más resultados.'
                            : 'Los registros aparecerán aquí una vez que haya actividad en el sistema.'}
                    </p>
                </div>
            )}

            {/* Modal */}
            {selectedLog && (
                <LogDetailsModal
                    log={selectedLog}
                    onClose={() => setSelectedLog(null)}
                />
            )}
        </div>
    );
};

export default AuditLogs;