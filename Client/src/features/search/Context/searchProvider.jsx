import React, { createContext, useState, useEffect, useMemo } from 'react';
import apiClient from '../../../core/api/apiClient';

const SearchContext = createContext();

const FILTER_OPTIONS = {
    rates: [
        { label: "Precio: Alto a Bajo", value: "PRICE_DESC" },
        { label: "Precio: Bajo a Alto", value: "PRICE_ASC" },
    ],
    availability: [
        { label: "Hoy", value: "1" },
        { label: "3 días", value: "3" },
        { label: "7 días", value: "7" },
    ],
    rating: [
        { label: "Calificación: Alta a Baja", value: "RATING_DESC" },
        { label: "Calificación: Baja a Alta", value: "RATING_ASC" },
    ]
};

const SearchProvider = ({ children }) => {
    // Estado original (todos los doctores de la API)
    const [allDoctors, setAllDoctors] = useState([]);
    
    // Estado de filtros seleccionados
    const [filters, setFilters] = useState({
        searchQuery: '', // Para especialidad o nombre
        location: '',    // Para zona/ciudad
        sortRate: '',    // PRICE_ASC, PRICE_DESC
        sortRating: '',  // RATING_ASC, RATING_DESC
        availability: '' // 1, 3, 7
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await apiClient.get("/doctor");
                setAllDoctors(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, []);

    // actualizar filtros
    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Lógica de Filtrado y Ordenamiento 
    const doctors = useMemo(() => {
        let result = [...allDoctors];

        // Filtro por Buscador (Especialidad o Nombre)
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(doc => 
                doc.specialty?.toLowerCase().includes(query) ||
                doc.DP_user?.name?.toLowerCase().includes(query) || 
                doc.DP_user?.last_name?.toLowerCase().includes(query)
            );
        }

        // Filtro por Ubicación (Ciudad)
        if (filters.location) {
            const query = filters.location.toLowerCase();
            result = result.filter(doc => 
                doc.city?.toLowerCase().includes(query)
            );
        }

        // Ordenamiento por Precio
        if (filters.sortRate) {
            result.sort((a, b) => {
                const priceA = a.price || 0;
                const priceB = b.price || 0;
                return filters.sortRate === 'PRICE_ASC' ? priceA - priceB : priceB - priceA;
            });
        }

        // Ordenamiento por Rating
        if (filters.sortRating) {
            result.sort((a, b) => {
                const rateA = a.average_rating?.rating || 0;
                const rateB = b.average_rating?.rating || 0;
                return filters.sortRating === 'RATING_ASC' ? rateA - rateB : rateB - rateA;
            });
        }

        // Disponibilidad 


        
        return result;
    }, [allDoctors, filters]);


    const searchContextValue = {
        doctors,           // Lista ya filtrada
        filters,           // Estado actual de filtros
        updateFilter,      // Función para cambiar filtros
        filterOptions: FILTER_OPTIONS // Opciones para los dropdowns
    }

    return (
        <SearchContext.Provider value={searchContextValue}>
            {children}
        </SearchContext.Provider>
    );
}; 

export { SearchProvider };
export default SearchContext;