"use client";
import { useRef, useState } from "react";
import { poppins } from "@/utils/fonts";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { clientSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const DeleteModal = ({ isOpen, closeModal }) => {
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div
        className="fixed z-50 inset-0 bg-black/30 w-screen h-screen grid place-items-center"
        aria-hidden="true"
      >
        <Dialog.Panel className="bg-white text-dark p-6 rounded-lg w-[90%] max-w-md ">
          <Dialog.Title className={""}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#FEE4E2] p-3 rounded-full border-8 border-[#FEF3F2]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                    stroke="#A8200D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <button className="text-grey" onClick={closeModal}>
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
            </div>
            <h1 className=" text-[#101828] text-lg font-semibold leading-7">
              Delete Client
            </h1>
          </Dialog.Title>
          <Dialog.Description
            as={"p"}
            className={"text-[#475467] font-normal text-sm leading-5 mt-1"}
          >
            Are you sure you want to delete this client? This action cannot be
            undone.
          </Dialog.Description>
          <div className="grid grid-cols-2 gap-3 mt-8">
            <button
              type="submit"
              className="bg-transparent py-3 px-5 rounded-lg border border-[#D0D5DD] text-[#344054] flex justify-center items-center text-base font-medium leading-6"
              onClick={closeModal}
            >
              {" "}
              Cancel
            </button>
            <button
              type="submit"
              className="bg-error py-3 px-5 rounded-lg border border-error text-white flex justify-center items-center text-base font-medium leading-6"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
const EditModal = ({ isOpen, closeModal }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(clientSchema) });
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
              Edit Client
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
                <input
                  placeholder="Toyosi Lawal"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  id="name"
                  {...register("clientName", { required: true })}
                />

                {errors.clientName && (
                  <p className="text-error font-normal text-base">
                    {errors.clientName?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="email"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Email Address*
                </label>
                <input
                  placeholder="toyosi@gmail.com"
                  type="email"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  id="emdil"
                  {...register("email", {
                    required: true,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />

                {errors.email && (
                  <p className="text-error font-normal text-base">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="date"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Birthday*
                </label>
                <input
                  placeholder="23/11/97"
                  type="date"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  {...register("birthday", {
                    required: true,
                    valueAsDate: true,
                  })}
                />

                {errors.birthday && (
                  <p className="text-error font-normal text-base">
                    {errors.birthday?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="gender"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender", { required: true, minLength: 3 })}
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                {errors.gender && (
                  <p className="text-error font-normal text-base">
                    {errors.gender?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="date"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Phone Number*
                </label>
                <input
                  placeholder="+2347098457324"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  {...register("phoneNumber", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />

                {errors.phoneNumber && (
                  <p className="text-error font-normal text-base">
                    {errors.phoneNumber?.message}
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
                Update Client
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
const ClientRow = ({ color }) => {
  const [showActions, setShowActions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const actionRef = useRef(null);
  const toggleActions = () => {
    setShowActions((prev) => {
      return !prev;
    });
  };
  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const openEditModal = () => {
    setShowActions(false);
    setShowEditModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const openDeleteModal = () => {
    setShowActions(false);
    setShowDeleteModal(true);
  };
  return (
    <>
      <tr
        className={`border-collapse border border-grey ${
          color && "bg-[#9FE87033]"
        }`}
      >
        <td>
          <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center">
            <Link href={"/client/id"} className="underline">
              EP2347
            </Link>
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
              <button
                className="text-[#292D32] text-start"
                onClick={openEditModal}
              >
                Edit{" "}
              </button>
              <button
                className=" text-start text-[#292D32]"
                onClick={openDeleteModal}
              >
                Delete
              </button>
            </div>
          </div>
          <EditModal isOpen={showEditModal} closeModal={closeEditModal} />
          <DeleteModal isOpen={showDeleteModal} closeModal={closeDeleteModal} />
        </td>
      </tr>
    </>
  );
};

export default ClientRow;
