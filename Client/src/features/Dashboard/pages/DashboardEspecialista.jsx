import React from 'react';
import SearchHeader from '../../search/components/SearchHeader'; 
import InfoCard from '../components/InfoCard'; 
import AgendaItem from '../components/AgendaItem'; 

const mockAgenda = [
    { time: '09:00', duration: 30, patient: 'Ana García', type: 'Presencial', status: 'Confirmada' },
    { time: '10:30', duration: 55, patient: 'Carlos López', type: 'Telemedicina', status: 'Pendiente' },
    { time: '12:00', duration: 30, patient: 'María Rodríguez', type: 'Presencial', status: 'Confirmada' },
    { time: '15:30', duration: 40, patient: 'Juan Martínez', type: 'Telemedicina', status: 'Confirmada' },
];

const mockRecientes = [
    { name: 'Carlos López', lastVisit: 'hace 2 días' },
    { name: 'Carlos López', lastVisit: 'hace 2 días' },
    { name: 'Carlos López', lastVisit: 'hace 2 días' },
];


const DashboardEspecialista = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <SearchHeader /> 

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">

            <InfoCard 
                title="Citas Hoy" 
                subtitle="8 citas" 
                buttonText="Ver Más" 
                isPrimary={true} 
            />

            {[...Array(3)].map((_, i) => (
                <InfoCard 
                    key={i}
                    title="¡Hola, Miguel!" 
                    subtitle="Tienes 1 cita próxima y 2 recordatorios pendientes" 
                    buttonText="+ Nueva Cita" 
                />
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          <div className="lg:col-span-3 bg-white border border-gray-100 shadow-lg p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Agenda</h3>
            
            <div className="space-y-1">
                {mockAgenda.map((cita, index) => (
                    <AgendaItem key={index} {...cita} />
                ))}
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            
            {/* Pacientes Recientes */}
            <div className="bg-white border border-gray-100 shadow-lg p-5 rounded-xl">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Pacientes Recientes</h4>
                <div className="space-y-3">
                    {mockRecientes.map((p, i) => (
                        <div key={i} className="border-b border-gray-50 last:border-b-0 pb-2">
                            <p className="font-semibold text-gray-700">{p.name}</p>
                            <p className="text-xs text-gray-500">Última visita {p.lastVisit}</p>
                        </div>
                    ))}
                </div>
            </div>

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

export default DashboardEspecialista;