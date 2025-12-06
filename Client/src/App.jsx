import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./features/auth/context/authProvider";

// Features
import Dashboard from "./features/Dashboard/pages/Dashboard";

import HomePage from "./features/home/pages/HomePage";

// Authentication Pages and Layout
import AuthLayout from "./features/auth/layout/AuthLayout";
import Login from "./features/auth/Pages/Login";
import Signup from "./features/auth/Pages/Signup";
import SignupVerification from "./features/auth/Pages/SignupVerification";

// Search pages and layout
import SearchLayout from "./features/search/layout/SearchLayout";
import SearchPage from "./features/search/pages/SearchPage";



import UserLayout from "./core/ui/Layout/UserLayout";
import AppointmentPage from "./core/ui/Layout/appointmentpage";
import ForgotPassword from "./features/auth/Pages/ForgotPassword";
import NewPassword from "./features/auth/Pages/New-Password";
import InvalidLink from "./features/auth/Pages/InvalidLink";
import PasswordUpdated from "./features/auth/Pages/PasswordUpdated";


import DoctorProfile from "./features/doctor/page/DoctorProfile";




export default function App() {
  return (

    <Router>
      <AuthProvider>

        <Routes> {/* Crear un conjunto de rutas */}
          <Route path="/" >
            <Route index element={<HomePage/>}/>
          </Route>
            

          {/* Redirección al registro */}
          <Route path="/auth" element={<AuthLayout />} > {/** Indica el layout principal de la ruta */}
            <Route index element={<Login />} /> {/* Carga de componente por defecto */}
            <Route path="signup" element={<Signup />} />
            <Route path="signup/verify-account" element={<SignupVerification />} />

            <Route path="forgot-password" element={<ForgotPassword/>} />
            <Route path="forgot-password/:token" element={< NewPassword/>} />
            <Route path="invalid-link" element={< InvalidLink/>} />
            <Route path="password-updated" element={< PasswordUpdated/>} />
          </Route>

          <Route path="/search" element={<SearchLayout/>}>
            <Route index element={<SearchPage/>} />
            <Route path="doctor/:id" element={<SearchPage/>} />

          </Route>


            {/* Página no encontrada */}
          <Route path="*" element={<UserLayout />}>
            <Route index element={<h1>404: Página No Encontrada</h1>} />
          </Route>
        </Routes>

        </AuthProvider>
      </Router>
  );
}
