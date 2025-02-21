// 'use client'
// import { useUpdatePackageMutation } from "@/redux/features/package/PackageSlice";
// import { useState } from "react";

// const PackageForm = () => {
//   const [features, setFeatures] = useState<string[]>([""]);

//   const [updatePackage]=useUpdatePackageMutation()

//   const handleAddFeature = () => {
//     setFeatures([...features, ""]);
//   };
//   console.log(features);

//   const handleRemoveFeature = (index: number) => {
//     setFeatures(features.filter((_, i) => i !== index));
//   };

//   const handleFeatureChange = (index: number, value: string) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   return (
//     <div className="container mx-auto p-6 text-black">
//       <h2 className="text-2xl font-semibold mb-4">Overview</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-gray-700">Package Name</label>
//           <input
//             type="text"
//             placeholder="Enter Package Name"
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Package Amount</label>
//           <input
//             type="text"
//             placeholder="Enter Package Amount"
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </div>

//       <div className="mt-4 w-1/2">
//         <label className="block text-gray-700">Package Expiration</label>
//         <input
//           type="text"
//           placeholder="Enter Package Expiration"
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div className="mt-4">
//         <label className="block text-gray-700">Package Features</label>
//         {features.map((feature, index) => (
//           <div key={index} className="flex items-center space-x-2 mt-2">
//             <input
//               type="text"
//               placeholder="Enter Feature"
//               value={feature}
//               onChange={(e) => handleFeatureChange(index, e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             {features.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => handleRemoveFeature(index)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 ❌
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddFeature}
//           className="mt-2 text-blue-500 hover:text-blue-700"
//         >
//           ➕ Add Feature
//         </button>
//       </div>

    

//       <div className="flex justify-between mt-6 w-full">
       
//         <button className="bg-[#01336F] w-1/3 mx-auto text-white px-4 py-2 rounded">
//           Update
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PackageForm;


// 'use client'
// import { useUpdatePackageMutation } from "@/redux/features/package/PackageSlice";
// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation"; // If using App Router
// // import { useRouter } from "next/router"; // If using Pages Router

// const PackageForm = () => {
//   const { id: packageId } = useParams(); // Extract package ID from URL
//   // const router = useRouter();
//   // const { id: packageId } = router.query; // If using Pages Router

//   const [features, setFeatures] = useState<string[]>([""]);
//   const [packageName, setPackageName] = useState("");
//   const [packageAmount, setPackageAmount] = useState("");
//   const [packageExpiration, setPackageExpiration] = useState("monthly");

//   const [updatePackage, { isLoading, isError, error }] = useUpdatePackageMutation();

//   // Debugging: Ensure packageId is correctly retrieved
//   useEffect(() => {
//     console.log("Package ID:", packageId);
//   }, [packageId]);

//   console.log(packageId);

//   const handleAddFeature = () => {
//     setFeatures([...features, ""]);
//   };

//   const handleRemoveFeature = (index: number) => {
//     setFeatures(features.filter((_, i) => i !== index));
//   };

//   const handleFeatureChange = (index: number, value: string) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   const handleUpdate = async () => {
//     if (!packageId) {
//       console.error("Package ID is missing");
//       alert("Error: Package ID is required.");
//       return;
//     }

//     const payload = {
//       name: packageName,
//       description: features,
//       unitAmount: parseFloat(packageAmount),
//       interval: packageExpiration,
//     };
//     console.log(payload)

//     try {
//       await updatePackage({ _id: packageId, data: payload }).unwrap();
//       alert("Package updated successfully!");
//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 text-black">
//       <h2 className="text-2xl font-semibold mb-4">Overview</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-gray-700">Package Name</label>
//           <input
//             type="text"
//             placeholder="Enter Package Name"
//             value={packageName}
//             onChange={(e) => setPackageName(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Package Amount</label>
//           <input
//             type="number"
//             placeholder="Enter Package Amount"
//             value={packageAmount}
//             onChange={(e) => setPackageAmount(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </div>

