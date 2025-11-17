import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./core/auth/context/authProvider";

// Features
import Signup from "./features/signup/pages/Signup";
import SignupPaciente from "./features/signup/components/SignupPaciente";
import SignupEspecialista from "./features/signup/components/SignupEspecialista";
import VerificationCard from "./features/Verification/components/VerificationCard";
import Sucess from "./features/Success/pages/Sucess";
import Login from "./features/login/pages/Login";
import Dashboard from "./features/Dashboard/pages/Dashboard";

// Layout
import UserLayout from "./core/ui/Layout/UserLayout";

export default function App() {
  return (

    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirección al registro */}
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* Registro y autenticación */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/SignupPaciente" element={<SignupPaciente />} />
          <Route path="/SignupEspecialista" element={<SignupEspecialista />} />
          <Route path="/VerificationCard" element={<VerificationCard />} />
          <Route path="/Sucess" element={<Sucess />} />
          <Route path="/login" element={<Login />} />

          {/* Área del usuario doctor */}
          <Route path="/doctor" element={<UserLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

          {/* Página no encontrada */}
          <Route path="*" element={<h1>404: Página No Encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
