import React from "react";
import Header from "../../../core/ui/layout/Header";
import CodeCard from "../pages/SignupVerification";
import SignupVerification from "../pages/SignupVerification";

export default function VerificationCard() {
  return (
    <div>
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <SignupVerification />
      </main>
    </div>
  );
}
