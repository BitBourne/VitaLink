import React from "react";
import { Search, ChevronDown } from "lucide-react";

const FiltersBar = ({ setFilters }) => {
    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 pt-8">

            <div className="flex flex-col md:flex-row justify-center items-center gap-4">

                {/* BLOQUE DE BÚSQUEDA */}
                <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-200 flex items-center gap-3 w-full md:w-auto">

                    {/* Especialidad */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl w-60 bg-gray-50">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Especialidad"
                            className="flex-1 bg-transparent outline-none text-gray-700"
                            onChange={(e) => updateFilter("specialty", e.target.value)}
                        />
                    </div>

                    {/* Ciudad */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl w-60 bg-gray-50">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ciudad"
                            className="flex-1 bg-transparent outline-none text-gray-700"
                            onChange={(e) => updateFilter("city", e.target.value)}
                        />
                    </div>

                    {/* Botón */}
                    <button className="bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition">
                        Buscar
                    </button>
                </div>

                {/* BLOQUE DE FILTROS */}
                <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-200 flex items-center gap-3 w-full md:w-auto">

                    {/* Disponibilidad */}
                    <select
                        className="px-4 py-2.5 border border-gray-200 rounded-xl w-48 bg-gray-50 outline-none text-gray-700"
                        onChange={(e) => updateFilter("hasAvailability", e.target.value)}
                    >
                        <option value="">Disponibilidad</option>
                        <option value="true">Disponible</option>
                        <option value="false">No disponible</option>
                    </select>

                    {/* Calificación */}
                    <select
                        className="px-4 py-2.5 border border-gray-200 rounded-xl w-48 bg-gray-50 outline-none text-gray-700"
                        onChange={(e) => updateFilter("minRating", e.target.value)}
                    >
                        <option value="">Calificación</option>
                        <option value="5">5 estrellas</option>
                        <option value="4">4+ estrellas</option>
                        <option value="3">3+ estrellas</option>
                    </select>

                    {/* Ordenar */}
                    <select
                        className="px-4 py-2.5 border border-gray-200 rounded-xl w-48 bg-gray-50 outline-none text-gray-700"
                        onChange={(e) => updateFilter("sort", e.target.value)}
                    >
                        <option value="">Ordenar por</option>
                        <option value="name_asc">Nombre A → Z</option>
                        <option value="name_desc">Nombre Z → A</option>
                    </select>

                </div>

            </div>
        </div>
    );
};

export default FiltersBar;
