import React from "react";
import { Search } from "lucide-react";
import useSearchDoctors from "../hooks/useSearchDoctors"; 
import Button from "../../../core/ui/Components/Button";

const SearchBar = () => {
  const { updateFilter, filters } = useSearchDoctors();

  const handleSpecialtyChange = (e) => updateFilter('searchQuery', e.target.value);
  const handleLocationChange = (e) => updateFilter('location', e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    // CAMBIO: flex-col en móvil, md:flex-row en escritorio
    <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 w-full flex flex-col md:flex-row gap-3"
    >
      
      {/* Input Especialidad */}
      <div className="flex-1 flex items-center space-x-3 p-2 border border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all bg-gray-50 md:bg-white">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="¿Qué especialista buscas?"
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 w-full min-w-0" // min-w-0 evita desbordes
          value={filters.searchQuery}
          onChange={handleSpecialtyChange}
        />
      </div>
      
      {/* Input Zona */}
      <div className="flex-1 flex items-center space-x-3 p-2 border border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all bg-gray-50 md:bg-white">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="¿En qué ciudad?"
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 w-full min-w-0"
          value={filters.location}
          onChange={handleLocationChange}
        />
      </div>

      {/* Botón: Ancho completo en móvil, auto en escritorio */}
      <div className="w-full md:w-auto">
          <Button
              text="Buscar"
              type="submit"
              variant="primary"
              className="w-full justify-center" // Asegura que el botón llene el espacio en móvil
          />
      </div>
    </form>
  );
};

export default SearchBar;