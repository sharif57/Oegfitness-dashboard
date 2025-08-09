// "use client";

// import { useState } from "react";
// import { Pagination } from "antd";
// import {
//   InfoIcon as InfoCircleOutlined,
//   MoreVertical,
//   Plus,
//   Star,
// } from "lucide-react";
// import "antd/dist/reset.css";
// import Image from "next/image";
// import Link from "next/link";
// import Container from "@/components/common/Container";
// import { useGetAllNutritionsQuery } from "@/redux/features/nutritions/NutritionAPI";

// interface INutrition {
//   _id: string;
//   title: string;
//   instruction: string;
//   image: string;
//   rating: number;
// }

// export default function NutritionPlan() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const {
//     data: nutritionData,
//     isLoading,
//     isError,
//   } = useGetAllNutritionsQuery({
//     page: currentPage,
//     limit: itemsPerPage,
//   });
//   console.log(nutritionData), 'nutritionData';

//   if (isLoading || !nutritionData.data) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error</div>;
//   }


//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = nutritionData?.data.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const IMAGE_URL = "https://server.oegfitness.com";

//   return (
//     <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
//       <Container>
//         {/* Header */}
//         <div className='mb-8 flex items-center justify-between'>
//           <h1 className='text-2xl font-bold text-gray-900'>Nutrition Plan</h1>
//           <Link
//             href={"/nutrition/add-nutrition"}
//             className='flex items-center justify-center rounded-lg bg-[#01336F] px-5 py-3 text-white hover:bg-navy-700'
//           >
//             <Plus /> <span>Add Nutrition</span>
//           </Link>
//         </div>

//         {/* Card Grid */}
//         <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
//           {currentItems.map((item: INutrition) => (
//             <div
//               key={item._id}
//               className='overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]'
//             >
              
//               <div className='relative h-64 w-full'>
//                 <img
//                   src={`${IMAGE_URL}${item?.image}` || "/placeholder.svg"}
//                   width={600}
//                   height={700}
//                   alt='Meal Plan'
//                   className='h-full w-full object-cover' />
//               </div>
//               <div className='p-4'>
//                 <div className='mb-2 flex items-center justify-between'>
//                   <h3 className='text-2xl font-medium text-[#000000]'>
//                     {item.title}
//                   </h3>
//                   <div className='flex items-center gap-1'>
//                     <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
//                     <span className='text-xl text-[#545454]'>
//                       {item.rating}
//                     </span>
//                   </div>
//                 </div>

//                 <div className='flex items-stretch justify-between'>
//                   <p className='text-base text-[#545454]'>
//                     {item?.instruction}
//                   </p>
//                   <div className='flex flex-col items-center'>
//                     <button className='rounded-full p-2 hover:bg-gray-100'>
//                       <InfoCircleOutlined className='h-5 w-5 text-gray-500' />
//                     </button>
//                     <button className='rounded-full p-2 hover:bg-gray-100'>
//                       <MoreVertical className='h-5 w-5 text-gray-500' />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className='mt-8 flex justify-center'>
//           <Pagination
//             current={currentPage}
//             onChange={(page) => setCurrentPage(page)}
//             total={nutritionData?.data.length || 0}
//             pageSize={itemsPerPage}
//             showSizeChanger={false}
//           />
//         </div>
//       </Container>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { Pagination } from "antd";
// import {
//   InfoIcon as InfoCircleOutlined,
//   MoreVertical,
//   Plus,
//   Star,
// } from "lucide-react";
// import "antd/dist/reset.css";
// import Image from "next/image";
// import Link from "next/link";
// import Container from "@/components/common/Container";
// import { useGetAllNutritionsQuery } from "@/redux/features/nutritions/NutritionAPI";

// interface INutrition {
//   _id: string;
//   title: string;
//   instruction: string;
//   image: string;
//   rating: number;
// }

// export default function NutritionPlan() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 1000;

//   const {
//     data: nutritionData,
//     isLoading,
//     isError,
//   } = useGetAllNutritionsQuery({
//     page: currentPage,
//     limit: itemsPerPage,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError || !nutritionData?.data) {
//     return <div>Error loading nutrition plans. Please try again.</div>;
//   }

