import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Context
import { AuthProvider } from './auth/context/authContext';

import Signup from './Components/SignUp/signup'; 
import SignupPaciente from './Components/Paciente/SignupPaciente';
import SignupEspecialista from './Components/Especialista/SignupEspecialista';
import VerificationCard from './Components/Verification/VerificationCard';
import Sucess from './Components/Success/Sucess';
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
          <Route path="/Dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}