


"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import { useUpdateProfileMutation, useUserProfileQuery } from "@/redux/features/users/UserAPI";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const router = useRouter();

  const [updateProfile] = useUpdateProfileMutation();
  const { data, isLoading, error } = useUserProfileQuery();

  // Set initial values from fetched data
  useEffect(() => {
    if (data) {
      setName(data.data.name);
      setPhoneNumber(data.data.phone);
      setImagePreview(data.data.image);
    }
  }, [data]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const goBack = () => {
    router.back();
  };

  const onFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const jsonData = JSON.stringify({
        name: name,
        phone: phoneNumber,
      });

      formData.append("data", jsonData);
      if (imageFile) {
        formData.append("image", imageFile);
      }


      const response = await updateProfile(formData).unwrap();

      toast.success(response.message || "Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect to "/profile" after update
      setTimeout(() => router.push("/settings/add-user"), 3000);
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile data</div>;

  return (
    <div className='min-h-screen bg-white text-black'>
      <Container>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-2'>
            <button
              onClick={goBack}
              className='text-gray-600 hover:text-gray-900'
            >
              <ArrowLeft className='w-5 h-5' />
            </button>
            <h1 className='text-xl font-semibold'>Overview</h1>
          </div>
        </div>

        <div className='flex gap-10'>
          {/* Profile Section */}
          <div className='w-[300px] p-6 border border-[#01336F] rounded-lg'>
            <div className='flex flex-col items-center'>
              <div className='relative mb-4'>
                <div className='w-[148px] h-[156px] rounded-full border-[5px] border-[#01336F] overflow-hidden relative'>
                  {/* Show uploaded image if available, else show placeholder */}
                  <Image
                    src={imagePreview || "/user.png"}
                    width={144}
                    height={156}
                    className='object-cover'
                    alt='Profile'
                  />

                  {/* Hidden file input */}
                  <input
                    type='file'
                    accept='image/*'
                    className='absolute inset-0 opacity-0 cursor-pointer'
                    onChange={handleImageUpload}
                  />

                  {/* Camera icon overlay */}
                  <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center pointer-events-none'>
                    <Camera className='w-6 h-6 text-white' />
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <p className='text-lg text-[#181414] mb-1'>Profile</p>
                <h2 className='text-2xl text-[#181414] font-medium'>{data?.data?.role}</h2>
              </div>
            </div>
          </div>

          <div className='flex-1'>
            {/* Form */}
            <form className='w-full space-y-6' onSubmit={onFinish}>
              {/* Name Field */}
              <div className='space-y-2'>
                <label className='block text-2xl font-medium text-[#1A1918]'>
                  Name
                </label>
                <div className='relative'>
                  <input
                    type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full px-4 py-2 text-lg placeholder:text-[#737163] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter Name'
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className='space-y-2'>
                <label className='block text-2xl font-medium text-[#1A1918]'>
                  Email
                </label>
                <div className='relative'>
                  <input
                    type={"email"}
                    value={data?.data.email}
                    disabled
                    className='w-full px-4 py-2 text-lg placeholder:text-[#737163] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter email'
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className='space-y-2'>
                <label className='block text-2xl font-medium text-[#1A1918]'>
                  Phone Number
                </label>
                <div className='relative flex'>
                  <div className='flex-shrink-0'>
                    <select className='h-full px-3 py-2 placeholder:text-[#737163] border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm'>
                      <option>+76</option>
                      <option>+435</option>
                      <option>+543</option>
                      <option>+55</option>
                    </select>
                  </div>
                  <div className='flex-grow relative'>
                    <input
                      type={"text"}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Enter phone'
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className='flex items-end justify-end mt-5'>
                <button
                  type='submit'
                  className='ml-auto px-4 py-2 bg-[#01336F] text-[#FFFFFF] rounded-md text-sm hover:bg-[#01326fe1] transition-colors'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}