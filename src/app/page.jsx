"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  // Page load hole API theke workouts load korbo
  useEffect(() => {
    fetchWorkouts();
  }, []);

  // API theke all workouts fetch korar function
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

  // Sort dropdown onujayi workouts sort kora
  const sortedWorkouts = [...workouts].sort((a, b) => {
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
    <div>
      <Hero />

      <section id="library" style={{ scrollMarginTop: "80px", marginTop: "32px" }}>
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h2 className="section-title">
              THE LIBRARY
            </h2>
            <p className="section-subtitle">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="sort-box">
            <span className="sort-label">Sort By:</span>
            <div className="sort-select-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort library workouts by"
                className="sort-select"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading workouts..." />
        ) : (
          <div className="workout-grid">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
