import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./features/auth/context/authProvider";

// Features

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

// Layout para Home
import MainLayout from "./core/ui/Layout/MainLayout"; 

// import Features
import HomePage from "./features/home/pages/HomePage";
import SearchPage from "./features/search/pages/SearchPage";

// import Dashboards
import DashboardPaciente from "./features/Dashboard/pages/DashboardPaciente";
import DashboardEspecialista from "./features/Dashboard/pages/DashboardEspecialista";

export default function App() {
  return (

     <AuthProvider>
      <Router>
        <Routes> 
          {/* Index */}
           <Route element={<MainLayout />}> 
            <Route index element={<HomePage />} /> {/* Carga de componente por defecto */}
          </Route>

          <Route>
            {/* Buscar Doctor */}
            <Route path="/buscar" element={<SearchPage />} />
          </Route>
          
          <Route>
            {/* Dashboards */}
            <Route path="/dashboard/paciente" element={<DashboardPaciente />} />
             <Route path="/dashboard/especialista" element={<DashboardEspecialista />} />
          </Route>
         

          {/* Redirección al registro */}
          <Route path="/" element={<AuthLayout />} > {/** Indica el layout principal de la ruta */}
            <Route path="Login" element={<Login />} /> {/* Carga de componente por defecto */}
            <Route path="signup" element={<Signup />} />
            <Route path="signup/verify-account" element={<SignupVerification />} />

            <Route path="forgot-password" element={<ForgotPassword/>} />
            <Route path="new-password" element={< NewPassword/>} />
            <Route path="invalid-link" element={< InvalidLink/>} />
            <Route path="password-updated" element={< PasswordUpdated/>} />
            <Route path="user" element={< UserLayout/>} />
            <Route path="/appointments/:id" element={<AppointmentPage />} />
          </Route>




        {/*  <Route path="/" element={<Navigate to="/signup" replace />} />*/ } 


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
