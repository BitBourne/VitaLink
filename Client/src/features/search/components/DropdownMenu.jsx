import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DropdownMenu = ({ label, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localLabel, setLocalLabel] = useState(label);
    
    // Referencia para cerrar al hacer click fuera (opcional pero recomendado)
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setLocalLabel(option.label);
        setIsOpen(false); 
        if(onSelect) onSelect(option.value);
    };
    
    return (
        <div className="relative w-full" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button" // Importante: evita que haga submit si está dentro de un form
                className="flex items-center justify-between bg-white md:bg-gray-50 text-gray-700 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors w-full shadow-sm"
            >
                <span className="truncate mr-2">
                    {localLabel} 
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {/* Menú Desplegable */}
            {isOpen && options && options.length > 0 && (
                // CAMBIOS: w-full para llenar el contenedor padre, z-50 para ponerse encima de las tarjetas de doctores
                <div className="absolute z-50 left-0 mt-1 w-full min-w-[200px] bg-white rounded-xl shadow-xl border border-gray-100 py-1 animation-fade-in">
                    <div className="max-h-60 overflow-y-auto"> {/* Scroll si hay muchas opciones */}
                        {options.map((option) => (
                            <div 
                                key={option.value} 
                                onClick={() => handleSelect(option)}
                                className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-700 text-sm transition-colors"
                            >
                                <div className={`h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 ${localLabel === option.label ? 'border-blue-500' : ''}`}>
                                     {localLabel === option.label && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                                </div>
                                <span className="truncate">{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;