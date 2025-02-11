// "use client";

// import { use, useState } from "react";
// import { Pagination } from "antd";
// import WorkoutCard from "@/components/WorkoutCard";
// import { Plus } from "lucide-react";
// import Link from "next/link";
// import Container from "@/components/common/Container";
// import { useGetAllWorkOutQuery } from "@/redux/features/workout/WorkOutAPI";

// interface WorkoutItem {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl: string;
// }

// // Mock data - in a real app, this would come from an API
// // const workouts: WorkoutItem[] = Array.from({ length: 24 }, (_, i) => ({
// //   id: i + 1,
// //   title: "Jumping Jacks",
// //   description:
// //     "Jumping Jacks are a classic full-body exercise that combines cardio, coordination, and strength...",
// //   imageUrl: "/workout.jpg",
// // }));

// const ITEMS_PER_PAGE = 12;

// export default function WorkoutPlan() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const { data: workouts, isLoading, isError } = useGetAllWorkOutQuery();

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;

//   let currentWorkouts;

//   if (workouts?.data && workouts?.data.length > 0) {
//     currentWorkouts = workouts?.data?.slice(startIndex, endIndex);
//   }

//   console.log(workouts?.data);

//   return (
//     <Container>
//       <div className='mb-6 flex items-center justify-between'>
//         <h2 className='text-2xl font-semibold text-[#000000]'>Workout Plan</h2>
//         <Link href={"/workout/add-workout"}>
//           <button className='flex items-center justify-center px-5 py-3 text-white bg-[#01336F] rounded gap-1.5'>
//             <Plus /> Add Workout
//           </button>
//         </Link>
//       </div>

//       <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
//         {currentWorkouts.map((workout) => (
//           <WorkoutCard key={workout.id} workout={workout} />
//         ))}
//       </div>

//       <div className='mt-8 flex justify-center'>
//         <Pagination
//           current={currentPage}
//           onChange={setCurrentPage}
//           total={workouts.length}
//           pageSize={ITEMS_PER_PAGE}
//           showSizeChanger={false}
//         />
//       </div>
//     </Container>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Pagination } from "antd";
import WorkoutCard from "@/components/WorkoutCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import Container from "@/components/common/Container";
import { useGetAllWorkOutQuery } from "@/redux/features/workout/WorkOutAPI";

interface WorkoutItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 12;

export default function WorkoutPlan() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: workouts, isLoading, isError } = useGetAllWorkOutQuery();

  // Ensure data exists before slicing
  const workoutList = workouts?.data || [];
  const totalWorkouts = workoutList.length;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWorkouts = workoutList.slice(startIndex, endIndex);

  useEffect(() => {
    if (
      totalWorkouts > 0 &&
      currentPage > Math.ceil(totalWorkouts / ITEMS_PER_PAGE)
    ) {
      setCurrentPage(1);
    }
  }, [totalWorkouts]);

  return (
    <Container>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-[#000000]'>Workout Plan</h2>
        <Link href='/workout/add-workout'>
          <button className='flex items-center justify-center px-5 py-3 text-white bg-[#01336F] rounded gap-1.5'>
            <Plus /> Add Workout
          </button>
        </Link>
      </div>

      {/* Handle Loading & Error States */}
      {isLoading ? (
        <p className='text-center text-gray-500'>Loading workouts...</p>
      ) : isError ? (
        <p className='text-center text-red-500'>Failed to load workouts.</p>
      ) : totalWorkouts === 0 ? (
        <p className='text-center text-gray-500'>No workouts available.</p>
      ) : (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {currentWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalWorkouts > 0 && (
        <div className='mt-8 flex justify-center'>
          <Pagination
            current={currentPage}
            onChange={setCurrentPage}
            total={totalWorkouts}
            pageSize={ITEMS_PER_PAGE}
            showSizeChanger={false}
          />
        </div>
      )}
    </Container>
  );
}
