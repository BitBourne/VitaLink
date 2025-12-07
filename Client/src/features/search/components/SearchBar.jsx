import React from "react";
import { Search } from "lucide-react";
import useSearchDoctors from "../hooks/useSearchDoctors"; // Importar hook
import Button from "../../../core/ui/Components/Button";

const SearchBar = () => {
  // Consumimos el contexto
  const { updateFilter, filters } = useSearchDoctors();

  // Manejadores de cambios
  const handleSpecialtyChange = (e) => updateFilter('searchQuery', e.target.value);
  const handleLocationChange = (e) => updateFilter('location', e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filtros actuales:", filters);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl py-3 px-4 shadow-lg border border-gray-200 max-w-3xl flex items-center space-x-3">
      
      {/* Input Especialidad */}
      <div className="flex-1 flex items-center space-x-3 p-2 border border-gray-200 rounded-lg focus-within:border-blue-500 transition-colors">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar especialidad o doctor"
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
          value={filters.searchQuery} // Controlled Input
          onChange={handleSpecialtyChange}
        />
      </div>
      
      {/* Input Zona */}
      <div className="flex-1 flex items-center space-x-3 p-2 border border-gray-200 rounded-lg focus-within:border-blue-500 transition-colors">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar ciudad"
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
          value={filters.location} // Controlled Input
          onChange={handleLocationChange}
        />
      </div>

      <Button
          text="Buscar"
          type="submit"
          variant="primary"
      />
    </form>
  );
};

export default SearchBar;