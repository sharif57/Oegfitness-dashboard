"use client";

import type { MenuProps } from "antd";
import Image from "next/image";
import { EllipsisVertical, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface WorkoutItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface WorkoutCardProps {
  workout: WorkoutItem;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
    },
    {
      key: "2",
      label: "Delete",
      danger: true,
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return (
    <div className='rounded-xl shadow-md p-6'>
      <div className='mt-1.5 mb-3 rounded-xl h-[600px]'>
        <Image
          src={workout.imageUrl}
          className='rounded-xl'
          width={700}
          height={800}
          alt={workout.title}
        />
      </div>

      <div className='pb-3'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-[#000000]'>
            {workout.title}
          </h2>
          <p className='text-[#545454] text-xl'>Time: 30 min</p>
        </div>
        <p className='text-base text-[#545454] leading-[26px]'>
          {workout.description}
        </p>

        <div className='flex justify-between gap-6 my-6 min-h-full'>
          <button className='flex-1 text-[#000000] border border-[#000000] hover:bg-[#000000] hover:text-white px-4 py-2 rounded-lg'>
            See details
          </button>
          <div
            ref={menuRef}
            onClick={() => setOpen(!open)}
            className='relative w-12 h-12 flex items-center justify-center border border-[#E8E8E8] rounded-full cursor-pointer'
          >
            <EllipsisVertical
              className='text-[#101010] '
              width={18}
              height={18}
            />

            {/* edit and delete modal */}
            {open && (
              <div className='absolute right-10 top-10 bg-[#ffffff] shadow-lg rounded-lg flex flex-col gap-2'>
                <button className='text-[#545454] hover:bg-[#F4F5F6] px-8 py-2'>
                  Edit
                </button>
                <button className='text-[#545454] hover:bg-[#F4F5F6] px-8 py-2'>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
