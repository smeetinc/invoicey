import React from "react";
import { poppins } from "@/utils/fonts";
import ClientRow from "./ClientRow";
import ClientTable from "./ClientTable";

export const metadata = {
  title: "Clients",
  description: "This is the clients page",
};

const Client = () => {
  return (
    <>
      <h1 className="font-clashDisplay text-dark text-[32px] font-medium tracking-sm mb-9">
        Clients
      </h1>
      <ClientTable />
    </>
  );
};

export default Client;
