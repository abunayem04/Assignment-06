"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import bannerImg from "@/assets/banner.png";

export default function Hero() {
  const handleScrollToLibrary = () => {
    const libraryElement = document.getElementById("library");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#14171d] border border-[#222733] rounded-3xl p-6 sm:p-10 lg:p-12 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-5">
          <span className="text-[#ccff00] text-xs sm:text-sm font-bold tracking-widest uppercase bg-[#ccff00]/10 border border-[#ccff00]/20 px-3 py-1 rounded-full">
            WORKOUT LIBRARY
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
            TRAIN WITH INTENT. <br />
            <span className="text-white">LOG EVERY SET.</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <button
            onClick={handleScrollToLibrary}
            className="flex items-center gap-2 bg-[#ccff00] text-black font-bold text-xs sm:text-sm tracking-wide uppercase px-6 py-3.5 rounded-xl hover:bg-[#b5e600] transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#ccff00]/10"
          >
            <span>BROWSE WORKOUTS</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Right Image */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={bannerImg}
              alt="Gym Workout"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
