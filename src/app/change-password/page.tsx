"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ChangePassword() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  // const [showPasswords, setShowPasswords] = useState({
  //   old: false,
  //   new: false,
  //   confirm: false,
  //   verify: false,
  // });

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  //   const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
  //     setShowPasswords((prev) => ({
  //       ...prev,
  //       [field]: !prev[field],
  //     }));
  //   };

  return (
    <div className='min-h-screen bg-[#F2F5F7] p-4 md:p-6'>
      <div className='max-w-md mx-auto'>
        {/* Header */}
        <div className='flex items-center gap-3 mb-6'>
          <Link href='/' className='text-gray-600 hover:text-gray-900'>
            <ArrowLeft className='w-5 h-5' />
          </Link>
          <h1 className='text-[32px] text-[#1A1918] font-bold'>
            Change Password
          </h1>
        </div>

        {/* Password requirement */}
        <p className='text-lg text-[#737163] mb-6'>
          Your password must be 8-10 character long.
        </p>

        {/* Password Form */}
        <form className='space-y-4'>
          <div className='flex flex-col space-y-4'>
            <label htmlFor='name'>
              <h3 className='text-lg text-[#1A1918] font-bold mb-1'>
                Enter old password
              </h3>
              <input
                type='text'
                id='name'
                className='w-full px-2 py-4 rounded border outline-none placeholder:text-lg placeholder:text-[#737163]'
                placeholder='Enter old password'
              />
            </label>
            <label htmlFor='name'>
              <h3 className='text-lg text-[#1A1918] font-bold mb-1'>
                Enter New password
              </h3>
              <input
                type='text'
                id='name'
                className='w-full px-2 py-4 rounded border outline-none placeholder:text-lg placeholder:text-[#737163]'
                placeholder='Enter old password'
              />
            </label>
            <label htmlFor='name'>
              <h3 className='text-lg text-[#1A1918] font-bold mb-1'>
                New password Confirm
              </h3>
              <input
                type='text'
                id='name'
                className='w-full px-2 py-4 rounded border outline-none placeholder:text-lg placeholder:text-[#737163]'
                placeholder='Enter old password'
              />
            </label>
          </div>

          {/* Verification Code */}
          <div className='grid grid-cols-6 gap-2'>
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type='text'
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className='w-16 h-16 text-3xl font-bold text-center border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                maxLength={1}
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className='flex justify-between items-center text-sm'>
            <span className='text-[#01336F] text-base'>
              Didn&apos;t receive the code? / Didn&apos;t receive the code?
            </span>
            <button
              type='button'
              className='text-base text-[#01336F] hover:text-[#01336F]'
            >
              Resend
            </button>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors'
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
