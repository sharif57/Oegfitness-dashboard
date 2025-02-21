"use client";

import Image from "next/image";
import Link from "next/link";

interface WorkoutItem {
  _id: string;
  planName: string;
  description: string;
  imageUrl: string;
  totalDays: number;
}

interface WorkoutCardProps {
  workout: WorkoutItem;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="rounded-xl shadow-md p-6">
      <div className="mt-1.5 mb-3 rounded-lg max-h-[600px]">
        <Image
          // src={`${IMAGE_URL}/${workout.imageUrl}` || "/workout.jpg"}
          src={"/workout.jpg"}
          className="rounded-xl"
          width={700}
          height={800}
          alt={workout.planName}
        />
      </div>

      <div className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-[#000000]">
            {workout?.planName}
          </h2>
          <p className="text-[#545454] text-xl">
            Time:{" "}
            {workout?.totalDays < 7
              ? `${workout?.totalDays} days`
              : `${Math.floor(workout?.totalDays / 7)} weeks`}
          </p>
        </div>
        <p className="text-base text-[#545454] leading-[26px]">
          {workout.description}
        </p>

        <Link href={`/workout/${workout._id}`}>
          {" "}
          <div className="flex justify-between gap-6 my-6 min-h-full">
            <button className="flex-1 text-[#000000] border border-[#000000] hover:bg-[#000000] hover:text-white px-4 py-2 rounded-lg">
              Edit
            </button>{" "}
          </div>
        </Link>
      </div>
    </div>
  );
}
