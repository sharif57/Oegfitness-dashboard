"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Info,
  Plus,
} from "lucide-react";
import Container from "@/components/common/Container";
import Link from "next/link";
import {
  useGetAllExercisesQuery,
  usePostExerciseMutation,
} from "@/redux/features/exercise/ExerciseAPI";

interface Exercise {
  _id: string;
  exerciseName: string;
  description: string;
  gifImage: string;
  gymEquipmentNeeded: string;
}

export default function ExercisePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;

  // Sample exercise data
  const exercises: Exercise[] = Array(6)
    .fill({
      id: 1,
      title: "Jumping Jacks",
      description:
        "Jumping jacks are a classic full-body exercise that combines cardio, coordination, and strength...",
      imageUrl: "",
    })
    .map((ex, index) => ({ ...ex, id: index + 1 }));

  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const { data: exercisesData, isLoading, isError } = useGetAllExercisesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log(exercisesData?.data);

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6'>
      <Container>
        {/* Header */}
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-[#000000]'>Exercise</h1>
          <Link href={"/exercise/add-exercise"}>
            <button className='inline-flex items-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800'>
              <Plus className='h-4 w-4' />
              Add Exercise
            </button>
          </Link>
        </div>

        {/* Exercise Grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {exercisesData?.data?.map((exercise: Exercise) => (
            <div
              key={exercise?._id}
              className='overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md px-2 py-2'
            >
              <h3 className='text-2xl font-bold text-[#000000]'>
                {exercise?.exerciseName}
              </h3>
              <div className='relative h-[200px] w-full rounded-lg mt-2.5'>
                <Image
                  src={exercise?.gifImage || "/workout.jpg"}
                  alt={exercise?.exerciseName}
                  fill
                  className='object-cover rounded-lg'
                />
              </div>
              <div className='p-1 mt-3'>
                <div className='flex items-start justify-between'>
                  <p className='text-lg text-[#545454]'>
                    {exercise.description}
                  </p>
                  <div className='flex flex-col gap-2'>
                    <button className='rounded-full p-1 hover:bg-gray-100'>
                      <Info className='h-5 w-5 text-[#101010]' />
                    </button>
                    <button className='rounded-full p-1 hover:bg-gray-100'>
                      <MoreVertical className='h-5 w-5 text-[#101010]' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='mt-6 flex items-center justify-center gap-2'>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className='inline-flex items-center gap-1 rounded-md border border-gray-300 bg-[#01336F] px-3 py-2 text-sm font-medium text-white hover:bg-gray-50 disabled:opacity-50'
          >
            <ChevronLeft className='h-4 w-4' />
            Back
          </button>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Page</span>
            <span className='flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-sm font-semibold text-black'>
              {currentPage}
            </span>
            <span className='text-sm text-gray-600'>of {totalPages}</span>                                                   
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='inline-flex items-center gap-1 rounded-md border border-gray-300 bg-[#0d76f7] px-3 py-2 text-sm font-medium text-white hover:bg-gray-50 disabled:opacity-50'
          >
            Back
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </Container>
    </div>
  );
}
