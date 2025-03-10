'use client'
import Search from "@/components/Search";


export default function PlanOverview() {



  return (
    <div>
      {" "}
      <div className="px-4 ">
        <div className="relative h-[50vh] md:h-[70vh] lg:h-[calc(100vh-2px)] xl:h-[calc(100vh-400px)]   flex items-center justify-center ">
          {/* Background Image with Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-90 rounded-xl"
            style={{ backgroundImage: `url('/hero.jpg')` }}
          ></div>

          {/* Overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

          {/* Content */}
          <div className="relative text-center space-y-5 z-10 ">
            <h1 className="text-white lg:text-[48px] text-[40px]  font-bold  mx-auto">
              Add workout Plan
            </h1>
            <Search></Search>
          </div>
        </div>
      </div>

        
    </div>
  );
}
