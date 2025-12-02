import React from "react";
import { Star, MapPin } from "lucide-react";


const DoctorCard = ({ doctor }) => {

  const name = doctor?.name || "Dr. Cristian Dealmonte";
    const specialty = doctor?.specialty || "Doctor General";
    const rating = doctor?.rating || 4.5;
    const reviews = doctor?.reviews || 108;
    const address = doctor?.address || "Calle Jardín de San Jerónimo 150, San Jerónimo, Monterrey, Nuevo León, México. Monterrey 64640";
    const branch = doctor?.branch || "Sucursal 1";

    return (
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start space-x-4">

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold">UP</span>
                </div>
                
                {/* Información del Doctor */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                        {name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                        {specialty}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center text-xs text-gray-500">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-semibold mr-1">{rating}</span> 
                        <span>({reviews} opiniones)</span>
                    </div>
                </div>
            </div>
            
            {/* Ubicacion */}
            <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="leading-snug">{address}</p>
                    <p className="font-medium text-xs text-gray-500 mt-1">{branch}</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;