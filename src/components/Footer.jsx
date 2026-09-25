import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1f242d] bg-[#0c0e12] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-5 h-5">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          <span className="font-heading text-lg font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright Note */}
        <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
