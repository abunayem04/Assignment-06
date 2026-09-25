"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
      const data = await res.json();
      setWorkouts(data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Hero />

      {/* The Library Section */}
      <section id="library" className="scroll-mt-20 space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Content Area */}
        {loading ? (
          <LoadingSpinner text="Loading workouts..." />
        ) : (
          /* 3x4 Grid on large screens */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}
