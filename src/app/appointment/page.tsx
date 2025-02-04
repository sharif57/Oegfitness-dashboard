"use client";

import { useState } from "react";
import { Pagination } from "antd";
import { InfoIcon } from "lucide-react";
import "antd/dist/reset.css";
import Image from "next/image";

interface Appointment {
  id: number;
  title: string;
  description: string;
  image: string;
}

const appointments: Appointment[] = Array(42)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: index % 2 === 0 ? "Talk To Fitness" : "Initial Consultation",
    description: "Consultation to create program for desired goal",
    image: "/apointment.png",
  }));

export default function AppointmentDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const itemsPerPage = 6;

  const filters = ["All", "Booking", "Pending", "Cancel"];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='mx-auto max-w-[94%]'>
        {/* Header */}
        <div className='mb-6 flex flex-col space-y-4  sm:space-y-0'>
          <h1 className='text-2xl font-medium text-[#000000]'>Appointment</h1>
          <div className='flex items-center justify-between'>
            <div className='flex space-x-4'>
              {filters.map((filterItem) => (
                <button
                  key={filterItem}
                  onClick={() => setFilter(filterItem)}
                  className={`rounded-full px-4 py-1 text-sm ${
                    filter === filterItem
                      ? "bg-[#101010] text-[#FDFDFD]"
                      : "bg-[#F4F5F6] text-[#676767] hover:bg-gray-100"
                  }`}
                >
                  {filterItem}
                </button>
              ))}
            </div>
            <div className='ml-4 text-base text-[#545454]'>
              Total:{" "}
              <span className='font-semibold'>{appointments.length}</span>
            </div>
          </div>
        </div>

        {/* Appointment Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {currentItems.map((appointment) => (
            <div
              key={appointment.id}
              className='overflow-hidden rounded-lg bg-white shadow-md'
            >
              <div className='relative h-[328px]'>
                <Image
                  src={appointment.image || "/placeholder.svg"}
                  width={600}
                  height={700}
                  alt={appointment.title}
                  className='h-[328px] w-full object-contain'
                />
              </div>
              <div className='p-4'>
                <div className='flex items-start justify-between'>
                  <h3 className='flex-1 mb-2 text-2xl font-medium text-[#000000]'>
                    {appointment.title}
                  </h3>
                  <button className='absolute right-2 top-2 rounded-full p-1.5 text-black'>
                    <InfoIcon className=' text-black' /> rdgy
                  </button>
                </div>
                <p className='mb-4 text-base text-[#545454]'>
                  {appointment.description}
                </p>
                <div className='flex gap-4'>
                  <button className='flex-1 rounded-md border border-[#BF0C0A] py-2 text-lg text-[#BF0C0A] hover:bg-gray-50'>
                    Cancel
                  </button>
                  <button className='flex-1 rounded-md bg-[#01336F] py-2 text-lg text-white hover:bg-navy-700'>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='mt-8 flex justify-center'>
          <Pagination
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
            total={appointments.length}
            pageSize={itemsPerPage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
