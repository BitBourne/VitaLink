import React from 'react';
import { ChevronRight } from 'lucide-react';

const AgendaItem = ({ time, duration, patient, type, status }) => {
    const statusClasses = status === 'Confirmada' 
        ? 'bg-blue-100 text-blue-700' 
        : 'bg-green-100 text-green-700'; 
    
    const typeLabel = type === 'Presencial' ? 'Presencial' : 'Telemedicina';
    
    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center flex-shrink-0">
                    <span className="text-lg font-bold text-gray-800">{time}</span>
                    <span className="text-xs text-gray-500">{duration} min</span>
                </div>
                
                <div className="min-w-0">
                    <p className="font-semibold text-gray-700">{patient}</p>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                        <span className="text-gray-500">{typeLabel}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusClasses}`}>
                            {status}
                        </span>
                    </div>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
    );
};

export default AgendaItem;