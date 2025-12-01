import React from "react";
import SearchBar from "../components/SearchBar";
import DoctorSVG from "../../../assets/doctor.svg";
import { Search, Calendar, Users, ShieldCheck, Clock } from "lucide-react";

const HomePage = () => {
  const features = [
    { 
      value: '24/7', 
      description: 'Disponible',
      color: 'text-blue-500',
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-100'
    },
    { 
      value: '+500', 
      description: 'Especialistas',
      color: 'text-green-500',
      icon: <Users className="w-6 h-6 text-green-500" />,
      bgColor: 'bg-green-100'
    },
    { 
      value: '100%', 
      description: 'Seguro',
      color: 'text-purple-500',
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      bgColor: 'bg-purple-100'
    },
    { 
      value: '5 min', 
      description: 'Reserva rápida',
      color: 'text-cyan-600',
      icon: <Clock className="w-6 h-6 text-cyan-600" />,
      bgColor: 'bg-cyan-100'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* == VERSION Movil == */}
      <div className="lg:hidden bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen py-8">
        {/* Header */}
        <header className="pb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-transparent bg-clip-text">
              VitaLink
            </h1>
          </div>
        </header>

        <div className="px-6">
          <div className="text-center mb-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Qué especialista buscas hoy?
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Reserva tu cita médica en segundos con nuestra plataforma inteligente.
              <br />
              Telemedicina, especialistas certificados y atención 24/7.
            </p>
          </div>

          {/* Barra de Búsqueda - Movil */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 max-w-md mx-auto mb-12">
            <div className="space-y-4">
              {/* Input - Movil */}
              <div className="flex items-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar un profesional"
                  className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
              </div>
              
              {/* Botón - Movil */}
              <button className="w-full bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Buscar Médico
              </button>
            </div>
          </div>

          <div className="border-t border-gray-300 my-8 max-w-md mx-auto"></div>

          {/* Cards - Movil */}
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-200"
                >
                  <div className={`text-2xl font-bold mb-1 ${feature.color}`}>
                    {feature.value}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* == VERSION  DESKTOP == */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-50 to-cyan-50 pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
            
            {/* búsqueda */}
            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                ¿Qué especialista buscas hoy?
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Reserva tu cita médica en segundos con nuestra plataforma inteligente.<br />
                Telemedicina, especialistas certificados y atención 24/7.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <SearchBar />
              </div>
            </div>

            {/* Img doctor  */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <img 
                src={DoctorSVG} 
                alt="Doctor" 
                className="w-full max-w-md"
              />
            </div>
          </div>

          {/* Cards - DESKTOP */}
          <div className="grid grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <div className={`text-lg font-bold mb-2 ${feature.color}`}>
                  {feature.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;