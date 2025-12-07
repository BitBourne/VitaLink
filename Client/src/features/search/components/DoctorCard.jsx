import React from "react";
import { Star, MapPin, Banknote, Clock, Stethoscope } from "lucide-react";

const DoctorCard = ({ doctor, onClick }) => {
    // 1. Extracción segura de datos
    const name = doctor?.DP_user?.name || "";
    const lastName = doctor?.DP_user?.last_name || "";
    const fullName = name && lastName ? `${name} ${lastName}` : "Doctor no disponible";
    
    // Si no hay especialidad, ponemos un fallback
    const specialty = doctor?.DP_specialties?.name || doctor?.specialty || "Medicina General";
    const rating = doctor?.average_rating?.rating || 0; // Asumimos 0 si no hay rating
    const reviewCount = doctor?.rating_count || 0; // Cantidad de reseñas
    
    // Datos opcionales que enriquecen la tarjeta (ajusta los nombres según tu backend)
    const price = doctor?.price; // Ej: 500
    const experience = doctor?.experience; // Ej: "10 años"
    const imageUrl = doctor?.DP_user?.image || doctor?.image; // URL de la foto

    // 2. Lógica para las iniciales
    // Tomamos la primera letra del nombre y la primera del apellido
    const getInitials = () => {
        const first = name ? name.charAt(0).toUpperCase() : "";
        const last = lastName ? lastName.charAt(0).toUpperCase() : "";
        return first + last || "DR";
    };

    // 3. Lógica para clínicas (Mostrar solo la principal + contador)
    const clinics = doctor?.clinics || [];
    const mainClinic = clinics.length > 0 ? clinics[0] : null;
    const moreClinicsCount = clinics.length - 1;

    return (
        <div 
            className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 p-5 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full"
            onClick={onClick}
        >
            <div>
                <div className="flex items-start space-x-4">
                    {/* --- AVATAR / IMAGEN --- */}
                    <div className="flex-shrink-0">
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={fullName} 
                                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-blue-100 transition-colors"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center shadow-inner">
                                <span className="text-white text-xl font-bold tracking-wider">
                                    {getInitials()}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* --- INFORMACIÓN PRINCIPAL --- */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                            {fullName}
                        </h3>
                        
                        <div className="flex items-center text-sm font-medium text-blue-500 mb-1">
                            <Stethoscope className="w-3.5 h-3.5 mr-1" />
                            <span className="truncate">{specialty}</span>
                        </div>
                        
                        {/* Rating y Experiencia */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                            <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-md">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="font-bold text-gray-700">{rating > 0 ? rating : "Nuevo"}</span> 
                                {reviewCount > 0 && <span className="text-gray-400 ml-1">({reviewCount})</span>}
                            </div>
                            
                            {experience && (
                                <div className="flex items-center text-gray-500">
                                    <Clock className="w-3.5 h-3.5 mr-1" />
                                    {experience} exp.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* --- SEPARADOR --- */}
                <hr className="my-4 border-gray-100 group-hover:border-gray-200" />

                {/* --- UBICACIÓN Y PRECIO --- */}
                <div className="space-y-2">
                    {/* Clínica Principal */}
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            {mainClinic ? (
                                <>
                                    <p className="font-semibold text-gray-700 line-clamp-1">{mainClinic.name}</p>
                                    <p className="text-xs text-gray-500 line-clamp-1">
                                        {mainClinic.city}, {mainClinic.state}
                                    </p>
                                    {/* Badge si hay más clínicas */}
                                    {moreClinicsCount > 0 && (
                                        <span className="inline-block mt-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                            +{moreClinicsCount} sucursales más
                                        </span>
                                    )}
                                </>
                            ) : (
                                <p className="text-gray-400 italic">Ubicación por confirmar</p>
                            )}
                        </div>
                    </div>

                    {/* Precio (Si existe) */}
                    {price && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600 pt-1">
                            <Banknote className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="font-medium text-green-700">
                                ${price} <span className="text-gray-400 font-normal text-xs">/ consulta</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Call to Action implícito al hover */}
            <div className="mt-4 pt-2 text-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver perfil completo →
            </div>
        </div>
    );
};

export default DoctorCard;