//   // const IMAGE_URL = "https://server.oegfitness.com";
//   const IMAGE_URL = "http://10.10.12.54:3005";

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <Container>
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-900">Nutrition Plan</h1>
//           <Link
//             href={"/nutrition/add-nutrition"}
//             className="flex items-center justify-center rounded-lg bg-[#01336F] px-5 py-3 text-white hover:bg-navy-700"
//           >
//             <Plus /> <span>Add Nutrition</span>
//           </Link>
//         </div>

//         {/* Card Grid */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {nutritionData.data.map((item: INutrition) => (
//             <div
//               key={item._id}
//               className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]"
//             >
//               <div className="relative h-64 w-full">
//                 <Image
//                   src={`${IMAGE_URL}${item?.image}` || "/placeholder.svg"}
//                   width={600}
//                   height={700}
//                   alt="Meal Plan"
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <div className="mb-2 flex items-center justify-between">
//                   <h3 className="text-2xl font-medium text-[#000000]">
//                     {item.title}
//                   </h3>
//                   <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-xl text-[#545454]">
//                       {item.rating}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-stretch justify-between">
//                   <p className="text-base text-[#545454]" dangerouslySetInnerHTML={{ __html: item?.instruction.substring(0,100) }}>
//                     {/* {item?.instruction.substring(0, 100)}... */}
//                   </p>
//                   <div className="flex flex-col items-center">
//                     <button className="rounded-full p-2 hover:bg-gray-100">
//                       <InfoCircleOutlined className="h-5 w-5 text-gray-500" />
//                     </button>
                
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-8 flex justify-center">
//           <Pagination
//             current={currentPage}
//             onChange={(page) => setCurrentPage(page)}
//             total={nutritionData?.total || 0}
//             pageSize={itemsPerPage}
//             showSizeChanger={false}
//           />
//         </div>
//       </Container>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { Pagination } from "antd";
// import {
//   InfoIcon as InfoCircleOutlined,
//   MoreVertical,
//   Plus,
//   Star,
//   Edit,
//   Trash,
// } from "lucide-react";
// import "antd/dist/reset.css";
// import Image from "next/image";
// import Link from "next/link";
// import Container from "@/components/common/Container";
// import { useDeleteNutritionMutation, useGetAllNutritionsQuery } from "@/redux/features/nutritions/NutritionAPI";
// import toast from "react-hot-toast";

// interface INutrition {
//   _id: string;
//   title: string;
//   instruction: string;
//   image: string;
//   rating: number;
// }

// export default function NutritionPlan() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 1000;
//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);

//   const {
//     data: nutritionData,
//     isLoading,
//     isError,
//   } = useGetAllNutritionsQuery({
//     page: currentPage,
//     limit: itemsPerPage,
//   });

//   const [deleteNutrition, { isLoading: isDeleting }] = useDeleteNutritionMutation();

//   const handleToggleMenu = (id: string) => {
//     setOpenMenuId(openMenuId === id ? null : id);
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this nutrition plan?")) {
//       try {
//       const res =   await deleteNutrition(id).unwrap();
//       console.log(res, "delete response");
//         toast.success("Nutrition plan deleted successfully!");
//       } catch (error) {
//         console.error("Failed to delete nutrition plan:", error);
//         toast.error("Failed to delete nutrition plan. Please try again.");
//       }
//     }
//     setOpenMenuId(null);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError || !nutritionData?.data) {
//     return <div>Error loading nutrition plans. Please try again.</div>;
//   }

//   const IMAGE_URL = "http://10.10.12.54:3005";

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <Container>
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-900">Nutrition Plan</h1>
//           <Link
//             href={"/nutrition/add-nutrition"}
//             className="flex items-center justify-center rounded-lg bg-[#01336F] px-5 py-3 text-white hover:bg-navy-700"
//           >
//             <Plus /> <span>Add Nutrition</span>
//           </Link>
//         </div>

