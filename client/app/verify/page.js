import React from "react";

import Image from "next/image";

function Verify() {
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
          <div>
            <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
              Verification Link Sent
            </h2>
            <p className="font-medium text-dark my-4">
              We've sent an email to your{" "}
              <span className="text-primary">jija@gmail.com</span> with a
              verification link.{" "}
            </p>
            <button className="bg-primary rounded-md px-auto py-3 w-4/5 text-white">
              Resend Verification Link
            </button>
            <div className="w-4/5 mx-auto flex justify-between mb-4 mt-2">
              <p className="text-dark text-sm">
                Link expires in <span className="text-primary">{"4:23"}</span>
              </p>
              <p className="text-dark text-sm">
                incorrect email address?&nbsp;
                <span className="text-primary">Change email address</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
