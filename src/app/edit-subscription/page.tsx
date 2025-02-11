"use client";

import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import Container from "@/components/common/Container";

export default function EditSubscription() {
  const [showPassword, setShowPassword] = useState({
    packageName: false,
    packageAmount: false,
    packageExpiration: false,
    packageFeatures: false,
    packageName2: false,
  });

  // const togglePasswordVisibility = (field: keyof typeof showPassword) => {
  //   setShowPassword((prev) => ({
  //     ...prev,
  //     [field]: !prev[field],
  //   }));
  // };

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6'>
      {/* Header */}
      <div className='mb-8 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <button className='text-gray-600 hover:text-gray-900'>
            <ArrowLeft className='h-5 w-5' />
          </button>
          <h1 className='text-xl font-semibold text-gray-900'>Overview</h1>
        </div>
        <button className='rounded-lg bg-navy-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-700'>
          Create Account
        </button>
      </div>

      {/* Form */}
      <Container>
        <form className='space-y-6'>
          {/* Package Name */}
          <div className='space-y-1'>
            <label className='text-2xl font-medium text-[#1A1918]'>
              Package Name
            </label>
            <div className='relative'>
              <input
                type={showPassword.packageName ? "text" : "password"}
                className='w-full rounded-lg border border-gray-300 p-3 pr-10 outline-none focus:border-navy-600'
                placeholder='Package Name'
              />
              {/* <button
                type='button'
                onClick={() => togglePasswordVisibility("packageName")}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword.packageName ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button> */}
            </div>
          </div>

          {/* Package Amount */}
          <div className='space-y-1'>
            <label className='text-2xl font-medium text-[#1A1918]'>
              Package Amount
            </label>
            <div className='relative'>
              <input
                type={showPassword.packageAmount ? "text" : "password"}
                className='w-full rounded-lg border border-gray-300 p-3 pr-10 outline-none focus:border-navy-600'
                placeholder='Package Amount'
              />
              {/* <button
                type='button'
                onClick={() => togglePasswordVisibility("packageAmount")}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword.packageAmount ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button> */}
            </div>
          </div>

          {/* Package Expiration */}
          <div className='space-y-1'>
            <label className='text-2xl font-medium text-[#1A1918]'>
              Package Expiration
            </label>
            <div className='relative'>
              <input
                type={showPassword.packageExpiration ? "text" : "password"}
                className='w-full rounded-lg border border-gray-300 p-3 pr-10 outline-none focus:border-navy-600'
                placeholder='Enter Password'
              />
              {/* <button
                type='button'
                onClick={() => togglePasswordVisibility("packageExpiration")}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword.packageExpiration ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button> */}
            </div>
          </div>

          {/* Package Features */}
          <div className='space-y-1'>
            <label className='text-2xl font-medium text-[#1A1918]'>
              Package Features
            </label>
            <div className='relative'>
              <input
                type={showPassword.packageFeatures ? "text" : "password"}
                className='w-full rounded-lg border border-gray-300 p-3 pr-10 outline-none focus:border-navy-600'
                placeholder='Enter Password'
              />
              <div className='absolute right-3 top-1/2 -translate-y-1/2 flex gap-2'>
                {/* <button
                  type='button'
                  className='text-red-500 hover:text-red-600'
                >
                  <XCircle className='h-5 w-5' />
                </button>
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility("packageFeatures")}
                  className='text-gray-400 hover:text-gray-600'
                >
                  {showPassword.packageFeatures ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button> */}
              </div>
            </div>
          </div>

          {/* Package Name 2 */}
          <div className='space-y-1'>
            <label className='text-2xl font-medium text-[#1A1918]'>
              Package Name
            </label>
            <div className='relative'>
              <input
                type={showPassword.packageName2 ? "text" : "password"}
                className='w-full rounded-lg border border-gray-300 p-3 pr-10 outline-none focus:border-navy-600'
                placeholder='Enter Password'
              />
              <div className='absolute right-3 top-1/2 -translate-y-1/2 flex gap-2'>
                <button
                  type='button'
                  className='text-gray-400 hover:text-gray-600'
                >
                  <Info className='h-5 w-5' />
                </button>
                {/* <button
                  type='button'
                  onClick={() => togglePasswordVisibility("packageName2")}
                  className='text-gray-400 hover:text-gray-600'
                >
                  {showPassword.packageName2 ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button> */}
              </div>
            </div>
          </div>

          {/* Update Button */}
          <button
            type='submit'
            className='w-full rounded-lg bg-navy-600 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-700'
          >
            Update
          </button>
        </form>
      </Container>
    </div>
  );
}
