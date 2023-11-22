import React from "react";
import Contract from "../assets/contract.png";
import Image from "next/image";

function complete() {
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
            src={Contract}
            className="mx-auto mt-2 mb-4"
            alt="A signed contract"
          />
          <div>
            <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
              Verification Complete
            </h2>
            <p className="font-medium text-dark my-4">
              Account verification complete. You will be redirected to a login
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default complete;
