"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit } = useForm<IFormInput>();

  const handleSubmitForm: SubmitHandler<IFormInput> = (data) => {
    
  };

  console.log(email, password);

  return (
    <div className='flex min-h-screen flex-col md:flex-row'>
      {/* Left Section - Image and Logo */}
      <div className='relative w-full h-screen flex flex-1 items-center justify-center bg-black/60'>
        <Image
          src='/login/bg.png'
          alt='Background'
          width={1900}
          height={1900}
          className='object-cover min-w-full min-h-full'
          priority
        />
      </div>

      {/* Right Section - Login Form */}
      <div className='flex flex-1 items-center justify-center bg-white p-6 md:p-10'>
        <div className='w-full max-w-md space-y-8'>
          <div className='space-y-2'>
            <div className='flex items-center justify-center gap-2'>
              <button
                onClick={() => router.back()}
                className='text-gray-600 hover:text-gray-900'
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className='text-[32px] font-bold text-[#3D3D3A] text-center'>
                Sign In
              </h2>
            </div>
            <p className='text-lg text-[#737163] max-w-[360px] mx-auto text-center'>
              Please enter your email address to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSubmitForm)} className='space-y-6'>
            <div className='space-y-4'>
              <div className='relative'>
                <input
                  type='email'
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  {...register("email", { required: true })}
                  required
                  placeholder='Enter Email'
                  className='w-full rounded-full placeholder-[#737163] border border-gray-300 px-4 py-3 focus:border-blue-900 focus:outline-none'
                />
              </div>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  {...register("password", { required: true })}
                  required
                  placeholder='Enter Password'
                  className='w-full rounded-full placeholder-[#737163] border border-gray-300 px-4 py-3 pr-12 focus:border-blue-900 focus:outline-none'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between cursor-pointer'>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300'
                />
                <span className='text-lg text-[#737163]'>Remember me</span>
              </label>
              <Link
                href='/forgot-password'
                className='text-lg font-medium text-[#1A1918] hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              className='w-full rounded-full text-lg font-medium bg-blue-900 px-6 py-3 text-[#FFFFFF] transition-colors hover:bg-blue-800'
            >
              Sign In
            </button>

            <p className='text-center text-base text-[#3D3D3A]'>
              Don&apos;t have an account?{" "}
              <Link
                href='/signup'
                className='text-lg font-medium text-[#01336F] hover:underline'
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
