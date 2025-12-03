import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./features/auth/context/authProvider";

// Features
import Dashboard from "./features/Dashboard/pages/Dashboard";

// Authentication Pages and Layout
import AuthLayout from "./features/auth/layout/AuthLayout";
import Login from "./features/auth/Pages/Login";
import Signup from "./features/auth/Pages/Signup";
import SignupVerification from "./features/auth/Pages/SignupVerification";


import UserLayout from "./core/ui/Layout/UserLayout";
import AppointmentPage from "./core/ui/Layout/appointmentpage";
import ForgotPassword from "./features/auth/Pages/ForgotPassword";
import NewPassword from "./features/auth/Pages/New-Password";
import InvalidLink from "./features/auth/Pages/InvalidLink";
import PasswordUpdated from "./features/auth/Pages/PasswordUpdated";


export default function App() {
  return (

     <AuthProvider>
      <Router>
        <Routes> {/* Crear un conjunto de rutas */}

          {/* Redirección al registro */}
          <Route path="/" element={<AuthLayout />} > {/** Indica el layout principal de la ruta */}
            <Route index element={<Login />} /> {/* Carga de componente por defecto */}
            <Route path="signup" element={<Signup />} />
            <Route path="signup/verify-account" element={<SignupVerification />} />

            <Route path="reset-password" element={<ForgotPassword/>} />
            <Route path="reset-password/:token" element={< NewPassword/>} />
            
            <Route path="invalid-link" element={< InvalidLink/>} />
            <Route path="password-updated" element={< PasswordUpdated/>} />
            <Route path="user" element={< UserLayout/>} />
            <Route path="/appointments/:id" element={<AppointmentPage />} />
          </Route>

          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Dashboard />} />
          </Route>




          <Route path="/" element={<Navigate to="/signup" replace />} />


          {/* Registro y autenticación */}
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/SignupPaciente" element={<SignupPaciente />} />
          <Route path="/SignupEspecialista" element={<SignupEspecialista />} />
          <Route path="/VerificationCard" element={<VerificationCard />} />
          <Route path="/Sucess" element={<Sucess />} />
          <Route path="/login" element={<Login />} />

          {/* Área del usuario doctor */}
          {/* <Route path="/doctor" element={<UserLayout />}> */}
            {/* <Route index element={<Dashboard />} /> */}
          {/* </Route>
 */}
          {/* Página no encontrada */}
          <Route path="*" element={<h1>404: Página No Encontrada</h1>} />
        </Routes>
      </Router>
     </AuthProvider>
  );
}
