import React from "react";
import Header from "../Layout/Header";
import LoginCard from "./LoginCard";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F9FAFB] to-[#E9F4F6]">
      <Header />

      {/* Contenido */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="flex items-center justify-center w-full h-[calc(100vh-5rem)]">
          <LoginCard />
        </div>
      </main>
    </div>
  );
}
