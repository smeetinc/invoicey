"use client";
import { useRef, useState } from "react";
import { poppins } from "@/utils/fonts";
import Link from "next/link";

const InvoiceRow = ({ color }) => {
  const [showActions, setShowActions] = useState(false);
  const actionRef = useRef(null);
  const toggleActions = () => {
    setShowActions((prev) => {
      if (!prev && actionRef.current) {
        actionRef.current.focus();
      }
      return !prev;
    });
  };
  return (
    <tr
      className={`border-collapse border border-grey ${
        color && "bg-[#9FE87033]"
      }`}
    >
      <td>
        <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center">
          <Link href={"/client"} className="underline">
            IN01
          </Link>
        </div>
      </td>
      <td>
        <div className="flex  justify-center  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] py-4 ">
          <span>12/01/2023 • 09:31:27</span>
        </div>
      </td>
      <td>
        <div className="flex  justify-center  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] py-4 ">
          <span>30/11/23</span>
        </div>
      </td>
      <td>
        <div className="flex justify-center  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px]  py-4 text-center ">
          <span>Pre-wedding Photoshoot</span>
        </div>
      </td>
      <td>
        <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] text-center  py-4 ">
          <span>₦35,000.00</span>
        </div>
      </td>
      <td>
        <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px]  py-4 text-center ">
          <span className="bolck  px-5 rounded-3xl bg-primary text-secondary flex items-center justify-center ">
            {" "}
          </span>
        </div>
      </td>
      <td className="relative">
        <button
          className="flex w-full items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px]  py-4 pr-2"
          onClick={toggleActions}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
          >
            <rect
              x="0.455292"
              width="32.1304"
              height="32.1304"
              rx="8.03261"
              fill="#CCCCCC"
            />
            <circle
              cx="16.5205"
              cy="16.0654"
              r="1"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="16.5205"
              cy="8.06543"
              r="1"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="16.5205"
              cy="24.0654"
              r="1"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className={`absolute px-4  right-4 rounded-lg transition-all duration-500 ease-in-out overflow-hidden  bg-white min-w-[100px] w-fit shadow-lg ${
            showActions ? "py-2 h-fit" : "py-0 h-0 "
          } z-50`}
          ref={actionRef}
        >
          <div
            className={`flex flex-col gap-4 font-normal ${poppins.variable} font-poppins text-sm`}
          >
            <button className="text-[#292D32] text-start">
              Send Reminder{" "}
            </button>
            <button className=" text-start text-[#292D32]">
              Extend due date
            </button>
            <button className=" text-start text-[#292D32]">Void Invoice</button>
            <button className=" text-start text-[#292D32]">
              Suspend Invoice
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default InvoiceRow;
