import React from "react";
import MainHeader from "./MainHeader";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;