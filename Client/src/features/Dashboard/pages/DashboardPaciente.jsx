import React from 'react';
import SearchHeader from '../../search/components/SearchHeader'; 
import InfoCard from '../components/InfoCard'; 

const DashboardPaciente = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <SearchHeader /> 

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            
            <div className="lg:col-span-4 bg-white border border-gray-100 shadow-lg p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800">¡Hola, Nombre Paciente!</h2>
                <p className="text-gray-600 mt-1">Tienes 1 cita próxima y 2 recordatorios pendientes</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/*  Historial Médico */}
          <div className="lg:col-span-3 bg-white border border-gray-100 shadow-lg p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800">Historial Medico</h3>
            <p className="text-gray-600 mt-1 mb-4">Consulta tu historial médico</p>
            
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                {/*Contenido del historial médico*/}
            </div>
          </div>
          
          {/* Nueva Cita */}
          <div className="lg:col-span-1 space-y-6">
            <InfoCard 
                title="¡Hola, Miguel!" 
                subtitle="Tienes 1 cita próxima y 2 recordatorios pendientes" 
                buttonText="+ Nueva Cita" 
            />
            <InfoCard 
                title="¡Hola, Miguel!" 
                subtitle="Tienes 1 cita próxima y 2 recordatorios pendientes" 
                buttonText="+ Nueva Cita" 
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardPaciente;