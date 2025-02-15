"use client";

import { useState, useEffect } from "react";
import { Pagination } from "antd";
import { InfoIcon } from "lucide-react";
import "antd/dist/reset.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import { useGetAllAppointmentsQuery } from "@/redux/features/appointmentPlan/AppointmentPlanAPI";

interface Appointment {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function AppointmentDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const itemsPerPage = 6;

  const filters = ["All", "Booking", "Pending", "Cancel"];

  const router = useRouter();
  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetAllAppointmentsQuery();

  // Extract actual appointment data
  const appointmentList = appointments?.data || [];

  // Slice data for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointmentList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (
      appointmentList.length > 0 &&
      currentPage > Math.ceil(appointmentList.length / itemsPerPage)
    ) {
      setCurrentPage(1);
    }
  }, [appointmentList.length]);

  const goBack = () => {
    router.back();
  };

  const IMAGE_URL = "http://115.127.156.13:3005";

  return (
    <div className='min-h-screen bg-[#FFFFFF] p-4 md:p-8'>
      <Container>
        {/* Header */}
        <div className='mb-6 flex flex-col space-y-4 sm:space-y-0'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-medium text-[#000000]'>Appointment</h1>
            <div className='ml-4 text-base text-[#545454]'>
              Total:{" "}
              <span className='font-semibold'>{appointmentList.length}</span>
            </div>
          </div>
        </div>

        {/* Appointment Grid */}
        {isLoading ? (
          <p className='text-center text-gray-500'>Loading appointments...</p>
        ) : isError ? (
          <p className='text-center text-red-500'>
            Failed to load appointments.
          </p>
        ) : appointmentList.length === 0 ? (
          <p className='text-center text-gray-500'>No appointments found.</p>
        ) : (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {currentItems.map((appointment: Appointment) => (
              <div
                key={appointment.id}
                className='overflow-hidden rounded-lg bg-[#FFFFFF] shadow-lg p-5'
              >
                <div className='w-full relative h-[328px]'>
                  <Image
                    src={
                      `${IMAGE_URL}${appointment.image}` || "/placeholder.svg"
                    }
                    width={600}
                    height={700}
                    alt={appointment.title}
                    className='h-[328px] w-full object-cover'
                  />
                </div>
                <div className=''>
                  <div className='flex items-start justify-between'>
                    <h3 className='flex-1 mb-2 text-2xl font-medium text-[#000000]'>
                      {appointment.title}
                    </h3>
                    <button className='absolute right-2 top-2 rounded-full p-1.5 text-black'>
                      <InfoIcon className='text-black' />
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
        )}

        {/* Pagination */}
        {appointmentList.length > 0 && (
          <div className='mt-8 flex justify-center'>
            <Pagination
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={appointmentList.length}
              pageSize={itemsPerPage}
              showSizeChanger={false}
            />
          </div>
        )}
      </Container>
    </div>
  );
}
