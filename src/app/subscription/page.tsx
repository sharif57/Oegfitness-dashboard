"use client";

import { useGetAllSubscriptionQuery } from "@/redux/features/subscription/SubscriptionAPI";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const features = [
  "View Members Directory",
  "View Members Directory",
  "View Members Directory",
  "View Members Directory",
  "View Members Directory",
];

interface ISubscription {
  _id: string;
  package: {
    name: string;
    unitAmount: number;
    interval: string;
  };
  title: string;
  price: number;
  period: string;
  features: string[];
}

export default function SubscriptionPage() {
  const router = useRouter();

  const {
    data: subscription,
    isLoading,
    isError,
  } = useGetAllSubscriptionQuery({});

  return (
    <div className='bg-[#FFFFFF]'>
      {/* Back Button */}
      <div className='mb-8'>
        <button
          onClick={() => router.back()}
          className='lg:ml-10 inline-flex items-center rounded-lg bg-navy-600 px-4 py-2 text-sm text-black bg-slate-300 transition-colors hover:bg-navy-700'
        >
          <ArrowLeft onClick={() => router.back()} className='mr-2 h-4 w-4' />
          Back
        </button>
      </div>

      {/* Pricing Cards Container */}
      <div className='mx-auto grid max-w-4xl gap-6 md:grid-cols-2'>
        {subscription?.data?.result?.map((plan: ISubscription) => (
          <div
            key={plan._id}
            className='relative overflow-hidden rounded-2xl bg-[#F2F5F7] border-2 border-[#C3C2BF] py-8 shadow-lg transition-transform hover:scale-[1.01]'
          >
            {/* Header */}
            <div className='mb-6 text-center border-b border-[#C3C2BF] pb-3'>
              <h3 className='mb-2 text-[32px] font-bold text-[#1A1918] capitalize'>
                {plan.package?.name}
              </h3>
              <div className='flex items-baseline justify-center'>
                <span className='text-2xl font-bold text-[#1A1918]'>$</span>
                <span className='text-4xl font-bold text-[#1A1918]'>
                  {plan?.package?.unitAmount}
                </span>
                <span className='ml-1 text-sm text-[#1A1918] capitalize'>
                  /{plan?.package?.interval}
                </span>
              </div>
            </div>

            {/* Features List */}
            {/* <div className='my-8 lg:my-12 space-y-8'>
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className='flex items-center text-gray-600'
                  >
                    <div className='mr-3 flex h-5 pl-5 items-center justify-center rounded-full bg-navy-600'>
                      <Image
                        src={"/subscription/checkicon.png"}
                        className='w-5 h-5'
                        width={30}
                        height={30}
                        alt='check'
                      />
                    </div>
                    <span className='text-lg text-[#1A1918]'>{feature}</span>
                  </div>
                ))}
              </div> */}

            {/* Edit Button */}
            <Link href={"/edit-subscription"}>
              <div className='w-[94%] border-4 rounded-lg bg-navy-600 py-4 mx-auto text-center font-medium bg-[#01336F] text-white transition-colors hover:bg-navy-700'>
                Edit
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
