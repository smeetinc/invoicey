import Link from "next/link";
import React from "react";
import InvoiceRow from "./InvoiceRow";

const SingleClientPage = () => {
  return (
    <>
      <h1 className="flex gap-4 items-center text-2xl font-medium text-dark mb-20">
        <Link href={"/client"}>Client</Link>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="16"
          viewBox="0 0 41 16"
          fill="none"
        >
          <path
            d="M40.7071 8.70711C41.0976 8.31658 41.0976 7.68342 40.7071 7.29289L34.3431 0.928932C33.9526 0.538408 33.3195 0.538408 32.9289 0.928932C32.5384 1.31946 32.5384 1.95262 32.9289 2.34315L38.5858 8L32.9289 13.6569C32.5384 14.0474 32.5384 14.6805 32.9289 15.0711C33.3195 15.4616 33.9526 15.4616 34.3431 15.0711L40.7071 8.70711ZM0 9H40V7H0V9Z"
            fill="black"
          />
        </svg>
        <span className="font-bold  tracking-[0.48px] text-primary">
          EP2347
        </span>
      </h1>
      <section className="max-w-5xl flex justify-between gap-32 mb-10">
        <div className="flex flex-col gap-4 flex-1">
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2 ">
            <span>Name : </span>
            <span className="text-dark font-bold">Yusuf Ibrahim</span>
          </div>
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2 ">
            <span>Email Address :</span>
            <span className="text-dark font-bold">yusuf@gmail.com</span>
          </div>
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2 ">
            <span>Phone Number :</span>
            <span className="text-dark font-bold">+2348034562781</span>
          </div>
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2 ">
            <span>Birthday :</span>
            <span className="text-dark font-bold">23/06/1889</span>
          </div>
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2 ">
            <span>Gender :</span>
            <span className="text-dark font-bold">Male</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2">
            <span>No of Invoice :</span>
            <span className="text-dark font-bold">5</span>
          </div>
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2">
            <span>Outstanding Invoice :</span>
            <span className="text-dark font-bold">2</span>
          </div>
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2">
            <span>Total Payment :</span>
            <span className="text-dark font-bold">₦3,000,000.00</span>
          </div>
          <div className="text-grey text-base font-medium tracking-[0.32px] grid grid-cols-2">
            <span>Last Activity :</span>
            <span className="text-dark font-bold">20/11/23</span>
          </div>
        </div>
      </section>
      <section className="py-7 px-6 rounded-xl border  border-grey">
        <div className="flex items-center gap-10 justify-between mb-5">
          <input
            className="py-2 pl-4 rounded-md border border-gray flex-1 max-w-lg"
            placeholder="Search by ID"
          />
        </div>
        <table className="w-full whitespace-nowrap overflow-auto max-w-7xl px-1 rounded-md border border-grey  mb-8  ">
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
                <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px]  py-4 ">
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
            <InvoiceRow color={true} />
            <InvoiceRow />
            <InvoiceRow color={true} />
            <InvoiceRow />
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
    </>
  );
};

export default SingleClientPage;
