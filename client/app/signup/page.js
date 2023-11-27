"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";
import axios from "axios";

function signup() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorBusiness, setErrorBusiness] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const fullname = fullName.trim();
    const businessname = businessName.trim();
    const email = emailAddress.trim();
    const pwd = password.trim();
    const conpwd = conPassword.trim();
    if (!fullname) {
      setErrorName("Please enter your name.");
      setIsLoading(false);
      return;
    } else if (!businessname) {
      setErrorBusiness("Please enter your business name.");
      setIsLoading(false);
      return;
    } else if (!email) {
      setErrorEmail("Please enter a valid email address.");
      setIsLoading(false);
      return;
    } else if (!pwd) {
      setErrorPassword("Please enter a password.");
      setIsLoading(false);
      return;
    } else if (!conpwd) {
      setErrorConfirmPassword("Please confirm your password.");
      setIsLoading(false);
      return;
    } else if (pwd.length < 8) {
      console.log(pwd.length);
      setErrorPassword("Password should have at least 8 characters.");
      setIsLoading(false);
      return;
    } else if (pwd !== conpwd) {
      setErrorPassword("Passwords do not match.");
      setErrorConfirmPassword("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Include CSRF token in the form data (if needed)
    const formData = {
      email: email,
      name: fullname,
      password: pwd,
      busi_nm: businessname,
    };

    const jsonData = JSON.stringify(formData);

    try {
      console.log("Sending POST request...");
      const response = await axios.post(
        "https://olatidejosepha.pythonanywhere.com/api/register-user/",
        jsonData,
        {
          method: "POST",
          body: jsonData,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //const responseData = await response.json();

      console.log("Response from server:", response.data);
      //window.location.href = "/verify"; // Redirect to a success page or handle accordingly
    } catch (error) {
      console.log("Error posting data:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-accent h-screen p-6">
      <div className="flex mx-auto w-full md:w-3/5 shadow-sm">
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
          <h4 className="text-center font-clashDisplay font-semibold leading-10 text-3xl">
            Sign up
          </h4>
          <p className="text-center font-medium leading-7">
            Let's get you started
          </p>

          <div>
            <div>
              {message ? (
                <div className="bg-warning p-4 w-4/5 rounded shadow-md delay-1000 mx-auto duration-300 my-4">
                  {message}
                </div>
              ) : (
                ""
              )}
              <form className="" id="form" onSubmit={handleSubmit}>
                <div className="input-control">
                  <label htmlFor="fullName" className="">
                    Full Name
                  </label>
                  <br />
                  <input
                    className="shadow border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-primary focus:shadow-outline my-1"
                    type="text"
                    placeholder="Olajide Jacob"
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <div className="text-error font-light text-sm">
                    {errorName}
                  </div>
                </div>
                <div className="mt-2 input-control">
                  <label htmlFor="businessName" className="">
                    Business Name
                  </label>
                  <br />
                  <input
                    className="shadow border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-primary focus:shadow-outline my-1"
                    type="text"
                    placeholder="Olajide Jacob"
                    name="businessName"
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                  <div className="text-error text-sm font-light">
                    {errorBusiness}
                  </div>
                </div>
                <div className="mt-2 input-control">
                  <label htmlFor="emailAddress">Email Address</label>
                  <br />
                  <input
                    className="shadow border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-primary focus:shadow-outline my-1"
                    type="email"
                    placeholder="Olajide Jacob"
                    name="emailAddress"
                    id="emailAddress"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                  <div className="text-error font-light text-sm">
                    {errorEmail}
                  </div>
                </div>
                <div className="mt-2 input-control">
                  <label htmlFor="password">Password</label>
                  <br />
                  <div
                    className="focus-within:border-2 border-primary flex justify-between shadow focus:border-2 active:border-2 active:border-primary rounded w-full py-2 px-3 text-dark leading-tight focus:border-primary focus:shadow-outline default:border-primary my-1"
                    id="password"
                  >
                    <input
                      className="focus:outline-none"
                      type={show ? "text" : "password"}
                      name="password"
                      id="pwd"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
                  <div className="text-error font-light text-sm">
                    {errorPassword}
                  </div>
                </div>

                <div className="my-2 input-control">
                  <label htmlFor="conPassword">Confirm Password</label>
                  <br />
                  <div
                    id="conPassword"
                    className="focus-within:border-2 border-primary flex justify-between shadow focus:border-2 active:border-2 active:border-primary rounded w-full py-2 px-3 text-dark leading-tight focus:border-primary focus:shadow-outline default:border-primary my-1"
                  >
                    <input
                      className="focus:outline-none"
                      type={show ? "text" : "password"}
                      name="conPassword"
                      id="conpwd"
                      value={conPassword}
                      onChange={(e) => setConPassword(e.target.value)}
                      required
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
                  <div className="text-error font-light text-sm">
                    {errorConfirmPassword}
                  </div>
                </div>

                <div className="my-2">
                  {isLoading ? (
                    <button className="bg-primary text-white px-auto py-3 w-full rounded cursor-pointer my-2">
                      Please wait...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-primary text-white px-auto py-3 w-full rounded cursor-pointer my-2"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </form>
              <div className="text-center my-2">
                <small className="text-center">
                  Already have an Account?&nbsp;
                  <a href="/">
                    <span className="text-primary font-bold cursor-pointer">
                      Sign in
                    </span>
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signup;
