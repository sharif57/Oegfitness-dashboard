
"use client";

import type React from "react";

import { useCreateWorkoutPlanMutation } from "@/redux/features/exercise/ExerciseAPI";
import { useRef, useState } from "react";
import {
  Upload,
  X,
  ImageIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Tag,
  Type,
} from "lucide-react";
import { useRouter } from "next/navigation";

const WorkoutPlanForm = () => {
  const router = useRouter();
  const [createWorkoutPlan, { isLoading, isError, error, isSuccess }] =
    useCreateWorkoutPlanMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "Cable Kickbacks Workout Plan",
    name: "Cable Kickbacks",
    description:
      "## Cable Kickbacks Workout Plan\n\n**## Overview**\nCable kickbacks are an excellent isolation exercise for targeting the glutes. This workout plan focuses on proper form and progressive overload.\n\n### Benefits:\n- Targets gluteus maximus\n- Improves hip extension\n- Enhances lower body strength\n- Great for muscle isolation\n\n### Instructions:\n1. Set up the cable machine at the lowest setting\n2. Attach an ankle strap to your working leg\n3. Face the machine and hold the frame for support\n4. Keep your core engaged throughout the movement\n5. Kick back in a controlled motion\n6. Squeeze your glutes at the top of the movement\n7. Return to starting position slowly\n\n### Sets and Reps:\n- Beginner: 3 sets of 12-15 reps\n- Intermediate: 4 sets of 15-20 reps\n- Advanced: 4 sets of 20-25 reps\n\n**Remember to warm up properly before starting and cool down after your workout!**",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object
    const submitData = new FormData();

    // Append text data
    submitData.append("data", JSON.stringify(formData));

    // Append file if selected
    if (selectedFile) {
      submitData.append("image", selectedFile);
    }

    try {
    const res=  await createWorkoutPlan(submitData).unwrap();
      // Reset form on success
      setFormData({
        title: "",
        name: "",
        description: "",
      });
      router.push('/exercise')
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      // Error handling is already done by RTK Query
      console.error("Failed to create workout plan:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8 text-black">
      <div className="max-w-6xl mx-auto">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/20">
          {/* Card Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Success Message */}
              {isSuccess && (
                <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800 font-medium">
                    Workout plan created successfully! 🎉
                  </p>
                </div>
              )}

              {/* Error Message */}
              {isError && (
                <div className="border border-red-200 bg-red-50 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  {/* <p className="text-red-800 font-medium">
                    {error?.data?.message ||
                      "Failed to create workout plan. Please try again."}
                  </p> */}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Text Fields */}
                <div className="space-y-6">
                  {/* Title Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="text-base font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Type className="h-4 w-4 text-blue-600" />
                      Workout Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter workout title..."
                      className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-base font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Tag className="h-4 w-4 text-green-600" />
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter exercise name..."
                      className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Description Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-base font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-purple-600" />
                      Description (Markdown supported)
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter detailed workout description with instructions..."
                      rows={12}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all duration-200 resize-none"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Use Markdown formatting for better presentation (## for
                      headers, **bold**, etc.)
                    </p>
                  </div>
                </div>

                {/* Right Column - Image Upload */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-orange-600" />
                      Workout Image
                    </label>

                    {/* File Upload Area */}
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                        dragActive
                          ? "border-blue-500 bg-blue-50"
                          : previewUrl
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="image"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />

                      {previewUrl ? (
                        <div className="space-y-4">
                          <div className="relative inline-block">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Preview"
                              className="max-w-full max-h-48 rounded-lg shadow-lg object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeFile}
                              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm text-green-600 font-medium">
                            {selectedFile?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Click to change or drag a new image
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                            <Upload className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-700 mb-2">
                              Drop your image here, or click to browse
                            </p>
                            <p className="text-sm text-gray-500">
                              Supports: JPG, PNG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Workout Plan...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Create Workout Plan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanForm;
