"use client"
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const route = useRouter();
    const [loading,setLoading] = useState(true);
    const [token,setToken]=useState('') 
useEffect(() => {
const tokens= localStorage.getItem("invc");
 if(tokens){
  setToken(token)
}else{
route.replace("/")
}
setLoading(false)
},[])
    return (

     {loading ? <div className="fixed inset-0 w-screen h-screen z-[9999999] bg-white grid place-items-center">
        <Loader />
      </div> : 
 <> 
  {token && <WrappedComponent {...props} />}
</>
}
    );
  };
  return Wrapper;
}
