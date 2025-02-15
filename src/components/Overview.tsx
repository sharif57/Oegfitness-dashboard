import { ArrowLeft } from "lucide-react";
import { MetricCard } from "./MetricCard";
import {
  useGetTotalEarningQuery,
  useGetTotalUserQuery,
} from "@/redux/features/overview/OverviewAPI";

const Overview = () => {
  const { data: totalEarning, isLoading, isError } = useGetTotalEarningQuery();
  const {
    data: totalUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetTotalUserQuery();

  const subscription = 1346;

  if (isLoading || isLoadingUser) {
    return <div>Loading...</div>;
  }

  const metrics = [
    { title: "Total User", value: totalUser },
    { title: "Total Earnings", value: totalEarning },
    { title: "Total Subscription", value: subscription },
  ];

  console.log(totalEarning?.data?.subtotal, totalUser?.data?.count);

  return (
    <>
      <section>
        <h2 className='flex items-center gap-2 mb-4 text-lg font-semibold lg:text-xl'>
          <ArrowLeft className='cursor-pointer' /> Overview
        </h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-[90%] mx-auto'>
          {/* {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))} */}

          <div className='border flex flex-col justify-center items-center rounded-lg bg-white p-4 max-w-[381px] py-10'>
            <h3 className='text-base font-medium text-[#737163] text-center lg:text-2xl mb-3'>
              Total User
            </h3>
            <p className='mt-2 text-xl font-bold text-[#1A1918] text-center lg:text-[48px]'>
              {totalUser?.data?.count}
            </p>
          </div>

          <div className='border flex flex-col justify-center items-center rounded-lg bg-white p-4 max-w-[381px] py-10'>
            <h3 className='text-base font-medium text-[#737163] text-center lg:text-2xl mb-3'>
              Total Earning
            </h3>
            <p className='mt-2 text-xl font-bold text-[#1A1918] text-center lg:text-[48px]'>
              ${totalEarning?.data?.subtotal}
            </p>
          </div>

          <div className='border flex flex-col justify-center items-center rounded-lg bg-white p-4 max-w-[381px] py-10'>
            <h3 className='text-base font-medium text-[#737163] text-center lg:text-2xl mb-3'>
              Total Subscription
            </h3>
            <p className='mt-2 text-xl font-bold text-[#1A1918] text-center lg:text-[48px]'>
              {totalUser?.data?.count + subscription}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
