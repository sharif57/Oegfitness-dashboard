// "use client";

// import { useGetAllSubscriptionQuery } from "@/redux/features/subscription/SubscriptionAPI";
// import { ArrowLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const features = [
//   "View Members Directory",
//   "View Members Directory",
//   "View Members Directory",
//   "View Members Directory",
//   "View Members Directory",
// ];

// interface ISubscription {
//   _id: string;
//   package: {
//     name: string;
//     unitAmount: number;
//     interval: string;
//   };
//   title: string;
//   price: number;
//   period: string;
//   features: string[];
// }

// export default function SubscriptionPage() {
//   const router = useRouter();

//   const {
//     data: subscription,
//     isLoading,
//     isError,
//   } = useGetAllSubscriptionQuery({});

//   return (
//     <div className='bg-[#FFFFFF]'>
//       {/* Back Button */}
//       <div className='mb-8'>
//         <button
//           onClick={() => router.back()}
//           className='lg:ml-10 inline-flex items-center rounded-lg bg-navy-600 px-4 py-2 text-sm text-black bg-slate-300 transition-colors hover:bg-navy-700'
//         >
//           <ArrowLeft onClick={() => router.back()} className='mr-2 h-4 w-4' />
//           Back
//         </button>
//       </div>

//       {/* Pricing Cards Container */}
//       <div className='mx-auto grid max-w-4xl gap-6 md:grid-cols-2'>
//         {subscription?.data?.result?.map((plan: ISubscription) => (
//           <div
//             key={plan._id}
//             className='relative overflow-hidden rounded-2xl bg-[#F2F5F7] border-2 border-[#C3C2BF] py-8 shadow-lg transition-transform hover:scale-[1.01]'
//           >
//             {/* Header */}
//             <div className='mb-6 text-center border-b border-[#C3C2BF] pb-3'>
//               <h3 className='mb-2 text-[32px] font-bold text-[#1A1918] capitalize'>
//                 {plan.package?.name}
//               </h3>
//               <div className='flex items-baseline justify-center'>
//                 <span className='text-2xl font-bold text-[#1A1918]'>$</span>
//                 <span className='text-4xl font-bold text-[#1A1918]'>
//                   {plan?.package?.unitAmount}
//                 </span>
//                 <span className='ml-1 text-sm text-[#1A1918] capitalize'>
//                   /{plan?.package?.interval}
//                 </span>
//               </div>
//             </div>

//             {/* Features List */}
//             {/* <div className='my-8 lg:my-12 space-y-8'>
//                 {plan.features.map((feature, featureIndex) => (
//                   <div
//                     key={featureIndex}
//                     className='flex items-center text-gray-600'
//                   >
//                     <div className='mr-3 flex h-5 pl-5 items-center justify-center rounded-full bg-navy-600'>
//                       <Image
//                         src={"/subscription/checkicon.png"}
//                         className='w-5 h-5'
//                         width={30}
//                         height={30}
//                         alt='check'
//                       />
//                     </div>
//                     <span className='text-lg text-[#1A1918]'>{feature}</span>
//                   </div>
//                 ))}
//               </div> */}

//             {/* Edit Button */}
//             <Link href={"/edit-subscription"}>
//               <div className='w-[94%] border-4 rounded-lg bg-navy-600 py-4 mx-auto text-center font-medium bg-[#01336F] text-white transition-colors hover:bg-navy-700'>
//                 Edit
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { useGetAllPackageQuery } from "@/redux/features/package/PackageSlice";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

// Define Type for Membership Plans
interface PackageData {
  _id: string;
  name: string;
  unitAmount: number;
  description: string[];
  interval: string;
}

type MembershipPlanType = {
  id: string;
  title: string;
  price: string;
  features: string[];
  interval: string;
};

const Membership: React.FC = () => {
  const { data, error, isLoading } = useGetAllPackageQuery(undefined);

  // if (isLoading) return <div className="text-center"><Loading /></div>;
  if (error) return <div>Error loading plans.</div>;

  // Map API data to MembershipPlanType
  const plans: MembershipPlanType[] =
    data?.data?.map((plan: PackageData) => ({
      id: plan._id,
      title: plan.name,
      price: `$${plan.unitAmount}/${plan.interval}`, // Convert unitAmount to dollars
      features: plan.description,
    })) || [];

  return (
    <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px] ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  max-w-6xl mx-auto">
        {plans.map((plan: MembershipPlanType) => (
          <div
            key={plan.id}
            className="bg-white shadow-lg text-black rounded-xl border p-6  flex flex-col justify-between hover:bg-[#EAF1FB] transition duration-300 ease-in-out"
          >
            {/* Plan Title & Price */}
            <div>
              <h3 className="text-xl font-semibold text-center capitalize">
                {plan.title}
              </h3>
              <p className="text-[#01336F] text-center text-lg font-medium mt-1">
                {plan.price}
              </p>
              <hr className="my-4" />
            </div>

            {/* Features List */}
            <ul className="space-y-6">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-gray-600"
                >
                  <span className="text-[#01336F]">
                    <ShieldCheck />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Purchase Button */}

            <Link href={`/subscription/${plan.id}`}>
              <button className="w-full text-center bg-[#01336F] text-white rounded-lg py-3 mt-6 hover:bg-[#012A5E] transition">
                Edit
              </button>
            </Link>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
