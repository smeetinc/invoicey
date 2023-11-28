// pages/verifystatus.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter as navigate, useSearchParams } from "next/navigation";
import { withOutAuth } from "@/utils/withoutAuth";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const VerifyStatus = () => {
  const { replace } = navigate();
  const route = useSearchParams();
  const [verifying, setVerifying] = useState(true);
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
            "Content-Type": "text/html",
          },
        };

        try {
          const response = await axios.post(
            "https://olatidejosepha.pythonanywhere.com/api/activate_required/",
            "",
            config
          );

          // Handle successful verification

          // home page
          toast.success("Verrified");
          replace("/");
        } catch (error) {
          // Handle verification failure
          console.error("Verification failed:", error);
          toast.error("Something went wrong");
          // Redirect the user to an error page
          // route("/error");
          setVerifying(false);
        }
      }
    };

    // Call the async function
    verifyUser();
  }, []);

  return (
    <div>
      {/* display a loading spinner or message */}
      {verifying && (
        <div className="fixed z-[99999] inset-0 w-screen h-screen bg-white grid place-items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default withOutAuth(VerifyStatus);
