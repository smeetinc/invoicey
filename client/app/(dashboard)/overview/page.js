"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { LuArrowUpDown } from "react-icons/lu";
import "./table.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { withAuth } from "@/utils/withAuth";

function overview() {
  let entries = [
    [
      {
        id: 1,
        name: "john",
        status: "paid",
        style: "bg-success",
      },
    ],
    [
      {
        id: 2,
        name: "john",
        status: "pending",
        style: "bg-warning",
      },
    ],
    [
      {
        id: 3,
        name: "john",
        status: "unpaid",
        style: "bg-error",
      },
    ],
    [
      {
        id: 4,
        name: "john",
      },
    ],
    [
      {
        id: 5,
        name: "john",
      },
    ],
    [
      {
        id: 6,
        name: "john",
      },
    ],
    [
      {
        id: 7,
        name: "john",
      },
    ],
    [
      {
        id: 8,
        name: "john",
      },
    ],
    [
      {
        id: 9,
        name: "john",
      },
    ],
    [
      {
        id: 10,
        name: "john",
      },
    ],
    [
      {
        id: 11,
        name: "john",
      },
    ],
    [
      {
        id: 12,
        name: "john",
      },
    ],
    [
      {
        id: 13,
        name: "john",
      },
    ],
    [
      {
        id: 14,
        name: "john",
      },
    ],
  ];

  let Total = entries.length;
  console.log(Total);
  console.log(entries[3][0].id);
  let page = 3;
  let per_page = 5;
  let start = (page - 1) * per_page;
  let end = Math.min(start + per_page, Total);
  let paginated_entries = entries.slice(start, end);
  const route = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const getOverview = async () => {
      try {
        const token = localStorage.getItem("invc");
        if (!token) return;
        const res = await axios.get(
          `https://olatidejosepha.pythonanywhere.com/api/overview-data/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Activated: "ccrf",
            },
            withCredentials: true,
            signal: controller.signal,
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error.message, error);
      }
    };
    getOverview();
    return () => controller.abort();
  }, []);
  return (
    <div className="flex">
      {/*----Main screen for overview here ----*/}
      <div className="w-full px-8">
        <div className="flex flex-row-reverse gap-1 border-b-2 w-full py-4">
          <Image
            src="/assets/Mask.png"
            width={32}
            height={32}
            alt="avatar"
            className="mr-4"
          />
        </div>
        <div className="px-4 py-2 flex justify-between">
          <h2>Overview</h2>
          <select>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4 mx-auto my-3 px-4">
          <div className="bg-accent text-primary py-10 px-8 rounded-lg text-center">
            <h3>Total No of Invoice Paid</h3>
            <p className="font-bold text-center">{20}</p>
          </div>
          <div className="bg-primary text-white py-10 px-8 rounded-lg text-center">
            <h3>No of Overdue payment</h3>
            <p className="font-bold text-center text-accent">{10}</p>
          </div>
          <div className="bg-accent text-primary py-10 px-8 rounded-lg text-center">
            <h3>Total Amount Received</h3>
            <p className="font-bold text-center">&#8358; {"200,800.00"}</p>
          </div>
        </div>
        <div className="flex justify-between px-4">
          <h3>Invoice Transactions</h3>
          <p>View all</p>
        </div>
        <div className="border-2 p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search by Name"
              className=" border-2 border-primary rounded py-2 px-3 text-dark leading-tight focus:outline-primary focus:shadow-outline"
            />
            <select className="border-2 border-primary outline-primary rounded py-2 px-3 text-dark leading-tight focus:outline-primary focus:shadow-outline">
              <option>Filter by status</option>
            </select>
          </div>
          <div className="mx-auto w-full border-2 rounded-lg my-4">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 pt-2 pb-1 text-left">
                  <th className="py-2 pl-2">
                    <div className="flex space-x-1 items-center">
                      <span>Transaction ID </span>
                      <LuArrowUpDown />
                    </div>
                  </th>
                  <th>
                    <div className="flex space-x-1 items-center">
                      <span>Invoice ID </span>
                      <LuArrowUpDown />
                    </div>
                  </th>
                  <th>Name</th>
                  <th>
                    <div className="flex space-x-1 items-center">
                      <span>Payment Date</span>
                      <LuArrowUpDown />
                    </div>
                  </th>
                  <th>Payment Type</th>
                  <th>Amount</th>
                  <th>
                    <div className="flex space-x-1 items-center">
                      <span>Status</span>
                      <LuArrowUpDown />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated_entries.map((item) => (
                  <tr key={item[0].id}>
                    <td>{item[0].id}</td>
                    <td>{item[0].name}</td>
                    <td>{item[0].id}</td>
                    <td>{item[0].id}</td>
                    <td>{item[0].id}</td>
                    <td>{item[0].id}</td>
                    <td>
                      <div
                        className={
                          "text-white w-fit text-center px-4 py-2 rounded-md my-2" +
                          " " +
                          item[0].style
                        }
                      >
                        {item[0].id}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>kkkkk</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex my-2">
            {end < 6 ? (
              <button
                type="button"
                className="rounded-l-md border-2 py-2 px-3"
                disabled
              >
                Previous
              </button>
            ) : (
              <button type="button" className="rounded-l-md border-2 py-2 px-3">
                Previous
              </button>
            )}
            {end == Total ? (
              <button className="rounded-r-lg border-2 px-3 py-2" disabled>
                Next
              </button>
            ) : (
              <button className="rounded-r-lg border-2 px-3 py-2">Next</button>
            )}
          </div>
        </div>
      </div>
      {/*----main screen for overview ends ----*/}
    </div>
  );
}

export default overview;
