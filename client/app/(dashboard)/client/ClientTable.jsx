"use client";
import React, { useEffect, useState } from "react";
import ClientRow from "./ClientRow";
import { poppins } from "@/utils/fonts";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@/utils/schemas";
import Loader from "@/components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
const AddClientModal = ({ isOpen, closeModal, getClients }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(clientSchema) });
  const [sending, setSending] = useState(false);
  const submitHandler = async (data) => {
    try {
      const date = new Date(data.birthday);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const mainData = {
        name: data.clientName,
        email: data.email,
        birth_date: `${day}/${month}/${year}`,
        phone: data.phoneNumber,
        gender: data.gender === "Male" ? "M" : "F",
      };
      try {
        setSending(true);
        const res = await axios.post(
          "http://olatidejosepha.pythonanywhere.com/api/clients/",
          JSON.stringify(mainData),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("invc")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.data.created) {
          toast.error(res.data.message);
          return;
        }
        getClients(localStorage.getItem("invc"));
        toast.success("Client Added");
        reset();
        closeModal();
      } catch (error) {
      } finally {
        setSending(false);
      }
    } catch (error) {}
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
        <Dialog.Panel className="bg-white text-dark p-6 rounded-lg w-[90%] max-w-2xl relative">
          {sending && (
            <div className="bg-white/50 inset-0 w-full h-full grid place-items-center z-50 absolute">
              <Loader />
            </div>
          )}
          <Dialog.Title className={"flex items-start justify-between mb-5"}>
            <div>
              <h1 className="text-base font-bold tracking-[0.32px]">
                Add Client
              </h1>
              <p className="text-dark text-sm tracking-wider leading-6 font-normal">
                Create profile for your new client.
              </p>
            </div>
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
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                type="submit"
                className="bg-transparent py-3 px-5 rounded-lg border border-[#D0D5DD] text-[#344054] flex justify-center items-center text-base font-medium leading-6"
                onClick={resetAndCloseModal}
              >
                {" "}
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary py-3 px-5 rounded-lg border border-[#7F56D9] text-white flex justify-center items-center text-base font-medium leading-6"
              >
                Confirm
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
const ClientTable = () => {
  const [showClientModal, setShowClientModal] = useState(false);
  const [clients, setClients] = useState([]);
  const closeClientModal = () => {
    setShowClientModal(false);
  };
  const getClients = async (token) => {
    try {
      const res = await axios.get(
        "https://olatidejosepha.pythonanywhere.com/api/all-client-data/?page=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setClients(res.data.clients);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClients(localStorage.getItem("invc"));
  }, []);
  return (
    <>
      <AddClientModal
        isOpen={showClientModal}
        closeModal={closeClientModal}
        getClients={getClients}
      />
      {clients && (
        <section className="py-7 px-6 rounded-xl border  border-grey">
          <div className="flex items-center gap-10 justify-between mb-5">
            <input
              className="py-2 pl-4 rounded-md border border-gray flex-1 max-w-lg"
              placeholder="Search by name"
            />
            <button
              className={`rounded-lg px-5 py-3 text-white bg-primary ${poppins.variable} font-poppins text-sm font-bold tracking-[-0.42px] w-4/5 max-w-[155px]`}
              onClick={() => setShowClientModal(true)}
            >
              Add Client
            </button>
          </div>
          <table className="w-full overflow-auto max-w-7xl px-1 rounded-md border border-grey  mb-8  ">
            <thead>
              <tr className="">
                <th className=" w-1/6">
                  <div className="flex text-centerx   pl-4  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 whitespace-nowrap">
                    <span>Client ID</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M9.71816 2.41846C9.96797 2.41846 10.1744 2.60409 10.2071 2.84493L10.2116 2.91189V11.8711C10.2116 12.1437 9.99068 12.3646 9.71816 12.3646C9.46836 12.3646 9.26191 12.1789 9.22924 11.9381L9.22473 11.8711V2.91189C9.22473 2.63937 9.44565 2.41846 9.71816 2.41846Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12.0511 8.82844C12.2433 8.63529 12.5558 8.63457 12.7489 8.82682C12.9245 9.0016 12.941 9.27569 12.7982 9.46919L12.7505 9.52464L10.0677 12.2199C9.89236 12.396 9.61718 12.412 9.42369 12.2679L9.36827 12.2199L6.68547 9.52464C6.49321 9.3315 6.49394 9.01907 6.68708 8.82682C6.86266 8.65205 7.13682 8.63676 7.32966 8.78053L7.38489 8.82844L9.71769 11.1719L12.0511 8.82844Z"
                        fill="currentColor"
                      />
                      <path
                        d="M3.18606 0.633301C3.43586 0.633301 3.64231 0.818932 3.67499 1.05978L3.67949 1.12673V10.086C3.67949 10.3585 3.45857 10.5794 3.18606 10.5794C2.93625 10.5794 2.7298 10.3938 2.69713 10.1529L2.69263 10.086V1.12673C2.69263 0.854218 2.91354 0.633301 3.18606 0.633301Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2.83653 0.778631C3.01188 0.602473 3.28705 0.586459 3.48055 0.730588L3.53596 0.778631L6.21877 3.47386C6.41102 3.66701 6.4103 3.97943 6.21716 4.17168C6.04157 4.34645 5.76741 4.36175 5.57457 4.21797L5.51934 4.17007L3.1861 1.82587L0.853156 4.17007C0.678382 4.34565 0.404293 4.36221 0.210792 4.21933L0.15534 4.17168C-0.0202437 3.99691 -0.0368025 3.72282 0.106079 3.52932L0.153727 3.47386L2.83653 0.778631Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </th>

                <th>
                  <div className="flex   items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                    <span>Name</span>
                  </div>
                </th>
                <th>
                  <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                    <span>Email Address</span>
                  </div>
                </th>
                <th>
                  <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                    <span>Phone Number</span>
                  </div>
                </th>
                <th>
                  <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                    <span>Birthday</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M9.71816 2.41846C9.96797 2.41846 10.1744 2.60409 10.2071 2.84493L10.2116 2.91189V11.8711C10.2116 12.1437 9.99068 12.3646 9.71816 12.3646C9.46836 12.3646 9.26191 12.1789 9.22924 11.9381L9.22473 11.8711V2.91189C9.22473 2.63937 9.44565 2.41846 9.71816 2.41846Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12.0511 8.82844C12.2433 8.63529 12.5558 8.63457 12.7489 8.82682C12.9245 9.0016 12.941 9.27569 12.7982 9.46919L12.7505 9.52464L10.0677 12.2199C9.89236 12.396 9.61718 12.412 9.42369 12.2679L9.36827 12.2199L6.68547 9.52464C6.49321 9.3315 6.49394 9.01907 6.68708 8.82682C6.86266 8.65205 7.13682 8.63676 7.32966 8.78053L7.38489 8.82844L9.71769 11.1719L12.0511 8.82844Z"
                        fill="currentColor"
                      />
                      <path
                        d="M3.18606 0.633301C3.43586 0.633301 3.64231 0.818932 3.67499 1.05978L3.67949 1.12673V10.086C3.67949 10.3585 3.45857 10.5794 3.18606 10.5794C2.93625 10.5794 2.7298 10.3938 2.69713 10.1529L2.69263 10.086V1.12673C2.69263 0.854218 2.91354 0.633301 3.18606 0.633301Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2.83653 0.778631C3.01188 0.602473 3.28705 0.586459 3.48055 0.730588L3.53596 0.778631L6.21877 3.47386C6.41102 3.66701 6.4103 3.97943 6.21716 4.17168C6.04157 4.34645 5.76741 4.36175 5.57457 4.21797L5.51934 4.17007L3.1861 1.82587L0.853156 4.17007C0.678382 4.34565 0.404293 4.36221 0.210792 4.21933L0.15534 4.17168C-0.0202437 3.99691 -0.0368025 3.72282 0.106079 3.52932L0.153727 3.47386L2.83653 0.778631Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                    <span>Gender</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M9.71816 2.41846C9.96797 2.41846 10.1744 2.60409 10.2071 2.84493L10.2116 2.91189V11.8711C10.2116 12.1437 9.99068 12.3646 9.71816 12.3646C9.46836 12.3646 9.26191 12.1789 9.22924 11.9381L9.22473 11.8711V2.91189C9.22473 2.63937 9.44565 2.41846 9.71816 2.41846Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12.0511 8.82844C12.2433 8.63529 12.5558 8.63457 12.7489 8.82682C12.9245 9.0016 12.941 9.27569 12.7982 9.46919L12.7505 9.52464L10.0677 12.2199C9.89236 12.396 9.61718 12.412 9.42369 12.2679L9.36827 12.2199L6.68547 9.52464C6.49321 9.3315 6.49394 9.01907 6.68708 8.82682C6.86266 8.65205 7.13682 8.63676 7.32966 8.78053L7.38489 8.82844L9.71769 11.1719L12.0511 8.82844Z"
                        fill="currentColor"
                      />
                      <path
                        d="M3.18606 0.633301C3.43586 0.633301 3.64231 0.818932 3.67499 1.05978L3.67949 1.12673V10.086C3.67949 10.3585 3.45857 10.5794 3.18606 10.5794C2.93625 10.5794 2.7298 10.3938 2.69713 10.1529L2.69263 10.086V1.12673C2.69263 0.854218 2.91354 0.633301 3.18606 0.633301Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2.83653 0.778631C3.01188 0.602473 3.28705 0.586459 3.48055 0.730588L3.53596 0.778631L6.21877 3.47386C6.41102 3.66701 6.4103 3.97943 6.21716 4.17168C6.04157 4.34645 5.76741 4.36175 5.57457 4.21797L5.51934 4.17007L3.1861 1.82587L0.853156 4.17007C0.678382 4.34565 0.404293 4.36221 0.210792 4.21933L0.15534 4.17168C-0.0202437 3.99691 -0.0368025 3.72282 0.106079 3.52932L0.153727 3.47386L2.83653 0.778631Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="flex pr-2  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                    <span>Action</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => (
                <ClientRow color={i % 2 !== 0} {...client} key={client.id} />
              ))}
            </tbody>
          </table>
          <div className="flex border border-grey px-4 w-fit rounded-md">
            <button className=" text-sm font-normal tracking-[0.25px] text-grey py-4 border-r border-r-grey pr-4">
              Previous
            </button>
            <button className=" pl-4 text-sm font-normal tracking-[0.25px] text-dark py-4 ">
              Next
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default ClientTable;
