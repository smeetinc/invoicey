"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
export default function GatewayComponent() {
  const route = useSearchParams();
  const params = Object.fromEntries(route.entries());

  const invoiceDetails = [
    {
      description: "This is the payment for photos",
      invoiceNumber: "IN01",
      invoiceDate: "Nov 23, 2023",
      dateDue: "Nov 23, 2023",
      amount: 200000,
      paymentType: "transfer",
      status: "pending",
    },
  ];

  return (
    <div>
      <h1 className="text-secondary p-6 mb-8 text-center">
        Please ensure that payment is made by the specified due date to avoid
        any disruptions in your service. If you have any questions or concerns
        regarding this invoice, feel free to reply to this email, and our team
        will be happy to assist you. Thank you for choosing [our Company Name].
      </h1>
      <div className="rounded-lg w-fit bg-secondary p-6  m-auto justify-center items-center">
        {invoiceDetails.map((invoice, index) => (
          <div key={index}>
            <h2 className="p-2 text-primary text-2xl font-bold">
              Proceed to payment
            </h2>
            <p>
              <text className="font-bold p-6">Description</text>{" "}
              {invoice.description}
            </p>
            <p>
              <text className="font-bold p-6">Invoice NO</text>{" "}
              {invoice.invoiceNumber}
            </p>
            <p>
              <text className="font-bold p-6">Invoice Date</text>{" "}
              {invoice.invoiceDate}
            </p>
            <p>
              <text className="font-bold p-6">Date Due</text> {invoice.dateDue}
            </p>
            <p>
              <text className="font-bold p-6">Amount</text> {invoice.amount}
            </p>
            <p>
              <text className="font-bold p-6">Payment type</text>
              {invoice.paymentType}
            </p>
            {params?.status === "Pending" && (
              <Link
                href={params.payout}
                className="bg-primary block rounded-lg p-2 w-96 text-white mt-6 text-center"
              >
                Pay Now
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
