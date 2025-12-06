import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import AppointmentModal from "../../Citas/Modals/AppointmentModal";

const DoctorIdentity = () => {
  const { state: doctor } = useLocation();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!doctor) return <p className="text-center pt-20">Cargando doctor...</p>;

  const name = doctor?.DP_user?.name || "Nombre no disponible";
  const specialty = doctor?.specialty || "Especialidad no disponible";

  return (
    <div className="container mx-auto lg:py-12">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white shadow rounded-xl border-3 border-gray-200 p-6 lg:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="h-32 w-32 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold">
              IMG
            </div>

            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-xl text-blue-600 font-medium mt-1">
                {specialty}
              </p>
              <AppointmentModal
                show={showModal}
                onClose={() => setShowModal(false)}
                doctor={doctor}
              />

              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Agendar Cita
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorIdentity;







const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Contenido del modal */}
        {children}
      </div>
    </div>
  );
};
