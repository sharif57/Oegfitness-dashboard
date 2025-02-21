import { ArrowLeft } from "lucide-react";
import {
  useGetTotalEarningQuery,
  useGetTotalUserQuery,
} from "@/redux/features/overview/OverviewAPI";
import { useRouter } from "next/navigation";
import { useGetAllSubscriptionQuery } from "@/redux/features/subscription/SubscriptionAPI";

const Overview = () => {
  const { data: totalEarning, isLoading, isError } = useGetTotalEarningQuery();
  const {
    data: totalUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetTotalUserQuery();

  const {
    data: totalSubscription,
    isLoading: isLoadingSubscription,
    isError: isErrorSubscription,
  } = useGetAllSubscriptionQuery({});

  const router = useRouter();

  if (isLoading || isLoadingUser || isLoadingSubscription) {
    return (
      <div className='text-center text-blue-600 font-semibold'>Loading...</div>
    );
  }

  if (isError || isErrorUser || isErrorSubscription) {
    return <div>Error loading data...</div>;
  }

  return (
    <>
      <section>
        <h2 className='flex items-center gap-2 mb-4 text-lg text-gray-900 font-semibold lg:text-xl'>
          <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />{" "}
          Overview
        </h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-[90%] mx-auto'>
          <div className='border flex flex-col justify-center items-center rounded-lg bg-white p-4 max-w-[381px] py-10'>
            <h3 className='text-base font-medium text-[#737163] text-center lg:text-2xl mb-3'>
              Total User
            </h3>
            <p className='mt-2 text-xl font-bold text-[#1A1918] text-center lg:text-[48px]'>
              {totalUser?.data?.totalData}
            </p>
          </div>

          <div className='border flex flex-col justify-center items-center rounded-lg bg-white p-4 max-w-[381px] py-10'>
            <h3 className='text-base font-medium text-[#737163] text-center lg:text-2xl mb-3'>
              Total Payment Earning
            </h3>
            <p className='mt-2 text-xl font-bold text-[#1A1918] text-center lg:text-[48px]'>
              ${totalEarning?.data?.totalPrice}
            </p>
          </div>

          <div className='border flex flex-col justify-center items-center rounded-lg bg-white p-4 max-w-[381px] py-10'>
            <h3 className='text-base font-medium text-[#737163] text-center lg:text-2xl mb-3'>
              Total Subscription Earning
            </h3>
            <p className='mt-2 text-xl font-bold text-[#1A1918] text-center lg:text-[48px]'>
              ${totalSubscription?.data?.totalAmount}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
