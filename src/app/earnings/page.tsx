"use client";

// import { EarningsChart } from "@/components/EarningChart";
import { MetricCard } from "@/components/MetricCard";
import Overview from "@/components/Overview";
import { RecentItemsTable } from "@/components/RecentItemsTable";
import RecentTransection from "@/components/RecentTransection";
import { useGetAllEarningQuery } from "@/redux/features/payment/PaymentAPI";
import { Modal } from "antd";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

interface RecentItem {
  id: string;
  userName: string;
  date: string;
  amount: string;
  status: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface ICurrentUser {
  _id: string;
  transactionId: string;
  appointmentPrice: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface RecentItemsTableProps {
  items: RecentItem[];
  showModal: (item: ICurrentUser) => void;
}

const metrics = [
  { title: "Total User", value: 3520 },
  { title: "Total Earnings", value: 81230 },
  { title: "Total Subscription", value: 856330 },
];

// const earningsData: EarningsData[] = [
//   { month: "Jan", amount: 1000 },
//   { month: "Feb", amount: 1500 },
//   { month: "Mar", amount: 1200 },
//   { month: "Apr", amount: 1800 },
//   { month: "May", amount: 2000 },
//   { month: "Jun", amount: 1600 },
//   { month: "Jul", amount: 1900 },
//   { month: "Aug", amount: 2200 },
//   { month: "Sep", amount: 1700 },
//   { month: "Oct", amount: 2100 },
//   { month: "Nov", amount: 1800 },
//   { month: "Dec", amount: 2400 },
// ];

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

const Earnings = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data: earnings, isLoading, isError } = useGetAllEarningQuery();
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  if (isLoading) {
    return (
      <div className='text-center text-blue-600 font-semibold'>Loading...</div>
    );
  }

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModalX = (item: ICurrentUser) => {
    setOpen(!open);
    setCurrentUser(item);
  };


  return (
    <div className='flex min-h-screen flex-col bg-gray-50 lg:flex-row'>
      {/* modal */}
      <>
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
              Transaction Details
            </h2>

            <div className='flex flex-col space-y-4'>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>User ID: </p>
                <p className='text-lg text-[#737163]'>
                  {" "}
                  {currentUser?.transactionId}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>Date </p>
                <p className='text-lg text-[#737163]'>
                  {currentUser?.createdAt?.split("T")[0]}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>User Name </p>
                <p className='text-lg text-[#737163]'>
                  {" "}
                  {currentUser?.user?.name}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  A/C number{" "}
                </p>
                {/* <p className='text-lg text-[#737163]'> **** **** **** *545</p> */}
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>A</p>
                {/* <p className='text-lg text-[#737163]'> Jamse smith</p> */}
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  Transaction Amount
                </p>
                <p className='text-lg text-[#737163]'>
                  ${currentUser?.appointmentPrice}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  Subscription Purchased
                </p>
                {/* <p className='text-lg text-[#737163]'>Basic</p> */}
              </div>
            </div>

            <button className='bg-[#01336F] hover:bg-[#01336F] text-white py-2 mt-5 mb-2 w-full rounded'>
              Download
            </button>
          </div>
        </Modal>
      </>

      <div className='flex flex-1 flex-col'>
        <main className='flex-1 overflow-x-hidden overflow-y-auto p-4 pb-20 lg:pb-4'>
          <div className='space-y-6'>
            {/* Overview Section */}
            <Overview />

            {/* Earnings Section */}
            <section>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg text-[#181414] lg:text-[29px]'>
                  Earnings
                </h2>
                <select className='rounded-lg border text-gray-900 border-gray-300 px-2 py-1 text-sm'>
                  <option>2024 May</option>
                </select>
              </div>
            </section>

            {/* Recent Items Section */}
            <section>
              <RecentTransection />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Earnings;
