import React from 'react'

export default function PaidComponent() {
  const paidDetails = [
    {
      description: "This is the payment the photos",
      invoiceNumber: "IN01",
      invoiceDate: "Nov 23, 2023",
      dateDue: "Nov 23, 2023",
      amount: 200000,
      paymentType: "transfer",
      status: "paid"
    }
  ];

  return (
    <div className='p-6 gap-2 rounded-lg w-fit bg-secondary m-auto mt-20 justify-center items-center'>
      <h1 className='p-4 text-primary text-2xl font-bold'>Payment Successful</h1>
      <div className='gap-2'>
      {paidDetails.map((invoice, index) => (
      <div key={index}> 
      <p><text className='font-bold p-6'>Description</text>    {invoice.description}</p>
      <p><text className='font-bold p-6' >Invoice NO</text> {invoice.invoiceNumber}</p>
      <p><text className='font-bold p-6' >Invoice Date</text>  {invoice.invoiceDate}</p>
      <p><text className='font-bold p-6' >Date Due</text>  {invoice.dateDue}</p>
      <p><text className='font-bold p-6' >Amount</text>  {invoice.amount}</p>
      <p><text className='font-bold p-6' >Payment type</text>  {invoice.paymentType}</p>
    </div>
    ))}
    </div>
  </div>
  )
}