//       <div className="mt-4 w-1/2">
//         <label className="block text-gray-700">Package Expiration</label>
//         <select
//           value={packageExpiration}
//           onChange={(e) => setPackageExpiration(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="monthly">Monthly</option>
//           <option value="quarterly">Quarterly</option>
//           <option value="yearly">Yearly</option>
//           <option value="lifetime">Lifetime</option>
//         </select>
//       </div>

//       <div className="mt-4">
//         <label className="block text-gray-700">Package Features</label>
//         {features.map((feature, index) => (
//           <div key={index} className="flex items-center space-x-2 mt-2">
//             <input
//               type="text"
//               placeholder="Enter Feature"
//               value={feature}
//               onChange={(e) => handleFeatureChange(index, e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             {features.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => handleRemoveFeature(index)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 ❌
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddFeature}
//           className="mt-2 text-blue-500 hover:text-blue-700"
//         >
//           ➕ Add Feature
//         </button>
//       </div>

//       <div className="flex justify-between mt-6 w-full">
//         <button
//           type="button"
//           onClick={handleUpdate}
//           className="bg-[#01336F] w-1/3 mx-auto text-white px-4 py-2 rounded"
//           disabled={isLoading}
//         >
//           {isLoading ? "Updating..." : "Update"}
//         </button>
//       </div>

//       {isError && <p className="text-red-500 mt-2">Error: {error?.data?.message || "Update failed"}</p>}
//     </div>
//   );
// };

// export default PackageForm;



// 'use client'
// import { usePackageDetailsQuery, useUpdatePackageMutation } from "@/redux/features/package/PackageSlice";
// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation"; // If using Next.js App Router
// import { toast } from "react-toastify";

// const PackageForm = () => {
//   const { id: packageId } = useParams(); // Extract package ID from URL
//   const router = useRouter();

//   const [features, setFeatures] = useState<string[]>([""]);
//   const [packageName, setPackageName] = useState("");
//   const [packageAmount, setPackageAmount] = useState("");
//   const [packageExpiration, setPackageExpiration] = useState("year");

//   const [updatePackage, { isLoading, isError, error }] = useUpdatePackageMutation();

//   const {data} = usePackageDetailsQuery(undefined)

//   // Debugging: Ensure packageId is correctly retrieved
//   useEffect(() => {
//     console.log("Package ID:", packageId);
//   }, [packageId]);

//   const handleAddFeature = () => {
//     setFeatures([...features, ""]);
//   };

//   const handleRemoveFeature = (index: number) => {
//     setFeatures(features.filter((_, i) => i !== index));
//   };

//   const handleFeatureChange = (index: number, value: string) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   const handleUpdate = async () => {
//     if (!packageId) {
//       console.error("Package ID is missing");
//       alert("Error: Package ID is required.");
//       return;
//     }

//     const parsedAmount = parseFloat(packageAmount);
//     if (isNaN(parsedAmount)) {
//       toast.error("Package amount is invalid. Please enter a valid number.");
//       // alert("Invalid package amount. Please enter a valid number.");
//       return;
//     }

//     const payload = {
//       name: packageName,
//       description: features,
//       unitAmount: parsedAmount,
//       interval: packageExpiration,
//     };

//     console.log("Payload Sent to Backend:", { _id: packageId, data: payload });

//     try {
//       const response = await updatePackage({ _id: packageId, data: payload }).unwrap();
//       console.log("Update Response:", response);
//       toast.success(response.message || "Package updated successfully!");
//       router.push("/subscription");
//     } catch (error) {
//       console.error("Update failed:", error);
//       toast.error(error?.data?.message || "Update failed. Please check your data.");
//       // alert(error?.data?.message || "Update failed. Please check your data.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 text-black">
//       <h2 className="text-2xl font-semibold mb-4">Overview</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-gray-700">Package Name</label>
//           <input
//             type="text"
//             placeholder="Enter Package Name"
//             value={packageName}
//             onChange={(e) => setPackageName(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Package Amount</label>
//           <input
//             type="number"
//             placeholder="Enter Package Amount"
//             value={packageAmount}
//             onChange={(e) => setPackageAmount(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </div>

//       <div className="mt-4 w-1/2">
//         <label className="block text-gray-700">Package Expiration</label>
//         <select
//           value={packageExpiration}
//           onChange={(e) => setPackageExpiration(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="month">Month</option>
//           <option value="half-year">6 Month</option>
//           <option value="year">Year</option>
//         </select>
//       </div>

