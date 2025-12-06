import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Button from "../../../core/ui/Components/Button";
import FormInput from "../../../core/ui/Components/FormInput";

const SearchBar = () => {

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("hola")

    navigate('/search')
  }


  return (
    <form className="bg-white rounded-xl py-3 px-4 shadow-lg border border-gray-200 max-w-3xl flex items-center space-x-3">
      {/* Input Especialidad */}
      <div className="flex-1 flex items-center space-x-3 p-2 border border-gray-200 rounded-lg">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar una especialidad"
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>
      
      {/* Input Zona */}
      <div className="flex-1 flex items-center space-x-3 p-2 border border-gray-200 rounded-lg">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar una zona"
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>

      <Button
          text="Buscar"
          type="submit"
          variant="primary"
          onClick={handleSubmit}
      />
    </form>
  );
};

export default SearchBar;