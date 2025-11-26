import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


// Components
import SignupRoleCard from '../components/SignupRoleCard';
import SignupFormPatient from '../components/SignupFormPatient';
import SignupFormEspecialist from '../components/SignupFormEspecialist';

export default function Signup() {


  const [showSelectionRole, setShowSelectionRole] = useState(true);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showEspecialistForm, setShowEspecialistForm] = useState(false);
  const [showReceptionistForm, setShowReceptionistForm] = useState(false);
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8"> 
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4C575F] mb-6">
        Crea una cuenta gratuita
      </h2>

      <div className={`${showSelectionRole ? 'block' : 'hidden'}`}>
        <p className="text-base sm:text-lg font-medium text-[#4C575F] mb-6">
          Selecciona un tipo de usuario
        </p>

        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6">
          <SignupRoleCard
            role={1}
            icon="User"
            title="Soy Paciente"
            description="Comparte información básica antes de contactar con tu especialista."
            value={showPatientForm}
            setValue={() => {
              setShowPatientForm(!showPatientForm)
              setShowSelectionRole(!showSelectionRole)
            }}
          />

          <SignupRoleCard
            role={2}
            icon="Plus"
            title="Soy Especialista"
            description="Permite que los pacientes te conozcan, confíen en ti y reserven contigo."
            value={showEspecialistForm}
            setValue={() => 
              {setShowEspecialistForm(!showEspecialistForm)
              setShowSelectionRole(!showSelectionRole)
            }}
          />

          <SignupRoleCard
            role={3}
            icon="Dock"
            title="Soy Recepcionista"
            description="Administra y gestiona las citas y dudas de los pacientes."
            value={showReceptionistForm}
            setValue={() => {
              setShowReceptionistForm(!showReceptionistForm)
              setShowSelectionRole(!showSelectionRole)
            }}
          />
        </div>
      </div>

      <div className={`${showPatientForm ? 'block' : 'hidden'}`}>
        <p className="text-sm font-medium text-[#4C575F] mb-4">
          Información Personal
        </p>
        <SignupFormPatient />
      </div>

      <div className={`${showEspecialistForm ? 'block' : 'hidden'}`}>
        <p className="text-sm font-medium text-[#4C575F] mb-4">
          Información Personal
        </p>
        <SignupFormEspecialist />        
      </div>

      <div className={`${showReceptionistForm ? 'block' : 'hidden'}`}>
        <p className="text-sm font-medium text-[#4C575F] mb-4">
          Información Personal
        </p>
        Formulario de Recepcionista
      </div>
      
    </div>
  );
}