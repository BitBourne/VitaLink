
import React, { useState } from 'react';
import UserCard from './UserCard'; 
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
    <div className="min-h-screen bg-white flex flex-col items-center">

      <header className="w-full max-w-6xl px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-transparent bg-clip-text">
          VitaLink
        </h1>

        <div className="flex items-center gap-4">
            <p className="text-sm text-[#4C575F] hidden sm:block">¿Ya tienes una cuenta?</p>
            <button
            type="button"
            onClick={() => navigate("/LogIn")}
            className="px-4 py-2 border border-indigo-300 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition">
                Inicia Sesión →
            </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
          <h2 className="text-3xl font-extrabold text-center text-[#4C575F] mb-8">
            Crea una cuenta gratuita
          </h2>

          <div className="mb-6">
            <p className="text-lg font-medium text-[#4C575F] mb-6 text-center">
              Tipo de Usuario
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <UserCard
                userType="paciente"
                title="Soy Paciente"
                description="Comparte información básica antes de contactar con tu especialista."
                isSelected={selectedType === 'paciente'}
                onClick={() => handleSelect('paciente')}
              />

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
      </main>
    </div>
  );
}