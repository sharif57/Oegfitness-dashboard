
// "use client";

// import dynamic from "next/dynamic";
// import { ArrowLeft, ImagePlus, Plus } from "lucide-react";
// import React, { useState, useRef, useMemo } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Container from "@/components/common/Container";
// import toast from "react-hot-toast";
// import { useCreateNutritionMutation } from "@/redux/features/nutritions/NutritionAPI";

// // Fix "self is not defined" issue by dynamically importing JoditEditor with SSR disabled
// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// export default function AddMealPlan() {
//   const editor = useRef(null);
//   const router = useRouter();
//   const [createNutrition, { isLoading }] = useCreateNutritionMutation();
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [ingredients, setIngredients] = useState<string[]>([""]);
//   const [content, setContent] = useState("");

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
//     category: [] as string[],
//     ingredients: [] as string[],
//     instruction: "",
//   });

//   const handleIngredientChange = (index: number, value: string) => {
//     const newIngredients = [...ingredients];
//     newIngredients[index] = value;
//     setIngredients(newIngredients);
//   };

//   const addIngredient = () => {
//     setIngredients([...ingredients, ""]);
//   };

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "Enter instructions...",
//     }),
//     []
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
//     formDataToSend.append(
//       "data",
//       JSON.stringify({
//         ...formData,
//         ingredients, // Ensure ingredients are sent properly
//         instruction: content,
//       })
//     );

//     if (formData.image) {
//       formDataToSend.append("image", formData.image);
//     }

//     try {
//       const response = await createNutrition(formDataToSend).unwrap();
//       toast.success("Meal Plan added successfully!");
//       router.push("/nutrition");

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
//         setIngredients([""]);
//         setContent("");
//       }
//     } catch (error) {
//       console.error("Failed to add meal plan:", error);
//       toast.error("Failed to add meal plan. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FFFFFF] p-4 md:p-8">
//       <Container>
//         <div className="flex items-center gap-3 mb-5">
//           <ArrowLeft
//             onClick={() => router.back()}
//             className="text-2xl cursor-pointer text-gray-900"
//           />
//           <h1 className="text-2xl text-gray-900 font-semibold">
//             Add Meal Plan
//           </h1>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="rounded-lg border bg-white p-6 shadow-md"
//         >
//           {/* Image Upload */}
//           <div className="mb-6">
//             <label className="relative block h-40 w-40 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
//               <input
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//               {imagePreview ? (
//                 <Image
//                   src={imagePreview}
//                   width={600}
//                   height={700}
//                   alt="Preview"
//                   className="h-full w-full rounded-lg object-cover"
//                 />
//               ) : (
//                 <div className="flex h-full flex-col items-center justify-center text-gray-400">
//                   <ImagePlus className="mb-2 h-8 w-8" />
//                   <span className="text-sm">Upload Image</span>
//                 </div>
//               )}
//             </label>
//           </div>

//           {/* Meal Information */}
//           <div className="mb-6 flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Meal Plan Name"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, title: e.target.value }))
//               }
//               className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900"
//             />

//             <input
//               type="number"
//               placeholder="Calories"
//               value={formData.calories}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   calories: Number(e.target.value),
//                 }))
//               }
//               className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900"
//             />
//           </div>

//           {/* Ingredients */}
//           <div className="mb-6">
//             {ingredients.map((ingredient, index) => (
//               <div key={index} className="flex items-center gap-3">
//                 <input
//                   type="text"
//                   value={ingredient}
//                   onChange={(e) =>
//                     handleIngredientChange(index, e.target.value)
//                   }
//                   placeholder="Ingredient"
//                   className="flex-1 rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900"
//                 />
//                 {index === ingredients.length - 1 && (
//                   <button
//                     type="button"
//                     onClick={addIngredient}
//                     className="bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center"
//                   >
//                     <Plus className="h-6 w-6" />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Instructions Editor */}
//           <div className="mb-6">
//             <JoditEditor
//               ref={editor}
//               value={content}
//               config={config}
//               onBlur={(newContent) => setContent(newContent)}
//               className="text-black"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="rounded-lg bg-blue-900 px-6 py-2 text-white hover:bg-blue-800"
//               disabled={isLoading}
//             >
//               {isLoading ? "Saving..." : "Save Meal"}
//             </button>
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
      placeholder: "Enter cooking instructions...",
    }),
    []
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append(
      "data",
      JSON.stringify({
        ...formData,
        ingredients,
        instruction: content,
      })
    );

    const imageInput = (e.target as HTMLFormElement).elements.namedItem(
      "image"
    ) as HTMLInputElement;
    if (imageInput?.files?.[0]) {
      formDataToSend.append("image", imageInput.files[0]);
    }

    try {
      const response = await createNutrition(formDataToSend).unwrap();
      toast.success("Meal Plan added successfully!");
      window.location.href="/nutrition";

      if (response?.success) {
        setFormData({
          title: "",
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
        setImagePreview(null);
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
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Meal Image
            </label>
            <label className="relative block h-40 w-40 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              <input
                id="image"
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  width={600}
                  height={700}
                  alt="Meal Preview"
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
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Meal Plan Name
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter meal plan name"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="calories"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Calories
              </label>
              <input
                id="calories"
                type="number"
                placeholder="Enter calories (kcal)"
                value={formData.calories}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    calories: Number(e.target.value),
                  }))
                }
                className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="protein"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Protein
              </label>
              <input
                id="protein"
                type="number"
                placeholder="Enter protein (g)"
                value={formData.protein}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    protein: Number(e.target.value),
                  }))
                }
                className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="carbohydrate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Carbohydrate
              </label>
              <input
                id="carbohydrate"
                type="number"
                placeholder="Enter carbohydrate (g)"
                value={formData.carbohydrate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    carbohydrate: Number(e.target.value),
                  }))
                }
                className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="fat"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fat
              </label>
              <input
                id="fat"
                type="number"
                placeholder="Enter fat (g)"
                value={formData.fat}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fat: Number(e.target.value),
                  }))
                }
                className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="fiber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fiber
              </label>
              <input
                id="fiber"
                type="number"
                placeholder="Enter fiber (g)"
                value={formData.fiber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fiber: Number(e.target.value),
                  }))
                }
                className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900 w-full"
              />
            </div>
            
            {/* ratting add */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <input
                type="number"
                placeholder="Enter rating (1-5)"
                value={formData.rating}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rating: Number(e.target.value),
                  }))
                }
                className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 text-gray-900 w-full"
              />
            </div>

          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-3 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder={`Enter ingredient ${index + 1}`}
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
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Instructions
            </label>
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
