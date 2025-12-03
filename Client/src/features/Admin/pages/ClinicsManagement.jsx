import React, { useState, useEffect } from "react";
import {
    Building2,
    Plus,
    Edit2,
    Trash2,
    MapPin,
    Phone,
    Users,
    Search,
    X,
    Check,
    AlertCircle
} from "lucide-react";
import {
    getAllClinics,
    createClinic,
    updateClinic,
    deleteClinic,
    assignDoctorToClinic,
    removeDoctorFromClinic,
    getDoctorClinics
} from "../../../core/api/services/clinicService";
import apiClient from "../../../core/api/apiClient";

const ClinicsManagement = () => {
    const [clinics, setClinics] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDoctorModal, setShowDoctorModal] = useState(false);
    const [editingClinic, setEditingClinic] = useState(null);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [alert, setAlert] = useState({ show: false, message: "", type: "" });

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        phone: ""
    });

    useEffect(() => {
        fetchClinics();
        fetchDoctors();
    }, []);

    const fetchClinics = async () => {
        try {
            setLoading(true);
            const data = await getAllClinics();
            console.log('Clinics data received:', data);
            setClinics(data || []);
        } catch (error) {
            console.error("Error fetching clinics:", error);
            showAlert("Error al cargar clínicas", "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await apiClient.get('/doctor');
            console.log('Doctors data received:', response.data);
            setDoctors(response.data || []);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const showAlert = (message, type = "success") => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: "", type: "" }), 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación
        if (!formData.name || !formData.address || !formData.city || !formData.state) {
            showAlert("Por favor completa todos los campos obligatorios", "error");
            return;
        }

        try {
            if (editingClinic) {
                await updateClinic(editingClinic.id, formData);
                showAlert("Clínica actualizada exitosamente");
            } else {
                await createClinic(formData);
                showAlert("Clínica creada exitosamente");
            }

            setShowModal(false);
            resetForm();
            fetchClinics();
        } catch (error) {
            console.error("Error saving clinic:", error);
            showAlert(error.response?.data?.message || "Error al guardar clínica", "error");
        }
    };

    const handleEdit = (clinic) => {
        setEditingClinic(clinic);
        setFormData({
            name: clinic.name,
            address: clinic.address,
            city: clinic.city,
            state: clinic.state,
            phone: clinic.phone || ""
        });
        setShowModal(true);
    };

    const handleDelete = async (clinicId) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta clínica?")) {
            return;
        }

        try {
            await deleteClinic(clinicId);
            showAlert("Clínica eliminada exitosamente");
            fetchClinics();
        } catch (error) {
            console.error("Error deleting clinic:", error);
            showAlert(error.response?.data?.message || "Error al eliminar clínica", "error");
        }
    };

    const handleAssignDoctor = async (doctorId) => {
        try {
            await assignDoctorToClinic(doctorId, selectedClinic.id);
            showAlert("Doctor asignado exitosamente");
            setShowDoctorModal(false);
            fetchClinics();
        } catch (error) {
            console.error("Error assigning doctor:", error);
            showAlert(error.response?.data?.message || "Error al asignar doctor", "error");
        }
    };

    const handleRemoveDoctor = async (doctorId) => {
        if (!window.confirm("¿Deseas remover este doctor de la clínica?")) {
            return;
        }

        try {
            await removeDoctorFromClinic(doctorId, selectedClinic.id);
            showAlert("Doctor removido exitosamente");
            fetchClinics();
        } catch (error) {
            console.error("Error removing doctor:", error);
            showAlert(error.response?.data?.message || "Error al remover doctor", "error");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            address: "",
            city: "",
            state: "",
            phone: ""
        });
        setEditingClinic(null);
    };

    const openDoctorModal = (clinic) => {
        setSelectedClinic(clinic);
        setShowDoctorModal(true);
    };

    const filteredClinics = clinics.filter(clinic =>
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getAssignedDoctors = (clinic) => {
        return doctors.filter(doctor =>
            doctor.clinics?.some(c => c.id === clinic.id)
        );
    };

    const getAvailableDoctors = () => {
        if (!selectedClinic) return [];
        const assignedDoctorIds = getAssignedDoctors(selectedClinic).map(d => d.id);
        return doctors.filter(d => !assignedDoctorIds.includes(d.id));
    };

    return (
        <div className="space-y-6">
            {/* Alert */}
            {alert.show && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${alert.type === "error"
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : "bg-green-50 text-green-800 border border-green-200"
                    }`}>
                    {alert.type === "error" ? (
                        <AlertCircle className="w-5 h-5" />
                    ) : (
                        <Check className="w-5 h-5" />
                    )}
                    <span className="font-medium">{alert.message}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de Clínicas</h2>
                    <p className="text-gray-600 mt-1">Administra las clínicas del sistema</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#B490CA] text-white rounded-lg hover:bg-[#9F7AB8] transition-colors cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Nueva Clínica
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Buscar clínicas por nombre, ciudad o estado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                />
            </div>

            {/* Clinics Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                </div>
            ) : filteredClinics.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No se encontraron clínicas</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClinics.map((clinic) => {
                        const assignedDoctors = getAssignedDoctors(clinic);

                        return (
                            <div key={clinic.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#B490CA]/10 rounded-lg">
                                            <Building2 className="w-6 h-6 text-[#B490CA]" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{clinic.name}</h3>
                                            <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${clinic.is_active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}>
                                                {clinic.is_active ? "Activa" : "Inactiva"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>{clinic.address}, {clinic.city}, {clinic.state}</span>
                                    </div>
                                    {clinic.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4 flex-shrink-0" />
                                            <span>{clinic.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Users className="w-4 h-4 flex-shrink-0" />
                                        <span>{assignedDoctors.length} {assignedDoctors.length === 1 ? 'doctor' : 'doctores'}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => openDoctorModal(clinic)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-[#5EE7DF]/10 text-[#5EE7DF] rounded-lg hover:bg-[#5EE7DF]/20 transition-colors cursor-pointer"
                                    >
                                        <Users className="w-4 h-4" />
                                        Doctores
                                    </button>
                                    <button
                                        onClick={() => handleEdit(clinic)}
                                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(clinic.id)}
                                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingClinic ? "Editar Clínica" : "Nueva Clínica"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Dirección <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ciudad <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Estado <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#B490CA] text-white rounded-lg hover:bg-[#9F7AB8] transition-colors cursor-pointer"
                                >
                                    {editingClinic ? "Actualizar" : "Crear"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Doctor Assignment Modal */}
            {showDoctorModal && selectedClinic && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">
                                Doctores - {selectedClinic.name}
                            </h3>
                            <button
                                onClick={() => setShowDoctorModal(false)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Assigned Doctors */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Doctores Asignados</h4>
                            {getAssignedDoctors(selectedClinic).length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No hay doctores asignados</p>
                            ) : (
                                <div className="space-y-2">
                                    {getAssignedDoctors(selectedClinic).map((doctor) => (
                                        <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {doctor.DP_user?.name} {doctor.DP_user?.last_name}
                                                </p>
                                                <p className="text-sm text-gray-600">{doctor.DP_user?.email}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveDoctor(doctor.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Available Doctors */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Asignar Doctor</h4>
                            {getAvailableDoctors().length === 0 ? (
                                <p className="text-sm text-gray-500 italic">Todos los doctores están asignados</p>
                            ) : (
                                <div className="space-y-2">
                                    {getAvailableDoctors().map((doctor) => (
                                        <div key={doctor.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {doctor.DP_user?.name} {doctor.DP_user?.last_name}
                                                </p>
                                                <p className="text-sm text-gray-600">{doctor.DP_user?.email}</p>
                                            </div>
                                            <button
                                                onClick={() => handleAssignDoctor(doctor.id)}
                                                className="px-3 py-1 bg-[#B490CA] text-white text-sm rounded-lg hover:bg-[#9F7AB8] transition-colors cursor-pointer"
                                            >
                                                Asignar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClinicsManagement;
