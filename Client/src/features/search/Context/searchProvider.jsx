import React, { createContext, useState, useEffect, Children } from 'react';
import apiClient from '../../../core/api/apiClient';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);

    // Cargar todos los doctores desde la API
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
            const res = await apiClient.get("/doctor");
            setDoctors(res.data); // Guardar todo el objeto del doctor

            } catch (error) {
            console.error(error);
            }
        };
        fetchDoctors();
    }, []);


    const searchContextValue = {
        doctors
    }

    return (
        <SearchContext.Provider value={searchContextValue}>
            {children}
        </SearchContext.Provider>
    );
}; 

export { SearchProvider };
export default SearchContext;