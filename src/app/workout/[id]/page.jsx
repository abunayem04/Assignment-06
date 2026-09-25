"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft, Bookmark, PlusCircle, CheckCircle2 } from "lucide-react";

export default function WorkoutDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToTodayPlan, addToSaved, todayPlan, savedWorkouts } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("/hero-gym.jpg");

  useEffect(() => {
    if (id) {
      fetchWorkoutDetails();
    }
  }, [id]);

  const fetchWorkoutDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
      if (!res.ok) {
        throw new Error("Workout not found");
      }
      const data = await res.json();
      setWorkout(data);
      if (data.image) {
        setImgSrc(data.image);
      }
    } catch (error) {
      console.error("Error fetching workout details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading workout details..." />;
  }

  if (!workout) {
    return (
      <div className="text-center py-20 bg-[#14171d] border border-[#222733] rounded-3xl p-8 max-w-xl mx-auto my-12">
        <h2 className="font-heading text-2xl font-bold uppercase text-white mb-2">
          Workout Not Found
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          The workout you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-[#b5e600] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>
    );
  }

  const isAlreadyInPlan = todayPlan.some((item) => item.id === workout.id);
  const isAlreadySaved = savedWorkouts.some((item) => item.id === workout.id);

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="py-6 space-y-6">
      
      {/* Back Link */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#ccff00] transition uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Workouts</span>
      </button>

      {/* Two-Column Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Visual / Media */}
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#14171d] border border-[#222733] shadow-2xl">
            <Image
              src={imgSrc}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
              onError={() => setImgSrc("/hero-gym.jpg")}
            />
          </div>
        </div>

        {/* Right Column: Workout Info, Specs & Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Description */}
          <div className="space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-wide leading-tight">
              {workout.name}
            </h1>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {workout.muscleGroups?.map((muscle, index) => (
                <span
                  key={index}
                  className="bg-[#ccff00] text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Key Specs Panel */}
          <div className="bg-[#14171d] border border-[#222733] rounded-2xl p-5 divide-y divide-[#222733]/80">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs sm:text-sm"
              >
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                  {spec.label}
                </span>
                <span className="text-gray-100 font-semibold text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions Ordered List */}
          {workout.instructions && workout.instructions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-bold uppercase text-white tracking-wide">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2.5">
                {workout.instructions.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed bg-[#14171d]/60 border border-[#222733]/60 rounded-xl p-3"
                  >
                    <span className="bg-[#222834] text-[#ccff00] font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            
            {/* Add to Today's Plan */}
            <button
              onClick={() => addToTodayPlan(workout)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition duration-200 active:scale-98 ${
                isAlreadyInPlan
                  ? "bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40 cursor-default"
                  : "bg-[#ccff00] text-black hover:bg-[#b5e600] shadow-lg shadow-[#ccff00]/10"
              }`}
            >
              {isAlreadyInPlan ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>In Today's Plan</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Add to today's plan</span>
                </>
              )}
            </button>

            {/* Save for later */}
            <button
              onClick={() => addToSaved(workout)}
              className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider border transition duration-200 active:scale-98 ${
                isAlreadySaved
                  ? "border-[#ccff00]/40 bg-[#14171d] text-[#ccff00]"
                  : "border-[#2c3340] bg-[#14171d] text-gray-200 hover:text-white hover:border-gray-400"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isAlreadySaved ? "Saved" : "Save for later"}</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
