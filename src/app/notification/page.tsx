"use client";
import { ArrowLeft, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div className='min-h-screen bg-[#FFFFFF]'>
      <div className='max-w-[95%] mx-auto p-4'>
        {/* Header */}
        <header className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <button
              onClick={goBack}
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              <ArrowLeft className='w-5 h-5' />
            </button>
            <h1 className='text-xl font-semibold'>Overview</h1>
          </div>
          <button className='bg-[#002B5B] text-white px-4 py-2 rounded-md text-sm hover:bg-[#003B7B] transition-colors'>
            Create Account
          </button>
        </header>

        {/* Notifications List */}
        <div className='space-y-2'>
          {/* New Match Notification */}
          <div className='bg-[#E6EBF1] rounded-lg p-4 flex items-start gap-3'>
            <div className='w-8 h-8 flex items-center justify-center flex-shrink-0'>
              <Bell className='w-5 h-5 text-gray-600' />
            </div>
            <div>
              <p className='text-[#000000] font-medium'>
                You have got a news match!
              </p>
              <p className='text-sm text-[#000000]'>FRI 12:30pm</p>
            </div>
          </div>

          {/* Welcome Notification */}
          <div className='bg-[#F8F9FA] rounded-lg p-4 flex items-start gap-3'>
            <div className='w-8 h-8 flex items-center justify-center flex-shrink-0'>
              <Bell className='w-5 h-5 text-gray-600' />
            </div>
            <div>
              <p className='text-[#000000] font-medium'>Welcome to Visely</p>
              <p className='text-sm text-[#000000]'>FRI 12:30pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
