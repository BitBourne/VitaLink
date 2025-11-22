import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
 import { AuthProvider } from "./features/auth/context/authProvider";

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
import AuthLayout from "./features/auth/layout/AuthLayout";
import LoginCard from "./features/login/components/LoginCard";
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
          <Route path="/" element={<AuthLayout />}> {/** Indica el layout principal de la ruta */}
            <Route index element={<LoginCard />} /> {/* Carga de componente por defecto */}
            <Route path="signup" element={<Signup />}></Route>
            <Route path="SignupPaciente" element={< SignupPaciente/>}> </Route>
            <Route path="SignupEspecialista" element={< SignupEspecialista />}></Route>
            <Route path="VerificationCard" element={< VerificationCard />}></Route> 
            <Route path="Sucess" element={<Sucess />}></Route>
            <Route path="forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="new-password" element={< NewPassword/>}></Route>
            <Route path="invalid-link" element={< InvalidLink/>}></Route>
            <Route path="password-updated" element={< PasswordUpdated/>}></Route>
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
          {/* <Route path="*" element={<h1>404: Página No Encontrada</h1>} /> */}
        </Routes> 
      </Router>
     </AuthProvider>
  );
}
