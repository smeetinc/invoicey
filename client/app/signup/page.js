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
  const [error, setError] = useState("");
  async function fetchCsrfToken() {
    try {
      const response = await axios.get(
        "http://olatidejosepha.pythonanywhere.com/",
        {
          headers: {
            "is-from-site": "x-token-value",
          },
        }
      );

      return response.data.csrf_token;
      setCsrfToken(response.data.csrf_token);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      // Handle error accordingly
      console.log(error);
    }
  }
  useEffect(() => {
    // Fetch CSRF token when the component mounts

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const fullname = fullName.trim();
    const businessname = businessName.trim();
    const email = emailAddress.trim();
    const pwd = password.trim();
    const conpwd = conPassword.trim();
    if (!fullname || !businessname || !email || !pwd || !conpwd) {
      alert("All fields are required");
      setIsLoading(false);
      return;
    }
    if (pwd.length < 6) {
      alert("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }
    if (pwd !== conpwd) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Include CSRF token in the form data
    const formData = {
      email: email,
      name: fullname,
      password: pwd,
      busi_nm: businessname,
    };

    const jsonData = JSON.stringify(formData);
    console.log(csrfToken);

    // Make the POST request with Axios
    // axios.defaults.headers.common["X-Token"] = csrfToken;
    try {
      const tokenRes = await fetch(
        "http://olatidejosepha.pythonanywhere.com/",
        {
          headers: {
            "is-from-site": "x-token-value",
          },
        }
      );
      const token = await tokenRes.json();
      // const response = await axios.post(
      //   "http://olatidejosepha.pythonanywhere.com/api/register-user/", // Replace with your actual Flask backend URL
      //   jsonData,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-Token": token,
      //     },
      //     withCredentials: true,
      //   }
      // );
      console.log(token);
      const res = await fetch(
        "http://olatidejosepha.pythonanywhere.com/api/register-user/",
        {
          method: "POST",
          body: jsonData,
          headers: {
            "Content-Type": "application/json",
            "x-Token": token.csrf_token,
          },
          credentials: "include",
        }
      );
      const responseData = await res.json();

      console.log(responseData);
      window.location.href = "/"; // Redirect to a success page or handle accordingly
    } catch (error) {
      console.log("Error posting data:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (axios.isCancel(error)) {
        // Handle canceled request
        console.log("Request canceled", error.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
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
                <div className="error"></div>
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
                <div className="error"></div>
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
                <div className="error"></div>
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
                <div className="error"></div>
              </div>
              {/* CSRF token field */}
              <input type="hidden" name="_csrf" value={csrfToken} />
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
                <div className="error"></div>
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
  );
}

export default signup;
