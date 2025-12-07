import React, { useState } from "react";
import DoctorIdentity from "..//components/DoctorIdentity.jsx"
import AppointmentModal from "../../Citas/Modals/AppointmentModal.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Stethoscope, Star, Clock, CalendarCheck, ShieldCheck, Banknote } from "lucide-react";

const DoctorProfile = () => {
    const { state: doctor } = useLocation();
    // const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);


    // Validación inicial
    if (!doctor) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <p className="text-gray-500">No se encontró información del doctor.</p>
                <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Volver atrás</button>
            </div>
        );
    }

    // Extracción segura de datos con valores por defecto para diseño
    const firstName = doctor?.DP_user?.name || "Nombre";
    const lastName = doctor?.DP_user?.last_name || "";
    const fullName = `${firstName} ${lastName}`;
    const specialty =  "Medicina General";
    const city = doctor?.city || "Ubicación no disponible";
    const bio = doctor?.bio || `El Dr(a). ${lastName} es un especialista dedicado con amplia experiencia en el tratamiento de...`;
    const price = doctor?.price || 500; // Precio ejemplo si no viene en la data
    const rating = doctor?.rating || 4.8; // Rating ejemplo

    // Obtener iniciales para el avatar
    const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : "");


    return (
        <div className=" bg-blue-50/50">

            <AppointmentModal
                show={showModal}
                onClose={() => setShowModal(false)}
                doctor={doctor}
            />
            {/* Resultados de Doctores */}
            <div className="container mx-auto px-4 lg:py-12">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* --- HEADER CARD: Identidad Principal --- */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                        {/* Fondo decorativo sutil */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-main-gradient-30 blur-2xl z-0"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-end pt-4">
                            {/* Avatar */}
                            <div className="h-32 w-32 rounded-full border-4 border-white shadow-md bg-white flex items-center justify-center overflow-hidden shrink-0">
                                {doctor?.DP_user?.image ? (
                                        <img src={doctor.DP_user.image} alt={fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                                        {initials}
                                    </div>
                                )}
                            </div>
            
                            {/* Info Text */}
                            <div className="flex-1 pb-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                        <ShieldCheck size={12} /> Verificado
                                    </span>
                                    <span className="text-gray-400 text-sm">• {doctor?.experience || "5+ años de experiencia"}</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{fullName}</h1>
                                <p className="text-lg text-blue-600 font-medium flex items-center gap-2 mt-1">
                                    <Stethoscope size={20} />
                                    {specialty}
                                </p>
                                {doctor?.clinics?.map((clinic) => (
                                <div key={clinic.id} className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
                                    <span className="flex items-center gap-1"><MapPin size={16} /> {clinic.city}</span>
                                    <span className="flex items-center gap-1 text-yellow-500 font-bold"><Star size={16} fill="currentColor"/> {rating} (120 reseñas)</span>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* --- GRID LAYOUT: Contenido + Sidebar --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* COLUMNA IZQUIERDA: Información detallada */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Sección Sobre Mí */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Sobre el especialista</h3>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    {bio}
                                </p>
                            </div>

                            {/* Sección Servicios (Ejemplo estático visual) */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Servicios Destacados</h3>
                                <ul className="space-y-3">
                                    {['Consulta General', 'Seguimiento', 'Certificado Médico'].map((item, idx) => (
                                        <li key={idx} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                                            <span className="text-gray-700">{item}</span>
                                            <span className="font-semibold text-gray-900">${price} MXN</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: Tarjeta de Acción (Sticky) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 sticky top-5">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-gray-500 font-medium">Costo de consulta</span>
                                    <span className="text-2xl font-bold text-gray-900">${price}</span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {doctor?.clinics?.map((clinic) => (
                                    <div key={clinic.id} className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <MapPin className="mt-0.5 text-blue-500 shrink-0" size={18} />
                                        <div>
                                        <p className="font-bold text-gray-900">{clinic.name || "Consultorio Privado"}</p>
                                        <p>{clinic.city || "Ubicación no disponible"}, {clinic.address}</p>
                                        </div>
                                    </div>
                                    ))}
                                    <div className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <Clock className="mt-0.5 text-blue-500 shrink-0" size={18} />
                                        <div>
                                            <p className="font-bold text-gray-900">Horarios</p>
                                            <p>Lun - Vie: 9:00 AM - 6:00 PM</p>
                                        </div>
                                    </div>
                                </div>



                                <button
                                    onClick={() => setShowModal(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-blue-200 shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <CalendarCheck size={20} />
                                    Agendar Cita Ahora
                                </button>
                                
                                <p className="text-xs text-center text-gray-400 mt-4">
                                    <ShieldCheck size={12} className="inline mr-1" />
                                    Reserva segura a través de VitaLink
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;