//       <div className="mt-4">
//         <label className="block text-gray-700">Package Features</label>
//         {features.map((feature, index) => (
//           <div key={index} className="flex items-center space-x-2 mt-2">
//             <input
//               type="text"
//               placeholder="Enter Feature"
//               value={feature}
//               onChange={(e) => handleFeatureChange(index, e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             {features.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => handleRemoveFeature(index)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 ❌
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddFeature}
//           className="mt-2 text-blue-500 hover:text-blue-700"
//         >
//           ➕ Add Feature
//         </button>
//       </div>

//       <div className="flex justify-between mt-6 w-full">
//         <button
//           type="button"
//           onClick={handleUpdate}
//           className="bg-[#01336F] w-1/3 mx-auto text-white px-4 py-2 rounded"
//           disabled={isLoading}
//         >
//           {isLoading ? "Updating..." : "Update"}
//         </button>
//       </div>

//       {isError && <p className="text-red-500 mt-2">Error: {error?.data?.message || "Update failed"}</p>}
//     </div>
//   );
// };

// export default PackageForm;


"use client";
import { usePackageDetailsQuery, useUpdatePackageMutation } from "@/redux/features/package/PackageSlice";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

// Define the package data type
interface PackageData {
  _id: string;
  name: string;
  description: string[];
  unitAmount: number;
  interval: string;
  productId?: string;
  priceId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const PackageForm = () => {
  const { id: packageId } = useParams<{ id: string }>(); // Extract package ID from URL
  const router = useRouter();

  const [features, setFeatures] = useState<string[]>([""]);
  const [packageName, setPackageName] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [packageExpiration, setPackageExpiration] = useState("year");

  // Fetch package details using packageId
  const { data, isLoading: isFetching, isError: fetchError } = usePackageDetailsQuery(packageId);
  const [updatePackage, { isLoading, isError, error }] = useUpdatePackageMutation();

  // Populate form fields when data is fetched
  useEffect(() => {
    if (data?.data) {
      const packageData: PackageData = data.data;
      setPackageName(packageData.name);
      setPackageAmount(packageData.unitAmount.toString());
      setPackageExpiration(packageData.interval);
      setFeatures(packageData.description.length > 0 ? packageData.description : [""]);
    }
  }, [data]);

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleUpdate = async () => {
    if (!packageId) {
      toast.error("Error: Package ID is required.");
      return;
    }

    const parsedAmount = parseFloat(packageAmount);
    if (isNaN(parsedAmount)) {
      toast.error("Package amount is invalid. Please enter a valid number.");
      return;
    }

    const payload = {
      name: packageName,
      description: features,
      unitAmount: parsedAmount,
      interval: packageExpiration,
    };

    try {
      const response = await updatePackage({ _id: packageId, data: payload }).unwrap();
      toast.success(response.message || "Package updated successfully!");
      router.push("/subscription");
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed. Please check your data.");
    }
  };

  return (
    <div className="container mx-auto p-6 text-black">
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>

      {isFetching && <p className="text-blue-500">Loading package details...</p>}
      {fetchError && <p className="text-red-500">Error fetching package details</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Package Name</label>
          <input
            type="text"
            placeholder="Enter Package Name"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Package Amount</label>
          <input
            type="number"
            placeholder="Enter Package Amount"
            value={packageAmount}
            onChange={(e) => setPackageAmount(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4 w-1/2">
        <label className="block text-gray-700">Package Expiration</label>
        <select
          value={packageExpiration}
          onChange={(e) => setPackageExpiration(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="month">Month</option>
          <option value="half-year">6 Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Package Features</label>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              placeholder="Enter Feature"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="w-full p-2 border rounded"
            />
            {features.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFeature}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          ➕ Add Feature
        </button>
      </div>

      <div className="flex justify-between mt-6 w-full">
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-[#01336F] w-1/3 mx-auto text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>

      {isError && <p className="text-red-500 mt-2">Error: {error?.data?.message || "Update failed"}</p>}
    </div>
  );
};

export default PackageForm;
