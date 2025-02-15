interface MetricCardProps {
  title: string;
  value: number;
  prefix?: string;
}

export function MetricCard({ title, value, prefix = "$" }: MetricCardProps) {
  console.log(title, value);

  return (
    <div className='border flex flex-col justify-center items-center rounded-lg bg-white p-4 max-w-[381px] py-10'>
      <h3 className='text-base font-medium text-[#737163] text-center lg:text-2xl mb-3'>
        {title}
      </h3>
      <p className='mt-2 text-xl font-bold text-[#1A1918] text-center lg:text-[48px]'>
        {title === "Total Earnings" && prefix}
        {/* {value.toLocaleString()} */}
      </p>
    </div>
  );
}
