// "use client";

// import dynamic from "next/dynamic";
// import { ArrowLeft, ImagePlus, Plus } from "lucide-react";
// import React, { useState, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Container from "@/components/common/Container";
// import toast from "react-hot-toast";
// import { useCreateNutritionMutation } from "@/redux/features/nutritions/NutritionAPI";

// export default function AddMealPlan() {
//   // const [ingredients, setIngredients] = useState<string[]>([]);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const editor = useRef(null);
//   const [content, setContent] = useState("");
//   const router = useRouter();

//   const [createNutrition, { isLoading }] = useCreateNutritionMutation();
//   const [ingredients, setIngredients] = useState<string[]>([""]);

//   const [formData, setFormData] = useState({
//     title: "",
//     image: null as File | null,
//     calories: 0,
//     protein: 0,
//     carbohydrate: 0,
//     fat: 0,
//     fiber: 0,
//     rating: 0,
//     reviewsCount: 358,
//     category: [],
//     ingredients: [],
//     instruction: "",
//   });

//   const handleIngredientChange = (index: number, value: string) => {
//     let newIngredients = [...ingredients];
//     newIngredients[index] = value;
//     setIngredients(newIngredients);
//   };

//   const addIngredient = () => {
//     setIngredients([...ingredients, ""]);
//   };

//   const placeholder = "Enter your update privacy policy...";

//   const config = useMemo(
//     () => ({
//       readonly: false, // all options from https://xdsoft.net/jodit/docs/,
//       placeholder: placeholder || "Start typings...",
//     }),
//     [placeholder]
//   );

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, image: file }));
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();

//     const data2 = {
//       title: formData.title,
//       calories: formData.calories,
//       protein: formData.protein,
//       carbohydrate: formData.carbohydrate,
//       fat: formData.fat,
//       fiber: formData.fiber,
//       rating: formData.rating,
//       reviewsCount: 227,
//       ingredients: ingredients,
//       instruction: formData.instruction,
//     };


//     formDataToSend.append("data", JSON.stringify(data2));

//     // Ensure file is appended properly
//     if (formData.image) {
//       formDataToSend.append("image", formData.image);
//     }

//     try {
//       const response = await createNutrition(formDataToSend).unwrap();
//       toast.success("Workout added successfully!");

//       if (response?.success) {
//         setFormData({
//           title: "",
//           image: null,
//           calories: 0,
//           protein: 0,
//           carbohydrate: 0,
//           fat: 0,
//           fiber: 0,
//           rating: 0,
//           reviewsCount: 358,
//           category: [],
//           ingredients: [],
//           instruction: "",
//         });
//       }
//     } catch (error) {
//       console.error("Failed to add workout:", error);
//       alert("Failed to add workout. Please try again.");
//     }
//   };

//   return (
//     <div className='min-h-screen bg-[#FFFFFF] p-4 md:p-8'>
//       <Container>
//         <div className='flex items-center gap-3 mb-5'>
//           <ArrowLeft
//             onClick={() => router.back()}
//             className='text-2xl cursor-pointer text-gray-900'
//           />{" "}
//           <h1 className='text-2xl text-gray-900 font-semibold'>
//             Add Meal Plan
//           </h1>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className='rounded-lg border bg-white p-6 shadow-md'
//         >
//           {/* Image Upload */}
//           <div className='mb-6'>
//             <label className='relative block h-40 w-40 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50'>
//               <input
//                 type='file'
//                 className='hidden'
//                 accept='image/*'
//                 onChange={handleImageUpload}
//                 // required
//               />
//               {imagePreview ? (
//                 <Image
//                   src={imagePreview || "/placeholder.svg"}
//                   width={600}
//                   height={700}
//                   alt='Preview'
//                   className='h-full w-full rounded-lg object-cover'
//                 />
//               ) : (
//                 <div className='flex h-full flex-col items-center justify-center text-gray-400'>
//                   <ImagePlus className='mb-2 h-8 w-8' />
//                   <span className='text-sm'>Upload Image</span>
//                 </div>
//               )}
//             </label>
//           </div>

