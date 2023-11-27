"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/User";
import { withOutAuth } from "@/utils/withoutAuth";

function login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const route = useRouter();

  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const email = emailAddress.trim();
    const pwd = password.trim();

    // Include CSRF token in the form data (if needed)
    const formData = {
      email: email,
      password: pwd,
    };

    const jsonData = JSON.stringify(formData);

    try {
      console.log("Sending POST request...");
      const response = await axios.post(
        "https://olatidejosepha.pythonanywhere.com/api/authenticate/",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);
      if (!response.data.is_activated) {
        toast.error(response.data.message);
        return;
      }
      console.log(response.data?.refresh_token);
      localStorage.setItem("invc", response.data?.refresh_token);
      auth.login({}, response.data?.refresh_token);
      toast.success("Welcome Back");
      route.replace("/overview");
      // Redirect to a success page or handle accordingly
    } catch (error) {
      console.log("Error posting data:", error);
      if (error.response) {
        // The request was made and the server responded with a status code

        console.log("Response data:", error.response.data);
        console.log("Status code:", error.response.status);
        console.log("Headers:", error.response.headers);
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
            Sign In
          </h4>
          <p className="text-center font-medium leading-7">
            Let's get you started
          </p>

          <div>
            <form className="" id="form" onSubmit={handleSubmit}>
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
                Don't have an Account?&nbsp;
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

export default withOutAuth(login);
