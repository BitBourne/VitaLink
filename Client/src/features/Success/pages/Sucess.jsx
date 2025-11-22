import React from "react";
import Header from "../../../core/ui/layout/Header";
import SuccessCard from "../components/SucessCard";

export default function Success() {
  return (
    <div>
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <SuccessCard />
      </main>
    </div>
  );
}
