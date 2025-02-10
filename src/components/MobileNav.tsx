"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, DollarSign, Dumbbell, Apple } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Earnings", href: "/earnings", icon: DollarSign },
  { name: "Workout", href: "/workout", icon: Dumbbell },
  { name: "Nutrition", href: "/nutrition", icon: Apple },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className='bg-[#002B5B] px-2 py-3 overflow-x-scroll'>
      <div className='flex items-center justify-around'>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center ${
                isActive ? "text-white" : "text-blue-200"
              }`}
            >
              <item.icon className='mb-1 h-6 w-6' />
              <span className='text-xs'>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
