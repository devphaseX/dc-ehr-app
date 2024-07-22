"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const VerifyUserAccount = () => {
  const [email] = useState("jameswilliams@gmail.com");
  return (
    <div className="w-full flex">
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <h3 className="font-bold text-[28px] leading-[37px] text-neutral-800">
            Verified Your Details
          </h3>
          <p className="text-lg text-neutral-500">
            We just sent you a magic link to verify your email address at{" "}
            <span className="font-semibold text-neutral-700 underline">
              {email}
            </span>
          </p>
        </div>
        <div className="space-y-4">
          <div
            className="w-full h-fit p-4 text-base text-white font-semibold
        rounded-[56px] bg-primary-500 text-center"
          >
            Check your email app
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUserAccount;
