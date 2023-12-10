"use client";
import { useRef, useState } from "react";
import { poppins } from "@/utils/fonts";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema } from "@/utils/schemas";
const EditModal = ({ isOpen, closeModal }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(invoiceSchema) });
  const submitHandler = (data) => {
    console.log(data);
    reset();
  };
  const resetAndCloseModal = () => {
    reset();
    closeModal();
  };
  return (
    <Dialog open={isOpen} onClose={resetAndCloseModal}>
      <div
        className="fixed z-50 inset-0 bg-black/30 w-screen h-screen grid place-items-center"
        aria-hidden="true"
      >
        <Dialog.Panel className="bg-white text-dark p-6 rounded-lg w-[90%] max-w-2xl ">
          <Dialog.Title className={"flex items-center justify-between mb-5"}>
            <h1 className="text-base font-bold tracking-[0.32px]">
              Edit Invoice
            </h1>
            <button className="text-grey" onClick={resetAndCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Dialog.Title>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid grid-cols-2 gap-8  mb-8">
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="name"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Client Name
                </label>
                <select
                  placeholder="Toyosi Lawal"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  id="name"
                  {...register("clientName", { required: true })}
                >
                  <option
                    value=""
                    className="text-grey"
                    hidden
                    disabled
                    selected
                  >
                    Select Client Name
                  </option>
                  <option value="gideon">Gideon</option>
                </select>

                {errors.clientName && (
                  <p className="text-error font-normal text-base">
                    {errors.clientName?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="dueDate"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Due Date*
                </label>
                <input
                  placeholder="toyosi@gmail.com"
                  type="date"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  id="dueDate"
                  {...register("dueDate", {
                    required: true,
                    valueAsDate: true,
                  })}
                />
                {errors.dueDate && (
                  <p className="text-error font-normal text-base">
                    {errors.dueDate?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="amount"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Amount*
                </label>
                <input
                  placeholder="#200,000.00"
                  type="number"
                  {...register("amount", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  id="amount"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                />
                {errors.amount && (
                  <p className="text-error font-normal text-base">
                    {errors.amount?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="paymentFor"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Payment For
                </label>
                <input
                  placeholder="Wedding Coverage"
                  id="paymentFor"
                  {...register("paymentFor", { required: true, minLength: 10 })}
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                />
                {errors.paymentFor && (
                  <p className="text-error font-normal text-base">
                    {errors.paymentFor?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 col-span-2   ">
                <label
                  htmlFor="description"
                  className="text-sm text-dark  font-medium leading-6  "
                >
                  Description*
                </label>
                <textarea
                  placeholder="This is the payment for the complete prewedding & video coverage of your wedding."
                  id="description"
                  {...register("description", {
                    required: true,
                    minLength: 30,
                  })}
                  className="px-4 py-3 rounded-lg w-full border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal min-h-[100px]"
                />
                {errors.description && (
                  <p className="text-error font-normal text-base">
                    {errors.description?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="submit"
                className="bg-primary py-3 px-5 rounded-lg border border-[#D0D5DD] text-secondary flex justify-center items-center text-base font-medium leading-6"
              >
                {" "}
                Update Invoice
              </button>
              <button
                type="submit"
                className="bg-error py-3 px-5 rounded-lg border border-[#7F56D9] text-white flex justify-center items-center text-base font-medium leading-6"
                onClick={resetAndCloseModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
const InvoiceRow = ({ color, invoice }) => {
  const [showActions, setShowActions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const actionRef = useRef(null);
  const toggleActions = () => {
    setShowActions((prev) => {
      if (!prev && actionRef.current) {
        actionRef.current.focus();
      }
      return !prev;
    });
  };
  const openEditModal = () => {
    setShowActions(false);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const formatNum = (num) => {
    return Intl.NumberFormat("en-US", {
      currency: "NGN",
    }).format(num);
  };
  return (
    <tr
      className={`border-collapse border border-grey ${
        color && "bg-[#9FE87033]"
      }`}
    >
      <td>
        <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center">
          <span>IN{invoice?.inv_id.slice(0, 2)}</span>
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
        <div className="flex justify-center whitespace-nowrap max-w-sm ml-0 overflow-hidden text-ellipsis  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px]  py-4 text-center ">
          <span>{invoice?.description}</span>
        </div>
      </td>
      <td>
        <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] text-center  py-4 ">
          <span>₦{formatNum(invoice?.amt)}</span>
        </div>
      </td>
      <td>
        <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px]  py-4 text-center ">
          <span className="  py-2 w-fit px-4 mx-4 rounded-3xl bg-primary text-secondary ">
            {invoice?.has_paid ? "Paid" : "Pending"}
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
          } z-50 whitespace-nowrap`}
          ref={actionRef}
        >
          <div
            className={`flex flex-col gap-4 font-normal ${poppins.variable} font-poppins text-sm`}
          >
            <button className="text-[#292D32] text-start">
              Send Reminder{" "}
            </button>
            <button
              className=" text-start text-[#292D32]"
              onClick={openEditModal}
            >
              Extend due date
            </button>
            <button className=" text-start text-[#292D32]">Void Invoice</button>
            <button className=" text-start text-[#292D32]">
              Suspend Invoice
            </button>
          </div>
          <EditModal isOpen={showEditModal} closeModal={closeEditModal} />
        </div>
      </td>
    </tr>
  );
};

export default InvoiceRow;
