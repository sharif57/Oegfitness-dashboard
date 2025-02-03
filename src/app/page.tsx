import Image from "next/image"
import { MobileNav } from "@/components/dashboard/MobileNav"
import { Sidebar } from "@/components/dashboard/Sldebar"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { EarningsChart } from "@/components/dashboard/EarningChart"
import { RecentItemsTable } from "@/components/dashboard/RecentItemsTable"
import { ArrowLeft } from "lucide-react"

interface EarningsData {
    month: string
    amount: number
  }
  
    interface RecentItem {
    id: string
    userName: string
    date: string
    amount: string
    status: string
  }

// Mock data - In a real app, this would come from an API
const metrics = [
  { title: "Total User", value: 3520 },
  { title: "Total Earnings", value: 81230 },
  { title: "Total Subscription", value: 856330 },
]

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
]

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
  
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg p-4 text-white">
          <div className="flex items-center justify-between bg-[#01336F] py-5 px-3">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="OEG" width={40} height={40} className="h-8 w-auto lg:hidden" />
              <div>
                <h1 className="text-base font-medium lg:text-2xl">Welcome, Sharon</h1>
                <p className="text-base opacity-75 lg:text-base">Have a nice day</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
                  2
                </span>
                <button className="rounded-full bg-blue-900 p-1.5 lg:p-2">
                  <svg className="h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>

              <button className="flex items-center space-x-2 rounded-full bg-blue-900 px-2 py-2.5 lg:px-3">
                <Image
                  src="/dashboard/sharon.png"
                  width={500}
                  height={600}
                  alt="Sharon"
                  className="h-5 w-5 rounded-full lg:h-6 lg:w-6"
                />
                <span className="text-sm lg:text-base">Sharon</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="space-y-6">
            {/* Overview Section */}
            <section>
              <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold lg:text-xl">
              <ArrowLeft className="cursor-pointer" /> Overview</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-[90%] mx-auto">
                {metrics.map((metric) => (
                  <MetricCard key={metric.title} {...metric} />
                ))}
              </div>
            </section>

            {/* Earnings Section */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg text-[#181414] lg:text-[29px]">Earnings</h2>
                <select className="rounded-lg border border-gray-300 px-2 py-1 text-sm">
                  <option>2024 May</option>
                </select>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="h-[250px] lg:h-[300px]">
                  <EarningsChart data={earningsData} />
                </div>
              </div>
            </section>

            {/* Recent Items Section */}
            <section>
              <h2 className="mb-4 text-lg texty-[#1A1918] font-medium lg:text-2xl">Recent Items</h2>
              <div className="rounded-lg bg-white shadow-sm">
                <RecentItemsTable items={recentItems} />
              </div>
            </section>
          </div>
        </main>

        {/* Mobile Navigation - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 z-50 w-full lg:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  )
}

