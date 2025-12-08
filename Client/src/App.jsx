import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./features/auth/context/authProvider";
import { SearchProvider } from "./features/search/Context/searchProvider";

// Features
import Dashboard from "./features/Dashboard/pages/Dashboard";

import HomePage from "./features/home/pages/HomePage";
import NotFoundPage from "./core/ui/pages/NotFoundPage";

// Authentication Pages and Layout
import AuthLayout from "./features/auth/layout/AuthLayout";
import Login from "./features/auth/Pages/Login";
import Signup from "./features/auth/Pages/Signup";
import SignupVerification from "./features/auth/Pages/SignupVerification";

import ForgotPassword from "./features/auth/Pages/ForgotPassword";
import NewPassword from "./features/auth/Pages/New-Password";
import InvalidLink from "./features/auth/Pages/InvalidLink";
import PasswordUpdated from "./features/auth/Pages/PasswordUpdated";


// Search pages and layout
import SearchLayout from "./features/search/layout/SearchLayout";
import SearchPage from "./features/search/pages/SearchPage";
import DoctorProfile from "./features/search/pages/DoctorProfile";

// Dashboard Doctor
import DoctorLayout from "./features/Dashboard/doctor/layout/DoctorLayout";
import ProtectedRoute from "./features/Dashboard/doctor/components/ProtectedRoute";
import DoctorHome from "./features/Dashboard/doctor/pages/DoctorHome"; 
import DoctorAppointments from "./features/Dashboard/doctor/pages/DoctorAppointments";




export default function App() {
  return (

    <Router>
      <AuthProvider>

        {/* <SearchProvider> */}
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
                <Route path="doctor/:id" element={<DoctorProfile/>} />
              </Route>

              {/* <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}> */}
                <Route path="/doctor" element={<DoctorLayout />}>
                    {/* Redirigir /doctor a /doctor/dashboard */}
                    <Route index element={<DoctorHome />} /> 
                    <Route path="dashboard" element={<DoctorHome />} />
                    <Route path="appointments" element={<DoctorAppointments />} />
                    <Route path="availability" element={<div>Próximamente: Disponibilidad</div>} />
                    <Route path="profile" element={<div>Próximamente: Perfil</div>} />
                </Route>
              {/* </Route> */}


              {/* Página no encontrada */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

          {/* </SearchProvider> */}
        </AuthProvider>
      </Router>
  );
}
