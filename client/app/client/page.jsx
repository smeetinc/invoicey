import React from "react";
import { poppins } from "../layout";
export const metadata = {
  title: "Clients",
  description: "This is the clients page",
};
const Client = () => {
  return (
    <>
      <h1 className="font-clashDisplay text-dark text-[32px] font-medium tracking-sm mb-9">
        Clients
      </h1>
      <section className="py-7 px-6 rounded-xl border  border-grey">
        <div className="flex items-center gap-10 justify-between mb-5">
          <input
            className="py-2 pl-4 rounded-md border border-gray flex-1 max-w-lg"
            placeholder="Search by name"
          />
          <button
            className={`rounded-lg px-5 py-3 text-white bg-primary ${poppins.variable} font-poppins text-sm font-bold tracking-[-0.42px] w-4/5 max-w-[155px]`}
          >
            Add Client
          </button>
        </div>
        <table className="w-[40%] overflow-hidden max-w-xl rounded-md border border-grey  mb-8  ">
          <thead>
            <tr>
              <th>
                <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px] mr-10 py-4 pl-4 ">
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
                <div className="flex   items-center gap-2 text-dark font-bold text-base  tracking-[0.32px] mr-10 py-4 pl-4 ">
                  <span>Name</span>
                </div>
              </th>
              <th>
                <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px] mr-10 py-4 pl-4 ">
                  <span>Email Address</span>
                </div>
              </th>
              <th>
                <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px] mr-10 py-4 pl-4 ">
                  <span>Phone Number</span>
                </div>
              </th>
              <th>
                <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px] mr-10 py-4 pl-4 ">
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
                <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px] mr-10 py-4 pl-4 ">
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
                <div className="flex  items-center gap-2 text-dark font-bold text-base  tracking-[0.32px] mr-10 py-4 pl-4 ">
                  <span>Action</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-collapse border border-grey">
              <td>
                <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center">
                  <span>EP2347</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
                  <span>Yusuf Ibrahim</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
                  <span>Yusuf@gmail.com</span>
                </div>
              </td>
              <td>
                <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center ">
                  <span>+2348167435627</span>
                </div>
              </td>
              <td>
                <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] text-center mr-10 py-4 pl-4 ">
                  <span>23/06/1889</span>
                </div>
              </td>
              <td>
                <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center ">
                  <span>Female</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="16.5205"
                      cy="8.06543"
                      r="1"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="16.5205"
                      cy="24.0654"
                      r="1"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </td>
            </tr>
            <tr className="border-collapse border border-grey">
              <td>
                <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center">
                  <span>EP2347</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
                  <span>Yusuf Ibrahim</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
                  <span>Yusuf@gmail.com</span>
                </div>
              </td>
              <td>
                <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center ">
                  <span>+2348167435627</span>
                </div>
              </td>
              <td>
                <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] text-center mr-10 py-4 pl-4 ">
                  <span>23/06/1889</span>
                </div>
              </td>
              <td>
                <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center ">
                  <span>Female</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="16.5205"
                      cy="8.06543"
                      r="1"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="16.5205"
                      cy="24.0654"
                      r="1"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </td>
            </tr>
            <tr className="border-collapse border border-grey">
              <td>
                <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center">
                  <span>EP2347</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
                  <span>Yusuf Ibrahim</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
                  <span>Yusuf@gmail.com</span>
                </div>
              </td>
              <td>
                <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center ">
                  <span>+2348167435627</span>
                </div>
              </td>
              <td>
                <div className="   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] text-center mr-10 py-4 pl-4 ">
                  <span>23/06/1889</span>
                </div>
              </td>
              <td>
                <div className="  items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 text-center ">
                  <span>Female</span>
                </div>
              </td>
              <td>
                <div className="flex   items-center gap-2 text-dark font-normal text-sm  tracking-[0.28px] mr-10 py-4 pl-4 ">
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="16.5205"
                      cy="8.06543"
                      r="1"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="16.5205"
                      cy="24.0654"
                      r="1"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </td>
            </tr>
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

export default Client;
