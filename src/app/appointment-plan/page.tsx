"use client";

import Container from "@/components/common/Container";
import Image from "next/image";
import { useState } from "react";

export default function AppointmentPlan() {
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("1");

  const plans = [
    {
      title: "Initial Consultation",
      price: 500,
      image: "/apointment-plan.png",
      features: [
        "Analyze your current eating habits.",
        "Personal nutrition goals.",
        "Providing healthy meal plans",
        "Advice related to lifestyle and nutrition.",
      ],
    },
    {
      title: "Talk To Fitness",
      price: 100,
      image: "/apointment-plan2.png",
      features: [
        "Analyze your current eating habits.",
        "Personal nutrition goals.",
        "Providing healthy meal plans",
        "Advice related to lifestyle and nutrition.",
      ],
      //   description: "Consultation to create program for desired goal",
    },
  ];

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = Number.parseInt(goToPage);
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <Container>
        {/* Header */}
        <div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
          <h1 className='text-2xl font-bold text-gray-900'>Appointment Plan</h1>
          <button className='flex items-center justify-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800'>
            <span>+</span> Add Appointment Plan
          </button>
        </div>

        {/* Plans Grid */}
        <div className='grid gap-6 md:grid-cols-2'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md'
            >
              <div className='relative min-w-full max-w-[632px] h-[336px]'>
                <Image
                  src={plan.image || "/placeholder.svg"}
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
                  {plan.features.map((feature, idx) => (
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

                {/* ) : (
                  <p className='mb-6 text-sm text-gray-600'>
                    {plan.description}
                  </p>
                )} */}

                <button className='w-full rounded-md bg-blue-900 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800'>
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
            className='flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'
          >
            ← Back
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
                className='rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'
              >
                Go
              </button>
            </form>
          </div>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className='flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'
          >
            Next →
          </button>
        </div>
      </Container>
    </div>
  );
}
