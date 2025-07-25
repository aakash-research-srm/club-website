import React from "react";

export default function Hero() {
  return (
    <div className="bg-black/50 rounded-[6rem] py-24 md:py-32 lg:py-40 px-4 md:px-8 lg:px-12 relative" id="aboout-us">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between mx-auto gap-8 lg:gap-16">
        {/* Logo Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <div className="text-center lg:text-left">
            <h1 className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wider leading-tight">
              AAKASH
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl tracking-widest mt-2 md:mt-4">
              RESEARCH LABS
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full lg:w-1/2 lg:pl-8 xl:pl-16">
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left tracking-widest">
            Aakash Research Labs is a student-driven R&D lab focusing on 
            robotics, AI, Android systems, and embedded technology under 
            the guidance of SRM IST.
          </p>
        </div>
      </div>

      {/* Navigation Dots */}
      {/* <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
        <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-500 rounded-full"></div>
      </div> */}
    </div>
  );
}
