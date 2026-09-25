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
    <div>
      <Hero />

      <section id="library" style={{ scrollMarginTop: "80px", marginTop: "32px" }}>
        <div className="section-header">
          <h2 className="section-title">
            THE LIBRARY
          </h2>
          <p className="section-subtitle">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading workouts..." />
        ) : (
          <div className="workout-grid">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
