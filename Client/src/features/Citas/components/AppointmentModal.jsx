// Puedes poner esto en un archivo separado: components/AppointmentModal.jsx
import React from 'react';
import { X, Calendar, Clock, User, FileText, Activity } from 'lucide-react'; // Asumiendo que usas lucide-react

const AppointmentModal = ({ isOpen, onClose, eventData }) => {
  if (!isOpen || !eventData) return null;

  // Accedemos a los datos originales que guardamos en extendedProps
  const data = eventData.extendedProps;
  
  // Formatear fecha para que se vea bonita (Ej: Viernes, 10 de Enero 2025)
  const fechaLegible = new Date(eventData.start).toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    // 1. Fondo oscurecido (Backdrop)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      {/* 2. Contenedor del Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Header con color dinámico según estatus (opcional) */}
        <div className="bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] p-6 text-white flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Detalles de la Cita
            </h2>
            <p className="opacity-90 mt-1 text-sm">ID Referencia: #{eventData.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 space-y-4 text-gray-700">
          
          {/* Motivo de la consulta */}
          <div className="flex items-start gap-3">
             <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <FileText size={20} />
             </div>
             <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Motivo</p>
                <p className="font-semibold text-lg text-gray-800">{eventData.title}</p>
             </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-3">
               <Calendar className="text-gray-400" size={18} />
               <div>
                 <p className="text-xs text-gray-500">Fecha</p>
                 <p className="font-medium text-sm capitalize">{fechaLegible}</p>
               </div>
             </div>
             <div className="flex items-center gap-3">
               <Clock className="text-gray-400" size={18} />
               <div>
                 <p className="text-xs text-gray-500">Hora</p>
                 <p className="font-medium text-sm">{data.appointment_time || 'Todo el día'}</p>
               </div>
             </div>
          </div>

          <hr className="border-gray-100" />

          {/* Datos del Paciente (Ejemplo) */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
             <User className="text-gray-400" size={20} />
             <div>
                <p className="text-xs text-gray-500 font-bold">Paciente</p>
                {/* Asegúrate que tu backend envíe estos campos, si no, usa 'Sin nombre' */}
                <p className="font-medium">{data.patient_name || 'Nombre no disponible'}</p>
                <p className="text-xs text-gray-400">{data.patient_email || ''}</p>
             </div>
          </div>

          {/* Estado de la cita */}
          <div className="flex justify-between items-center pt-2">
             <span className="text-sm text-gray-500">Estado actual:</span>
             <span className={`px-3 py-1 rounded-full text-xs font-bold border 
                ${data.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' : 
                  data.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200' : 
                  'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                {data.status || 'Pendiente'}
             </span>
          </div>

        </div>

        {/* Footer con acciones */}
        <div className="bg-gray-50 p-4 flex justify-end gap-3 border-t border-gray-100">
          <button 
             onClick={onClose}
             className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            Cerrar
          </button>
          <button 
             className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition"
             onClick={() => alert("Aquí iría la lógica para editar")}
          >
            Editar Cita
          </button>
        </div>

      </div>
    </div>
  );
};

export default AppointmentModal;