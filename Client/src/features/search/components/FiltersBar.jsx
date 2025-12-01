// search/components/FiltersBar.jsx (MODIFICADO para Responsivo)
import React from "react";
import { ChevronDown } from "lucide-react"; 
import SearchBar from "../../home/components/SearchBar"; 
import DropdownMenu from "./DropdownMenu"; 

// Componente para filtros simples (Disponibilidad)
const DropdownFilter = ({ label }) => (
    <div className="relative min-w-0">
        <button className="flex items-center justify-between bg-white text-gray-700 px-4 py-3 border border-gray-200 rounded-xl text-base font-normal hover:bg-gray-50 transition-colors whitespace-nowrap w-full shadow-sm">
            {label}
            <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
        </button>
    </div>
);

// Opciones solo para PRECIO (Tarifas)
const priceOptions = [
    { label: 'Precio: Alto - Bajo', value: 'price_desc' },
    { label: 'Precio: Bajo - Alto', value: 'price_asc' },
];

// Opciones solo para CALIFICACIÓN
const ratingOptions = [
    { label: 'Calificación: Alto - Bajo', value: 'rating_desc' },
    { label: 'Calificación: Bajo - Alto', value: 'rating_asc' },
];


const FiltersBar = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            
            {/* Contenedor FLEX PRINCIPAL: 
                - flex-col (Móvil: Apila verticalmente)
                - md:flex (Tablet/Desktop: Vuelve a ser horizontal)
                - md:space-x-4 (Aplica espacio horizontal solo en pantallas grandes)
                - space-y-4 (Aplica espacio vertical solo en pantallas pequeñas)
            */}
            <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 max-w-5xl mx-auto"> 

                {/* BLOQUE 1: SearchBar */}
                {/* w-full para que ocupe todo el ancho en móvil */}
                <div>
                    <SearchBar /> 
                </div>


                {/* BLOQUE 2: Dropdowns de Filtro */}
                {/* w-full para que ocupe todo el ancho en móvil, flex para alinear los 3 filtros */}
                <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200 flex items-center space-x-4 w-full md:w-auto md:flex-grow-0">
                    
                    {/* 1. FILTRO TARIFAS */}
                    <DropdownMenu 
                        label="Tarifas" 
                        options={priceOptions} 
                    />

                    {/* 2. FILTRO DISPONIBILIDAD */}
                    <DropdownFilter label="Disponibilidad" />
                    
                    {/* 3. FILTRO CALIFICACIÓN */}
                    <DropdownMenu 
                        label="Calificacion" 
                        options={ratingOptions} 
                    />
                </div>
                
            </div>
        </div>
    );
};

export default FiltersBar;