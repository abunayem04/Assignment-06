"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { useState } from "react";

export default function WorkoutCard({ workout }) {
  const [imgSrc, setImgSrc] = useState(workout.image || "/hero-gym.jpg");

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#12151b] border border-[#1e232d] hover:border-[#ccff00]/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#ccff00]/5"
    >
      <div>
        {/* Workout Thumbnail */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#181d26]">
          <Image
            src={imgSrc}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgSrc("/hero-gym.jpg")}
          />
        </div>

        {/* Category Tags */}
        <div className="flex items-center gap-1.5 mt-4 mb-2.5">
          {workout.muscleGroups?.map((muscle, index) => (
            <span
              key={index}
              className="bg-[#ccff00] text-black text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="font-heading text-lg font-bold uppercase text-white group-hover:text-[#ccff00] transition-colors leading-snug">
          {workout.name}
        </h3>

        {/* Equipment Line */}
        <p className="text-gray-400 text-xs mt-1 mb-4">
          {workout.equipment}
        </p>
      </div>

      {/* Stats Row */}
      <div className="pt-3 border-t border-[#1e232d] flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>{workout.duration} min</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-gray-400" />
          <span>{workout.caloriesBurned} kcal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-gray-400" />
          <span>{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
