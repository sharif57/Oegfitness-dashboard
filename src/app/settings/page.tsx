import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Settings = () => {
  return (
    <div className='px-10'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold underline'>Settings</h2>
        <Link
          className='flex items-center justify-center px-5 py-3 text-white bg-[#01336F] rounded gap-1.5'
          href={"/settings/add-user"}
        >
          <Plus /> Add User
        </Link>
      </div>
    </div>
  );
};

export default Settings;
