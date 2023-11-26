"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";

function login() {
  const [show, setShow] = useState(false);
  const handleSubmit = (e) => {
    e.preventDef;
  };
  return (
    <div className="w-full bg-accent h-screen p-6">
      <div className="flex mx-auto w-3/5 shadow-sm">
        <div className="w-full hidden lg:flex">
          <Image
            src="/assets/authImg.png"
            width={500}
            height={500}
            className="h-full w-full"
            alt="A lady reading some documents"
          />
        </div>
        <div className="bg-white rounded-lg lg:rounded-r-lg p-4 w-full">
          <h2 className="text-primary text-3xl font-clashDisplay leading-10 font-bold">
            INVOICEY
          </h2>
          <h4 className="text-center font-clashDisplay font-semibold leading-10 text-3xl mt-20">
            Login
          </h4>
          <p className="text-center font-medium leading-7">
            Login to continue using Invoicey
          </p>

          <div>
            <form className="">
              <div className="mt-2">
                <label htmlFor="emailAddress">Email Address</label>
                <br />
                <input
                  className="shadow border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-primary focus:shadow-outline my-1"
                  type="email"
                  placeholder="Olajide Jacob"
                  name="emailAddress"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="password">Password</label>
                <br />
                <div className="focus-within:border-2 border-primary flex justify-between shadow focus:border-2 active:border-2 active:border-primary rounded w-full py-2 px-3 text-dark leading-tight focus:border-primary focus:shadow-outline default:border-primary my-1">
                  <input
                    className="focus:outline-none"
                    type={show ? "text" : "password"}
                    name="password"
                  />
                  {show ? (
                    <FaRegEyeSlash
                      onClick={() => {
                        setShow(false);
                      }}
                    />
                  ) : (
                    <TbEyeSearch
                      onClick={() => {
                        setShow(true);
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="my-2">
                <button className="bg-primary text-white px-auto py-3 w-full rounded cursor-pointer my-2">
                  Continue
                </button>
              </div>
            </form>
            <div className="text-center my-2">
              <small className="text-center">
                Don't have an account?&nbsp;
                <a href="/signup">
                  <span className="text-primary font-bold cursor-pointer">
                    Sign up
                  </span>
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