//           <div className='border border-gray-200 rounded-lg p-4'>
//             {/* Workout and Rating */}
//             <div className='mb-6 flex items-center justify-between gap-6'>
//               <div className='flex-1 flex flex-col gap-2'>
//                 <label
//                   htmlFor='title'
//                   className='text-[#545454] text-base font-medium'
//                 >
//                   Workout Name
//                 </label>
//                 <input
//                   type='text'
//                   onChange={(e) => {
//                     setFormData((prev) => ({ ...prev, title: e.target.value }));
//                   }}
//                   placeholder='Workout Name'
//                   className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
//                   // required
//                 />
//               </div>

//               <div className=' flex flex-col gap-2'>
//                 <label
//                   htmlFor='title'
//                   className='text-[#545454] text-base font-medium'
//                 >
//                   Rating
//                 </label>
//                 <input
//                   type='number'
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       rating: parseFloat(e.target.value),
//                     }));
//                   }}
//                   placeholder='Rating'
//                   min='0'
//                   max='5'
//                   step='0.1'
//                   className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
//                   // required
//                 />
//               </div>
//             </div>

//             {/* Nutritional Information */}
//             <div className='mb-6 grid gap-4 md:grid-cols-5'>
//               <div className='flex-1 flex flex-col gap-2'>
//                 <label
//                   htmlFor='title'
//                   className='text-[#545454] text-base font-medium'
//                 >
//                   Calories
//                 </label>
//                 <input
//                   type='number'
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       calories: parseFloat(e.target.value),
//                     }));
//                   }}
//                   placeholder='Calories'
//                   className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
//                   // required
//                 />
//               </div>

//               <div className='flex-1 flex flex-col gap-2'>
//                 <label
//                   htmlFor='title'
//                   className='text-[#545454] text-base font-medium'
//                 >
//                   Protein
//                 </label>
//                 <input
//                   type='number'
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       protein: parseFloat(e.target.value),
//                     }));
//                   }}
//                   placeholder='Protein'
//                   className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
//                   // required
//                 />
//               </div>

//               <div className='flex-1 flex flex-col gap-2'>
//                 <label
//                   htmlFor='title'
//                   className='text-[#545454] text-base font-medium'
//                 >
//                   Fat
//                 </label>
//                 <input
//                   type='number'
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       fat: parseFloat(e.target.value),
//                     }));
//                   }}
//                   placeholder='Fat'
//                   className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
//                   // required
//                 />
//               </div>

//               <div className='flex-1 flex flex-col gap-2'>
//                 <label
//                   htmlFor='title'
//                   className='text-[#545454] text-base font-medium'
//                 >
//                   Fiber
//                 </label>
//                 <input
//                   type='number'
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       fiber: parseFloat(e.target.value),
//                     }));
//                   }}
//                   placeholder='Fiber'
//                   className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
//                   // required
//                 />
//               </div>
//               <div className='flex-1 flex flex-col gap-2'>
//                 <label
//                   htmlFor='title'
//                   className='text-[#545454] text-base font-medium'
//                 >
//                   Carbohydrate
//                 </label>
//                 <input
//                   type='number'
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       carbohydrate: parseFloat(e.target.value),
//                     }));
//                   }}
//                   placeholder='Carbohydrate'
//                   className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
//                   // required
//                 />
//               </div>
//             </div>

