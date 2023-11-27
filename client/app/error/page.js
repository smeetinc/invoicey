import React from "react";

import Image from "next/image";

function errorPage() {
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
            src="/assets/error.png"
            width={242.33}
            height={180.57}
            className="mx-auto mt-2 mb-4"
            alt="Random Error Image"
          />
          <div>
            <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
              Unexpected Error
            </h2>
            <p className="font-medium text-dark my-4">
              An unexpected error occurred. Please try again later.
            </p>
            <a href="/overview">
              <button className="bg-primary rounded-md px-auto py-3 w-4/5 text-white mb-8">
                Go back
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default errorPage;
