// pages/verifystatus.js
"use client";
import { useEffect } from "react";
import axios from "axios";

const VerifyStatus = () => {
  useEffect(() => {
    const verifyUser = async () => {
      // Get the query string from the address bar
      const queryString = window.location.search;

      // Extract the verify value from the query string
      const verifyParam = new URLSearchParams(queryString).get("verify");

      // Log the verify value
      console.log("Verify value:", verifyParam);

      // Make a POST request to the verification endpoint
      if (verifyParam) {
        const config = {
          headers: {
            Authorization: `Bearer ${verifyParam}`,
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios.post(
            "https://olatidejosepha.pythonanywhere.com/api/activate_required/",
            {},
            config
          );

          // Handle successful verification
          console.log("Verification successful:", response.data);
          // home page
          window.location.href = "/";
        } catch (error) {
          // Handle verification failure
          console.error("Verification failed:", error);
          // Redirect the user to an error page
          //window.location.href = "/error";
        }
      }
    };

    // Call the async function
    verifyUser();
  }, []);

  return (
    <div>
      {/* display a loading spinner or message */}
      Verifying...
    </div>
  );
};

export default VerifyStatus;
