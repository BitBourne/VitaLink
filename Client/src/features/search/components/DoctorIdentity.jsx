import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Stethoscope, Star, Clock, CalendarCheck, ShieldCheck, Banknote } from "lucide-react";

const DoctorIdentity = () => {
  const { state: doctor } = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
  const specialty = doctor?.specialty || "Medicina General";
  const city = doctor?.city || "Ubicación no disponible";
  const bio = doctor?.bio || `El Dr(a). ${lastName} es un especialista dedicado con amplia experiencia en el tratamiento de...`;
  const price = doctor?.price || 500; // Precio ejemplo si no viene en la data
  const rating = doctor?.rating || 4.8; // Rating ejemplo

  // Obtener iniciales para el avatar
  const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : "");

  return (
      <div className="max-w-6xl mx-auto space-y-6">
        
        

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
                        <div className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <MapPin className="mt-0.5 text-blue-500 shrink-0" size={18} />
                            <div>
                                <p className="font-bold text-gray-900">Consultorio Privado</p>
                                <p>{city}, Calle Ejemplo #123</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <Clock className="mt-0.5 text-blue-500 shrink-0" size={18} />
                            <div>
                                <p className="font-bold text-gray-900">Horarios</p>
                                <p>Lun - Vie: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setOpen(true)}
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

        {/* --- MODAL --- */}
        <Modal show={open} onClose={() => setOpen(false)}>
            <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <CalendarCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Reservar Cita</h2>
                <p className="text-gray-500 mb-6">
                    Estás a punto de agendar con <span className="font-bold text-gray-800">{fullName}</span>.
                </p>
                {/* Aquí iría tu formulario real de booking */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm text-left">
                    <p>📅 <span className="font-semibold">Fecha:</span> Por definir</p>
                    <p>🕒 <span className="font-semibold">Hora:</span> Por definir</p>
                </div>
                <button 
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                    onClick={() => setOpen(false)}
                >
                    Confirmar Selección
                </button>
            </div>
        </Modal>

      </div>
  );
};

// Componente Modal Reutilizable (Simplificado para el ejemplo)
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden transform transition-all scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          ✕
        </button>
        <div className="p-6 md:p-8">
            {children}
        </div>
      </div>
    </div>
  );
};

export default DoctorIdentity;