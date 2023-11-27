import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export function withOutAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const token = localStorage.getItem("invc");
    const route = useRouter();
    if (!token) {
      return <WrappedComponent {...props} />;
    } else {
      route.replace("/overview");
    }
    return (
      <div className="fixed inset-0 w-screen h-screen z-[9999999] bg-white grid place-items-center">
        <Loader />
      </div>
    );
  };
  return Wrapper;
}
