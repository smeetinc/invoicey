import React from "react";
import Logo from "../assets/rafiki.png";
import Image from "next/image";

function resetmail() {
  return (
    <div className="w-full h-screen">
      <div className="bg-white h-16 py-2">
        <h1 className="text-dark text-4xl font-bold font-clashDisplay ml-8">
          INVOICEY
        </h1>
      </div>
      <div className="bg-primary h-full py-auto flex items-center">
        <div className="bg-accent my-auto mx-auto w-1/2 text-center rounded-2xl">
          <Image
            src="/assets/rafiki.png"
            width={242.33}
            height={180.57}
            className="mx-auto mt-2 mb-4"
            alt="A lady reading some documents"
          />
          <div className="mb-10">
            <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
              Reset Password Mail
            </h2>
            <p className="font-medium text-dark my-4">
              A link has been sent to your mail.
            </p>
            <small className="">Go back to Login page</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default resetmail;
