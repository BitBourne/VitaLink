import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./features/auth/context/authProvider";

// Layouts
import AuthLayout from "./features/auth/layout/AuthLayout";
import MainLayout from "./core/ui/Layout/MainLayout"; 
import UserLayout from "./core/ui/Layout/UserLayout";

// Auth Pages
import Login from "./features/auth/Pages/Login";
import Signup from "./features/auth/Pages/Signup";
import SignupVerification from "./features/auth/Pages/SignupVerification";
import ForgotPassword from "./features/auth/Pages/ForgotPassword";
import NewPassword from "./features/auth/Pages/New-Password";
import InvalidLink from "./features/auth/Pages/InvalidLink";
import PasswordUpdated from "./features/auth/Pages/PasswordUpdated";

// Other Pages
import Dashboard from "./features/Dashboard/pages/Dashboard";
import HomePage from "./features/home/pages/HomePage"; 
import SearchPage from "./features/search/pages/SearchPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/*  Rutas de Autenticación */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/verify-account" element={<SignupVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/invalid-link" element={<InvalidLink />} />
            <Route path="/password-updated" element={<PasswordUpdated />} />
          </Route>

          {/* Rutas Públicas con MainLayout  */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} /> {/* HomePage página principal */}
          </Route>

          {/* Rutas de Usuario (protegidas) */}
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/buscar" element={<SearchPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}