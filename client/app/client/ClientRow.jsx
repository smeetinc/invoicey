"use client";
import { useRef, useState } from "react";
import { poppins } from "../layout";

const ClientRow = ({ color }) => {
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
          <span>EP2347</span>
        </div>
      </td>
      <td>
        <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 ">
          <span>Yusuf Ibrahim</span>
        </div>
      </td>
      <td>
        <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 ">
          <span>Yusuf@gmail.com</span>
        </div>
      </td>
      <td>
        <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 text-center ">
          <span>+2348167435627</span>
        </div>
      </td>
      <td>
        <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] text-center mr-10 py-4 ">
          <span>23/06/1889</span>
        </div>
      </td>
      <td>
        <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 text-center ">
          <span>Female</span>
        </div>
      </td>
      <td className="relative">
        <button
          className="flex w-full items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pr-2"
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
            <button className="text-[#292D32] text-start">Edit </button>
            <button className=" text-start text-[#292D32]">Delete</button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ClientRow;
