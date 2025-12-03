


import React from "react";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
        
const PersonalInformation = () => {
    const { state: doctor } = useLocation();

    const specialty = doctor?.DP_specialties?.name || "Doctor General";
    const rating = doctor?.average_rating?.rating || 4.5;
    const clinics = doctor?.clinics || "Sucursal 1";

    return (
    <div className="container mx-auto lg:py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        
        
       {/* Información Profesional */}
       <div className="bg-white shadow rounded-xl border-3 border-gray-200 ">
         <div className="px-6 py-4 border-b">
           <h2 className="text-lg font-semibold">Información Profecional</h2>
         </div>

         <div className="p-6 space-y-4">
           <div>
             <p className="text-sm text-gray-500"> <strong>Ubicacion:</strong></p>
             {clinics.length > 0 ? (
                        clinics.map(clinic => (
                        <div key={clinic.id} className="text-sm text-gray-700 mb-1">
                            <p><strong>{clinic.name}</strong></p>
                            <p className="text-gray-500">{clinic.address}</p>
                            <p className="text-gray-500">
                            {clinic.city}, {clinic.state}
                            </p>
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No hay clínicas registradas</p>
                    )}
           </div>
         </div>
       </div>
     </div>
    </div>
  );
};
        
export default PersonalInformation;