"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, ImagePlus } from "lucide-react";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddMealPlan() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipeContent, setRecipeContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const router = useRouter();

  const placeholder = "Enter your update privacy policy...";

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

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
    <div className='min-h-screen bg-[#FFFFFF] p-4 md:p-8'>
      <div className='mx-auto max-w-[96%]'>
        <div className='flex items-center gap-3 my-5'>
          <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />{" "}
          <h1 className='text-2xl font-semibold'>Add Meal Plan</h1>
        </div>

        <form className='rounded-lg border bg-white p-6 shadow-md'>
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

          <div className='border border-gray-200 rounded-lg p-4'>
            {/* Workout and Rating */}
            <div className='mb-6 flex items-center justify-between gap-6'>
              <div className='flex-1 flex flex-col gap-2'>
                <label
                  htmlFor='title'
                  className='text-[#545454] text-base font-medium'
                >
                  Workout Name
                </label>
                <input
                  type='text'
                  placeholder='Workout Name'
                  className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
                />
              </div>

              <div className='flex-1 flex flex-col gap-2'>
                <label
                  htmlFor='title'
                  className='text-[#545454] text-base font-medium'
                >
                  Rating
                </label>
                <input
                  type='number'
                  placeholder='Rating'
                  min='0'
                  max='5'
                  step='0.1'
                  className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
                />
              </div>
            </div>

            {/* Nutritional Information */}
            <div className='mb-6 grid gap-4 md:grid-cols-4'>
              <div className='flex-1 flex flex-col gap-2'>
                <label
                  htmlFor='title'
                  className='text-[#545454] text-base font-medium'
                >
                  Calories
                </label>
                <input
                  type='number'
                  placeholder='Calories'
                  className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
                />
              </div>

              <div className='flex-1 flex flex-col gap-2'>
                <label
                  htmlFor='title'
                  className='text-[#545454] text-base font-medium'
                >
                  Protein
                </label>
                <input
                  type='number'
                  placeholder='Protein'
                  className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
                />
              </div>

              <div className='flex-1 flex flex-col gap-2'>
                <label
                  htmlFor='title'
                  className='text-[#545454] text-base font-medium'
                >
                  Fat
                </label>
                <input
                  type='number'
                  placeholder='Fat'
                  className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
                />
              </div>

              <div className='flex-1 flex flex-col gap-2'>
                <label
                  htmlFor='title'
                  className='text-[#545454] text-base font-medium'
                >
                  Fiber
                </label>
                <input
                  type='number'
                  placeholder='Fiber'
                  className='rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className='mb-6'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='title'
                  className='text-[#545454] text-base font-medium'
                >
                  Ingredient
                </label>
                <div className='flex items-center gap-3'>
                  <input
                    id='ingredient'
                    type='text'
                    placeholder='Ingredient'
                    className='flex-1 rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500'
                  />
                  <button
                    onClick={addIngredient}
                    className='rounded-lg bg-blue-900 px-4 py-3 text-white hover:bg-blue-800'
                  >
                    +
                  </button>
                </div>
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
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>

            {/* Save Button */}
            <div className='flex justify-end'>
              <button className='rounded-lg bg-blue-900 px-6 py-2 text-white hover:bg-blue-800'>
                Save Meal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