//             {/* Ingredients */}
//             <div className='w-full space-y-4 mb-6'>
//               <div className='space-y-2'>
//                 <label
//                   htmlFor='ingredient-0'
//                   className='text-[#545454] text-base font-medium'
//                 >
//                   Ingredient
//                 </label>
//                 <div className='space-y-2'>
//                   {ingredients.map((ingredient, index) => (
//                     <div
//                       key={index}
//                       className='relative flex items-center gap-6'
//                     >
//                       <input
//                         id={`ingredient-${index}`}
//                         value={ingredient}
//                         onChange={(e) =>
//                           handleIngredientChange(index, e.target.value)
//                         }
//                         placeholder='Enter a name'
//                         className='flex-1 rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900'
//                       />
//                       <div className='flex items-center justify-center'>
//                         {index === ingredients.length - 1 && (
//                           <button
//                             type='button'
//                             onClick={addIngredient}
//                             className='bg-[#01336F] rounded-full w-12 h-12 flex items-center justify-center'
//                           >
//                             <Plus className='h-6 w-6 text-white' />
//                             <span className='sr-only'>Add ingredient</span>
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Recipe Editor */}
//             <div className='mb-6'>
//               <JoditEditor
//                 ref={editor}
//                 value={content}
//                 config={config}
//                 tabIndex={3} // tabIndex of textarea
//                 onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                 onChange={(newContent) => {
//                   setFormData((prev) => ({ ...prev, instruction: newContent }));
//                 }}
//                 className='text-black'
//               />
//             </div>

//             {/* Save Button */}
//             <div className='flex justify-end'>
//               <button
//                 type='submit'
//                 className='rounded-lg bg-blue-900 px-6 py-2 text-white hover:bg-blue-800'
//               >
//                 Save Meal
//               </button>
//             </div>
//           </div>
//         </form>
//       </Container>
//     </div>
//   );
// }


"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, ImagePlus, Plus } from "lucide-react";
import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import toast from "react-hot-toast";
import { useCreateNutritionMutation } from "@/redux/features/nutritions/NutritionAPI";

// Fix "self is not defined" issue by dynamically importing JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddMealPlan() {
  const editor = useRef(null);
  const router = useRouter();
  const [createNutrition, { isLoading }] = useCreateNutritionMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [content, setContent] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    fiber: 0,
    rating: 0,
    reviewsCount: 358,
    category: [] as string[],
    ingredients: [] as string[],
    instruction: "",
  });

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter instructions...",
    }),
    []
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append(
      "data",
      JSON.stringify({
        ...formData,
        ingredients, // Ensure ingredients are sent properly
        instruction: content,
      })
    );

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await createNutrition(formDataToSend).unwrap();
      toast.success("Meal Plan added successfully!");

      if (response?.success) {
        setFormData({
          title: "",
          image: null,
          calories: 0,
          protein: 0,
          carbohydrate: 0,
          fat: 0,
          fiber: 0,
          rating: 0,
          reviewsCount: 358,
          category: [],
          ingredients: [],
          instruction: "",
        });
        setIngredients([""]);
        setContent("");
      }
    } catch (error) {
      console.error("Failed to add meal plan:", error);
      toast.error("Failed to add meal plan. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-4 md:p-8">
      <Container>
        <div className="flex items-center gap-3 mb-5">
          <ArrowLeft
            onClick={() => router.back()}
            className="text-2xl cursor-pointer text-gray-900"
          />
          <h1 className="text-2xl text-gray-900 font-semibold">
            Add Meal Plan
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border bg-white p-6 shadow-md"
        >
          {/* Image Upload */}
          <div className="mb-6">
            <label className="relative block h-40 w-40 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  width={600}
                  height={700}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-gray-400">
                  <ImagePlus className="mb-2 h-8 w-8" />
                  <span className="text-sm">Upload Image</span>
                </div>
              )}
            </label>
          </div>

          {/* Meal Information */}
          <div className="mb-6 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Meal Plan Name"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900"
            />

            <input
              type="number"
              placeholder="Calories"
              value={formData.calories}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  calories: Number(e.target.value),
                }))
              }
              className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900"
            />
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder="Ingredient"
                  className="flex-1 rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900"
                />
                {index === ingredients.length - 1 && (
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <Plus className="h-6 w-6" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Instructions Editor */}
          <div className="mb-6">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
              className="text-black"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-900 px-6 py-2 text-white hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Meal"}
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
