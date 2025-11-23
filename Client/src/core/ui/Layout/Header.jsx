import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-[#F9FAFB] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-transparent bg-clip-text select-none">
          VitaLink
        </h1>
      </div>
    </header>
  );
}
