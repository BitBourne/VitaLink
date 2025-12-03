import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// axios
import apiClient from "../../../core/api/apiClient";


import SearchHeader from "../components/SearchHeader";
import FiltersBar from "../components/FiltersBar";
import DoctorCard from "../components/DoctorCard";


const SearchPage = () => {

    const [doctors, setDoctors] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
    const fetchDoctors = async () => {
        try {
          const res = await apiClient.get("/doctor");
          console.log(res.data);
          setDoctors(res.data); // Guardar todo el objeto del doctor
        } catch (error) {
          console.error(error);
        }
    };

    fetchDoctors();
    }, []);

    const handleNavigate = (doctor) => {
        navigate(`/infoDoctor/${doctor.id}`, { state: doctor });
    };



    return (
        <div className="min-h-screen bg-blue-50/50">

            {/* Barra de Búsqueda y Filtros */}
            <FiltersBar /> 

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