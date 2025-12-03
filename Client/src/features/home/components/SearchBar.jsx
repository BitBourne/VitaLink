import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 max-w-3xl flex items-center space-x-3">
      {/* Input Especialidad */}
      <div className="flex-1 flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-lg">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar una especialidad"
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>
      
      {/* Input Zona */}
      <div className="flex-1 flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-lg">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar una zona"
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>
      
      <button className="bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;