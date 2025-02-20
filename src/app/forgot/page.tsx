"use client";
import React from "react";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiMail } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { message } from "antd"; // Assuming you're using Ant Design for notifications
import { useForgotPasswordMutation } from "@/redux/features/auth/AuthAPI";

// Define the type for the API response
interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

export default function forgot() {
  const [email, setEmail] = useState<string>("");
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Call the forgotPassword API with the email
      const response: ForgotPasswordResponse = await forgotPassword({
        email,
      }).unwrap();

      // Handle API response
      if (response.success) {
        message.success(response.message || "OTP has been sent to your email!");
        // Navigate to the OTP verification page and pass the email as a query param
        router.push(`/resetotp?email=${email}`);
      } else {
        message.error(response.message || "Failed to send OTP.");
      }
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      // Show error message from the API or fallback to a generic message
      message.error(
        error.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col md:flex-row lg:-ml-64">
          <div className="relative w-full h-screen flex flex-1 items-center justify-center bg-black/60">
            <Image
              src="/login/bg.png"
              alt="Background"
              width={1900}
              height={1900}
              className="object-cover min-w-full min-h-full"
              priority
            />
          </div>

          {/* Right side - Form */}
          <div className="flex flex-1 items-center justify-center bg-white p-6 md:p-10">
            <div className="bg-white rounded-lg p-8 shadow-sm">
            

              <div className="flex items-center gap-2 justify-center mb-6">
                <Link
                  href="/login"
                  className="flex items-center text-[#345C8C] hover:text-[#284670] transition-colors"
                >
                  <IoArrowBack className="h-5 w-5" />
                  <span className="text-[#1B365D] text-2xl font-semibold">
                    Forgot Password
                  </span>
                </Link>
              </div>

              <p className="text-gray-600 mb-6 text-center">
                Please enter your email address to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                  <CiMail className="h-5 w-5 text-[#345C8C] font-bold" />
                  <input
                    className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    placeholder="E-mail"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#345C8C] mt-4 py-4 rounded-full text-white font-semibold hover:bg-[#284670] transition-colors"
                >
                  Send OTP
                </button>
              </form>

              {/* Back to Login Link */}
              <p className="text-center mt-6 text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-[#345C8C] hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
      </main>
    </div>
  );
}
