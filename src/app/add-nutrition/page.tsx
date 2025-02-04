"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ImagePlus } from "lucide-react";

// Dynamic import of the rich text editor to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Image from "next/image";

export default function AddMealPlan() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipeContent, setRecipeContent] = useState("");
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

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("ingredient") as HTMLInputElement;
    if (input.value.trim()) {
      setIngredients([...ingredients, input.value.trim()]);
      input.value = "";
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md'>
        <h1 className='mb-6 text-2xl font-bold'>Add Meal Plan</h1>

        {/* Image Upload */}
        <div className='mb-6'>
          <label className='relative block h-40 w-40 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50'>
            <input
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleImageUpload}
            />
            {imagePreview ? (
              <Image
                src={imagePreview || "/placeholder.svg"}
                width={600}
                height={700}
                alt='Preview'
                className='h-full w-full rounded-lg object-cover'
              />
            ) : (
              <div className='flex h-full flex-col items-center justify-center text-gray-400'>
                <ImagePlus className='mb-2 h-8 w-8' />
                <span className='text-sm'>Upload Image</span>
              </div>
            )}
          </label>
        </div>

        {/* Basic Information */}
        <div className='mb-6 space-y-4'>
          <input
            type='text'
            placeholder='Title'
            className='w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
          />
          <textarea
            placeholder='Product Description'
            className='h-24 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
          />
        </div>

        {/* Workout and Rating */}
        <div className='mb-6 grid gap-4 md:grid-cols-2'>
          <input
            type='text'
            placeholder='Workout Name'
            className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
          />
          <input
            type='number'
            placeholder='Rating'
            min='0'
            max='5'
            step='0.1'
            className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
          />
        </div>

        {/* Nutritional Information */}
        <div className='mb-6 grid gap-4 md:grid-cols-4'>
          <input
            type='number'
            placeholder='Calories'
            className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
          />
          <input
            type='number'
            placeholder='Protein'
            className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
          />
          <input
            type='number'
            placeholder='Fat'
            className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
          />
          <input
            type='number'
            placeholder='Fiber'
            className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
          />
        </div>

        {/* Ingredients */}
        <div className='mb-6'>
          <div className='flex gap-2'>
            <input
              id='ingredient'
              type='text'
              placeholder='Ingredient'
              className='flex-1 rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
            />
            <button
              onClick={addIngredient}
              className='rounded-lg bg-blue-900 px-4 text-white hover:bg-blue-800'
            >
              +
            </button>
          </div>
          {ingredients.length > 0 && (
            <div className='mt-2 space-y-1'>
              {ingredients.map((ingredient, index) => (
                <div key={index} className='text-sm text-gray-600'>
                  • {ingredient}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recipe Editor */}
        <div className='mb-6'>
          <ReactQuill
            theme='snow'
            value={recipeContent}
            onChange={setRecipeContent}
            className='h-64'
          />
        </div>

        {/* Save Button */}
        <div className='flex justify-end'>
          <button className='rounded-lg bg-blue-900 px-6 py-2 text-white hover:bg-blue-800'>
            Save Meal
          </button>
        </div>
      </div>
    </div>
  );
}
