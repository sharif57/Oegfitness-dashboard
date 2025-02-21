"use client";

import Search from "@/components/Search";
import { useWorkPlanDetailsQuery } from "@/redux/features/workout/WorkOutAPI";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define types for WorkoutPlan and WorkoutDay
type Exercise = {
  _id: string;
  exerciseName: string;
  gifImage?: string;
  description: string;
  isDeleted: boolean;
};

type WorkoutDay = {
  _id: string;
  day: number;
  isCompleted: boolean;
  warmUp: {
    duration: number;
    exercises: Exercise[];
    _id: string;
  };
  mainWorkout: {
    duration: number;
    exercises: Exercise[];
    _id: string;
  };
  coolDown: {
    duration: number;
    exercises: Exercise[];
    _id: string;
  };
};

// type WorkPlanDetails = {
//   data: {
//     description: string;
//     planName: string;
//     rating: number;
//     workouts: WorkoutDay[];
//   };
//   message: string;
//   success: boolean;
// };

export default function Page() {
  const params = useParams(); // Get the params
  const [workoutId, setWorkoutId] = useState<string | null>(null);

  // Use the workoutId to fetch the specific workout plan details
  const {
    data: workPlanDetails,
    error,
    isLoading,
  } = useWorkPlanDetailsQuery(workoutId);

  useEffect(() => {
    if (params?.id) {
      setWorkoutId(params.id as string); // Set the workoutId from params
    }
  }, [params]);

  if (error) return <div>Error fetching workout plan details.</div>; // Error handling

  const workoutPlan = workPlanDetails?.data?.workouts || [];
  console.log(workoutPlan);

  return (
    <>
      <div>
        <div className="px-4 ">
          <div className="relative h-[50vh] md:h-[70vh] lg:h-[calc(100vh-2px)] xl:h-[calc(100vh-600px)]   flex items-center justify-center ">
            {/* Background Image with Opacity */}
            <div
              className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-90 rounded-xl"
              style={{ backgroundImage: `url('/hero.jpg')` }}
            ></div>

            {/* Overlay to ensure text visibility */}
            <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

            {/* Content */}
            <div className="relative text-center space-y-5 z-10 ">
              <h1 className="text-white lg:text-[48px] text-[40px]  font-bold  mx-auto">
                Add workout Plan
              </h1>
              <Search></Search>
            </div>
          </div>
        </div>
        <div className="container mx-auto lg:p-6 p-2 mb-16 mt-5 text-black">
          {/* Content */}
          <div className="bg-white shadow-lg rounded-lg lg:p-6 mt-4">
            <h2 className="text-lg font-semibold">
              <span className="text-[#01336F]">Focus:</span>{" "}
              {workPlanDetails?.data?.title ||
                "Build strength and establish consistency."}
            </h2>

            {/* Workout Plan Table */}
            <div className="mt-4 max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg custom-scrollbar">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#e6ebf1] z-10">
                  <tr>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/6">
                      Day
                    </th>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                      Warm-up
                    </th>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                      Main Workout
                    </th>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                      Cool Down
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workoutPlan.map((day: WorkoutDay) => (
                    <tr
                      key={day._id}
                      className="border border-r border-gray-300"
                    >
                      <th className="px-4 py-3 font-semibold text-left text-[#545454] border-r">
                        Day {day.day}
                      </th>
                      <td className="px-4 py-3 border border-r border-gray-300">
                        {day.warmUp.exercises.map((exercise) => (
                          <p key={exercise._id} className="text-gray-600">
                            {exercise.exerciseName}
                          </p>
                        ))}
                      </td>
                      <td className="px-4 py-3 border border-r border-gray-300">
                        {day.mainWorkout.exercises.map((exercise) => (
                          <p key={exercise._id} className="text-gray-600">
                            {exercise.exerciseName}
                          </p>
                        ))}
                      </td>
                      <td className="px-4 py-3">
                        {day.coolDown.exercises.map((exercise) => (
                          <p key={exercise._id} className="text-gray-600">
                            {exercise.exerciseName}
                          </p>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
