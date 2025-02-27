"use client";
import { useAboutGetQuery } from "@/redux/features/setting/SettingSlice";
import { Button, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Define response data structure
interface PrivacyPolicyData {
  _id: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

const AboutUs = () => {
  const router = useRouter();

  // Fetching Privacy Policy content using the query hook
  const { data, isLoading, error } = useAboutGetQuery(undefined);

  // Extract description safely
  const privacyDescription: string =
    data?.data && data.data.length > 0
      ? data.data[0].description
      : "No Privacy Policy content available.";


  // Handle API errors
  useEffect(() => {
    if (error) {
      message.error("Failed to load Privacy Policy. Please try again.");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between p-4 text-black">
      <h1 className="text-3xl font-semibold mb-6">About Us</h1>
      <div className="space-y-4">
        <p className="text-gray-600">{privacyDescription}</p>
      </div>
      <div className="flex justify-end pt-10">
        <Button
          onClick={() => router.push("/settings/about/edit")}
          style={{
            backgroundColor: "#01336F",
            color: "#fff",
            borderRadius: "50px",
          }}
          className="w-[350px] h-[56px] placeholder:text-[#999999] text-[18px] font-medium"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
