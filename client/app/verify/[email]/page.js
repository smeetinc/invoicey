"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

function Verify({ params: { email } }) {
  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);
  const [formattedRemainingTime, setFormattedRemainingTime] = useState("");

  // Function to format time as HH:MM:SS
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    return formattedTime;
  }

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== "undefined") {
      let initialTime = localStorage.getItem("initialTime");

      if (!initialTime) {
        initialTime = 300;
        localStorage.setItem("initialTime", initialTime);
      }

      // Function to start the countdown
      function startCountdown() {
        let remainingTime =
          localStorage.getItem("remainingTime") || initialTime;

        const countdownInterval = setInterval(() => {
          // Display the formatted time
          console.log(formatTime(remainingTime));

          // Check if the countdown has reached 00:00:00
          if (remainingTime <= 0) {
            console.log(
              "Countdown reached 00:00:00. Trigger your action here."
            );
            clearInterval(countdownInterval);
            setEnable(true);
          } else {
            // Decrement the remaining time
            remainingTime -= 1;

            // Update the remaining time in localStorage
            localStorage.setItem("remainingTime", remainingTime);
            // Update the formatted time state
            setFormattedRemainingTime(formatTime(remainingTime));
          }
        }, 1000); // Update every 1 second
      }

      // Start the countdown when the page is loaded
      startCountdown();
    }
  }, []);

  // Function to handle button click
  const handleClick = async () => {
    // Reset the countdown time
    setLoading(true);
    console.log(decodeURIComponent(email));
    const data = {
      email: decodeURIComponent(email),
    };

    const jsonData = JSON.stringify(data);
    try {
      console.log("Sending POST request...");
      const response = await axios.post(
        "https://olatidejosepha.pythonanywhere.com/api/users/resend-activation-link_",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const responseData = await response.json();

      console.log("Response from server:", response.data);
    } catch (error) {
      console.log("Error posting data:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);
        console.log("Status code:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (axios.isCancel(error)) {
        // Handle canceled request
        console.log("Request canceled", error.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
      }
      setLoading(false);
    }

    localStorage.setItem("remainingTime", 300);
    setEnable(false);
    setFormattedRemainingTime(formatTime(300)); // Reset the formatted time
  };

  return (
    <div className="w-full h-screen">
      <div className="bg-white h-16 py-2">
        <h1 className="text-dark text-4xl font-bold font-clashDisplay ml-8">
          INVOICEY
        </h1>
      </div>
      <div className="bg-primary h-full py-auto flex items-center px-4">
        <div className="bg-accent my-auto mx-auto w-full md:w-3/4 lg:w-1/2 text-center rounded-2xl">
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
              <span className="text-primary">{decodeURIComponent(email)}</span>{" "}
              with a verification link.
            </p>
            {enable ? (
              <button
                className="bg-primary rounded-md px-auto py-3 w-4/5 text-white"
                onClick={handleClick}
              >
                Resend Verification Link
              </button>
            ) : (
              <button
                disabled
                className="bg-primary rounded-md px-auto py-3 w-4/5 text-white"
              >
                Resend Verification Link
              </button>
            )}

            <div className="w-4/5 mx-auto flex justify-between mb-4 mt-2">
              <p className="text-dark text-sm">
                Link expires in{" "}
                <span className="text-primary font-semibold">
                  {formattedRemainingTime}
                </span>
              </p>
              <p className="text-dark text-sm">
                incorrect email address?&nbsp;
                <a href="/signup">
                  <span className="text-primary font-semibold">
                    Change email address
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
