import React, { useState, useEffect } from "react";
import {
    Stethoscope,
    Plus,
    Edit2,
    Trash2,
    Search,
    X,
    Check,
    AlertCircle,
    Users
} from "lucide-react";
import {
    getAllSpecialties,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    assignDoctorToSpecialty,
    removeDoctorFromSpecialty
} from "../../../core/api/services/specialtyService";
import apiClient from "../../../core/api/apiClient";

const SpecialtiesManagement = () => {
    const [specialties, setSpecialties] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDoctorModal, setShowDoctorModal] = useState(false);
    const [editingSpecialty, setEditingSpecialty] = useState(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [alert, setAlert] = useState({ show: false, message: "", type: "" });

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        fetchSpecialties();
        fetchDoctors();
    }, []);

    const fetchSpecialties = async () => {
        try {
            setLoading(true);
            const data = await getAllSpecialties();
            setSpecialties(data || []);
        } catch (error) {
            console.error("Error fetching specialties:", error);
            showAlert("Error al cargar especialidades", "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await apiClient.get('/doctor');
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

        if (!formData.name) {
            showAlert("El nombre es obligatorio", "error");
            return;
        }

        try {
            if (editingSpecialty) {
                await updateSpecialty(editingSpecialty.id, formData);
                showAlert("Especialidad actualizada exitosamente");
            } else {
                await createSpecialty(formData);
                showAlert("Especialidad creada exitosamente");
            }

            setShowModal(false);
            resetForm();
            fetchSpecialties();
        } catch (error) {
            console.error("Error saving specialty:", error);
            showAlert(error.response?.data?.message || "Error al guardar especialidad", "error");
        }
    };

    const handleEdit = (specialty) => {
        setEditingSpecialty(specialty);
        setFormData({
            name: specialty.name,
            description: specialty.description || ""
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta especialidad?")) {
            return;
        }

        try {
            await deleteSpecialty(id);
            showAlert("Especialidad eliminada exitosamente");
            fetchSpecialties();
        } catch (error) {
            console.error("Error deleting specialty:", error);
            showAlert(error.response?.data?.message || "Error al eliminar especialidad", "error");
        }
    };

    const handleAssignDoctor = async (doctorId) => {
        try {
            await assignDoctorToSpecialty(doctorId, selectedSpecialty.id);
            showAlert("Doctor asignado exitosamente");
            fetchDoctors();
        } catch (error) {
            console.error("Error assigning doctor:", error);
            showAlert(error.response?.data?.message || "Error al asignar doctor", "error");
        }
    };

    const handleRemoveDoctor = async (doctorId) => {
        if (!window.confirm("¿Deseas remover al doctor de esta especialidad?")) {
            return;
        }

        try {
            await removeDoctorFromSpecialty(doctorId, selectedSpecialty.id);
            showAlert("Doctor removido exitosamente");
            fetchDoctors();
        } catch (error) {
            console.error("Error removing doctor:", error);
            showAlert(error.response?.data?.message || "Error al remover doctor", "error");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: ""
        });
        setEditingSpecialty(null);
    };

    const openDoctorModal = (specialty) => {
        setSelectedSpecialty(specialty);
        setShowDoctorModal(true);
    };

    const getAssignedDoctors = (specialty) => {
        return doctors.filter(doctor =>
            doctor.DP_specialties?.some(s => s.id === specialty.id)
        );
    };

    const getAvailableDoctors = () => {
        if (!selectedSpecialty) return [];
        const assignedDoctorIds = getAssignedDoctors(selectedSpecialty).map(d => d.id);
        return doctors.filter(d => !assignedDoctorIds.includes(d.id));
    };

    const filteredSpecialties = specialties.filter(specialty =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de Especialidades</h2>
                    <p className="text-gray-600 mt-1">Administra las especialidades médicas del sistema</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#B490CA] text-white rounded-lg hover:bg-[#9F7AB8] transition-colors cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Nueva Especialidad
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Buscar especialidades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                />
            </div>

            {/* Specialties Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                </div>
            ) : filteredSpecialties.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No se encontraron especialidades</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpecialties.map((specialty) => {
                        const assignedCount = getAssignedDoctors(specialty).length;

                        return (
                            <div key={specialty.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#B490CA]/10 rounded-lg">
                                            <Stethoscope className="w-6 h-6 text-[#B490CA]" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{specialty.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 h-10 overflow-hidden">
                                    {specialty.description || "Sin descripción"}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                    <Users className="w-4 h-4 flex-shrink-0" />
                                    <span>{assignedCount} {assignedCount === 1 ? 'doctor' : 'doctores'}</span>
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => openDoctorModal(specialty)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-[#5EE7DF]/10 text-[#5EE7DF] rounded-lg hover:bg-[#5EE7DF]/20 transition-colors cursor-pointer"
                                    >
                                        <Users className="w-4 h-4" />
                                        Doctores
                                    </button>
                                    <button
                                        onClick={() => handleEdit(specialty)}
                                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(specialty.id)}
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
                                {editingSpecialty ? "Editar Especialidad" : "Nueva Especialidad"}
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
                                    Descripción
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                    rows="3"
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
                                    {editingSpecialty ? "Actualizar" : "Crear"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Doctor Assignment Modal */}
            {showDoctorModal && selectedSpecialty && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">
                                Doctores - {selectedSpecialty.name}
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
                            {getAssignedDoctors(selectedSpecialty).length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No hay doctores asignados</p>
                            ) : (
                                <div className="space-y-2">
                                    {getAssignedDoctors(selectedSpecialty).map((doctor) => (
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
    )
};

export default SpecialtiesManagement;
