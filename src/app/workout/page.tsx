"use client";

import { useState } from "react";
import { Pagination } from "antd";
import WorkoutCard from "@/components/WorkoutCard";
import { Plus } from "lucide-react";

interface WorkoutItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

// Mock data - in a real app, this would come from an API
const workouts: WorkoutItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: "Jumping Jacks",
  description:
    "Jumping Jacks are a classic full-body exercise that combines cardio, coordination, and strength...",
  imageUrl: "/workout.jpg",
}));

const ITEMS_PER_PAGE = 12;

export default function WorkoutPlan() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWorkouts = workouts.slice(startIndex, endIndex);

  return (
    <div className='container mx-auto p-4 md:p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-[#000000]'>Workout Plan</h2>
        <button className='flex items-center justify-center px-5 py-3 text-white bg-[#01336F] rounded gap-1.5'>
          <Plus /> Add Workout
        </button>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {currentWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>

      <div className='mt-8 flex justify-center'>
        <Pagination
          current={currentPage}
          onChange={setCurrentPage}
          total={workouts.length}
          pageSize={ITEMS_PER_PAGE}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
