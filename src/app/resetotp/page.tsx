"use client";

import {
  useState,
  useRef,
  type KeyboardEvent,
  type ChangeEvent,
  useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVerifyEmailMutation } from "@/redux/features/auth/AuthAPI";

interface VerifyEmailPayload {
  email: string;
  oneTimeCode: number;
}

export default function VerifyEmail() {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const email = searchParams?.get("email") ?? null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(e.target.value))) return;

    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    setOtp(newOtp);

    // Move to next input if value is entered
    if (e.target.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (index > 0 && otp[index] === "") {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otpNumber = otp.join("");

    if (otpNumber.length !== 6 || isNaN(Number(otpNumber))) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!email) {
      toast.error("Email is missing. Please try again.");
      return;
    }

    try {
      const payload: VerifyEmailPayload = {
        email,
        oneTimeCode: parseInt(otpNumber),
      };

      const result = await verifyEmail(payload).unwrap();

      if (result.success) {
        toast.success(result.message || "Email verified successfully!");
        // Store the token in local storage for further use
        localStorage.setItem("Authorization", result.data.accessToken);
        // Redirect to create a new password
        router.push("/createpass");
      } else {
        toast.error(result.message || "Failed to verify email.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "An error occurred. Please try again."
      );
      console.error("Error verifying email:", error);
    }
  };

  return (
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
            

            <div className="flex items-center gap-2 mb-6 justify-center pt-5">
              <Link
                href="/forgot"
                className="flex items-center text-[#345C8C] hover:text-[#284670] transition-colors"
              >
                <IoArrowBack className="h-5 w-5" />
                <span className="text-[#1B365D] text-2xl font-semibold">
                  Verify Email
                </span>
              </Link>
            </div>

            <p className="text-gray-600 mb-8 text-center">
              Please enter the OTP we have sent you in your email.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    required
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => {inputRefs.current[index] = el}}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 border-2 rounded-lg border-[#345C8C] text-center text-xl font-semibold text-[#345C8C] focus:border-[#284670] focus:outline-none transition-colors"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#345C8C] py-4 rounded-full text-white font-semibold hover:bg-[#284670] transition-colors"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </div>
    </main>
  );
}
