"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";

import { FaRegEyeSlash } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";

function forgotpassword() {
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const email = emailAddress.trim();

    const formData = {
      email: email,
    };

    const jsonData = JSON.stringify(formData);

    try {
      console.log("Sending POST request...");
      const response = await axios.post(
        "https://olatidejosepha.pythonanywhere.com/api/users/password-reset/",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response.data);

      // window.location.href = "/resetmail"; // Redirect to a success page or handle accordingly
    } catch (error) {
      console.log("Error posting data:", error);
      if (error.response) {
        // The request was made and the server responded with a status code

        console.log("Response data:", error.response.data);

        console.log("Status code:", error.response.status);
        console.log("Headers:", error.response.headers);
        setMessage(error.response.data.message);
      } else if (axios.isCancel(error)) {
        // Handle canceled request
        console.log("Request canceled", error.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
        //redirect to error page
        window.location.href = "/error";
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full bg-accent h-screen p-6">
      <div className="flex mx-auto w-3/5 shadow-sm">
        <div className="w-full hidden lg:flex">
          <Image
            src="/assets/authImg.png"
            width={242.33}
            height={180.57}
            className="h-full w-full"
            alt="A lady reading some documents"
          />
        </div>
        <div className="bg-white rounded-lg lg:rounded-r-lg p-4 w-full">
          <h2 className="text-primary text-3xl font-clashDisplay leading-10 font-bold">
            INVOICEY
          </h2>
          <h4 className="text-center font-clashDisplay font-semibold leading-10 text-3xl mt-24">
            Forgot Password
          </h4>
          <p className="text-center font-medium leading-7">
            Enter your registered email below to <br /> receive reset
            instructions
          </p>

          <div>
            {message ? (
              <div className="bg-warning p-4 w-4/5 rounded shadow-md delay-1000 mx-auto duration-300 my-4">
                {message}
              </div>
            ) : (
              ""
            )}
            <form className="" onSubmit={handleSubmit}>
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

              <div className="my-2">
                <button className="bg-primary text-white px-auto py-3 w-full rounded cursor-pointer my-2">
                  Submit
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

export default forgotpassword;
