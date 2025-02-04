// import { EarningsChart } from "@/components/EarningChart";
import { MetricCard } from "@/components/MetricCard";
import { RecentItemsTable } from "@/components/RecentItemsTable";
import { ArrowLeft } from "lucide-react";
import React from "react";

// interface EarningsData {
//   month: string;
//   amount: number;
// }

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
  return (
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

            {/* Earnings Section */}
            <section>
              <div className='mb-4 flex items-center justify-between'>
                {/* <h2 className='text-lg text-[#181414] lg:text-[29px]'>Users</h2> */}
                {/* <select className='rounded-lg border border-gray-300 px-2 py-1 text-sm'>
                  <option>2024 May</option>
                </select> */}
              </div>
              {/* <div className='rounded-lg bg-white p-4 shadow-sm'>
                <div className='h-[250px] lg:h-[300px]'>
                  <EarningsChart data={earningsData} />
                </div>
              </div> */}
            </section>

            {/* Recent Items Section */}
            <section>
              <h2 className='mb-4 text-lg text-[#1A1918] bg-[#F2F5F7] font-medium lg:text-2xl'>
                Recent Items
              </h2>
              <div className='rounded-lg bg-white shadow-sm'>
                <RecentItemsTable items={recentItems} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Earnings;
