import React, { useState, useEffect } from "react";
import apiClient from "../../../core/api/apiClient";
import { X, Calendar, Clock, MapPin, User, FileText, Info, Mail, Activity } from "lucide-react";

const AppointmentModal = ({ show, onClose, doctor, appointment }) => {
  // Estados del formulario
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  
  // Estados híbridos (Input ID vs Nombre Paciente)
  const [patientIdInput, setPatientIdInput] = useState(""); 
  const [patientEmail, setPatientEmail] = useState(""); // Nuevo para mostrar email
  const [status, setStatus] = useState(""); // Nuevo para el estado

  // Estados de feedback
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isEditing = Boolean(appointment && appointment.id);

  const times = [
    "09:00","09:30","10:00","10:30",
    "11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00"
  ];

  useEffect(() => {
    if (show && appointment) {
        // --- MODO VISUALIZACIÓN ---
        setDate(appointment.appointment_date || "");
        setTime(appointment.appointment_time || "");
        setReason(appointment.reason || "");
        setSelectedClinic(appointment.clinic_id || "");
        setStatus(appointment.status || "pending");

        // Lógica inteligente para el paciente
        if (appointment.A_patient) {
            // Si tenemos el objeto paciente, mostramos su nombre y correo
            const fullName = `${appointment.A_patient.name} ${appointment.A_patient.last_name}`.trim();
            setPatientIdInput(fullName); // En modo edición, esto muestra el nombre
            setPatientEmail(appointment.A_patient.email || "");
        } else {
            // Fallback si no viene el objeto
            setPatientIdInput(appointment.patient_id || "");
            setPatientEmail("");
        }

    } else {
        // --- MODO CREACIÓN ---
        setDate("");
        setTime("");
        setReason("");
        setSelectedClinic("");
        setPatientIdInput(""); // Aquí esperamos que el doctor escriba el ID
        setPatientEmail("");
        setStatus("");
    }
    setError("");
    setSuccess("");
  }, [show, appointment]);

  if (!show) return null;

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!selectedClinic || !date || !time || !reason || !patientIdInput) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      const payload = {
        clinic_id: parseInt(selectedClinic),
        appointment_date: date,
        appointment_time: time,
        reason,
        is_telemedicine: false,
        patient_id: parseInt(patientIdInput), // En creación, esto SÍ es un ID número
      };

      await apiClient.post("/appointments", payload);
      setSuccess("Cita creada correctamente");
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Ocurrió un error al procesar la cita.";
      setError(msg);
    }
  };

  // Clases dinámicas
  const inputClasses = isEditing 
    ? "w-full border-none rounded-lg p-2.5 bg-main-gradient-10 text-gray-700 font-medium cursor-not-allowed shadow-inner" 
    : "w-full border border-gray-200 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-[#B490CA] focus:border-[#B490CA] outline-none transition-all shadow-sm";

  // Helper para el badge de estado
  const getStatusBadge = (currentStatus) => {
    const statusColors = {
        pending: "bg-orange-100 text-orange-700 border-orange-200",
        confirmed: "bg-blue-100 text-blue-700 border-blue-200",
        completed: "bg-green-100 text-green-700 border-green-200",
        cancelled: "bg-red-100 text-red-700 border-red-200",
    };
    const labels = {
        pending: "Pendiente",
        confirmed: "Confirmada",
        completed: "Finalizada",
        cancelled: "Cancelada"
    };
    return (
        <span className={`text-xs font-bold px-2 py-1 rounded-full border uppercase tracking-wide ${statusColors[currentStatus] || "bg-gray-100 text-gray-600"}`}>
            {labels[currentStatus] || currentStatus}
        </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">

        {/* --- HEADER --- */}
        <div className="bg-main-gradient p-5 flex items-center justify-between shadow-md shrink-0">
            <div className="text-white">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        {isEditing ? <Info size={24} className="text-white/80"/> : <Calendar size={24} className="text-white/80"/>}
                        {isEditing ? "Detalle de la Cita" : "Nueva Cita"}
                    </h3>
                    {/* Badge de estado si es edición */}
                    {isEditing && (
                        <div className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold border border-white/30 backdrop-blur-sm">
                           {status === 'pending' ? 'Pendiente' : status === 'confirmed' ? 'Confirmada' : status}
                        </div>
                    )}
                </div>
                <p className="text-white/80 text-sm mt-1">
                    {isEditing ? "Visualizando información registrada." : "Ingresa los datos para agendar."}
                </p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all">
                <X size={24} />
            </button>
        </div>

        {/* --- CUERPO --- */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
            
            {error && <div className="mb-5 p-3 text-sm text-red-700 bg-red-50 border-l-4 border-red-500 rounded-r flex items-center gap-2">⚠️ {error}</div>}
            {success && <div className="mb-5 p-3 text-sm text-green-700 bg-green-50 border-l-4 border-green-500 rounded-r flex items-center gap-2">✅ {success}</div>}

            <div className="space-y-5">
                
                {/* SECCIÓN PACIENTE */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Información del Paciente</h4>
                    
                    {/* Nombre / ID */}
                    <div className="mb-3">
                        <label className="text-sm font-bold text-gray-500 mb-1.5 flex items-center gap-2">
                            <User size={16} className="text-[#B490CA]" /> 
                            {isEditing ? "Nombre del Paciente" : "ID del Paciente"}
                        </label>
                        <input
                            type={isEditing ? "text" : "number"} // Cambia el tipo según el modo
                            className={inputClasses}
                            placeholder={isEditing ? "" : "Ej: 15"}
                            value={patientIdInput}
                            onChange={(e) => setPatientIdInput(e.target.value)}
                            disabled={isEditing}
                        />
                    </div>

                    {/* Email (Solo visible en modo edición) */}
                    {isEditing && patientEmail && (
                        <div>
                            <label className="text-sm font-bold text-gray-500 mb-1.5 flex items-center gap-2">
                                <Mail size={16} className="text-[#B490CA]" /> Correo Electrónico
                            </label>
                            <input
                                type="text"
                                className={inputClasses}
                                value={patientEmail}
                                disabled={true}
                            />
                        </div>
                    )}
                </div>

                {/* SECCIÓN DETALLES */}
                <div>
                     {/* Estado (Solo visible en modo edición y si no está en el header) */}
                    {isEditing && (
                        <div className="mb-4 flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <span className="text-sm font-bold text-gray-500 flex items-center gap-2">
                                <Activity size={16} className="text-[#B490CA]" /> Estado Actual
                            </span>
                            {getStatusBadge(status)}
                        </div>
                    )}

                    {/* Sucursal */}
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-500 mb-1.5 flex items-center gap-2">
                            <MapPin size={16} className="text-[#B490CA]" /> Sucursal
                        </label>
                        <div className="relative">
                            <select
                                className={`${inputClasses} appearance-none`}
                                value={selectedClinic}
                                onChange={(e) => setSelectedClinic(e.target.value)}
                                disabled={isEditing}
                            >
                                <option value="">Selecciona una clínica</option>
                                {doctor?.clinics?.map((clinic) => (
                                <option key={clinic.id} value={clinic.id}>
                                    {clinic.name} {clinic.city ? `(${clinic.city})` : ''}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Fecha y Hora */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-sm font-bold text-gray-500 mb-1.5 flex items-center gap-2">
                                <Calendar size={16} className="text-[#B490CA]" /> Fecha
                            </label>
                            <input
                                type="date"
                                className={inputClasses}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                disabled={isEditing}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-500 mb-1.5 flex items-center gap-2">
                                <Clock size={16} className="text-[#B490CA]" /> Hora
                            </label>
                            <select
                                className={inputClasses}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                disabled={isEditing}
                            >
                                <option value="">--:--</option>
                                {times.map((t) => (
                                <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Motivo */}
                    <div>
                        <label className="text-sm font-bold text-gray-500 mb-1.5 flex items-center gap-2">
                            <FileText size={16} className="text-[#B490CA]" /> Motivo de consulta
                        </label>
                        <textarea
                            className={`${inputClasses} resize-none h-24`}
                            placeholder="Describe brevemente la razón..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            disabled={isEditing}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 shrink-0">
            {isEditing ? (
                <button
                    onClick={onClose}
                    className="w-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 font-bold py-3 rounded-xl transition-all shadow-sm"
                >
                    Cerrar
                </button>
            ) : (
                <button
                    onClick={handleSubmit}
                    className="w-full bg-main-gradient hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-lg shadow-[#B490CA]/40 transition-all transform active:scale-[0.98]"
                >
                    Agendar Cita
                </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default AppointmentModal;