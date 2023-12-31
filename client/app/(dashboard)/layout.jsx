"use client";
import { poppins } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [active, setActive] = useState("/overview");
  const { replace } = useRouter();
  const handleClick = (path) => {
    setActive(path);
  };
  return (
    <div className=" flex min-h-screen">
      <header className="basis-1/5 bg-primary py-12 pl-9 sticky h-screen top-0 bottom-0 left-0">
        <h1 className="text-secondary font-clashDisplay text-4xl font-bold tracking-wide mb-14">
          INVOICEY
        </h1>
        <nav>
          <ul className="flex flex-col gap-7 [&>*]:cursor-pointer">
            <li
              className={`${poppins.variable} font-poppins text-background text-base font-semibold flex gap-3 items-center`}
            >
              <Link
                href={"/overview"}
                className={
                  active === "/overview"
                    ? "font-poppins text-secondary text-base font-semibold flex gap-[14.62px] items-center"
                    : "font-poppins text-background text-base font-semibold flex gap-[14.62px] items-center hover:text-secondary"
                }
                onClick={() => handleClick("/overview")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3.33333 14C2.96667 14 2.65267 13.8693 2.39133 13.608C2.13 13.3467 1.99956 13.0329 2 12.6667V8.5H6.66667V14H3.33333ZM8 14V8.5H14V12.6667C14 13.0333 13.8693 13.3473 13.608 13.6087C13.3467 13.87 13.0329 14.0004 12.6667 14H8ZM2 7.16667V3.33333C2 2.96667 2.13067 2.65267 2.392 2.39133C2.65333 2.13 2.96711 1.99956 3.33333 2H12.6667C13.0333 2 13.3473 2.13067 13.6087 2.392C13.87 2.65333 14.0004 2.96711 14 3.33333V7.16667H2Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={`${poppins.variable} `}>
              <Link
                href={"/client"}
                className={
                  active === "/client"
                    ? "font-poppins text-secondary text-base font-semibold flex gap-[14.62px] items-center"
                    : "font-poppins text-background text-base font-semibold flex gap-[14.62px] items-center hover:text-secondary"
                }
                onClick={() => handleClick("/client")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                >
                  <path
                    d="M7.96647 7.44341C10.2539 7.44341 12.2071 7.80605 12.2071 9.25723C12.2071 10.7078 10.2665 11.0837 7.96647 11.0837C5.67901 11.0837 3.72584 10.721 3.72584 9.27044C3.72584 7.81926 5.66648 7.44341 7.96647 7.44341ZM11.6238 6.56958C12.4983 6.55337 13.4385 6.67345 13.7859 6.75871C14.522 6.9034 15.0061 7.1988 15.2066 7.62809C15.3762 7.98053 15.3762 8.3894 15.2066 8.74124C14.8998 9.40709 13.9107 9.62083 13.5263 9.67607C13.4469 9.68808 13.383 9.61903 13.3914 9.53918C13.5877 7.69414 12.0256 6.81935 11.6214 6.61821C11.6041 6.6092 11.6005 6.5954 11.6023 6.58699C11.6035 6.58099 11.6107 6.57138 11.6238 6.56958ZM4.21284 6.56833L4.37751 6.56982C4.39065 6.57162 4.39721 6.58123 4.39841 6.58663C4.4002 6.59564 4.39662 6.60884 4.3799 6.61845C3.97518 6.81959 2.413 7.69438 2.60939 9.53882C2.61775 9.61927 2.55447 9.68772 2.47508 9.67631C2.09066 9.62107 1.10153 9.40733 0.794709 8.74148C0.624583 8.38904 0.624583 7.98077 0.794709 7.62833C0.995279 7.19904 1.4788 6.90364 2.21482 6.75834C2.56283 6.67369 3.50241 6.55361 4.37751 6.56982L4.21284 6.56833ZM7.96647 0.416992C9.52387 0.416992 10.7727 1.67184 10.7727 3.23889C10.7727 4.80535 9.52387 6.0614 7.96647 6.0614C6.40906 6.0614 5.16028 4.80535 5.16028 3.23889C5.16028 1.67184 6.40906 0.416992 7.96647 0.416992ZM11.776 0.887589C13.2803 0.887589 14.4617 2.31115 14.0593 3.89682C13.7877 4.96434 12.8046 5.67341 11.7092 5.64459C11.5994 5.64159 11.4913 5.63139 11.3868 5.61337C11.311 5.60016 11.2728 5.51431 11.3158 5.45066C11.7337 4.83225 11.9718 4.08835 11.9718 3.28981C11.9718 2.45645 11.7116 1.67952 11.2597 1.04249C11.2454 1.02268 11.2346 0.99206 11.249 0.969244C11.2609 0.950632 11.283 0.941025 11.3039 0.936222C11.4561 0.905001 11.6125 0.887589 11.776 0.887589ZM4.2244 0.887529C4.38796 0.887529 4.54436 0.904941 4.69717 0.936162C4.71747 0.940965 4.74015 0.951172 4.75209 0.969184C4.76582 0.992 4.75567 1.02262 4.74135 1.04243C4.28947 1.67946 4.0292 2.45639 4.0292 3.28975C4.0292 4.08829 4.26738 4.83219 4.68523 5.4506C4.72821 5.51425 4.69001 5.6001 4.6142 5.61331C4.50914 5.63193 4.40169 5.64153 4.29185 5.64453C3.19648 5.67335 2.21333 4.96428 1.94172 3.89676C1.53879 2.31109 2.72012 0.887529 4.2244 0.887529Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Clients</span>
              </Link>
            </li>
            <li className={`${poppins.variable}`}>
              <Link
                href={"/invoice"}
                className={
                  active === "/invoice"
                    ? "font-poppins text-secondary text-base font-semibold flex gap-[14.62px] items-center"
                    : "font-poppins text-background text-base font-semibold flex gap-[14.62px] items-center hover:text-secondary"
                }
                onClick={() => handleClick("/invoice")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M14.0005 10.75V14.088C14.0004 14.2635 13.9305 14.4318 13.8064 14.5559C13.6823 14.68 13.514 14.7498 13.3385 14.75H2.66253C2.48701 14.7498 2.31873 14.68 2.19462 14.5559C2.07051 14.4318 2.00071 14.2635 2.00053 14.088V10.75H14.0005ZM1.33386 8.08333H14.6672V9.41667H1.33386V8.08333ZM14.0005 6.75H2.00053V3.412C2.00053 3.04667 2.2972 2.75 2.66253 2.75H13.3385C13.7039 2.75 14.0005 3.04667 14.0005 3.412V6.75Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Invoice</span>
              </Link>
            </li>
            <li className={`${poppins.variable} mt-80`}>
              <Link
                href={"/"}
                className={
                  active === "/logout"
                    ? "font-poppins text-secondary text-base font-semibold flex gap-[14.62px] items-center"
                    : "font-poppins text-background text-base font-semibold flex gap-[14.62px] items-center hover:text-secondary"
                }
                onClick={() => {
                  handleClick("/logout");
                  localStorage.setItem("invc", "");
                  replace("/");
                }}
              >
                <svg
                  fill="none"
                  width="16"
                  height="17"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path
                    d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"
                    fill="currentColor"
                  />
                </svg>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1">
        <section className="min-h-[60px] border-b border-b-grey w-full mb-5">
          <Link
            href={"/profile"}
            className="flex flex-row-reverse gap-1 border-b-2 w-full py-4"
          >
            <Image
              src="/assets/Mask.png"
              width={32}
              height={32}
              alt="avatar"
              className="mr-4"
            />
          </Link>
        </section>
        <section className="mx-10 overflow-x-hidden">{children}</section>
      </main>
    </div>
  );
}
