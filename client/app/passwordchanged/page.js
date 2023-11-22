import React from "react";
import Padlock from "../assets/Padlock.png";
import Image from "next/image";

function passwordchanged() {
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
            src={Padlock}
            className="mx-auto mt-2 mb-4"
            alt="A lady reading some documents"
          />
          <div className="mb-10">
            <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
              Password Changed
            </h2>
            <p className="font-medium text-dark my-4">
              Your Password has been changed successfully.
            </p>
            <button className="bg-primary text-white px-auto py-3 w-3/5 rounded cursor-pointer my-2">
              Login to Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default passwordchanged;
