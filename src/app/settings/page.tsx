// import { Plus } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// const Settings = () => {
//   return (
//     <div className='px-10'>
//       <div className='flex items-center justify-between'>
//         <h2 className='text-lg font-semibold underline'>Settings</h2>
//         <Link
//           className='flex items-center justify-center px-5 py-3 text-white bg-[#01336F] rounded gap-1.5'
//           href={"/settings/add-user"}
//         >
//           <Plus /> Add User
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Settings;

"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="container mx-auto text-black p-4 space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <hr className="border" />

      <div className="max-w-7xl mx-auto space-y-5 pt-4">
        <Link href={"/settings/add-user"}>
          <div className="border rounded-lg">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <span className="text-base font-medium text-gray-700">
                Personal Information
              </span>
            </button>
          </div>
        </Link>

        <div className="border rounded-lg">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-base font-medium text-gray-700">
              Change Password
            </span>
          </button>
        </div>
        <div className="border rounded-lg">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-base font-medium text-gray-700">
              Terms & Condition
            </span>
          </button>
        </div>
        <div className="border rounded-lg">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-base font-medium text-gray-700">
              Privacy Policy
            </span>
          </button>
        </div>
        <div className="border rounded-lg">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-base font-medium text-gray-700">
              About Us
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