//         {/* Card Grid */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
//           {nutritionData.data.map((item: INutrition) => (
//             <div
//               key={item._id}
//               className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]"
//             >
//               <div className="relative  w-full">
//                 <Image
//                   src={`${IMAGE_URL}${item?.image}` || "/placeholder.svg"}
//                   width={600}
//                   height={700}
//                   alt="Meal Plan"
//                   className="h-[200px] w-full object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <div className="mb-2 flex items-center justify-between">
//                   <h3 className="text-2xl font-medium text-[#000000]">
//                     {item.title}
//                   </h3>
//                   <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-xl text-[#545454]">
//                       {item.rating}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-stretch justify-between">
//                   <p
//                     className="text-base text-[#545454]"
//                     dangerouslySetInnerHTML={{ __html: item?.instruction.substring(0, 100) }}
//                   />
//                   <div className="relative flex  flex-col items-center">
//                     <button
//                       className="rounded-full p-2 hover:bg-gray-100"
//                       onClick={() => handleToggleMenu(item._id)}
//                     >
//                       <InfoCircleOutlined className="h-5 w-5 text-gray-500" />
//                     </button>
//                     {openMenuId === item._id && (
//                       <div className="absolute top-10 right-0 bg-white border border-gray-200 shadow-lg rounded-md p-2 z-10">
//                         <Link
//                           href={`/nutrition/edit-nutrition/${item._id}`}
//                           className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           <Edit className="h-4 w-4" />
//                           Edit
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                           disabled={isDeleting}
//                         >
//                           <Trash className="h-4 w-4" />
//                           {isDeleting ? "Deleting..." : "Delete"}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-8 flex justify-center">
//           <Pagination
//             current={currentPage}
//             onChange={(page) => setCurrentPage(page)}
//             total={nutritionData?.total || 0}
//             pageSize={itemsPerPage}
//             showSizeChanger={false}
//           />
//         </div>
//       </Container>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Pagination } from "antd";
// import {
//   InfoIcon as InfoCircleOutlined,
//   Plus,
//   Star,
//   Edit,
//   Trash,
// } from "lucide-react";
// import "antd/dist/reset.css";
// import Image from "next/image";
// import Link from "next/link";
// import Container from "@/components/common/Container";
// import { useDeleteNutritionMutation, useGetAllNutritionsQuery } from "@/redux/features/nutritions/NutritionAPI";

// import toast from "react-hot-toast";

// interface INutrition {
//   _id: string;
//   title: string;
//   instruction: string;
//   image: string;
//   rating: number;
// }

// export default function NutritionPlan() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20; // Reduced for better performance
//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const {
//     data: nutritionData,
//     isLoading,
//     isError,
//   } = useGetAllNutritionsQuery({
//     page: currentPage,
//     limit: itemsPerPage,
//   });

