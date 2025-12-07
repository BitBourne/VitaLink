import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// axios
import apiClient from "../../../core/api/apiClient";


// Context
import useSearchDoctors from "../hooks/useSearchDoctors";


import FiltersBar from "../components/FiltersBar";
import DoctorCard from "../components/DoctorCard";


const SearchPage = () => {
    const navigate = useNavigate();
    const { doctors } = useSearchDoctors();

    const TarifasOptions = [
        { label: "Precio: Alto a Bajo", value: "DESC" },
        { label: "Precio: Bajo a Alto", value: "ACS" },
    ];
    const DisponibilidadOptions = [
        { label: "Hoy", value: "1" },
        { label: "3 dias", value: "3" },
        { label: "7 dias", value: "7" },
    ];
    const CalificacionOptions = [
        { label: "Calificacion: Alto a Bajo", value: "DESC" },
        { label: "Calificacion: Bajo a Alto", value: "ASC" },
    ];


    const handleNavigate = (doctor) => {
        navigate(`doctor/${doctor.id}`, { state: doctor });
    };

    return (
        <div className="min-h-screen">

            {/* Barra de Búsqueda y Filtros */}
            {/* <FiltersBar />  */}

            <div className="grid md:grid-cols-5 gap-5">
                <div className="md:col-span-3">
                    {/* <SearchBar/> */}
                </div>

                {/* <div className="md:col-span-2 md:flex gap-2 bg-white rounded-xl py-3 px-4 shadow-lg border border-gray-200 max-w-3xl items-center">
                    <DropdownMenu
                        label="Tarifas"
                        options={TarifasOptions}
                    />
                    <DropdownMenu
                        label="Disponibilidad"
                        options={DisponibilidadOptions}
                    />
                    <DropdownMenu
                        label="Calificacion"
                        options={CalificacionOptions}
                    />
                </div> */}
            </div>

            {/* Resultados de Doctores */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <DoctorCard 
                        key={doctor.id}
                        doctor={doctor}
                        onClick={() => handleNavigate(doctor)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;