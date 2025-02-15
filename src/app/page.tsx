"use client"

import React from "react";
import { MetricCard } from "@/components/MetricCard";
import { EarningsChart } from "@/components/EarningChart";
import { RecentItemsTable } from "@/components/RecentItemsTable";
import { ArrowLeft } from "lucide-react";
import Overview from "@/components/Overview";

interface EarningsData {
  month: string;
  amount: number;
}

interface RecentItem {
  id: string;
  userName: string;
  date: string;
  amount: string;
  status: string;
  transactionId: string;
  user: { name: string };
  appointmentPrice: string;
  createdAt: string;
}

// Mock data - In a real app, this would come from an API
const metrics = [
  { title: "Total User", value: 3520 },
  { title: "Total Earnings", value: 81230 },
  { title: "Total Subscription", value: 856330 },
];

const earningsData: EarningsData[] = [
  { month: "Jan", amount: 1000 },
  { month: "Feb", amount: 1500 },
  { month: "Mar", amount: 1200 },
  { month: "Apr", amount: 1800 },
  { month: "May", amount: 2000 },
  { month: "Jun", amount: 1600 },
  { month: "Jul", amount: 1900 },
  { month: "Aug", amount: 2200 },
  { month: "Sep", amount: 1700 },
  { month: "Oct", amount: 2100 },
  { month: "Nov", amount: 1800 },
  { month: "Dec", amount: 2400 },
];

const recentItems: RecentItem[] = [
  {
    id: "1",
    userName: "John Doe",
    date: "2024-02-03",
    amount: "$120",
    status: "Completed",
    transactionId: "T123",
    user: { name: "John" },
    appointmentPrice: "$100",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    userName: "Bon Uoe",
    date: "2024-02-03",
    amount: "$120",
    status: "Incompleted",
    transactionId: "T124",
    user: { name: "Bon" },
    appointmentPrice: "$100",
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    userName: "Niha Doe",
    date: "2024-02-03",
    amount: "$120",
    status: "Completed",
    transactionId: "T125",
    user: { name: "Niha" },
    appointmentPrice: "$100",
    createdAt: "2024-01-03",
  },
];

export default function DashboardPage() {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50 lg:flex-row'>
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
                <select className='rounded-lg border border-gray-300 px-2 py-1 text-sm'>
                  <option>2024 May</option>
                </select>
              </div>
              <div className='rounded-lg bg-white p-4 shadow-sm'>
                <div className='h-[250px] lg:h-[300px]'>
                  <EarningsChart data={earningsData} />
                </div>
              </div>
            </section>

            {/* Recent Items Section */}
            <section>
              <h2 className='mb-4 text-lg texty-[#1A1918] font-medium lg:text-2xl'>
                Recent Items
              </h2>
              {/* <div className='rounded-lg bg-white shadow-sm'>
                <RecentItemsTable items={recentItems} />
              </div> */}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
