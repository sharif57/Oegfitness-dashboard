// "use client";

// import { useState, type ChangeEvent } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft, Upload } from "lucide-react";
// import Container from "@/components/common/Container";
// import { usePostExerciseMutation } from "@/redux/features/exercise/ExerciseAPI";

// export default function AddExercise() {
//   const [formData, setFormData] = useState({
//     exerciseName: "",
//     description: "",
//     gymEquipmentNeeded: "no",
//     image: null as File | null,
//     gifImage: "",
//   });

//   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         image: file,
//         imagePreview: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form submitted:", formData);

//     const data = new FormData();
//     data.append("exerciseName", formData.exerciseName);
//     data.append("description", formData.description);
//     data.append("gymEquipment", formData.gymEquipmentNeeded);
//     data.append("gifImage", formData.image as Blob);

//     try {
//       await postExercise(data).unwrap();
//       console.log("Exercise added successfully");
//     } catch (error) {
//       console.error("Error adding exercise:", error);
//     }
//   };

//   const [postExercise] = usePostExerciseMutation();

//   return (
//     <div className='min-h-screen bg-white p-4 md:p-6'>
//       <Container>
//         <div className='border p-5 rounded-2xl'>
//           {/* Header */}
//           <div className='mb-6 flex items-center gap-4'>
//             <Link
//               href='/exercises'
//               className='inline-flex items-center text-gray-600 hover:text-gray-900'
//             >
//               <ArrowLeft className='h-5 w-5' />
//             </Link>
//             <h1 className='text-xl font-semibold text-gray-900'>
//               Add Exercise
//             </h1>
//           </div>

//           <form onSubmit={handleSubmit} className='space-y-6'>
//             {/* Image Upload */}
//             <div className='relative flex items-center gap-5'>
//               <input
//                 type='file'
//                 id='image-upload'
//                 accept='image/*'
//                 onChange={handleImageUpload}
//                 className='hidden'
//               />
//               <label
//                 htmlFor='image-upload'
//                 className='flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
//               >
//                 {formData.gifImage ? (
//                   <Image
//                     src={formData.gifImage || "/placeholder.svg"}
//                     alt='Preview'
//                     fill
//                     className='rounded-lg object-cover'
//                   />
//                 ) : (
//                   <div className='flex flex-col items-center justify-center text-gray-500'>
//                     <Upload className='h-8 w-8 mb-2' />
//                     <span className='text-xs text-[#545454]'>
//                       Upload GIF File
//                     </span>
//                   </div>
//                 )}
//               </label>

//               <div className='flex flex-col space-y-3'>
//                 <h2 className='text-2xl text-[#D6D6D6] font-semibold'>
//                   Exercise name
//                 </h2>
//                 <p className='text-sm text-[#D6D6D6]'>Product description</p>
//               </div>
//             </div>

//             <div className='border p-5 rounded-2xl'>
//               {/* Workout Name Section */}
//               <div className='space-y-8 mb-4'>
//                 <div className='w-full'>
//                   <label className='block text-base font-medium text-[#545454] mb-2'>
//                     Workout Name
//                   </label>
//                   <input
//                     type='text'
//                     value={formData.exerciseName}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         exerciseName: e.target.value,
//                       }))
//                     }
//                     placeholder='Enter a name'
//                     className='w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none'
//                   />
//                 </div>

//                 <div className='w-full'>
//                   <label className='block text-base font-medium text-[#545454] mb-2'>
//                     Exercise Description
//                   </label>
//                   <textarea
//                     cols={20}
//                     rows={6}
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                     placeholder='Enter a description'
//                     className='w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none'
//                   />
//                 </div>
//               </div>

//               {/* Gym Equipment Section */}
//               <div>
//                 <label className='block text-base font-medium text-[#545454]'>
//                   Gym Equipment Needed
//                 </label>
//                 <div className='mt-2 flex gap-4'>
//                   <label className='inline-flex items-center'>
//                     <input
//                       type='radio'
//                       name='gymEquipment'
//                       value='yes'
//                       checked={formData.gymEquipmentNeeded === "yes"}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           gymEquipmentNeeded: e.target.value,
//                         }))
//                       }
//                       className='h-6 w-6 border-gray-300 text-blue-600 focus:ring-blue-500'
//                     />
//                     <span className='ml-2 text-sm text-gray-700'>Yes</span>
//                   </label>
//                   <label className='inline-flex items-center'>
//                     <input
//                       type='radio'
//                       name='gymEquipment'
//                       value='no'
//                       checked={formData.gymEquipmentNeeded === "no"}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           gymEquipmentNeeded: e.target.value,
//                         }))
//                       }
//                       className='h-6 w-6 border-gray-300 text-blue-600 focus:ring-blue-500'
//                     />
//                     <span className='ml-2 text-sm text-gray-700'>No</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//             {/* Submit Button */}
//             <div className='flex justify-end'>
//               <button
//                 type='submit'
//                 className='rounded-md bg-[#101010] px-4 py-2 text-lg font-medium text-[#FFFFFF] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
//               >
//                 Save Exercise
//               </button>
//             </div>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );
// }

