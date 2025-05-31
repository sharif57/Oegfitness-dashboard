// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
// import Container from "@/components/common/Container";
// import Link from "next/link";
// import {
//   useGetAllExercisesQuery,
//   usePostExerciseMutation,
// } from "@/redux/features/exercise/ExerciseAPI";

// interface Exercise {
//   _id: string;
//   exerciseName: string;
//   description: string;
//   gifImage: string;
//   gymEquipmentNeeded: string;
// }

// export default function ExercisePage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const exercisesPerPage = 6;

//   // Sample exercise data
//   const exercises: Exercise[] = Array(6)
//     .fill({
//       id: 1,
//       title: "Jumping Jacks",
//       description:
//         "Jumping jacks are a classic full-body exercise that combines cardio, coordination, and strength...",
//       imageUrl: "",
//     })
//     .map((ex, index) => ({ ...ex, id: index + 1 }));

//   const totalPages = Math.ceil(exercises.length / exercisesPerPage);

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const {
//     data: exercisesData,
//     isLoading,
//     isError,
//   } = useGetAllExercisesQuery({ limit: 1000 });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error</div>;
//   }

//   const IMAGE = process.env.NEXT_PUBLIC_API_KEY;
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <Container>
//         {/* Header */}
// <div className="mb-6 flex items-center justify-between">
//   <h1 className="text-2xl font-semibold text-[#000000]">Exercise</h1>
//   <Link href={"/exercise/add-exercise"}>
//     <button className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
//       <Plus className="h-4 w-4" />
//       Add Exercise
//     </button>
//   </Link>
// </div>

//         {/* Exercise Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {exercisesData?.data?.map((exercise: Exercise) => (
//             <div
//               key={exercise?._id}
//               className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md px-2 py-2"
//             >
//               <h3 className="text-2xl font-bold text-[#000000]">
//                 {exercise?.exerciseName}
//               </h3>
//               <div className="relative  w-full rounded-lg mt-2.5">
//                 <img
//                   // src={exercise?.gifImage || "/workout.jpg"}
//                   src={`${IMAGE}${exercise?.gifImage}` || "/workout.jpg"}
//                   alt={exercise?.exerciseName}

//                   className="w-full rounded-lg h-[300px] object-cover"
//                 />
//               </div>
//               <div className="p-1 mt-3">
//                 <div className="flex items-start justify-between">
//                   <p className="text-lg text-[#545454]">
//                     {exercise.description}
//                   </p>
//                   {/* <div className='flex flex-col gap-2'>
//                     <button className='rounded-full p-1 hover:bg-gray-100'>
//                       <Info className='h-5 w-5 text-[#101010]' />
//                     </button>
//                     <button className='rounded-full p-1 hover:bg-gray-100'>
//                       <MoreVertical className='h-5 w-5 text-[#101010]' />
//                     </button>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex items-center justify-center gap-2">
//           <button
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-[#01336F] px-3 py-2 text-sm font-medium text-white hover:bg-gray-50 disabled:opacity-50"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             Back
//           </button>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">Page</span>
//             <span className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-sm font-semibold text-black">
//               {currentPage}
//             </span>
//             <span className="text-sm text-gray-600">of {totalPages}</span>
//           </div>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-[#0d76f7] px-3 py-2 text-sm font-medium text-white hover:bg-gray-50 disabled:opacity-50"
//           >
//             Back
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </Container>
//     </div>
//   );
// }

"use client";

import {
  useAllWorkoutPlanQuery,
  useDeletePlanWorkoutMutation,
} from "@/redux/features/exercise/ExerciseAPI";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface Workout {
  _id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

interface MetaData {
  totalData: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export default function ExercisePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data, isLoading, isError } = useAllWorkoutPlanQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [deletePlanWorkout] = useDeletePlanWorkoutMutation();
  const IMAGE_URL = "https://server.oegfitness.com";

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data?.data) {
    return <div>Error loading workout plans. Please try again later.</div>;
  }

  // Extract data and meta from response
  const currentPlans = data.data.data || [];
  const meta: MetaData = data.data.meta || {
    totalData: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: itemsPerPage,
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= meta.totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#01336F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePlanWorkout(id)
          .then(() => {
            Swal.fire(
              "Deleted!",
              "Your workout plan has been deleted.",
              "success"
            );
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete workout plan.", "error");
          });
      }
    });
  };

  return (
    <div>
      <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto w-full min-h-screen">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#000000]">Exercise</h1>
          <Link href={"/exercise/add-exercise"}>
            <button className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
              <Plus className="h-4 w-4" />
              Add Exercise
            </button>
          </Link>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPlans.length > 0 ? (
            currentPlans.map((plan: Workout) => (
              <div
                key={plan._id}
                className="bg-white p-4 shadow-lg rounded-xl overflow-hidden flex flex-col h-full"
              >
                {/* Image & Rating */}
                <div className="relative">
                  <img
                    src={`${IMAGE_URL}${plan.image}`}
                    alt={plan.title}
                    className="w-full object-cover rounded-lg h-[290px]"
                  />
                </div>

                {/* Content */}
                <div className="pt-5 space-y-2 flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="lg:text-[24px] text-black text-[18px] font-medium">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-[16px]">{plan.title}</p>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex justify-between items-center gap-4">
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="w-1/2 py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition text-center flex items-center justify-center"
                  >
                    Delete
                  </button>
                  <Link href={`exercise/${plan._id}`} className="w-1/2">
                    <button className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition text-center flex items-center justify-center">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>No workout plans available.</div>
          )}
        </div>

        {/* Pagination Controls */}
        {meta.totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#01336F] text-white hover:bg-[#012a5b]"
              } transition`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from(
              { length: meta.totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-[#01336F] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === meta.totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === meta.totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#01336F] text-white hover:bg-[#012a5b]"
              } transition`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
