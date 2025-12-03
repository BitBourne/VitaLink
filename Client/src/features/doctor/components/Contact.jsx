import React from "react";
import { useLocation } from "react-router-dom";



const Disponibility = () => {
  const { state: doctor } = useLocation();
  const email = doctor?.DP_user?.email || "Nombre no disponible";

  return (
    <div className="container mx-auto lg:py-12">
      <div className="max-w-5xl mx-auto space-y-6">

          <div className="bg-white shadow rounded-xl border-3 border-gray-200">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold"> Contacto </h2>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium"> Email </span>
                <span className="text-gray-500">{email}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Disponibility;







