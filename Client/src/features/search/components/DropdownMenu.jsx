import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const DropdownMenu = ({ label, options, onSelect }) => { 
    const [isOpen, setIsOpen] = useState(false);
    const [localLabel, setLocalLabel] = useState(label);

    const handleSelect = (option) => {
        setLocalLabel(option.label); // Actualiza etiqueta visual
        setIsOpen(false); 
        
        // AVISAR AL CONTEXTO
        if(onSelect) {
            onSelect(option.value);
        }
    };
    
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative min-w-0 flex-1">
            <button
                onClick={toggleMenu}
                className="flex items-center justify-between bg-white text-gray-700 px-4 py-2 border border-gray-200 rounded-xl text-base font-normal hover:bg-gray-50 transition-colors whitespace-nowrap w-full shadow-sm"
            >
                <span className="truncate">
                    {localLabel} 
                </span>
                <ChevronDown className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {isOpen && options && options.length > 0 && (
                <div className="absolute z-10 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-3">
                    <div className="flex flex-col space-y-2">
                        {options.map((option) => (
                            <div 
                                key={option.value} 
                                onClick={() => handleSelect(option)} 
                                className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-700 text-sm"
                            >
                                <div className={`h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center ${localLabel === option.label ? 'border-[#B490CA]' : ''}`}>
                                     {localLabel === option.label && <div className="h-2 w-2 bg-[#B490CA] rounded-full"></div>}
                                </div>
                                <span>{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;