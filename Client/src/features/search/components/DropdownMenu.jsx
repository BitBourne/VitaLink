import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const DropdownMenu = ({ label, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options && options.length > 0 ? options[0] : { label, value: '' }); 

    const handleSelect = (option) => {
        setSelectedValue(option);
        setIsOpen(false); 
    };
    
    const toggleMenu = () => setIsOpen(!isOpen);

    // etiqueta o valor seleccionado
    const currentLabel = selectedValue.label !== label ? selectedValue.label : label;

    return (
        <div className="relative min-w-0 flex-1">
            {/* Botón Principal */}
            <button
                onClick={toggleMenu}
                className="flex items-center justify-between bg-white text-gray-700 px-4 py-2 border border-gray-200 rounded-xl text-base font-normal hover:bg-gray-50 transition-colors whitespace-nowrap w-full shadow-sm"
            >
                <span className="truncate">
                    {currentLabel} 
                </span>
                <ChevronDown className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {/* Menú Desplegable */}
            {isOpen && options && options.length > 0 && (
                <div className="absolute z-10 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-3">
                    <div className="flex flex-col space-y-2">
                        {options.map((option) => (
                            <label 
                                key={option.value} 
                                className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-700 text-sm"
                            >
                                <input
                                    type="radio"
                                    name={label} 
                                    value={option.value}
                                    checked={selectedValue.value === option.value}
                                    onChange={() => handleSelect(option)}
                                    className="h-4 w-4 text-[#B490CA] border-gray-300 focus:ring-[#B490CA]"
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;