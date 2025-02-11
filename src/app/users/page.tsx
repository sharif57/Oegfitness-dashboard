"use client";

import { MetricCard } from "@/components/MetricCard";
import { RecentItemsTable } from "@/components/RecentItemsTable";
import { ArrowLeft, Info } from "lucide-react";
import React, { use, useState } from "react";
import { Button, Modal } from "antd";
import { useGetAllUsersQuery } from "@/redux/features/users/UserAPI";

interface RecentItem {
  id: string;
  userName: string;
  date: string;
  amount: string;
  status: string;
}

const metrics = [
  { title: "Total User", value: 3520 },
  { title: "Total Earnings", value: 81230 },
  { title: "Total Subscription", value: 856330 },
];

const recentItems: RecentItem[] = [
  {
    id: "1",
    userName: "John Doe",
    date: "2024-02-03",
    amount: "$120",
    status: "Completed",
  },
  {
    id: "2",
    userName: "Bon Uoe",
    date: "2024-02-03",
    amount: "$120",
    status: "Incompleted",
  },
  {
    id: "3",
    userName: "Niha Doe",
    date: "2024-02-03",
    amount: "$120",
    status: "Completed",
  },
];

interface ICurrentUser {
  id: string;
  userName: string;
  date: string;
  amount: string;
  status: string;
}

const Earnings = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  const { data: users, isLoading, isError } = useGetAllUsersQuery();

  console.log({ users });

  const showModal = (item?: ICurrentUser | null) => {
    setOpen(true);
    setCurrentUser(item);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      {/* modal for user info */}
      <>
        <Button type='primary' onClick={() => showModal(null)}>
          Open Modal with async logic
        </Button>
        <Modal
          // title='Title'
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >
          <div>
            <h2 className='text-2xl font-semibold text-[#1A1918] text-center my-3'>
              User Details
            </h2>

            <div className='flex flex-col space-y-4'>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>User ID: </p>
                <p className='text-lg text-[#737163]'> #3432</p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>Date </p>
                <p className='text-lg text-[#737163]'> 01-24-2024</p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>User Name </p>
                <p className='text-lg text-[#737163]'> Enrique</p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  A/C number{" "}
                </p>
                <p className='text-lg text-[#737163]'> **** **** **** *545</p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>User Name</p>
                <p className='text-lg text-[#737163]'> Jamse smith</p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  Transaction Amount
                </p>
                <p className='text-lg text-[#737163]'>$50</p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  Subscription Purchased
                </p>
                <p className='text-lg text-[#737163]'>Basic</p>
              </div>
            </div>

            <button className='bg-[#01336F] hover:bg-[#01336F] text-white py-2 mt-5 mb-2 w-full rounded'>
              Download
            </button>
          </div>
        </Modal>
      </>

      <div className='flex min-h-screen flex-col bg-gray-50 lg:flex-row'>
        <div className='flex flex-1 flex-col'>
          <main className='flex-1 overflow-x-hidden overflow-y-auto p-4 pb-20 lg:pb-4'>
            <div className='space-y-6'>
              {/* Overview Section */}
              <section>
                <h2 className='flex items-center gap-2 mb-4 text-lg font-semibold lg:text-xl'>
                  <ArrowLeft className='cursor-pointer' /> Overview
                </h2>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-[90%] mx-auto'>
                  {metrics.map((metric) => (
                    <MetricCard key={metric.title} {...metric} />
                  ))}
                </div>
              </section>

              {/* Recent Items Section */}
              <section>
                <h2 className='mb-4 text-lg text-[#1A1918] bg-[#F2F5F7] font-medium lg:text-2xl'>
                  Recent Items
                </h2>
                <div className='rounded-lg bg-white shadow-sm'>
                  {/* <RecentItemsTable items={recentItems} showModal={showModal} /> */}

                  <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-[#002B5B] text-white'>
                        <tr>
                          <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
                            User Name
                          </th>
                          <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
                            Date
                          </th>
                          <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
                            Amount
                          </th>
                          <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
                            Status
                          </th>
                          <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white'>
                        {recentItems.map((item) => (
                          <tr key={item.id}>
                            <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-lg text-[#1A1918]'>
                              {item.userName}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-lg text-[#1A1918]'>
                              {item.date}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-lg text-[#1A1918]'>
                              {item.amount}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-lg text-[#1A1918]'>
                              <span
                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                  item.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-400 text-white"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-sm'>
                              <button
                                title='Click to view user details'
                                className='rounded-full p-1 hover:bg-gray-100'
                              >
                                <span className='sr-only'>View details</span>
                                <Info onClick={() => showModal(item)} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Earnings;
