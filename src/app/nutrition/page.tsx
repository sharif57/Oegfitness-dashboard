"use client";

import { useState } from "react";
import { Pagination } from "antd";
import {
  InfoIcon as InfoCircleOutlined,
  MoreVertical,
  Plus,
  Star,
} from "lucide-react";
import "antd/dist/reset.css";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import { useGetAllNutritionsQuery } from "@/redux/features/nutritions/NutritionAPI";

interface INutrition {
  _id: string;
  title: string;
  instruction: string;
  image: string;
  rating: number;
}

export default function NutritionPlan() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: nutritionData,
    isLoading,
    isError,
  } = useGetAllNutritionsQuery();

  if (isLoading || !nutritionData.data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nutritionData?.data.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const IMAGE_URL = "http://45.55.209.88:3006";

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <Container>
        {/* Header */}
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-gray-900'>Nutrition Plan</h1>
          <Link
            href={"/nutrition/add-nutrition"}
            className='flex items-center justify-center rounded-lg bg-[#01336F] px-5 py-3 text-white hover:bg-navy-700'
          >
            <Plus /> <span>Add Nutrition</span>
          </Link>
        </div>

        {/* Card Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {currentItems.map((item: INutrition) => (
            <div
              key={item._id}
              className='overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]'
            >
              
              <div className='relative h-64 w-full'>
                <img
                  src={`${IMAGE_URL}${item?.image}` || "/placeholder.svg"}
                  width={600}
                  height={700}
                  alt='Meal Plan'
                  className='h-full w-full object-cover' />
              </div>
              <div className='p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-2xl font-medium text-[#000000]'>
                    {item.title}
                  </h3>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-xl text-[#545454]'>
                      {item.rating}
                    </span>
                  </div>
                </div>

                <div className='flex items-stretch justify-between'>
                  <p className='text-base text-[#545454]'>
                    {item?.instruction}
                  </p>
                  <div className='flex flex-col items-center'>
                    <button className='rounded-full p-2 hover:bg-gray-100'>
                      <InfoCircleOutlined className='h-5 w-5 text-gray-500' />
                    </button>
                    <button className='rounded-full p-2 hover:bg-gray-100'>
                      <MoreVertical className='h-5 w-5 text-gray-500' />
                    </button>
                  </div>
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
            total={nutritionData?.data.length || 0}
            pageSize={itemsPerPage}
            showSizeChanger={false}
          />
        </div>
      </Container>
    </div>
  );
}
