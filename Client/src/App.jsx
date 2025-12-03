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
import ForgotPassword from "./features/auth/Pages/ForgotPassword";
import NewPassword from "./features/auth/Pages/New-Password";
import InvalidLink from "./features/auth/Pages/InvalidLink";
import PasswordUpdated from "./features/auth/Pages/PasswordUpdated";
import AdminLogin from "./features/auth/Pages/AdminLogin";

import UserLayout from "./core/ui/Layout/UserLayout";
import AdminLayout from "./core/ui/Layout/AdminLayout";
import AdminDashboard from "./features/Dashboard/pages/AdminDashboard";

// Admin Pages
import DoctorVerifications from "./features/Admin/pages/DoctorVerifications";
import UsersManagement from "./features/Admin/pages/UsersManagement";
import AppointmentsOverview from "./features/Admin/pages/AppointmentsOverview";
import AuditLogs from "./features/Admin/pages/AuditLogs";
import AdminSettings from "./features/Admin/pages/AdminSettings";
import RolesPermissions from "./features/Admin/pages/RolesPermissions";
import ClinicsManagement from "./features/Admin/pages/ClinicsManagement";
import SpecialtiesManagement from "./features/Admin/pages/SpecialtiesManagement";
import AdminProfile from "./features/Admin/pages/AdminProfile";

// Appointments
import PatientAppointments from "./features/Citas/pages/PatientAppointments";
import DoctorSchedule from "./features/Citas/pages/DoctorSchedule";

// Toast
import ToastProvider from "./core/ui/Components/ToastProvider";


export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Redirección al registro */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="signup/verify-account" element={<SignupVerification />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="new-password" element={<NewPassword />} />
              <Route path="invalid-link" element={<InvalidLink />} />
              <Route path="password-updated" element={<PasswordUpdated />} />
            </Route>

            {/* Área del usuario doctor/paciente */}
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="appointments" element={<PatientAppointments />} />
              <Route path="schedule" element={<DoctorSchedule />} />
            </Route>

            {/* Admin Login (separate from regular login) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Área de Administración */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="verifications" element={<DoctorVerifications />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="clinics" element={<ClinicsManagement />} />
              <Route path="specialties" element={<SpecialtiesManagement />} />
              <Route path="appointments" element={<AppointmentsOverview />} />
              <Route path="audit-logs" element={<AuditLogs />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="roles-permissions" element={<RolesPermissions />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}
