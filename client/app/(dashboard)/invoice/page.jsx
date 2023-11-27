"use client";
import InvoiceRow from "./InvoiceRow";
import { poppins } from "@/utils/fonts";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema } from "@/utils/schemas";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { withAuth } from "@/utils/withAuth";
const AddInvoiceModal = ({ isOpen, closeModal, getInvoices }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(invoiceSchema) });
  const [clients, setClients] = useState([]);
  const [sending, setSending] = useState(false);
  useEffect(() => {
    const getClients = async () => {
      try {
        const res = await axios.get(
          "https://olatidejosepha.pythonanywhere.com/api/all-client-data/?page=1",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("invc")}`,
              Accept: "application/json",
            },
          }
        );
        console.log(res.data);
        setClients(res.data.clients);
      } catch (error) {
        console.log(error);
      }
    };
    getClients();
  }, []);
  const submitHandler = async (data) => {
    const date = new Date(data.dueDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const mainData = {
      product_name: data.paymentFor,
      description: data.description,
      client_name: data.clientName,
      amount: data.amount,
      has_paid: false,
      due_date: `${day}/${month}/${year}`,
      py_type: "Transfer",
    };
    console.log(mainData);
    try {
      setSending(true);
      const res = await axios.post(
        `https://olatidejosepha.pythonanywhere.com/api/invoice/`,
        JSON.stringify(mainData),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("invc")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      getInvoices(localStorage.getItem("invc"));
      toast.success("Invoice Created");
      resetAndCloseModal();
    } catch (error) {
      console.log(error.message);
    } finally {
      setSending(false);
    }
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
        <Dialog.Panel className="bg-white text-dark p-6 rounded-lg w-[90%] max-w-2xl relative ">
          {sending && (
            <div className="bg-white/50 inset-0 w-full h-full grid place-items-center z-50 absolute">
              <Loader />
            </div>
          )}
          <Dialog.Title className={"flex items-start justify-between mb-5"}>
            <div>
              <div className="p-3 rounded-xl border border-[#E4E7EC] mb-4 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M14.0913 6.72222H20.0451C20.5172 6.72222 20.7533 6.72222 20.8914 6.82149C21.0118 6.9081 21.0903 7.04141 21.1075 7.18877C21.1272 7.35767 21.0125 7.56403 20.7832 7.97677L19.3624 10.5343C19.2792 10.684 19.2376 10.7589 19.2213 10.8381C19.2069 10.9083 19.2069 10.9806 19.2213 11.0508C19.2376 11.13 19.2792 11.2049 19.3624 11.3545L20.7832 13.9121C21.0125 14.3248 21.1272 14.5312 21.1075 14.7001C21.0903 14.8475 21.0118 14.9808 20.8914 15.0674C20.7533 15.1667 20.5172 15.1667 20.0451 15.1667H12.6135C12.0224 15.1667 11.7268 15.1667 11.501 15.0516C11.3024 14.9504 11.1409 14.7889 11.0397 14.5903C10.9247 14.3645 10.9247 14.0689 10.9247 13.4778V10.9444M7.23021 21.5L3.00799 4.61111M4.59137 10.9444H12.4024C12.9936 10.9444 13.2892 10.9444 13.515 10.8294C13.7136 10.7282 13.8751 10.5667 13.9763 10.3681C14.0913 10.1423 14.0913 9.84672 14.0913 9.25556V4.18889C14.0913 3.59772 14.0913 3.30214 13.9763 3.07634C13.8751 2.87773 13.7136 2.71625 13.515 2.61505C13.2892 2.5 12.9936 2.5 12.4024 2.5H4.64329C3.90596 2.5 3.53729 2.5 3.28514 2.65278C3.06414 2.78668 2.89993 2.99699 2.82363 3.24387C2.73657 3.52555 2.82599 3.88321 3.00483 4.59852L4.59137 10.9444Z"
                    stroke="#344054"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-base font-bold mb-1 tracking-[0.32px]">
                Add Invoice
              </h1>
              <p className="text-dark text-sm tracking-wider leading-6 font-normal">
                Create an invoice and it will be sent to your client email
                directly.
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
                <select
                  placeholder="Toyosi Lawal"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  id="name"
                  {...register("clientName", { required: true })}
                >
                  <option
                    value=""
                    className="text-grey"
                    selected
                    hidden
                    disabled
                  >
                    Select Client Name
                  </option>
                  {clients.map((client) => (
                    <option value={client.name} key={client.id}>
                      {client.name}
                    </option>
                  ))}
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
const Invoice = () => {
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const openAddInvoiceModal = () => {
    setShowAddInvoice(true);
  };
  const closeAddInvoiceModal = () => {
    setShowAddInvoice(false);
  };
  const getInvoices = async (token) => {
    try {
      const res = await axios.get(
        "https://olatidejosepha.pythonanywhere.com/api/invoices-data/?page=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoices(res.data.invoices);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInvoices(localStorage.getItem("invc"));
  }, []);
  return (
    <>
      <AddInvoiceModal
        isOpen={showAddInvoice}
        closeModal={closeAddInvoiceModal}
      />
      <section className="flex justify-between items-center">
        <h1 className="font-clashDisplay text-dark text-[32px] font-medium tracking-sm mb-9">
          Invoice
        </h1>
        <select
          name="sortDate"
          className="bg-background text-grey w-[50%] max-w-[290px] rounded-md  px-3 py-4"
        >
          <option value="" selected disabled hidden>
            {" "}
            Sort by Date
          </option>
        </select>
      </section>
      <section className="py-7 px-6 rounded-xl border  border-grey">
        <div className="flex items-center justify-between mb-5  w-full">
          <input
            className="py-2 pl-4 rounded-md border border-gray flex-1 max-w-sm"
            placeholder="Search by name"
          />
          <div className="flex w-[40%] items-center gap-6 justify-end">
            <select
              name="sortDate"
              className="bg-background border border-dark  text-dark font-semibold text-base max-w-xl w-1/2 rounded-md  px-5 py-3"
            >
              <option value="" selected disabled hidden>
                {" "}
                Filter By Status
              </option>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            <button
              className={`rounded-lg whitespace-nowrap px-5 py-3  text-white bg-primary ${poppins.variable} font-poppins text-sm font-bold tracking-[-0.42px] max-w-[155px]`}
              onClick={openAddInvoiceModal}
            >
              Add Invoice
            </button>
          </div>
        </div>
        {invoices.length > 0 && (
          <>
            <table className="w-full overflow-auto max-w-7xl px-1 rounded-md border border-grey  mb-8  ">
              <thead>
                <tr>
                  <th>
                    <div className="flex text-centerx   pl-4  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 whitespace-nowrap">
                      <span>Invoice ID</span>
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
                    <div className="flex justify-center   items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                      <span>Created</span>
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
                    <div className="flex justify-center  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                      <span>Due date</span>
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
                    <div className="flex justify-center  text-center mx-4  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                      <span>Description</span>
                    </div>
                  </th>
                  <th>
                    <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                      <span>Amount</span>
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
                    <div className="flex justify-center  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
                      <span>Status</span>
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
                {invoices.map((invoice, i) => (
                  <InvoiceRow
                    color={i % 2 !== 0}
                    invoice={invoice}
                    getInvoices={getInvoices}
                  />
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
          </>
        )}
      </section>
    </>
  );
};

export default withAuth(Invoice);
