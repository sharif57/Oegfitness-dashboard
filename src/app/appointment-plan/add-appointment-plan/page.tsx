"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Plus, Upload } from "lucide-react";
import Container from "@/components/common/Container";
import { set } from "react-hook-form";
import { useCreateAppointmentMutation } from "@/redux/features/appointmentPlan/AppointmentPlanAPI";
import toast from "react-hot-toast";

interface WorkoutDay {
  title: string;
  duration: string;
  exerciseId: string;
}

const options = ["Warm-Up", "Main Workout", "Cool Down"];

export default function AddWorkout() {
  const [workoutName, setWorkoutName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [days, setDays] = useState<WorkoutDay[]>([
    { title: "", duration: "", exerciseId: "" },
  ]);
  const [selected, setSelected] = useState<string[][]>(days.map(() => []));
  const [descriptionList, setDescriptionList] = useState<string[]>([""]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [createAppointment] = useCreateAppointmentMutation();

  const timeSlots = ["11:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "8:00 PM"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTimeSelection = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    let newIngredients = [...descriptionList];
    newIngredients[index] = value;
    setDescriptionList(newIngredients);
  };

  const addDescription = () => {
    setDescriptionList([...descriptionList, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workoutName || !price || selectedTimes.length === 0) {
      alert("Please fill in all required fields");
      return;
    }


    const formDataToSend = new FormData();

    const data = {
      title: workoutName,
      price: price,
      image: "/images/consaltent-1739179485338.jpeg",
      availableTimes: selectedTimes,
      description: descriptionList,
      status: true,
    };

    formDataToSend.append("data", JSON.stringify(data));

    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await createAppointment(formDataToSend).unwrap();
      if (response?.success) {
        setWorkoutName("");
        setPrice(0);
        setImage(null);
        setSelectedTimes([]);
        setDescriptionList([""]);
        setImagePreview(null);

        toast.success("Appointment created successfully!");
      } else {
        throw new Error(response.message || "Something went wrong.");
      }
    } catch (error: any) {
      console.error("Error creating workout:", error);
      alert(error.message || "Failed to create workout.");
    }
  };

  const handleSelect = (dayIndex: number, option: string) => {
    setSelected((prev) => {
      const newSelected = [...prev];
      if (!newSelected[dayIndex].includes(option)) {
        newSelected[dayIndex] = [...newSelected[dayIndex], option];
      }
      return newSelected;
    });
  };

  const handleRemove = (dayIndex: number, option: string) => {
    setSelected((prev) => {
      const newSelected = [...prev];
      newSelected[dayIndex] = newSelected[dayIndex].filter(
        (item) => item !== option
      );
      return newSelected;
    });
  };

  const addDay = () => {
    setDays([...days, { title: "", duration: "", exerciseId: "" }]);
    setSelected([...selected, []]); // Add a new empty selection array for the new day
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

        <form
          onSubmit={handleSubmit}
          className='space-y-6 border rounded-lg p-6'
        >
          <div className='space-y-8'>
            {/* Image Upload */}
            <div className='relative aspect-squar flex gap-8 w-full max-w-full'>
              <label
                htmlFor='image-upload'
                className='flex h-[180px] w-[140px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-gray-400'
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt='Preview'
                    width={140}
                    height={180}
                    className='rounded-lg object-cover '
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
                  className='hidden w-[140px] h-[180px] object-cover'
                />
              </label>
              <div className='mt-2 text-sm flex flex-col items-center justify-center gap-4 text-gray-900'>
                <h2 className='text-2xl text-[#D6D6D6]'>Workout Name </h2>
                <p className='text-sm text-[#D6D6D6]'>Product Description </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className='space-y-4 border-2 rounded-lg p-6'>
              <div className='grid gap-4 md:grid-cols-3'>
                <div>
                  <label
                    htmlFor='workout-name'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Title
                  </label>
                  <input
                    id='workout-name'
                    type='text'
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                    placeholder='Title'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='amount'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Price
                  </label>
                  <input
                    id='amount'
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                    placeholder='Amount'
                    required
                  />
                </div>
                <div className='w-full max-w-md'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Time
                  </label>
                  <div className='relative' ref={dropdownRef}>
                    <div
                      className='w-full px-3 py-2 text-left border rounded-lg bg-white cursor-pointer flex justify-between items-center'
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className='text-gray-900'>
                        {selectedTimes.length > 0
                          ? selectedTimes.join(" | ")
                          : "Select time"}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>

                    {isOpen && (
                      <div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg'>
                        <div className='py-1'>
                          {timeSlots.map((time) => (
                            <div
                              key={time}
                              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                                selectedTimes.includes(time) ? "bg-blue-50" : ""
                              }`}
                              onClick={() => toggleTimeSelection(time)}
                            >
                              <div className='flex items-center'>
                                <input
                                  type='checkbox'
                                  checked={selectedTimes.includes(time)}
                                  onChange={() => {}}
                                  className='h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
                                />
                                <span className='ml-3 text-black'>{time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='w-full space-y-4 mb-6'>
                <div className='space-y-2'>
                  <label
                    htmlFor='ingredient-0'
                    className='text-[#545454] text-base font-medium'
                  >
                    Description
                  </label>
                  <div className='space-y-2'>
                    {descriptionList.map((ingredient, index) => (
                      <div
                        key={index}
                        className='relative flex items-center gap-6'
                      >
                        <input
                          id={`ingredient-${index}`}
                          value={ingredient}
                          onChange={(e) =>
                            handleDescriptionChange(index, e.target.value)
                          }
                          placeholder={`Enter a description ${index + 1}`}
                          className='flex-1 rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
                        />
                        <div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center'>
                          {index === descriptionList.length - 1 && (
                            <button
                              type='button'
                              onClick={addDescription}
                              className='bg-[#01336F] rounded-full w-10 h-10 flex items-center justify-center'
                            >
                              <Plus className='h-6 w-6 text-white' />
                              <span className='sr-only'>Add ingredient</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
