import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-[#14171d] border border-[#222733] rounded-3xl flex items-center justify-center p-4 shadow-xl">
          <div className="relative w-10 h-10 animate-bounce">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase bg-[#ccff00]/10 border border-[#ccff00]/20 px-3 py-1 rounded-full mb-3">
        404 ERROR
      </span>

      <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-wide mb-3">
        PAGE NOT FOUND
      </h1>

      <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8">
        Looks like you racked this weight in the wrong spot. The page you are looking for doesn't exist or was moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-[#b5e600] transition active:scale-95 shadow-lg shadow-[#ccff00]/10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Workouts</span>
      </Link>
    </div>
  );
}
