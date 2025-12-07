import React, { useState } from "react";
import { Star, MapPin, Clock, Stethoscope } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor, onClick }) => {

    const name = doctor?.DP_user?.name || "Dr.";
    const lastName = doctor?.DP_user?.last_name || "*****";
    const fullName = `${name} ${lastName}`;
    const specialty = doctor?.DP_specialties?.name || "Doctor General";
    const experience = "5 años";
    const rating = doctor?.average_rating?.rating || 4.5;
    const clinics = doctor?.clinics ;

    const initials = name.charAt(0) + (lastName ? lastName.charAt(0) : "");

    return (
        <div
            className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 p-5 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full"
            onClick={onClick}
        >
            <div>
                <div className="flex items-start space-x-4">
                    
                    {/* AVATAR */}
                    <div className="flex-shrink-0">
                            {doctor?.DP_user?.image ? (
                            <img
                                src={doctor.DP_user.image}
                                alt={fullName}
                                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-blue-100 transition-colors"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center shadow-inner">
                                <div className="text-white text-xl font-bold tracking-wider">
                                    {initials}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Información */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                            {fullName}
                        </h3>

                        <div className="flex items-center text-sm font-medium text-blue-500 mb-1">
                            <Stethoscope className="w-3.5 h-3.5 mr-1" />
                            <span className="truncate">{specialty}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                            <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-md">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="font-bold text-gray-700">
                                    {rating > 0 ? rating : "Nuevo"}
                                </span>
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
            </div>

            {/* Ubicación */}
            <div className="mt-4 flex border-t border-gray-100 pt-3 text-sm text-gray-600">
                <div className="flex-1 pr-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 inline-block" />
                    <div className="inline-block ml-1">
                        {clinics.length > 0 ? (
                            clinics.map(clinic => (
                                <div key={clinic.id} className="text-sm text-gray-700 mb-2">
                                    <p><strong>{clinic.name}</strong></p>
                                    <p className="text-gray-500">
                                        {clinic.city}, {clinic.state}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">Sin ubicación registrada</p>
                        )}
                    </div>
                </div>

            </div>

            <div className="mt-4 pt-2 text-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver perfil completo →
            </div>
        </div>
    );
};

export default DoctorCard;
