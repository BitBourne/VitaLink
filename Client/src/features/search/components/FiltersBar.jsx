import React from "react";
import { ChevronDown } from "lucide-react"; 
import SearchBar from "../../home/components/SearchBar"; 
import DropdownMenu from "./DropdownMenu"; 

// filtros 
const DropdownFilter = ({ label }) => (
    <div className="relative min-w-0">
        <button className="flex items-center justify-between bg-white text-gray-700 px-4 py-3 border border-gray-200 rounded-xl text-base font-normal hover:bg-gray-50 transition-colors whitespace-nowrap w-full shadow-sm">
            {label}
            <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
        </button>
    </div>
);

// Tarifas
const priceOptions = [
    { label: 'Precio: Alto - Bajo', value: 'price_desc' },
    { label: 'Precio: Bajo - Alto', value: 'price_asc' },
];

//  CALIFICACIÓN
const ratingOptions = [
    { label: 'Calificación: Alto - Bajo', value: 'rating_desc' },
    { label: 'Calificación: Bajo - Alto', value: 'rating_asc' },
];


const FiltersBar = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            
            
            <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 max-w-5xl mx-auto"> 

               
                <div>
                    <SearchBar /> 
                </div>


               
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 max-w-3xl flex items-center space-x-3">
                    
                    {/* FILTRO TARIFAS */}
                    <DropdownMenu 
                        label="Tarifas" 
                        options={priceOptions} 
                    />

                    {/* FILTRO DISPONIBILIDAD */}
                    <DropdownFilter label="Disponibilidad" />
                    
                    {/* FILTRO CALIFICACIÓN */}
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