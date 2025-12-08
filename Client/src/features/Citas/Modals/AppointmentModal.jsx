import React, { useState, useEffect } from "react";
import apiClient from "../../../core/api/apiClient";
import { X, Calendar, Clock, MapPin, User, FileText, Info } from "lucide-react";

const AppointmentModal = ({ show, onClose, doctor, appointment }) => {
  // Estados del formulario
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [patientIdInput, setPatientIdInput] = useState(""); 
  
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
        setDate(appointment.appointment_date || "");
        setTime(appointment.appointment_time || "");
        setReason(appointment.reason || "");
        setSelectedClinic(appointment.clinic_id || "");
        setPatientIdInput(appointment.patient_id || ""); 
    } else {
        setDate("");
        setTime("");
        setReason("");
        setSelectedClinic("");
        setPatientIdInput("");
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
        patient_id: parseInt(patientIdInput),
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

  // Clases dinámicas para inputs según si están habilitados o no
  const inputClasses = isEditing 
    ? "w-full border-none rounded-lg p-2.5 bg-main-gradient-10 text-gray-700 font-medium cursor-not-allowed shadow-inner" // Estilo bloqueado (con tu color)
    : "w-full border border-gray-200 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-[#B490CA] focus:border-[#B490CA] outline-none transition-all shadow-sm"; // Estilo editable

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      
      {/* Contenedor Principal con Borde Redondeado y Overflow Hidden para el Header */}
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">

        {/* --- HEADER CON GRADIENTE --- */}
        <div className="bg-main-gradient p-5 flex items-center justify-between shadow-md shrink-0">
            <div className="text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    {isEditing ? <Info size={24} className="text-white/80"/> : <Calendar size={24} className="text-white/80"/>}
                    {isEditing ? "Detalle de la Cita" : "Nueva Cita"}
                </h3>
                <p className="text-white/80 text-sm mt-1">
                    {isEditing ? "Visualizando información registrada." : "Ingresa los datos para agendar."}
                </p>
            </div>
            <button
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all"
            >
                <X size={24} />
            </button>
        </div>

        {/* --- CUERPO DEL MODAL (Scrollable) --- */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
            
            {/* Mensajes de Feedback */}
            {error && (
            <div className="mb-5 p-3 text-sm text-red-700 bg-red-50 border-l-4 border-red-500 rounded-r flex items-center gap-2">
                ⚠️ {error}
            </div>
            )}
            {success && (
            <div className="mb-5 p-3 text-sm text-green-700 bg-green-50 border-l-4 border-green-500 rounded-r flex items-center gap-2">
                ✅ {success}
            </div>
            )}

            <div className="space-y-5">
                
                {/* ID Paciente */}
                <div>
                    <label className="text-sm font-bold text-gray-500 mb-1.5 flex items-center gap-2">
                        <User size={16} className="text-[#B490CA]" /> ID Paciente
                    </label>
                    <input
                        type="number"
                        className={inputClasses}
                        placeholder="Ej: 15"
                        value={patientIdInput}
                        onChange={(e) => setPatientIdInput(e.target.value)}
                        disabled={isEditing}
                    />
                </div>

                {/* Selección de Clínica */}
                <div>
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
                        {/* Flechita custom si es editable */}
                        {!isEditing && (
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fecha y Hora (Grid) */}
                <div className="grid grid-cols-2 gap-4">
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
                        className={`${inputClasses} resize-none h-28`}
                        placeholder="Describe brevemente la razón..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        disabled={isEditing}
                    />
                </div>
                
            </div>
        </div>

        {/* --- FOOTER DE ACCIONES --- */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 shrink-0">
            {isEditing ? (
                // MODO SOLO LECTURA
                <button
                    onClick={onClose}
                    className="w-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 font-bold py-3 rounded-xl transition-all shadow-sm"
                >
                    Cerrar
                </button>
            ) : (
                // MODO CREACIÓN
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