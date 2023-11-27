import React from "react";
import GatewayComponent from "./gatewayPage";
import { useSearchParams } from "next/navigation";

export default function page() {
  return (
    <div>
      <GatewayComponent />
    </div>
  );
}
