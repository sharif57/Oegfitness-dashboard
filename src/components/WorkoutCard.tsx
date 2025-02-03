import type { MenuProps } from "antd";
import Image from "next/image";
import { EllipsisVertical, Info } from "lucide-react";

interface WorkoutItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface WorkoutCardProps {
  workout: WorkoutItem;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
    },
    {
      key: "2",
      label: "Delete",
      danger: true,
    },
  ];

  return (
    <div className='border rounded-xl p-2.5'>
      <h2 className='text-2xl font-semibold text-[#000000]'>{workout.title}</h2>

      <div className='mt-1.5 mb-3 rounded-xl'>
        <Image
          src={workout.imageUrl}
          className='rounded-xl'
          width={700}
          height={800}
          alt={workout.title}
        />
      </div>

      <div className='flex items-stretch justify-between pb-3'>
        <p className='text-lg text-[#545454] leading-[26px]'>
          {workout.description}
        </p>

        <div className='flex-1 flex flex-col justify-between min-h-full'>
          <Info className='text-[#101010] ' width={18} height={18} />
          <EllipsisVertical
            className='text-[#101010] '
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>

    // <Card
    //   cover={
    //     <div className='relative aspect-[4/3] w-full'>
    //       <Image
    //         src={workout.imageUrl || "/placeholder.svg"}
    //         alt={workout.title}
    //         fill
    //         className='object-cover'
    //         priority
    //       />
    //     </div>
    //   }
    //   extra={
    //     <Dropdown menu={{ items }} placement='bottomRight' trigger={["click"]}>
    //       <EllipsisOutlined className='text-lg cursor-pointer' />
    //     </Dropdown>
    //   }
    //   className='h-full'
    // >
    //   <Card.Meta title={workout.title} description={workout.description} />
    // </Card>
  );
}
