"use client";
import React from "react";
import ClientTable from "./ClientTable";
import { withAuth } from "@/utils/withAuth";

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

export default withAuth(Client);
