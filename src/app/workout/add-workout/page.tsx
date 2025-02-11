"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import Container from "@/components/common/Container";

interface WorkoutDay {
  title: string;
  duration: string;
  exerciseId: string;
}

export default function AddWorkout() {
  const [workoutName, setWorkoutName] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState<WorkoutDay[]>([
    { title: "", duration: "", exerciseId: "" },
  ]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDay = () => {
    setDays([...days, { title: "", duration: "", exerciseId: "" }]);
  };

  const updateDay = (index: number, field: keyof WorkoutDay, value: string) => {
    const newDays = [...days];
    newDays[index] = { ...newDays[index], [field]: value };
    setDays(newDays);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ workoutName, description, days });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6'>
      <Container>
        {/* Header */}
        <Link
          href='#'
          className='mb-6 inline-flex items-center text-2xl font-semibold text-gray-700 hover:text-gray-900'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Add Workout Plan
        </Link>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-[200px,1fr]'>
            {/* Image Upload */}
            <div className='relative aspect-square w-full max-w-[200px]'>
              <label
                htmlFor='image-upload'
                className='flex h-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-gray-400'
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt='Preview'
                    fill
                    className='rounded-lg object-cover'
                  />
                ) : (
                  <div className='flex flex-col items-center justify-center'>
                    <Upload className='mb-2 h-8 w-8 text-gray-400' />
                    <span className='text-xs text-gray-500'>
                      Upload GIF File
                    </span>
                  </div>
                )}
                <input
                  id='image-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='hidden'
                />
              </label>
              <div className='mt-2 text-xs text-gray-500'>
                <div>Workout Name</div>
                <div>Product Description</div>
              </div>
            </div>

            {/* Form Fields */}
            <div className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <label
                    htmlFor='workout-name'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Workout Name
                  </label>
                  <input
                    id='workout-name'
                    type='text'
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                    placeholder='Workout Name'
                  />
                </div>
                <div>
                  <label
                    htmlFor='description'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Descriptions
                  </label>
                  <input
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                    placeholder='enter Descriptions'
                  />
                </div>
              </div>

              {/* Workout Days */}
              <div className='space-y-4'>
                {days.map((day, index) => (
                  <div key={index} className='space-y-4'>
                    <h3 className='text-sm font-medium text-gray-700'>
                      Day {String(index + 1).padStart(2, "0")}
                    </h3>
                    <div className='grid gap-4 md:grid-cols-3'>
                      <div>
                        <label
                          htmlFor={`title-${index}`}
                          className='mb-1 block text-sm font-medium text-gray-700'
                        >
                          Title
                        </label>
                        <input
                          id={`title-${index}`}
                          type='text'
                          value={day.title}
                          onChange={(e) =>
                            updateDay(index, "title", e.target.value)
                          }
                          className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                          placeholder='Title'
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`duration-${index}`}
                          className='mb-1 block text-sm font-medium text-gray-700'
                        >
                          Duration Time
                        </label>
                        <input
                          id={`duration-${index}`}
                          type='text'
                          value={day.duration}
                          onChange={(e) =>
                            updateDay(index, "duration", e.target.value)
                          }
                          className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                          placeholder='Duration Time'
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`exercise-${index}`}
                          className='mb-1 block text-sm font-medium text-gray-700'
                        >
                          Exercise ID
                        </label>
                        <select
                          id={`exercise-${index}`}
                          value={day.exerciseId}
                          onChange={(e) =>
                            updateDay(index, "exerciseId", e.target.value)
                          }
                          className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                        >
                          <option value=''>Select Exercise</option>
                          <option value='1'>Exercise 1</option>
                          <option value='2'>Exercise 2</option>
                          <option value='3'>Exercise 3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Day Button */}
              <button
                type='button'
                onClick={addDay}
                className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900'
              >
                <Plus className='mr-1 h-4 w-4' />
                Add day
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className='flex justify-end'>
            <button
              type='submit'
              className='rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
            >
              Save Workout
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
