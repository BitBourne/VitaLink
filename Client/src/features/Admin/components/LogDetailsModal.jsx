import React from 'react';
import { X, Server, Globe, Code, FileJson } from 'lucide-react';

const LogDetailsModal = ({ log, onClose }) => {
    if (!log) return null;

    const details = log.details || {};
    const formattedDate = new Date(log.createdAt).toLocaleString('es-MX', {
        dateStyle: 'full',
        timeStyle: 'medium'
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Detalles de Auditoría</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            ID: <span className="font-mono text-gray-700">#{log.id}</span> • {formattedDate}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Main Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="flex items-center gap-2 mb-2 text-blue-700 font-medium">
                                <Globe className="w-4 h-4" />
                                <span>Origen</span>
                            </div>
                            <div className="space-y-1 text-sm">
                                <p><span className="text-gray-500">IP:</span> <span className="font-mono text-gray-900">{log.ip_address || 'N/A'}</span></p>
                                <p><span className="text-gray-500">User Agent:</span></p>
                                <p className="text-gray-900 text-xs bg-white p-2 rounded border border-blue-100 break-all">
                                    {log.user_agent || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                            <div className="flex items-center gap-2 mb-2 text-purple-700 font-medium">
                                <Server className="w-4 h-4" />
                                <span>Solicitud HTTP</span>
                            </div>
                            <div className="space-y-1 text-sm">
                                <p>
                                    <span className="text-gray-500">Método:</span>
                                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${details.method === 'GET' ? 'bg-green-100 text-green-700' :
                                        details.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                                            details.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                                                details.method === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {details.method || 'N/A'}
                                    </span>
                                </p>
                                <p><span className="text-gray-500">Ruta:</span> <span className="font-mono text-gray-900">{details.path || 'N/A'}</span></p>
                                <p>
                                    <span className="text-gray-500">Estado:</span>
                                    <span className={`ml-2 font-medium ${details.statusCode >= 200 && details.statusCode < 300 ? 'text-green-600' :
                                        details.statusCode >= 400 ? 'text-red-600' : 'text-gray-600'
                                        }`}>
                                        {details.statusCode || 'N/A'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Raw JSON Data */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                            <FileJson className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Datos Completos (JSON)</span>
                        </div>
                        <div className="bg-gray-900 p-4 overflow-x-auto">
                            <pre className="text-xs text-green-400 font-mono">
                                {JSON.stringify(log, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogDetailsModal;
