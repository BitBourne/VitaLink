import React from "react";
import Header from "../Layout/Header";
import CodeCard from "./SignupVerification";
import SignupVerification from "./SignupVerification";

export default function VerificationCard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F9FAFB] to-[#E9F4F6]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <SignupVerification />
      </main>
    </div>
  );
}