//   const [deleteNutrition, { isLoading: isDeleting }] = useDeleteNutritionMutation();

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleToggleMenu = (id: string) => {
//     setOpenMenuId(openMenuId === id ? null : id);
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this nutrition plan?")) {
//       try {
//         await deleteNutrition(id).unwrap();
//         toast.success("Nutrition plan deleted successfully!");
//       } catch (error) {
//         console.error("Failed to delete nutrition plan:", error);
//         toast.error("Failed to delete nutrition plan. Please try again.");
//       }
//     }
//     setOpenMenuId(null);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError || !nutritionData?.data) {
//     return <div>Error loading nutrition plans. Please try again.</div>;
//   }

//   const IMAGE_URL = "http://10.10.12.54:3005";

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <Container>
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-900">Nutrition Plan</h1>
//           <Link
//             href={"/nutrition/add-nutrition"}
//             className="flex items-center justify-center rounded-lg bg-[#01336F] px-5 py-3 text-white hover:bg-navy-700"
//           >
//             <Plus /> <span>Add Nutrition</span>
//           </Link>
//         </div>

//         {/* Card Grid */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {nutritionData.data.map((item: INutrition) => (
//             <div
//               key={item._id}
//               className="overflow-hidden h-[500px] rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]"
//             >
//               <div className="relative h-64 w-full">
//                 <Image
//                   src={`${IMAGE_URL}${item?.image}` || "/placeholder.svg"}
//                   width={600}
//                   height={700}
//                   alt="Meal Plan"
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <div className="mb-2 flex items-center justify-between">
//                   <h3 className="text-2xl font-medium text-[#000000]">
//                     {item.title}
//                   </h3>
//                   <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-xl text-[#545454]">
//                       {item.rating}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-stretch justify-between">
//                   <p
//                     className="text-base text-[#545454]"
//                     dangerouslySetInnerHTML={{
//                       __html: item?.instruction.substring(0, 100),
//                     }}
//                   />
//                   <div className="relative flex flex-col items-center" ref={menuRef}>
//                     <button
//                       className="rounded-full p-2 hover:bg-gray-100"
//                       onClick={() => handleToggleMenu(item._id)}
//                       aria-label="Open actions menu"
//                       aria-expanded={openMenuId === item._id}
//                       aria-haspopup="true"
//                     >
//                       <InfoCircleOutlined className="h-5 w-5 text-gray-500" />
//                     </button>
//                     {openMenuId === item._id && (
//                       <div className="absolute top-10 right-0 bg-white border border-gray-200 shadow-lg rounded-md p-2 z-50 min-w-[120px]">
//                         <Link
//                           href={`/nutrition/edit-nutrition/${item._id}`}
//                           className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           onClick={() => setOpenMenuId(null)}
//                         >
//                           <Edit className="h-4 w-4" />
//                           Edit
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
//                           disabled={isDeleting}
//                         >
//                           <Trash className="h-4 w-4" />
//                           {isDeleting ? "Deleting..." : "Delete"}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-8 flex justify-center">
//           <Pagination
//             current={currentPage}
//             onChange={(page) => {
//               setCurrentPage(page);
//               setOpenMenuId(null); // Close any open dropdowns on page change
//             }}
//             total={nutritionData?.total || 0}
//             pageSize={itemsPerPage}
//             showSizeChanger={false}
//           />
//         </div>
//       </Container>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { Pagination } from "antd";
import {
  InfoIcon as InfoCircleOutlined,
  Plus,
  Star,
  Edit,
  Trash,
  Trash2,
} from "lucide-react";
import "antd/dist/reset.css";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import {
  useDeleteNutritionMutation,
  useGetAllNutritionsQuery,
} from "@/redux/features/nutritions/NutritionAPI";
import toast from "react-hot-toast";

interface INutrition {
  _id: string;
  title: string;
  instruction: string;
  image: string;
  rating: number;
}

export default function NutritionPlan() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: nutritionData, isLoading, isError } =
    useGetAllNutritionsQuery({
      page: currentPage,
      limit: itemsPerPage,
    });

  const [deleteNutrition] = useDeleteNutritionMutation();

  // Handle click outside to close dropdown




  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this nutrition plan?")) {
      try {
      const res =  await deleteNutrition(id).unwrap();
        toast.success(res?.message ||"Nutrition plan deleted successfully!");
      } catch (error) {
        console.error("Failed to delete nutrition plan:", error);
        toast.error("Failed to delete nutrition plan. Please try again.");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !nutritionData?.data) {
    return <div>Error loading nutrition plans. Please try again.</div>;
  }

  // const IMAGE_URL = "http://10.10.12.54:3005";
  const IMAGE_URL='https://server.oegfitness.com'

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Container>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Nutrition Plan</h1>
          <Link
            href={"/nutrition/add-nutrition"}
            className="flex items-center justify-center rounded-lg bg-[#01336F] px-5 py-3 text-white hover:bg-navy-700"
          >
            <Plus /> <span>Add Nutrition</span>
          </Link>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nutritionData.data.map((item: INutrition) => (
            <div
              key={item._id}
              className="overflow-hidden  rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-64 w-full">
                <img
                  src={`${IMAGE_URL}${item?.image}` || "/placeholder.svg"}
                  width={600}
                  height={700}
                  alt="Meal Plan"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-2xl font-medium text-[#000000]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl text-[#545454]">
                      {item.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-stretch justify-between">
                  <p
                    className="text-base text-[#545454]"
                    dangerouslySetInnerHTML={{
                      __html: item?.instruction.substring(0, 100),
                    }}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <button onClick={() => handleDelete(item._id)} className="flex gap-3 items-center justify-center rounded-lg bg-red-500 px-5 py-3 w-full text-white "><Trash2 /> <span>delete</span></button>
                    <Link
                      href={`/nutrition/${item._id}`}
                      className="flex items-center justify-center gap-3 rounded-lg bg-[#01336F] px-5 py-3 w-full text-white hover:bg-navy-700"
                    >
                      <Edit /> <span>Edit</span>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination
            current={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
            }}
            total={nutritionData?.total || 0}
            pageSize={itemsPerPage}
            showSizeChanger={false}
          />
        </div>
      </Container>
    </div>
  );
}
