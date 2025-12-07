import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();
 
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        
        {/* Ilustración / Icono */}
        <div className="relative flex justify-center mb-8">
          <div className="bg-blue-50 w-32 h-32 rounded-full flex items-center justify-center animate-pulse">
            <FileQuestion size={64} className="text-blue-600" />
          </div>
          {/* Pequeño elemento decorativo */}
          <div className="absolute top-0 right-1/3 bg-red-100 p-2 rounded-full rotate-12">
             <span className="text-2xl">?</span>
          </div>
        </div>

        {/* Texto Principal con Gradiente */}
        <h1 className="text-8xl font-black bg-main-gradient text-transparent bg-clip-text mb-2 select-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          ¡Ups! Página no encontrada
        </h2>

        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Parece que la página que buscas no existe, ha sido movida o quizás la dirección es incorrecta.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {/* Botón Regresar */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all hover:shadow-md w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={20} />
            Regresar
          </button>

          {/* Botón Ir al Inicio */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 w-full sm:w-auto justify-center"
          >
            <Home size={20} />
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;