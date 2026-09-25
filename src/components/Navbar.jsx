"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import logoImg from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = usePlan();

  return (
    <nav className="sticky top-0 z-50 bg-[#0c0e12]/90 backdrop-blur-md border-b border-[#1f242d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6 transition-transform duration-300 group-hover:rotate-12">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
          <span className="font-heading text-xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Middle: Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2 bg-[#14171d] p-1 rounded-full border border-[#222733]">
          <Link
            href="/"
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${
              pathname === "/"
                ? "bg-[#222834] text-[#ccff00] shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${
              pathname === "/my-plan"
                ? "bg-[#222834] text-[#ccff00] shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right: Plan & Saved Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-[#b5e600] transition active:scale-95"
            title="Today's Plan"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-[#2d3442] bg-[#14171d] text-gray-200 font-medium text-xs px-3 py-1.5 rounded-full hover:border-[#ccff00]/60 hover:text-white transition active:scale-95"
            title="Saved Workouts"
          >
            <span>Saved</span>
            <span className="text-gray-400 text-[11px] font-bold">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
