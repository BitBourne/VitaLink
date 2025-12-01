import React from "react";
import SearchHeader from "../components/SearchHeader";
import FiltersBar from "../components/FiltersBar";
import DoctorCard from "../components/DoctorCard";

const mockDoctors = [
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4 }, { id: 5 }, { id: 6 },
    { id: 7 }, { id: 8 }, { id: 9 },
];

const SearchPage = () => {
    return (
        <div className="min-h-screen bg-blue-50/50">
            <SearchHeader /> 

            {/* Barra de Búsqueda y Filtros */}
            <FiltersBar /> 

            {/* Resultados de Doctores */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockDoctors.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;