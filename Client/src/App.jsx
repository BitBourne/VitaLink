import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Context
import { AuthProvider } from './auth/context/authProvider';

import Signup from './Components/SignUp/signup'; 
import SignupPaciente from './Components/Paciente/SignupPaciente';
import SignupEspecialista from './Components/Especialista/SignupEspecialista';
import VerificationCard from './Components/Verification/VerificationCard';
import Sucess from './Components/Success/Sucess';
import Login from './Components/Login/Login';

// User
import UserLayout from './user/layouts/userLayout';
import Dashboard from './Components/Dashboard/Dashboard';


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/SignupPaciente" element={<SignupPaciente />} />
        <Route path="/SignupEspecialista" element={<SignupEspecialista />} />
        <Route path="/VerificationCard" element={<VerificationCard />} />
        <Route path="/Sucess" element={<Sucess />} />
        <Route path="/login" element={<Login />} />

        <Route path='/doctor' element={<UserLayout/>}>
          <Route index element={<Dashboard />} />
        </Route>

        {/* Ruta para capturar cualquier otra URL no definida */}
        <Route path="*" element={<h1>404: Página No Encontrada</h1>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}