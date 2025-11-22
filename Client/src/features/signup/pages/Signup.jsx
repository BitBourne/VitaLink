import React, { useState } from 'react';
import UserCard from '../components/UserCard'; 
import { useNavigate } from 'react-router-dom'; 

export default function Signup() {
    const [selectedType, setSelectedType] = useState(null);
    const navigate = useNavigate(); 

    const handleSelect = (type) => {
      setSelectedType(type);
      if (type === 'paciente') {
        navigate('/SignupPaciente'); 
      } else if (type === 'especialista') {
        navigate('/SignupEspecialista'); 
      }
    };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8"> 
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#4C575F] mb-6">
        Crea una cuenta gratuita
      </h2>

      <div className="mb-6">
        <p className="text-base sm:text-lg font-medium text-[#4C575F] mb-6 text-center">
          Tipo de Usuario
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <div className="w-full max-w-60 sm:w-auto">
            <UserCard
              userType="paciente"
              title="Soy Paciente"
              description="Comparte información básica antes de contactar con tu especialista."
              isSelected={selectedType === 'paciente'}
              onClick={() => handleSelect('paciente')}
            />
          </div>

          <div className="w-full max-w-60 sm:w-auto">
            <UserCard
              userType="especialista"
              title="Soy Especialista"
              description="Permite que los pacientes te conozcan, confíen en ti y reserven contigo."
              isSelected={selectedType === 'especialista'}
              onClick={() => handleSelect('especialista')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}