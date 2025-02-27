



"use client";

import { useState, useEffect } from "react";
import { PlusCircle, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useAppointmentDetailsQuery, useUpdateAppointmentMutation } from "@/redux/features/appointmentPlan/AppointmentPlanAPI";

export default function UpdateAppointmentPlan() {
  const router = useRouter();
  const { id: workoutId } = useParams<{ id: string }>();


  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [descriptions, setDescriptions] = useState<string[]>([""]);

  const { data } = useAppointmentDetailsQuery(workoutId);
  const [updateAppointment, { isLoading, isError, isSuccess }] = useUpdateAppointmentMutation();

  // Populate form fields when data is fetched
  useEffect(() => {
    if (data?.data) {
      setTitle(data.data.title || "");
      setPrice(data.data.price || "");
      setDescriptions(data.data.description || [""]);
      setPreviewURL(data.data.image || null);
    }
  }, [data]);

  // Handle file upload and preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  // Add new description field
  const addDescriptionField = () => {
    setDescriptions((prev) => [...prev, ""]);
  };

  // Remove description field
  const removeDescriptionField = (index: number) => {
    setDescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  // Update description value
  const handleDescriptionChange = (index: number, value: string) => {
    setDescriptions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!workoutId) {
      alert("Workout ID is missing!");
      return;
    }

    const formData = new FormData();
    const payload = { title, description: descriptions, price };

    formData.append("data", JSON.stringify(payload));
    if (file) {
      formData.append("image", file);
    }

    
    try {
      await updateAppointment({ id: workoutId, formData }).unwrap();
      alert("Appointment Updated Successfully!");
      router.push('/appointment-plan');
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Error updating appointment");
    }
  };

  return (
    <div className="container mx-auto p-6 text-black">
      <button className="text-gray-500 mb-4" onClick={() => router.back()}>
        &larr; Update Appointment Plan
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-6">
          <label
            htmlFor="upload"
            className="w-24 h-24 bg-gray-100 flex flex-col items-center justify-center rounded-lg cursor-pointer border border-gray-300"
          >
            {previewURL ? (
              <img
                src={previewURL}
                alt="Uploaded preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400 text-sm">Upload Image</span>
            )}
            <input
              type="file"
              id="upload"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">{title || "Workout Name"}</h2>
            <p className="text-gray-400">{descriptions.join(", ") || "Product Description"}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Amount"
            value={price}
            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
        </div>

        {/* Dynamic Description Fields */}
        <div className="mt-4">
          {descriptions.map((desc, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter Description"
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
              {descriptions.length > 1 && (
                <button onClick={() => removeDescriptionField(index)} className="text-red-500">
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Button to add additional description fields */}
        <div className="mt-2 flex items-center gap-2">
          <button onClick={addDescriptionField} className="flex items-center gap-1 text-blue-500">
            <PlusCircle className="w-5 h-5" />
            <span>Add More</span>
          </button>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Save Appointment Plan"}
          </button>
        </div>

        {isSuccess && <p className="text-green-500 mt-2">Appointment updated successfully!</p>}
        {isError && <p className="text-red-500 mt-2">Error updating appointment.</p>}
      </div>
    </div>
  );
}
