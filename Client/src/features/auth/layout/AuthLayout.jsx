import React from "react";
import Header from "../../../core/ui/layout/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-main-gradient-15">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="w-11/12 md:w-3/5 md:max-w-md md:mx-auto bg-white rounded-xl shadow-lg px-6 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;