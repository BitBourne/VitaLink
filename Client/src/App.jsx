import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./features/auth/context/authProvider";
import { SearchProvider } from "./features/search/Context/searchProvider";
import { ToastProvider } from "./core/ui/Components/ToastProvider";

// Features

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
import DashboardPatient from "./features/Dashboard/patient/pages/DashboardPatient";

// Admin imports
import AdminLayout from "./core/ui/Layout/AdminLayout";
import AdminLogin from "./features/auth/Pages/AdminLogin";
import AdminDashboard from "./features/Dashboard/pages/AdminDashboard";
import UsersManagement from "./features/Admin/pages/UsersManagement";
import DoctorVerifications from "./features/Admin/pages/DoctorVerifications";
import AppointmentsOverview from "./features/Admin/pages/AppointmentsOverview";
import AuditLogs from "./features/Admin/pages/AuditLogs";
import AdminSettings from "./features/Admin/pages/AdminSettings";
import RolesPermissions from "./features/Admin/pages/RolesPermissions";
import ClinicsManagement from "./features/Admin/pages/ClinicsManagement";
import SpecialtiesManagement from "./features/Admin/pages/SpecialtiesManagement";
import AdminProfile from "./features/Admin/pages/AdminProfile";

import PatientLayout from "./features/Dashboard/patient/layout/PatientLayout";


export default function App() {
  return (
    <ToastProvider>
      <Router>
        <AuthProvider>

        {/* <SearchProvider> */}
            <Routes> {/* Crear un conjunto de rutas */}
              <Route path="/" >
                <Route index element={<HomePage/>}/>
              </Route>
                
            <Route element={<PatientLayout />}>
              <Route path="/paciente" element={<DashboardPatient />} />
              
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


            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="verifications" element={<DoctorVerifications />} />
              <Route path="appointments" element={<AppointmentsOverview />} />
              <Route path="clinics" element={<ClinicsManagement />} />
              <Route path="specialties" element={<SpecialtiesManagement />} />
              <Route path="roles-permissions" element={<RolesPermissions />} />
              <Route path="audit-logs" element={<AuditLogs />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>


            {/* Página no encontrada */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          {/* </SearchProvider> */}
        </AuthProvider>
      </Router>
    </ToastProvider>
  );
}

