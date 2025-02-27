

"use client";
import { useUserProfileQuery } from "@/redux/features/users/UserAPI";
import {
  useCreateWorkPlanMutation,
  useGetAllWorkOutQuery,
} from "@/redux/features/workout/WorkOutAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Search() {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: exerciseData, isLoading } = useGetAllWorkOutQuery(undefined);
  const { data: userData } = useUserProfileQuery();
  const user = userData?.data;

  const [createWorkPlan] = useCreateWorkPlanMutation();
  const GPT_API = process.env.NEXT_PUBLIC_API_KEY_GPT_KEY;

 

  const handleSendMessage = async () => {
    if (!user) {
      return; // Handle error if user is missing
    }

    setLoading(true);

    const url = "https://api.openai.com/v1/chat/completions";
    const workoutPlanMessage = createWorkoutPlanMessage();

    try {
      // Fetch GPT response
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GPT_API}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI fitness assistant.",
            },
            { role: "user", content: workoutPlanMessage },
            
          ],
        }),
      });

      const data = await response.json();
      const gptResponseText = data?.choices?.[0]?.message?.content || "{}";

      const planData = extractJsonData(gptResponseText);


      if (!planData) {
        throw new Error("Failed to parse GPT response into valid JSON.");
      }

      const jsonData = JSON.stringify(planData);
      const formData = new FormData();
      formData.append("data", jsonData);
      formData.append("image", exerciseData.data[0].image);


      // Save the generated plan to the database
      const result = await createWorkPlan(formData).unwrap();
      router.push(`/workout/add-workout/${result.data._id}`);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Fail to generate your plan. don't suggest more than 7 days", {
        position: "top-center",
        autoClose: 2000, // Close the toast after 5 seconds
      });
    } finally {
      setLoading(false);
    }
  };

  // const extractJsonData = (jsonString: string) => {
  //   try {
  //     const match = jsonString.match(/{.*}/s);
  //     return match ? JSON.parse(match[0]) : null;
  //   } catch (error) {
  //     console.error("JSON parsing error:", error);
  //     return null;
  //   }
  // };

  const extractJsonData = (jsonString: string) => {
    try {
      const match = jsonString.match(/{[\s\S]*}/);
      return match ? JSON.parse(match[0]) : null;
    } catch (error) {
      console.error("JSON parsing error:", error);
      return null;
    }
  };
  

  const createWorkoutPlanMessage = (): string => {
    if (!inputMessage || !user) return "User details are missing.";

    return `
      - Name: ${user.name}
      - Email: ${user.email}
      - Phone: ${user.phone}
      - Role: ${user.role}
      - Goal: ${inputMessage}
      
      Create a workout plan for the user. If a specific duration is not mentioned, use 10 days.
      
      Available exercises: ${JSON.stringify(
        exerciseData?.data?.map((ex : any) => ex._id) || []
      )}
      
      The response must be a JSON following this schema:
      {
        "planName": "string",
        "description": "string",
        "workouts": [
          {
            "day": "number",
            "isCompleted": "boolean",
            "warmUp": { "duration": "number", "exercises": ["ObjectId"] },
            "mainWorkout": { "duration": "number", "exercises": ["ObjectId"] },
            "coolDown": { "duration": "number", "exercises": ["ObjectId"] }
          }
        ]
      }
    `;
  };

  return (
    <div>
      <div className="flex items-center w-full mx-auto bg-white/10 backdrop-blur-lg rounded-lg  ">
        <input
          type="text"
          value={inputMessage}
          disabled={isLoading}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Enter your prompt.. (Max 7 days)"
          className="bg-transparent w-full text-white placeholder-white/50 outline-none px-2 py-6"
        />

        <button
          onClick={handleSendMessage}
          className="bg-[#01336F] text-white lg:px-10 px-4 lg:py-6 py-6 rounded-r-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <div className="loader-inner">
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
            </div>
          ) : (
            "Enter"
          )}
        </button>
      </div>


    </div>
  );
}
