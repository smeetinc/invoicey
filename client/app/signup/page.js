import Image from "next/image";
import React from "react";
import authImg from "../assets/authImg.png";

function signup() {
  return (
    <div className="w-full bg-green-400">
      <div className="flex mx-auto my-4">
        <div className="">
          <Image
            src={authImg}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div className="bg-white rounded-r-lg">
          <h3 className="font-manrope text-4xl">INVOICEY</h3>
          <h4>Sign up</h4>
          <p>Let's get you started</p>
        </div>
      </div>
    </div>
  );
}

export default signup;
