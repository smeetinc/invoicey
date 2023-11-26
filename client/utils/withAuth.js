import { useRouter } from "next/navigation";

export function withAuth(WrappedComponent) {
  const route = useRouter();
  const token = JSON.parse(localStorage.getItem("invc_tk"));
  if (!token) {
    route.replace("/");
  } else {
    return WrappedComponent;
  }
}
