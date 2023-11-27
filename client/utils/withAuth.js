import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const route = useRouter();
    const token = localStorage.getItem("invc");
    if (!token) {
      route.replace("/");
    } else {
      return <WrappedComponent {...props} />;
    }
    return (
      <div className="fixed inset-0 w-screen h-screen z-[9999999] bg-white grid place-items-center">
        <Loader />
      </div>
    );
  };
  return Wrapper;
}
