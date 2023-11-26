"use client";
import { invoiceSchema } from "@/utils/schemas";
import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const AddInvoiceModal = ({ isOpen, closeModal }) => {
  const formRef = useRef(null);
  const [bankList, setBankList] = useState([]);
  const [selectedBankCode, setSelectedBankCode] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const resetAndCloseModal = () => {
    formRef.current?.reset();
    closeModal();
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!selectedBankCode) {
      toast.error("Select Your Bank");
    }
    if (!accountNumber || accountNumber.trim().length !== 10) {
      toast.error("Invalid Account Number");
      return;
    }
    if (!accountDetails) {
      toast.error("Invalid Account Details");
      return;
    }

    const data = {
      acct_num: accountNumber,
      acct_name: accountDetails?.account_name,
      bank_name: accountDetails?.Bank_name,
      bank_code: selectedBankCode,
      first_name: accountDetails?.first_name,
      last_name: accountDetails?.last_name,
      other: accountDetails?.other_name || "",
    };
    try {
      const token = localStorage.getItem("invc");
      const jsonData = JSON.stringify(data);
      const res = await axios.post(
        "https://olatidejosepha.pythonanywhere.com/api/bank/",
        jsonData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Account Added");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch(`https://api.paystack.co/bank`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          },
        });
        const data = await res.json();
        setBankList(data.data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBanks();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const getAccountDetails = async () => {
      if (accountNumber.trim().length !== 10) return;

      try {
        const res = await axios.get(
          `https://nubapi.com/api/verify?account_number=${accountNumber}&bank_code=${selectedBankCode}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_NUBAPI_KEY}`,
            },
            signal: controller.signal,
          }
        );
        const { data } = res;
        setAccountDetails(data);
      } catch (error) {
        console.log(error, error.message);
      }
    };
    getAccountDetails();
    return () => controller.abort();
  }, [accountNumber]);
  return (
    <Dialog open={isOpen} onClose={resetAndCloseModal}>
      <div
        className="fixed z-50 inset-0 bg-black/30 w-screen h-screen grid place-items-center"
        aria-hidden="true"
      >
        <Dialog.Panel className="bg-white text-dark p-6 rounded-lg w-[90%] max-w-2xl ">
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
                Add Payment Account
              </h1>
              <p className="text-dark text-sm tracking-wider leading-6 font-normal">
                Add account you will like your money to go into.
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
          <form onSubmit={submitHandler} ref={formRef}>
            <div className="grid grid-cols-2 gap-8  mb-8">
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="name"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Bank
                </label>
                <select
                  placeholder="Toyosi Lawal"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  id="name"
                  onChange={(e) => setSelectedBankCode(e.target.value)}
                >
                  <option
                    value=""
                    className="text-grey"
                    hidden
                    disabled
                    selected
                  >
                    Select Bank
                  </option>
                  {bankList.map((bank) => (
                    <option key={bank?.id} value={bank?.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="dueDate"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Accout Number
                </label>
                <input
                  placeholder="1238756792"
                  type="text"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal read-only:bg-white/60"
                  id="dueDate"
                  readOnly={!selectedBankCode}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2  ">
                <label
                  htmlFor="account_name"
                  className="text-sm text-dark  font-medium leading-6"
                >
                  Account Name
                </label>
                <input
                  name="account_name"
                  id="account_name"
                  className="px-4 py-3 rounded-lg border border-[#D0D5DD] shadow-sm placeholder:text-grey text-dark text-base leading-6 font-normal"
                  readOnly
                  value={accountDetails?.account_name}
                />
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
const Profile = () => {
  const [showAddAccount, SetShowAccount] = useState(false);
  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="16"
          viewBox="0 0 31 16"
          fill="none"
        >
          <path
            d="M0.292891 7.29289C-0.0976334 7.68342 -0.0976334 8.31658 0.292891 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292891 7.29289ZM31 7H0.999998V9H31V7Z"
            fill="#333333"
          />
        </svg>
        <h1 className="font-clashDisplay font-medium text-dark tracking-widest text-4xl">
          Profile
        </h1>
      </div>
      <section className="flex ">
        <div className="basis-1/3"></div>
        <div className="flex-1">
          <nav className="mb-6">
            <ul className="flex gap-9 px-8 py-4 bg-background">
              <li className="text-primary font-bold text-base tracking-wider">
                Payment
              </li>
              <li className="text-grey font-normal  text-base leading-6 tracking-wider">
                Settings
              </li>
              <li className="text-grey font-normal  text-base leading-6 tracking-wider">
                Others
              </li>
            </ul>
          </nav>
          <div className="px-5 flex flex-col justify-between gap-32">
            <p className="text-black text-base font-medium leading-8 tracking-wide max-w-[657px]">
              Your payment information is encrypted and securely stored. You can
              manage and update your payment account anytime.
            </p>
            <div className="w-fit mx-auto">
              <p className="text-black text-base font-medium leading-8 tracking-wide max-w-[657px] text-center mb-5">
                No Payment Account Yet
              </p>
              <button
                className="text-white bg-primary  font-semibold text-base text-center leading-7 tracking-wide grid place-items-center px-10 py-3  rounded-lg w-fit max-w-[500px]"
                onClick={() => SetShowAccount(true)}
              >
                Add Payment Account
              </button>
            </div>
          </div>
        </div>
      </section>
      <AddInvoiceModal
        closeModal={() => SetShowAccount(false)}
        isOpen={showAddAccount}
      />
    </>
  );
};

export default Profile;
