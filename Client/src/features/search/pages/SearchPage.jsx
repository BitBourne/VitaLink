import React from "react";
import { useNavigate } from "react-router-dom";

// Context
import useSearchDoctors from "../hooks/useSearchDoctors";
import SearchBar from "../components/SearchBar";

// Components
import DoctorCard from "../components/DoctorCard";
import DropdownMenu from "../components/DropdownMenu"

const SearchPage = () => {
    const navigate = useNavigate();
    
    // Obtenemos todo lo necesario del hook
    const { doctors, filterOptions, updateFilter } = useSearchDoctors();

    const handleNavigate = (doctor) => {
        navigate(`doctor/${doctor.id}`, { state: doctor });
    };

    return (
        <div className="min-h-screen">
            <div className="grid md:grid-cols-5 gap-5">
                <div className="md:col-span-3">
                    <SearchBar/>
                </div>

                <div className="md:col-span-2 md:flex gap-2 bg-white rounded-xl py-3 px-4 shadow-lg border border-gray-200 max-w-3xl items-center z-20 relative">
                    {/* Pasamos las opciones desde el contexto y conectamos el evento */}
                    <DropdownMenu
                        label="Tarifas"
                        options={filterOptions.rates}
                        onSelect={(value) => updateFilter('sortRate', value)}
                    />
                    <DropdownMenu
                        label="Disponibilidad"
                        options={filterOptions.availability}
                        onSelect={(value) => updateFilter('availability', value)}
                    />
                    <DropdownMenu
                        label="Calificación"
                        options={filterOptions.rating}
                        onSelect={(value) => updateFilter('sortRating', value)}
                    />
                </div>
            </div>

            {/* Resultados de Doctores */}
            <div className="max-w-7xl mx-auto px-6 py-10">
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
                    <div className="text-center text-gray-500 py-10">
                        <p className="text-xl">No se encontraron doctores con estos filtros.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;