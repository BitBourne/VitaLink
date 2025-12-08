import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, Users, Shield, Database, Bell } from "lucide-react";
import apiClient from "../../../core/api/apiClient";

const AdminSettings = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/roles');
            setRoles(response.data || []);
        } catch (error) {
            console.error("Error fetching roles:", error);
            setRoles([]);
        } finally {
            setLoading(false);
        }
    };

    const settingsSections = [
        {
            title: 'Gestión de Roles',
            icon: Shield,
            description: 'Configura roles y permisos del sistema',
            settings: [
                { label: 'Roles Disponibles', value: roles.length.toString() }
            ]
        },
        {
            title: 'Sistema',
            icon: Database,
            description: 'Configuración general del sistema',
            settings: [
                { label: 'Versión', value: 'v1.0.0' },
                { label: 'Ambiente', value: 'Desarrollo' }
            ]
        },
        {
            title: 'Notificaciones',
            icon: Bell,
            description: 'Configuración de notificaciones',
            settings: [
                { label: 'Email Notificaciones', value: 'Activo' },
                { label: 'Notificaciones Push', value: 'Desactivado' }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h2>
                <p className="text-gray-600 mt-1">Administra la configuración general de VitaLink</p>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {settingsSections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <section.icon className="w-6 h-6 text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                            </div>
                        </div>
                        <div className="space-y-3 mt-4">
                            {section.settings.map((setting, settingIdx) => (
                                <div key={settingIdx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                    <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                                    <span className="text-sm text-gray-900 font-semibold">{setting.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Roles List */}
            {!loading && roles.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Roles del Sistema</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {roles.map((role) => (
                            <div key={role.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="w-5 h-5 text-[#B490CA]" />
                                    <span className="font-semibold text-gray-900">{role.name}</span>
                                </div>
                                <p className="text-sm text-gray-600">{role.description || 'Sin descripción'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* System Info */}
            <div className="bg-gradient-to-br from-[#B490CA]/10 to-[#5EE7DF]/10 rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Información del Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Backend URL:</span>
                        <span className="ml-2 font-mono text-gray-900">http://localhost:4000</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Base de Datos:</span>
                        <span className="ml-2 font-semibold text-gray-900">MySQL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
