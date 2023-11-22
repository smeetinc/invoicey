import React from 'react'

export default function InvoiceComponent() {
    const invoiceDetails = [
        {
         description: "payment for tasks",
         invoiceNumber: "IN01",
         invoiceDate: 3/10/23,
         dateDue:3/10/23,
         amount: 200000,
         paymentType: "transfer",
         status: "pending"
        },
        {
         description: "payment for tasks",
         invoiceNumber: "IN01",
         invoiceDate: 23/10/23,
         dateDue: 23/10/23,
         amount: 200000,
         paymentType: "transfer",
         status: "paid"
        }
    ];

  return (
    <div>
      <h1>Please ensure that payment is made by the specified due date to avoid any disruptions in your service.
          If you have any questions or concerns regarding this invoice, feel free to reply to this email, and our team will be happy to assist you.
          Thank you for choosing [our Company Name].
        </h1>
        <div>
            {invoiceDetails.map((invoice, index) => (
             <div key={index}>
               <h2>Proceed to payment</h2>
               <p>Description: {invoice.description}</p>
               <p>Invoice Number: {invoice.invoiceNumber}</p>
               <p>Invoice Date: {invoice.invoiceDate}</p>
               <p>Date due: {invoice.dateDue}</p>
               <p>Amount: {invoice.amount}</p>
               <p>Payment type: {invoice.paymentType}</p>
               {invoice.status === "paid" ? (
                <p>Status: Paid</p>
               ) : (
                <p>Status: Pending</p>
               )}
               </div>
            ))}
        </div>
    </div>
  );
};


