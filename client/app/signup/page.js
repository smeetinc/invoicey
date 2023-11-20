import Image from "next/image";
import React from "react";
import authImg from "../assets/authImg.png";

function signup() {
  return (
    <div className="w-full bg-green-400 h-screen py-8">
      <div className="flex mx-auto mt-8 w-2/4 items-center">
        <div className="w-full h-100">
          <Image src={authImg} alt="Picture of the author" />
        </div>
        <div className="bg-white rounded-r-lg p-4 w-full h-fit">
          <h3>INVOICEY</h3>
          <h4 className="text-center">Sign up</h4>
          <p className="text-center">Let's get you started</p>

          <div>
            <form className="">
              <div>
                <label htmlFor="fullName">Full Name</label>
                <br />
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                  type="text"
                  placeholder="Olajide Jacob"
                  name="fullName"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="businessName">Business Name</label>
                <br />
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                  type="text"
                  placeholder="Olajide Jacob"
                  name="businessName"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="emailAddress">Email Address</label>
                <br />
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                  type="email"
                  placeholder="Olajide Jacob"
                  name="emailAddress"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                  type="password"
                  placeholder="Olajide Jacob"
                  name="password"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="conPassword">Confirm Password</label>
                <br />
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                  type="password"
                  placeholder="Olajide Jacob"
                  name="conPassword"
                />
              </div>
              <div className="mt-2">
                <button className="bg-green-900 text-white px-auto py-3 w-full rounded cursor-pointer">
                  Continue
                </button>
              </div>
            </form>
            <div className="text-center my-2">
              <small className="text-center">
                Already have an Account?{" "}
                <span className="text-green-800 font-bold">Sign in</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signup;