"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import Container from "@/components/common/Container";
import { usePostExerciseMutation } from "@/redux/features/exercise/ExerciseAPI";

export default function AddExercise() {
  const [formData, setFormData] = useState({
    exerciseName: "",
    description: "",
    gymEquipmentNeeded: "no",
    gifImage: null as File | null,
    imagePreview: "",
  });

  console.log({ formData });

  const [postExercise] = usePostExerciseMutation();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image")) {
      setFormData((prev) => ({
        ...prev,
        gifImage: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      alert("Please upload a valid image file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare FormData object
    const form = new FormData();
    form.append("exerciseName", formData.exerciseName);
    form.append("description", formData.description);
    form.append("gymEquipmentNeeded", formData.gymEquipmentNeeded);

    // Append gifImage if it's present
    if (formData.gifImage) {
      form.append("gifImage", formData.gifImage);
    }

    try {
      // Send FormData to the backend via RTK Query
      const response = await postExercise(form).unwrap();
      if (response.success) {
        alert(response.message); // You can replace this with a success action like redirection
      }
    } catch (error) {
      console.error("Failed to create exercise:", error);
      alert("Something went wrong while submitting the exercise.");
    }
  };

  return (
    <div className='min-h-screen bg-white p-4 md:p-6'>
      <Container>
        <div className='border p-5 rounded-2xl'>
          {/* Header */}
          <div className='mb-6 flex items-center gap-4'>
            <Link
              href='/exercises'
              className='inline-flex items-center text-gray-600 hover:text-gray-900'
            >
              <ArrowLeft className='h-5 w-5' />
            </Link>
            <h1 className='text-xl font-semibold text-gray-900'>
              Add Exercise
            </h1>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Image Upload */}
            <div className='relative flex items-center gap-5'>
              <input
                type='file'
                id='image-upload'
                accept='image/*, .gif'
                onChange={handleImageUpload}
                className='hidden'
              />
              <label
                htmlFor='image-upload'
                className='flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
              >
                {formData.imagePreview ? (
                  <Image
                    src={formData.imagePreview || "/placeholder.svg"}
                    alt='Preview'
                    fill
                    className='rounded-lg object-cover'
                  />
                ) : (
                  <div className='flex flex-col items-center justify-center text-gray-500'>
                    <Upload className='h-8 w-8 mb-2' />
                    <span className='text-xs text-[#545454]'>
                      Upload Exercise Image
                    </span>
                  </div>
                )}
              </label>
            </div>

            {/* Workout Name Section */}
            <div className='border p-5 rounded-2xl'>
              <div className='space-y-8 mb-4'>
                <div className='w-full'>
                  <label className='block text-base font-medium text-[#545454] mb-2'>
                    Workout Name
                  </label>
                  <input
                    type='text'
                    value={formData.exerciseName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        exerciseName: e.target.value,
                      }))
                    }
                    placeholder='Enter a name'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                  />
                </div>

                <div className='w-full'>
                  <label className='block text-base font-medium text-[#545454] mb-2'>
                    Exercise Description
                  </label>
                  <textarea
                    cols={20}
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder='Enter a description'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                  />
                </div>
              </div>

              {/* Gym Equipment Section */}
              <div>
                <label className='block text-base font-medium text-[#545454]'>
                  Gym Equipment Needed
                </label>
                <div className='mt-2 flex gap-4'>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      name='gymEquipment'
                      value='yes'
                      checked={formData.gymEquipmentNeeded === "yes"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          gymEquipmentNeeded: e.target.value,
                        }))
                      }
                      className='h-6 w-6 border-gray-300 text-blue-600 focus:ring-blue-500'
                    />
                    <span className='ml-2 text-sm text-gray-700'>Yes</span>
                  </label>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      name='gymEquipment'
                      value='no'
                      checked={formData.gymEquipmentNeeded === "no"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          gymEquipmentNeeded: e.target.value,
                        }))
                      }
                      className='h-6 w-6 border-gray-300 text-blue-600 focus:ring-blue-500'
                    />
                    <span className='ml-2 text-sm text-gray-700'>No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-end'>
              <button
                type='submit'
                className='rounded-md bg-[#101010] px-4 py-2 text-lg font-medium text-[#FFFFFF] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
              >
                Save Exercise
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
