import React from "react";
import Header from "../../../core/ui/layout/Header";
import SuccessCard from "../components/SucessCard";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F9FAFB] to-[#E9F4F6]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <SuccessCard />
      </main>
    </div>
  );
}
