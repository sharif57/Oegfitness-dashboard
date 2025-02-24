// "use client";
// import { useState } from "react";
// import { useUpdateWorkPlanMutation, useWorkPlanDetailsQuery } from "@/redux/features/workout/WorkOutAPI";
// import { useParams, useRouter } from "next/navigation";

// const WorkoutForm = () => {
//   // const { id: workoutId } = useParams(); // Extract _id from URL
//   const router = useRouter();
//   const { id: workoutId } = useParams<{ id: string }>(); // Extract package ID from URL
//   console.log(workoutId);

//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [planName, setPlanName] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [updateWorkPlan, { isLoading, isError, isSuccess }] =
//     useUpdateWorkPlanMutation();

//     const {data} = useWorkPlanDetailsQuery(workoutId);
//     // const { planName, description, workouts } = data.data;
//     console.log(data?.data);

//     // Handle Image Upload
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const handleSubmit = async () => {
//     if (!workoutId) {
//       alert("Workout ID is missing.");
//       console.error("Error: Workout ID is undefined.");
//       return;
//     }

//     if (!planName || !description || !imageFile) {
//       alert("Please fill all fields and upload an image.");
//       return;
//     }

//     const formData = new FormData();

//     const values = JSON.stringify({
//       planName: planName,
//       description: description,
//     });

//     formData.append("data", values);
//     formData.append("image", imageFile);

//     try {
//       await updateWorkPlan({ id: workoutId, formData }).unwrap();
//       router.push("/workout");
//       alert("Workout updated successfully!");

//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update workout.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg container mx-auto text-black">
//       {/* Image Upload Section */}
//       <div className="flex items-start gap-6">
//         <div className="w-32 h-32 relative">
//           <label className="cursor-pointer flex items-center justify-center w-full h-full bg-gray-200 rounded-md border border-gray-300 overflow-hidden">
//             {imagePreview ? (
//               <img
//                 src={imagePreview}
//                 defaultValue={data?.data?.image}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="flex flex-col items-center text-gray-500">
//                 <span className="text-2xl">📷</span>
//                 <span className="text-sm">Upload Gif File</span>
//               </div>
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="hidden"
//             />
//           </label>
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold text-gray-700">Workout Name</h2>
//           <p className="text-gray-500">Product Description</p>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="mt-6 p-4 border rounded-md bg-gray-50">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Workout Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter a name"
//               defaultValue={data?.data?.planName}
//               value={planName}
//               onChange={(e) => setPlanName(e.target.value)}
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <input
//               type="text"
//               placeholder="Enter description"
//               defaultValue={data?.data?.description}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="mt-6 flex justify-end">
//         <button
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
//         >
//           {isLoading ? "Saving..." : "Save Workout"}
//         </button>
//       </div>

//       {/* Feedback Messages */}
//       {isSuccess && (
//         <p className="text-green-600 mt-2">Workout updated successfully!</p>
//       )}
//       {isError && (
//         <p className="text-red-600 mt-2">Failed to update workout.</p>
//       )}
//     </div>
//   );
// };

// export default WorkoutForm;

"use client";
import { useEffect, useState } from "react";
import {
  useUpdateWorkPlanMutation,
  useWorkPlanDetailsQuery,
} from "@/redux/features/workout/WorkOutAPI";
import { useParams, useRouter } from "next/navigation";

const WorkoutForm = () => {
  const router = useRouter();
  const { id: workoutId } = useParams<{ id: string }>(); // Extract workout ID from URL

  // Local state for form fields and image
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [planName, setPlanName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Fetch work plan details
  const { data } = useWorkPlanDetailsQuery(workoutId);
  const workPlanData = data?.data;

  // When the fetched data changes, update the state so that default values are displayed.
  useEffect(() => {
    if (workPlanData) {
      setPlanName(workPlanData.planName);
      setDescription(workPlanData.description);
      // Optionally, initialize image preview:
      // setImagePreview(workPlanData.image);
    }
  }, [workPlanData]);

  const [updateWorkPlan, { isLoading, isError, isSuccess }] =
    useUpdateWorkPlanMutation();

  // Handle image upload and preview update
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!workoutId) {
      alert("Workout ID is missing.");
      console.error("Error: Workout ID is undefined.");
      return;
    }

    if (!planName || !description || (!imageFile && !workPlanData?.image)) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    const values = JSON.stringify({ planName, description });
    formData.append("data", values);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await updateWorkPlan({ id: workoutId, formData }).unwrap();
      router.push("/workout");
      alert("Workout updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update workout.");
    }
  };

  const IMAGE= process.env.NEXT_PUBLIC_API_KEY

  return (
    <div className="p-6 bg-white shadow-md rounded-lg container mx-auto text-black">
      {/* Image Upload Section */}
      <div className="flex items-start gap-6">
        <div className="w-32 h-32 relative">
          <label className="cursor-pointer flex items-center justify-center w-full h-full bg-gray-200 rounded-md border border-gray-300 overflow-hidden">
            <img
              // Show new preview if available, otherwise fall back to the fetched image.
              src={
                imagePreview ||
                (workPlanData?.image ? `${IMAGE}${workPlanData.image}` : "/default-image.png")
              }              alt="Preview"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Workout Name</h2>
          <p className="text-gray-500">Product Description</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-6 p-4 border rounded-md bg-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Workout Name
            </label>
            <input
              type="text"
              placeholder="Enter a name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Workout"}
        </button>
      </div>

      {/* Feedback Messages */}
      {isSuccess && (
        <p className="text-green-600 mt-2">Workout updated successfully!</p>
      )}
      {isError && (
        <p className="text-red-600 mt-2">Failed to update workout.</p>
      )}
    </div>
  );
};

export default WorkoutForm;
