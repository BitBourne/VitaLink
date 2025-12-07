import React from "react";
import { Star, MapPin } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import AppointmentModal from "../../Citas/Modals/AppointmentModal";

const DoctorCard = ({ doctor, onClick  }) => {

    const name = doctor?.DP_user?.name || "Dr.";
    const lastName = doctor?.DP_user?.last_name || "Dr.";
    const specialty = doctor?.DP_specialties?.name || "Doctor General";
    const rating = doctor?.average_rating?.rating || 4.5;
    const clinics = doctor?.clinics ;


    return (
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={onClick}>
            <div className="flex items-start space-x-4">

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold">UP</span>
                </div>
                
                {/* Información del Doctor */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                        {name} {lastName}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                        {specialty}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center text-xs text-gray-500">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-semibold mr-1">{rating}</span> 
                    </div>
                </div>
            </div>
            
            {/* Ubicacion */}
            <div className="mt-4 flex border-t border-gray-100 pt-3 text-sm text-gray-600">
                {/* Columna izquierda: clínicas */}
                <div className="flex-1 pr-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 inline-block" />
                    <div className="inline-block ml-1">
                    {clinics.length > 0 ? (
                        clinics.map(clinic => (
                        <div key={clinic.id} className="text-sm text-gray-700 mb-2">
                            <p><strong>{clinic.name}</strong></p>
                            <p className="text-gray-500">{clinic.city}, {clinic.state}</p>
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No hay clínicas registradas</p>
                    )}
                    </div>
                </div>

                {/* Columna derecha: contenido adicional */}
                <div className="flex items-center justify-end space-x-1">
                    <p>Agendar cita</p>
                    <FiArrowRight className="w-4 h-4 text-gray-700" />
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;