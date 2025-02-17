// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, Upload } from "lucide-react";

// export default function AddAppointmentPage() {
//   const [imagePreview, setImagePreview] = useState<string>("");
//   const [formData, setFormData] = useState({
//     workoutName: "",
//     title: "",
//     amount: "",
//     time: "",
//     description: "",
//   });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(formData);
//   };

//   const timeSlots = Array.from({ length: 24 }, (_, i) => {
//     const hour = i % 12 || 12;
//     const ampm = i < 12 ? "AM" : "PM";
//     return `${hour}:00 ${ampm}`;
//   });

//   return (
//     <div className='min-h-screen bg-white p-4 md:p-6'>
//       {/* Header */}
//       <div className='mb-6'>
//         <Link
//           href='/appointments'
//           className='inline-flex items-center text-gray-600 hover:text-gray-900'
//         >
//           <ChevronLeft className='h-5 w-5' />
//           <span className='ml-1 text-lg font-semibold'>
//             Add Appointment Plan
//           </span>
//         </Link>
//       </div>

//       <form onSubmit={handleSubmit} className='max-w-3xl mx-auto space-y-6'>
//         {/* Image Upload */}
//         <div className='flex flex-col md:flex-row gap-6'>
//           <div className='relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden'>
//             {imagePreview ? (
//               <Image
//                 src={imagePreview || "/placeholder.svg"}
//                 alt='Preview'
//                 fill
//                 className='object-cover'
//               />
//             ) : (
//               <div className='flex flex-col items-center justify-center h-full text-gray-400'>
//                 <Upload className='h-8 w-8 mb-2' />
//                 <span className='text-sm'>Upload GIF File</span>
//               </div>
//             )}
//             <input
//               type='file'
//               onChange={handleImageChange}
//               accept='image/*'
//               className='absolute inset-0 opacity-0 cursor-pointer'
//             />
//           </div>

//           <div className='flex-1 space-y-4'>
//             <input
//               type='text'
//               name='workoutName'
//               placeholder='Workout Name'
//               value={formData.workoutName}
//               onChange={handleInputChange}
//               className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
//             />
//           </div>
//         </div>

//         {/* Form Fields */}
//         <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//           <input
//             type='text'
//             name='title'
//             placeholder='Title'
//             value={formData.title}
//             onChange={handleInputChange}
//             className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
//           />
//           <input
//             type='number'
//             name='amount'
//             placeholder='Amount'
//             value={formData.amount}
//             onChange={handleInputChange}
//             className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
//           />
//           <select
//             name='time'
//             value={formData.time}
//             onChange={handleInputChange}
//             className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white'
//           >
//             <option value=''>Select Time</option>
//             {timeSlots.map((time) => (
//               <option key={time} value={time}>
//                 {time}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Description */}
//         <div className='relative'>
//           <textarea
//             name='description'
//             placeholder='Descriptions'
//             value={formData.description}
//             onChange={handleInputChange}
//             rows={4}
//             className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none'
//           />
//           <button
//             type='button'
//             className='absolute right-2 bottom-2 p-1 text-gray-400 hover:text-gray-600'
//             onClick={() =>
//               setFormData((prev) => ({ ...prev, description: "" }))
//             }
//           >
//             <svg
//               xmlns='http://www.w3.org/2000/svg'
//               fill='none'
//               viewBox='0 0 24 24'
//               strokeWidth={1.5}
//               stroke='currentColor'
//               className='w-6 h-6'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 d='M12 4.5v15m7.5-7.5h-15'
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Submit Button */}
//         <div className='flex justify-end'>
//           <button
//             type='submit'
//             className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
//           >
//             Save Appointment Plan
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import Container from "@/components/common/Container";
import { useCreateWorkOutMutation } from "@/redux/features/workout/WorkOutAPI";

interface WorkoutDay {
  title: string;
  duration: string;
  exerciseId: string;
}

const options = ["Warm-Up", "Main Workout", "Cool Down"];

export default function AddWorkout() {
  const [workoutName, setWorkoutName] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState<WorkoutDay[]>([
    { title: "", duration: "", exerciseId: "" },
  ]);
  const [selected, setSelected] = useState<string[][]>(days.map(() => []));

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createWorkOut] = useCreateWorkOutMutation();

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

  // const addDay = () => {
  //   setDays([...days, { title: "", duration: "", exerciseId: "" }]);
  // };

  const updateDay = (index: number, field: keyof WorkoutDay, value: string) => {
    const newDays = [...days];
    newDays[index] = { ...newDays[index], [field]: value };
    setDays(newDays);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workoutName || !description || days.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    // Transform days data into required format
    const formattedDays = days.map((day, index) => ({
      isCompleted: false,
      day: index + 1,
      warmUp: {
        duration: Number(day.duration), // Ensure it's a number
        exercises: day.exerciseId.split(","), // Convert to an array of IDs
      },
      mainWorkout: {
        duration: Number(day.duration),
        exercises: day.exerciseId.split(","),
      },
      coolDown: {
        duration: Number(day.duration),
        exercises: day.exerciseId.split(","),
      },
    }));

    const formData = new FormData();
    formData.append("planName", workoutName);
    formData.append("description", description);
    formData.append(
      "workouts",
      JSON.stringify(formattedDays) // Sending structured workouts
    );

    // Handle image upload
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      formData.append("image", fileInput.files[0]);
    }

    try {
      const response = await createWorkOut(formData).unwrap();
      if (response?.success) {
        console.log("Workout Created Successfully:", response);
        alert(response.message || "Workout created successfully!");
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

        <form onSubmit={handleSubmit} className='space-y-6'>
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
                    htmlFor='description'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Amount
                  </label>
                  <input
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                    placeholder='Amount'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='description'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Time
                  </label>
                  <input
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                    placeholder='Amount'
                    required
                  />
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='workout-name'
                  className='mb-1 block text-sm font-medium text-gray-700'
                >
                  Description
                </label>
                <textarea
                  className='w-full rounded-md border border-gray-300 text-gray-900 p-3 outline-none'
                  rows={5}
                  name=''
                  id=''
                  placeholder='Description'
                ></textarea>
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
