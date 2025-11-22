import React from "react";
import Header from "../../../core/ui/layout/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(60deg,#B490CA33,#5EE7DF33)]">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 sm:p-8 md:p-10 mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;