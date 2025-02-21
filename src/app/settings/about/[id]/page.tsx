// "use client";
// import { Button, message, Spin } from "antd";
// import { useMemo, useRef, useState, useEffect } from "react";
// import JoditEditor from "jodit-react";
// import { useRouter } from "next/navigation";
// import { usePrivacyGetQuery, useUpdatePrivacyMutation } from "@/redux/features/setting/SettingSlice";

// const EditPrivacyPolicy = () => {
//   const router = useRouter();
//   const editor = useRef<JoditEditor>(null);
//   const [content, setContent] = useState("");

//   // Fetch current Privacy Policy content
//   const { data, isLoading, error } = usePrivacyGetQuery(undefined);

//   // Mutation for updating Privacy Policy content
//   const [updatePrivacy, { isLoading: isUpdating }] = useUpdatePrivacyMutation();

//   // Jodit Editor Configuration
//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "Enter your updated privacy policy...",
//       height: "60vh",
//     }),
//     []
//   );

//   // Pre-fill editor with current content when data is fetched
//   useEffect(() => {
//     if (data?.data?.description) {
//       setContent(data.data.description);
//     }
//   }, [data]);

//   // Handle Save Button Click
//   const handleSave = async () => {
//     if (!content.trim()) {
//       message.warning("Privacy Policy content cannot be empty!");
//       return;
//     }

//     try {
//       const response = await updatePrivacy({ description: content }).unwrap();
//       message.success(response.message || "Privacy Policy updated successfully!");
//       router.push("/settings/privacy"); // Navigate back to the Privacy Policy page
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       message.error(error.data?.message || "Failed to update Privacy Policy.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[75vh]">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[75vh] flex flex-col justify-center items-center">
//         <p className="text-red-500 text-lg">Error loading Privacy Policy content.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[75vh] flex flex-col justify-between text-black p-4">
//       <div className="space-y-6">
//         <div>
//           <JoditEditor
//             ref={editor}
//             value={content}
//             onChange={(newContent) => setContent(newContent)}
//             config={config}
//             tabIndex={1}
//           />
//         </div>
//       </div>
//       <div className="flex justify-end pt-10">
//         <Button
//           style={{
//             backgroundColor: "#033f4d",
//             color: "#fff",
//           }}
//           htmlType="button"
//           onClick={handleSave}
//           loading={isUpdating} // Show loading indicator during update
//           className="w-[400px] h-[56px] placeholder:text-[#999999] text-[18px] font-medium"
//         >
//           Save
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default EditPrivacyPolicy;


"use client";
import { Button, message, Spin } from "antd";
import { useMemo, useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useRouter } from "next/navigation";
import { useAboutGetQuery, useUpdateAboutMutation } from "@/redux/features/setting/SettingSlice";

const EditAbout = () => {
  const router = useRouter();
  const editor = useRef<any>(null);
  const [content, setContent] = useState("");

  // Fetch current Privacy Policy content
  const { data, isLoading, error } = useAboutGetQuery(undefined);

  // Mutation for updating Privacy Policy content
  const [updatePrivacy, { isLoading: isUpdating }] = useUpdateAboutMutation();

  // Jodit Editor Configuration
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter your updated privacy policy...",
      height: "60vh",
    }),
    []
  );

  // Pre-fill editor with default content when data is fetched
  useEffect(() => {
    if (data?.data?.length > 0) {
      setContent(data.data[0].description || "No Privacy Policy content available.");
    }
  }, [data]);

  // Handle Save Button Click
  const handleSave = async () => {
    if (!content.trim()) {
      message.warning("Privacy Policy content cannot be empty!");
      return;
    }

    try {
      const response = await updatePrivacy({ description: content }).unwrap();
      message.success(response.message || "Privacy Policy updated successfully!");
      router.push("/settings/about"); // Navigate back to the Privacy Policy page
    } catch (error: any) {
      console.error("Update failed:", error);
      message.error(error.data?.message || "Failed to update Privacy Policy.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[75vh] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg">Error loading Privacy Policy content.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] flex flex-col justify-between text-black p-4">
      <div className="space-y-6">
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
          config={config}
          tabIndex={1}
        />
      </div>
      <div className="flex justify-end pt-10">
        <Button
          style={{
            backgroundColor: "#01336F",
            color: "#fff",
            borderRadius: "50px",
          }}
          htmlType="button"
          onClick={handleSave}
          loading={isUpdating} // Show loading indicator during update
          className="w-[350px] h-[56px] placeholder:text-[#999999] text-[18px] font-medium"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditAbout;
