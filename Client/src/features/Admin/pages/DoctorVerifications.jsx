import React, { useState, useEffect } from "react";
import { FileText, Check, X, Eye, Download, Loader, AlertCircle } from "lucide-react";
import apiClient from "../../../core/api/apiClient";
import Table from "../../../core/ui/Components/Table";
import { useToast } from "../../../core/ui/Components/ToastProvider";

const DoctorVerifications = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showDocModal, setShowDocModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [viewingDoc, setViewingDoc] = useState(null);
    const [blobUrls, setBlobUrls] = useState([]);
    const toast = useToast();

    useEffect(() => {
        fetchPendingDoctors();
    }, []);

    // Cleanup blob URLs on unmount
    useEffect(() => {
        return () => {
            blobUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [blobUrls]);

    const fetchPendingDoctors = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/doctor');
            setDoctors(response.data || []);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            if (error.response?.status && error.response.status >= 400) {
                toast.error('Error al cargar doctores');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (doctorProfileId, doctorName) => {
        if (!confirm(`¿Aprobar verificación de Dr. ${doctorName}?`)) return;

        try {
            setActionLoading(true);
            await apiClient.post(`/doctor/credentials/verify/${doctorProfileId}`, {
                license_verified: true,
                cedula_verified: true,
                verification_notes: 'Verificado automáticamente por administrador'
            });
            toast.success(`Dr. ${doctorName} aprobado exitosamente`);
            fetchPendingDoctors();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al aprobar');
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async (doctorId, doctorName) => {
        const reason = prompt(`Motivo del rechazo para Dr. ${doctorName}:`);
        if (!reason) return;

        try {
            setActionLoading(true);
            await apiClient.post(`/doctor/credentials/reject/${doctorId}`, { verification_notes: reason });
            toast.success(`Dr. ${doctorName} rechazado`);
            fetchPendingDoctors();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Error al rechazar');
        } finally {
            setActionLoading(false);
        }
    };

    const handleRequestDocs = async (doctorProfileId, doctorName) => {
        const message = prompt(`Mensaje para solicitar documentos a Dr. ${doctorName}:`);
        if (!message) return;

        try {
            setActionLoading(true);
            await apiClient.post(`/doctor/credentials/request-documents/${doctorProfileId}`, { reason: message });
            toast.success('Solicitud enviada');
        } catch (error) {
            toast.error('Error al solicitar documentos');
        } finally {
            setActionLoading(false);
        }
    };

    const viewDocument = async (filename) => {
        try {
            const response = await apiClient.get(
                `/doctor/credentials/document/${filename}`,
                { responseType: 'blob' }
            );

            const blobUrl = URL.createObjectURL(response.data);
            setBlobUrls(prev => [...prev, blobUrl]);

            setViewingDoc({
                url: blobUrl,
                filename
            });
        } catch (error) {
            console.error('Error loading document:', error);
            toast.error('Error al cargar el documento');
        }
    };

    const closeDocumentViewer = () => {
        if (viewingDoc?.url) {
            URL.revokeObjectURL(viewingDoc.url);
            setBlobUrls(prev => prev.filter(u => u !== viewingDoc.url));
        }
        setViewingDoc(null);
    };

    const columns = [
        {
            header: 'Doctor',
            accessor: 'name',
            sortable: true,
            render: (row) => (
                <div>
                    <div className="font-medium text-gray-900">
                        {row.DP_user?.name} {row.DP_user?.last_name}
                    </div>
                    <div className="text-sm text-gray-500">{row.DP_user?.email}</div>
                </div>
            )
        },
        {
            header: 'Especialidad',
            accessor: 'specialty',
            render: (row) => row.DP_specialties?.[0]?.name || 'No especificada'
        },
        {
            header: 'Estado',
            accessor: 'verification_status',
            render: (row) => {
                const status = row.verification_status || 'pending';
                const statusMap = {
                    pending: { label: 'Pendiente', class: 'bg-yellow-100 text-yellow-800' },
                    under_review: { label: 'En Revisión', class: 'bg-blue-100 text-blue-800' },
                    verified: { label: 'Verificado', class: 'bg-green-100 text-green-800' },
                    rejected: { label: 'Rechazado', class: 'bg-red-100 text-red-800' }
                };
                const { label, class: className } = statusMap[status] || statusMap.pending;

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
                        {label}
                    </span>
                );
            }
        },
        {
            header: 'Documentos',
            accessor: 'documents',
            render: (row) => (
                <button
                    onClick={() => {
                        setSelectedDoctor(row);
                        setShowDocModal(true);
                    }}
                    className="text-[#B490CA] hover:text-[#9d7bb3] font-medium text-sm flex items-center gap-1 hover:underline cursor-pointer"
                >
                    <Eye className="w-4 h-4" />
                    Ver Documentos
                </button>
            )
        },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (row) => {
                const isPending = row.verification_status === 'pending' || row.verification_status === 'under_review';
                const isVerified = row.verification_status === 'verified';

                return (
                    <div className="flex items-center gap-2">
                        {isPending && (
                            <>
                                <button
                                    onClick={() => handleVerify(row.id, `${row.DP_user?.name} ${row.DP_user?.last_name}`)}
                                    disabled={actionLoading}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                    title="Aprobar"
                                >
                                    {actionLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={() => handleReject(row.id, `${row.DP_user?.name} ${row.DP_user?.last_name}`)}
                                    disabled={actionLoading}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                    title="Rechazar"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleRequestDocs(row.id, `${row.DP_user?.name} ${row.DP_user?.last_name}`)}
                                    disabled={actionLoading}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 text-xs cursor-pointer"
                                    title="Solicitar documentos"
                                >
                                    <AlertCircle className="w-5 h-5" />
                                </button>
                            </>
                        )}
                        {!isPending && !isVerified && <span className="text-sm text-gray-500">-</span>}
                        {isVerified && <span className="text-sm text-green-600 font-medium">✓ Verificado</span>}
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
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Verificación de Doctores</h2>
                <p className="text-gray-600 mt-1">Revisa y aprueba las solicitudes de verificación</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-yellow-800">Pendientes</div>
                    <div className="text-2xl font-bold text-yellow-900 mt-1">
                        {doctors.filter(d => d.verification_status === 'under_review' || d.verification_status === 'pending').length}
                    </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-800">Aprobados</div>
                    <div className="text-2xl font-bold text-green-900 mt-1">
                        {doctors.filter(d => d.verification_status === 'verified').length}
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-red-800">Rechazados</div>
                    <div className="text-2xl font-bold text-red-900 mt-1">
                        {doctors.filter(d => d.verification_status === 'rejected').length}
                    </div>
                </div>
            </div>

            <Table
                columns={columns}
                data={doctors}
                searchPlaceholder="Buscar por nombre o email..."
                emptyMessage="No hay doctores para verificar"
            />

            {/* Document Modal */}
            {showDocModal && selectedDoctor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && setShowDocModal(false)}>
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="text-xl font-bold text-gray-900">
                                Documentos - Dr. {selectedDoctor.DP_user?.name} {selectedDoctor.DP_user?.last_name}
                            </h3>
                            <button onClick={() => setShowDocModal(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Medical License */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Licencia Médica</p>
                                <p className="text-sm text-gray-600 mb-3">Número: {selectedDoctor.medical_license_number || 'No proporcionado'}</p>
                                {selectedDoctor.medical_license_document_url ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => viewDocument(selectedDoctor.medical_license_document_url.split('/').pop())}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#B490CA] text-white rounded-lg hover:opacity-90 cursor-pointer"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Ver Documento
                                        </button>
                                        <a
                                            href={`http://localhost:4000/api/doctor/credentials/document/${selectedDoctor.medical_license_document_url.split('/').pop()}`}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                        >
                                            <Download className="w-4 h-4" />
                                            Descargar
                                        </a>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Documento no cargado</p>
                                )}
                            </div>

                            {/* Cedula */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Cédula Profesional</p>
                                <p className="text-sm text-gray-600 mb-3">Número: {selectedDoctor.cedula_profesional || 'No proporcionado'}</p>
                                {selectedDoctor.cedula_document_url ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => viewDocument(selectedDoctor.cedula_document_url.split('/').pop())}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#B490CA] text-white rounded-lg hover:opacity-90 cursor-pointer"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Ver Documento
                                        </button>
                                        <a
                                            href={`http://localhost:4000/api/doctor/credentials/document/${selectedDoctor.cedula_document_url.split('/').pop()}`}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                        >
                                            <Download className="w-4 h-4" />
                                            Descargar
                                        </a>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Documento no cargado</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Document Viewer Modal */}
            {viewingDoc && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && closeDocumentViewer()}>
                    <div className="bg-white rounded-lg max-w-5xl w-full h-[90vh] flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900">{viewingDoc.filename}</h3>
                            <button onClick={closeDocumentViewer} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center">
                            {viewingDoc.filename.endsWith('.pdf') ? (
                                <iframe
                                    src={viewingDoc.url}
                                    className="w-full h-full"
                                    title="Document Viewer"
                                />
                            ) : (
                                <img
                                    src={viewingDoc.url}
                                    alt="Document"
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorVerifications;
