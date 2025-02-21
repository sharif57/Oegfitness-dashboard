"use client";

import Container from "@/components/common/Container";
import { useGetAllAppointmentsQuery } from "@/redux/features/appointmentPlan/AppointmentPlanAPI";
import { ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IAppointmentPlan {
  _id: string;
  title: string;
  price: number;
  image: string;
  description?: string[];
}

export default function AppointmentPlan() {
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("1");

  const {
    data: appointmentsPlan,
    isLoading,
    isError,
  } = useGetAllAppointmentsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }



  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = Number.parseInt(goToPage);
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  const IMAGE_URL = "http://115.127.156.13:3005";

  console.log(appointmentsPlan);

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <Container>
        {/* Header */}
        <div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
          <h1 className='text-2xl font-bold text-gray-900'>Appointment Plan</h1>
          <Link href='/appointment-plan/add-appointment-plan'>
            <button className='flex items-center justify-center px-5 py-3 text-white bg-[#01336F] rounded gap-1.5'>
              <Plus /> Add Appointment
            </button>
          </Link>
        </div>

        {/* Plans Grid */}
        <div className='grid gap-6 md:grid-cols-3 lg:grid-cols-3'>
          {appointmentsPlan?.data.length > 0 &&
            appointmentsPlan?.data?.map((plan: IAppointmentPlan) => (
              <div
                key={plan?._id}
                className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md'
              >
                <div className='relative min-w-full max-w-[632px] h-[336px]'>
                  <Image
                    src={`${IMAGE_URL}${plan.image}` || "/placeholder.svg"}
                    alt={plan.title}
                    fill
                    className='object-cover min-w-full max-w-[632px] h-[336px]'
                  />
                </div>
                <div className='p-6'>
                  <div className='mb-4 flex items-start justify-between'>
                    <h3 className='text-2xl font-bold text-[#000000]'>
                      {plan.title}
                    </h3>
                    <span className='text-[32px] font-bold text-[#01336F]'>
                      ${plan.price}
                    </span>
                  </div>

                  {/* {plan.features ? ( */}
                  <ul className='mb-6 space-y-2'>
                    {plan?.description?.map((feature, idx) => (
                      <li key={idx} className='flex items-center gap-2'>
                        <Image
                          src={"/appointment/star.svg"}
                          alt='check'
                          width={24}
                          height={24}
                        />
                        <span className='text-base text-[#545454]'>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className='w-full h-14 rounded-md bg-blue-900 py-2 text-lg text-white transition-colors hover:bg-blue-800'>
                    Edit Plan
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className='flex items-center gap-1 rounded-md border border-gray-300 bg-[#01336F] px-3 py-2 text-sm text-white hover:text-black hover:bg-gray-50'
          >
            <ArrowLeft className='text-xs' /> Back
          </button>

          <div className='flex items-center gap-2'>
            <form
              onSubmit={handlePageSubmit}
              className='flex items-center gap-2'
            >
              <input
                type='text'
                value={goToPage}
                onChange={(e) => setGoToPage(e.target.value)}
                className='w-16 rounded-md border border-gray-300 p-2 text-center text-sm'
                aria-label='Go to page'
              />
              <button
                type='submit'
                className='rounded-md border border-gray-300 bg-[#01336F] px-3 py-2 text-sm text-white hover:text-black hover:bg-gray-50'
              >
                Go
              </button>
            </form>
          </div>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className='flex items-center gap-1 rounded-md border border-gray-300 bg-[#01336F] px-3 py-2 text-sm text-white hover:text-black hover:bg-gray-50'
          >
            Next →
          </button>
        </div>
      </Container>
    </div>
  );
}
