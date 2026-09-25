import { Dumbbell } from "lucide-react";

export default function LoadingSpinner({ text = "Loading workouts..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-[#222733] border-t-[#ccff00] rounded-full animate-spin"></div>
        <Dumbbell className="w-6 h-6 text-[#ccff00] absolute animate-pulse" />
      </div>
      <p className="text-gray-400 font-medium text-sm tracking-wide">
        {text}
      </p>
    </div>
  );
}
