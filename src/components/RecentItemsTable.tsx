import { Info } from "lucide-react";

interface RecentItem {
  _id: string;
  transactionId: string;
  user: {
    name: string;
  };
  appointmentPrice: number;
  createdAt: string;
  date: string;
  amount: string;
  status: string;
}

interface RecentItemsTableProps {
  items: RecentItem[];
  showModal: () => string;
}

export function RecentItemsTable({ items, showModal }: RecentItemsTableProps) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-[#002B5B] text-white'>
          <tr>
            <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
              #Tr.ID
            </th>
            <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
              User Name
            </th>
            <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
              Amount
            </th>
            <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
              Date
            </th>
            <th className='px-3 py-3 text-left text-xs text-[#FFFFFF] font-medium lg:px-4 lg:text-lg'>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {items.map((item) => (
            <tr key={item?._id}>
              <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-lg text-[#1A1918]'>
                {item.transactionId}
              </td>
              <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-lg text-[#1A1918]'>
                {item?.user?.name}
              </td>
              <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-lg text-[#1A1918]'>
                {item?.appointmentPrice}
              </td>
              <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-lg text-[#1A1918]'>
                {item?.createdAt?.split("T")[0]}
              </td>
              <td className='whitespace-nowrap px-3 py-4 text-xs lg:px-4 lg:text-sm'>
                <button className='rounded-full p-1 hover:bg-gray-100'>
                  <span className='sr-only'>View details</span>
                  <Info onClick={() => showModal(item)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
