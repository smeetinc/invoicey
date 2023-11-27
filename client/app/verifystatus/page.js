// pages/verifystatus.js
"use client";
import { useEffect } from "react";
import axios from "axios";
import { useRouter as navigate, useSearchParams } from "next/navigation";

const VerifyStatus = () => {
  const { replace } = navigate();
  const route = useSearchParams();
  useEffect(() => {
    const verifyUser = async () => {
      // Get the query string from the address bar

      // Extract the verify value from the query string

      // Log the verify value

      // Make a POST request to the verification endpoint
      const token = route.get("verify");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
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
          replace("/");
        } catch (error) {
          // Handle verification failure
          console.error("Verification failed:", error);
          // Redirect the user to an error page
          // route("/error");
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
