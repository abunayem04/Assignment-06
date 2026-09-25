"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  ChevronDown,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function MyPlanPage() {
  const {
    todayPlan,
    savedWorkouts,
    isLoaded,
    removeFromTodayPlan,
    removeFromSaved,
    toggleMarkAsDone,
    addToTodayPlan,
    metrics,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("today"); // "today" | "saved"
  const [sortBy, setSortBy] = useState("duration");

  if (!isLoaded) {
    return <LoadingSpinner text="Loading workouts…" />;
  }

  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  // Dynamically calculate metrics based on the active tab (Today's Plan or Saved)
  const currentExercises = currentList.length;
  const currentMinutes = currentList.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0
  );
  const currentCalories = currentList.reduce(
    (acc, curr) => acc + (Number(curr.caloriesBurned) || 0),
    0
  );

  // Sort list
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return (a.duration || 0) - (b.duration || 0);
    }
    if (sortBy === "calories") {
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    }
    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  return (
    <div className="py-4 space-y-8">
      
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-wide text-white">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 Stat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Exercises Metric */}
        <div className="bg-[#14171d] border border-[#222733] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Exercises
          </span>
          <span className="font-heading text-4xl sm:text-5xl font-black text-[#ccff00] mt-2">
            {currentExercises}
          </span>
        </div>

        {/* Minutes Metric */}
        <div className="bg-[#14171d] border border-[#222733] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Minutes
          </span>
          <span className="font-heading text-4xl sm:text-5xl font-black text-white mt-2">
            {currentMinutes}
          </span>
        </div>

        {/* Calories Metric */}
        <div className="bg-[#14171d] border border-[#222733] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Calories
          </span>
          <span className="font-heading text-4xl sm:text-5xl font-black text-white mt-2">
            {currentCalories}
          </span>
        </div>

      </div>

      {/* Tabs & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        
        {/* Tabs: Today's Plan / Saved */}
        <div className="flex items-center gap-1.5 bg-[#14171d] p-1.5 rounded-2xl border border-[#222733]">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition duration-200 ${
              activeTab === "today"
                ? "bg-[#222834] text-white shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Today's Plan ({todayPlan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition duration-200 ${
              activeTab === "saved"
                ? "bg-[#222834] text-white shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Sort By:</span>
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort plan items by"
              className="appearance-none bg-[#14171d] border border-[#222733] text-gray-200 text-xs sm:text-sm font-medium pl-3 pr-8 py-2 rounded-xl focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Main List or Empty State */}
      {sortedList.length === 0 ? (
        /* Empty State */
        <div className="bg-[#14171d]/60 border border-dashed border-[#222733] rounded-3xl p-12 sm:p-20 text-center flex flex-col items-center justify-center space-y-4 my-6">
          <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm">
            {activeTab === "today"
              ? "Browse the library and add a lift to get today moving."
              : "Save your favorite lifts for future workouts."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-[#b5e600] transition active:scale-95 shadow-lg shadow-[#ccff00]/10"
          >
            <span>Go to workouts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Workouts List */
        <div className="space-y-4">
          {sortedList.map((workout) => (
            <div
              key={workout.id}
              className={`bg-[#14171d] border rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 ${
                workout.isDone
                  ? "border-emerald-500/40 bg-[#14171d]/50 opacity-80"
                  : "border-[#222733] hover:border-[#2f3647]"
              }`}
            >
              
              {/* Left & Center: Thumbnail + Info */}
              <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                
                {/* Thumbnail */}
                <div className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-[#1f242e] shrink-0 border border-[#222733]">
                  <Image
                    src={workout.image || "/hero-gym.jpg"}
                    alt={workout.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`font-heading text-base sm:text-lg font-bold uppercase tracking-wide truncate ${
                        workout.isDone
                          ? "line-through text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {workout.name}
                    </h4>
                    {workout.isDone && (
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
                        Done
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 text-xs truncate">
                    {workout.equipment}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-3 text-[11px] sm:text-xs text-gray-300 pt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#ccff00]" />
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right: Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-[#222733]">
                
                {/* View Details */}
                <Link
                  href={`/workout/${workout.id}`}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-200 bg-[#1c212a] border border-[#2c3342] hover:bg-[#252b37] hover:text-white transition active:scale-95"
                >
                  View Details
                </Link>

                {/* If on Today's Plan Tab: Mark as Done */}
                {activeTab === "today" ? (
                  <button
                    onClick={() => toggleMarkAsDone(workout.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase transition active:scale-95 ${
                      workout.isDone
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-[#ccff00] text-black hover:bg-[#b5e600] shadow-sm"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{workout.isDone ? "Completed" : "Mark as Done"}</span>
                  </button>
                ) : (
                  /* If on Saved Tab: Add to Plan / In Plan */
                  (() => {
                    const inPlan = todayPlan.some((p) => p.id === workout.id);
                    return (
                      <button
                        onClick={() => addToTodayPlan(workout)}
                        className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition active:scale-95 ${
                          inPlan
                            ? "bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40 cursor-default"
                            : "bg-[#ccff00] text-black hover:bg-[#b5e600]"
                        }`}
                      >
                        {inPlan ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>In Plan</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Add to Plan</span>
                          </>
                        )}
                      </button>
                    );
                  })()
                )}

                {/* Remove Button (X) */}
                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromTodayPlan(workout.id)
                      : removeFromSaved(workout.id)
                  }
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition active:scale-95"
                  title="Remove"
                  aria-label="Remove workout"
                >
                  <X className="w-4 h-4" />
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
