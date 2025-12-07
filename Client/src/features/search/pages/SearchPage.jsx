import React from "react";
import { useNavigate } from "react-router-dom";
import useSearchDoctors from "../hooks/useSearchDoctors";
import DoctorCard from "../components/DoctorCard";
import SearchBar from "../components/SearchBar";
import DropdownMenu from "../components/DropdownMenu";

const SearchPage = () => {
    const navigate = useNavigate();
    const { doctors, filterOptions, updateFilter } = useSearchDoctors();

    const handleNavigate = (doctor) => {
        navigate(`doctor/${doctor.id}`, { state: doctor });
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* --- ZONA DE FILTROS Y BÚSQUEDA --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
                
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                    
                    {/* 1. Barra de Búsqueda (Ocupa todo el ancho en móvil, 60% en desktop) */}
                    <div className="w-full lg:flex-1">
                        <SearchBar/>
                    </div>

                    {/* 2. Filtros (Dropdowns) */}
                    {/* En móvil: ancho completo, flex-wrap para que bajen si no caben */}
                    <div className="w-full lg:w-auto bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex flex-wrap gap-2 items-center justify-between lg:justify-start z-20">
                        <div className="flex-1 min-w-[140px]">
                             <DropdownMenu
                                label="Tarifas"
                                options={filterOptions.rates}
                                onSelect={(value) => updateFilter('sortRate', value)}
                            />
                        </div>
                        <div className="flex-1 min-w-[140px]">
                            <DropdownMenu
                                label="Disponibilidad"
                                options={filterOptions.availability}
                                onSelect={(value) => updateFilter('availability', value)}
                            />
                        </div>
                        <div className="flex-1 min-w-[140px]">
                             <DropdownMenu
                                label="Calificación"
                                options={filterOptions.rating}
                                onSelect={(value) => updateFilter('sortRating', value)}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* --- RESULTADOS --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
                {doctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor) => (
                            <DoctorCard 
                                key={doctor.id}
                                doctor={doctor}
                                onClick={() => handleNavigate(doctor)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No encontramos doctores con esos filtros.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;