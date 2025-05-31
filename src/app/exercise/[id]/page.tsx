// "use client";
// import {
//   useUpdateWorkoutMutation,
//   useWorkoutDetailQuery,
// } from "@/redux/features/exercise/ExerciseAPI";
// import { useParams } from "next/navigation";
// import React, { useState } from "react";

// const WorkoutUpdate = () => {
//   const params = useParams();
//   const { id } = params;
//   const {
//     data: workoutData,
//     isLoading: isQueryLoading,
//     error: queryError,
//   } = useWorkoutDetailQuery(id);
//   const [updateWorkout, { isLoading: isUpdateLoading, error: updateError }] =
//     useUpdateWorkoutMutation();

//   const [formData, setFormData] = useState({
//     name: "",
//     title: "",
//     description: "",
//     image: null,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ): void => {
//     const { name, value, files } = e.target;
//     if (name === "image" && files) {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedFormData = new FormData();
//     updatedFormData.append(
//       "data",
//       JSON.stringify({
//         name: formData.name || workoutData.data.name,
//         title: formData.title || workoutData.data.title,
//         description: formData.description || workoutData.data.description,
//       })
//     );
//     if (formData.image) updatedFormData.append("image", formData.image);

//     try {
//       await updateWorkout({ id: id, formData: updatedFormData });
//       alert("Workout updated successfully!");
//     } catch (err) {
//       console.error("Update failed:", err);
//     }
//   };

//   if (isQueryLoading) return <div>Loading...</div>;
//   const IMAGE_URL = "https://server.oegfitness.com";

//   return (
//     <div className="text-black">
//       <h2>Update Workout</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           defaultValue={workoutData.data.name}
//           onChange={handleChange}
//           placeholder="Name"
//         />
//         <input
//           type="text"
//           name="title"
//           defaultValue={workoutData.data.title}
//           onChange={handleChange}
//           placeholder="Title"
//         />
//         <textarea
//           name="description"
//           defaultValue={workoutData.data.description}
//           onChange={handleChange}
//           placeholder="Description"
//         />
//         <input type="file" name="image" onChange={handleChange} />
//         <button type="submit" disabled={isUpdateLoading}>
//           {isUpdateLoading ? "Updating..." : "Update Workout"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WorkoutUpdate;
"use client"
import { useUpdateWorkoutMutation, useWorkoutDetailQuery } from "@/redux/features/exercise/ExerciseAPI"
import { useParams, useRouter } from "next/navigation"
import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface WorkoutData {
  id: string
  name: string
  title: string
  description: string
  image?: string
}

interface FormData {
  name: string
  title: string
  description: string
  image: File | null
}

const WorkoutUpdate = () => {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const { data: workoutData, isLoading: isQueryLoading, error: queryError } = useWorkoutDetailQuery(id)

  const [updateWorkout, { isLoading: isUpdateLoading, error: updateError }] = useUpdateWorkoutMutation()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    title: "",
    description: "",
    image: null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  
  // Initialize form data when workout data is loaded
  useEffect(() => {
      if (workoutData?.data) {
          setFormData({
              name: workoutData.data.name || "",
              title: workoutData.data.title || "",
              description: workoutData.data.description || "",
              image: null,
            })
        }
    }, [workoutData])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const target = e.target as HTMLInputElement
        const { name, value, files } = target
        
        if (name === "image" && files && files[0]) {
            const file = files[0]
            setFormData((prev) => ({ ...prev, [name]: file }))
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }
    
    const handleRemoveImage = () => {
        setFormData((prev) => ({ ...prev, image: null }))
        setImagePreview(null)
        // Reset file input
        const fileInput = document.getElementById("image-input") as HTMLInputElement
        if (fileInput) fileInput.value = ""
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const updatedFormData = new FormData()
        updatedFormData.append(
            "data",
            JSON.stringify({
                name: formData.name || workoutData?.data?.name,
                title: formData.title || workoutData?.data?.title,
                description: formData.description || workoutData?.data?.description,
            }),
        )
        
        if (formData.image) {
            updatedFormData.append("image", formData.image)
        }
        
        try {
            await updateWorkout({ id: id, formData: updatedFormData }).unwrap()
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                router.push(`/exercise`) // Navigate back to workout detail
            }, 2000)
        } catch (err) {
            console.error("Update failed:", err)
        }
    }
    
    if (isQueryLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-96">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-700">Loading workout...</span>
          </div>
        </div>
      </div>
    )
}

if (queryError) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-96">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">Failed to load workout data. Please try again.</div>
          </div>
        </div>
      </div>
    )
}

const currentImage = workoutData?.data?.image

const IMAGE_URL = "https://server.oegfitness.com"
return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 text-black">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-md transition-colors"
            >
            <span className="mr-2">←</span>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Update Workout</h1>
          <p className="text-gray-600 mt-2">Modify your workout details and upload a new image if needed.</p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="text-green-800">Workout updated successfully! Redirecting...</div>
          </div>
        )}

        {/* Update Error */}
        {updateError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">Failed to update workout. Please try again.</div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Workout Information</h2>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Image Display */}
              {(currentImage || imagePreview) && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Current Image</label>
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview || `${IMAGE_URL}${currentImage}`}
                      alt="Workout image"
                      
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=200&width=400"
                      }}
                    />
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Workout Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter workout name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Title Field */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Workout Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter workout title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter workout description"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label htmlFor="image-input" className="block text-sm font-medium text-gray-700">
                  Update Image (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-input"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-8 h-8 mb-2 text-gray-400 text-2xl">📁</div>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      id="image-input"
                      name="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdateLoading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isUpdateLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    "Update Workout"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutUpdate
