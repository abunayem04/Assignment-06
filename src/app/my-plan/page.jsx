"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
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
  } = usePlan();

  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("duration");

  if (!isLoaded) {
    return <LoadingSpinner text="Loading workouts…" />;
  }

  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  const currentExercises = currentList.length;
  const currentMinutes = currentList.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0
  );
  const currentCalories = currentList.reduce(
    (acc, curr) => acc + (Number(curr.caloriesBurned) || 0),
    0
  );

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

  const isWorkoutInPlan = (workoutId) => {
    return todayPlan.some((item) => item.id === workoutId);
  };

  return (
    <div className="plan-page">
      <div className="section-header" style={{ marginBottom: "0" }}>
        <h1 className="section-title">
          MY PLAN
        </h1>
        <p className="section-subtitle">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">
            Exercises
          </span>
          <span className="metric-value accent">
            {currentExercises}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">
            Minutes
          </span>
          <span className="metric-value">
            {currentMinutes}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">
            Calories
          </span>
          <span className="metric-value">
            {currentCalories}
          </span>
        </div>
      </div>

      <div className="plan-controls">
        <div className="plan-tabs">
          <button
            onClick={() => setActiveTab("today")}
            className={`tab-btn ${activeTab === "today" ? "active" : ""}`}
          >
            Today's Plan ({todayPlan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`tab-btn ${activeTab === "saved" ? "active" : ""}`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        <div className="sort-box">
          <span className="sort-label">Sort By:</span>
          <div className="sort-select-wrapper">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort plan items by"
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

      {sortedList.length === 0 ? (
        <div className="empty-box">
          <h3 className="empty-title">
            NOTHING HERE YET
          </h3>
          <p className="empty-desc">
            {activeTab === "today"
              ? "Browse the library and add a lift to get today moving."
              : "Save your favorite lifts for future workouts."}
          </p>
          <Link href="/" className="btn-primary">
            <span>Go to workouts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="plan-list">
          {sortedList.map((workout) => (
            <div
              key={workout.id}
              className={`plan-item ${workout.isDone ? "done" : ""}`}
            >
              <div className="plan-item-left">
                <div className="plan-item-thumb">
                  <Image
                    src={workout.image || "/hero-gym.jpg"}
                    alt={workout.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                    onError={(e) => { e.target.src = "/hero-gym.jpg"; }}
                  />
                </div>

                <div className="plan-item-info">
                  <div className="plan-item-title-row">
                    <h4 className={`plan-item-title ${workout.isDone ? "done" : ""}`}>
                      {workout.name}
                    </h4>
                    {workout.isDone && (
                      <span className="done-badge">
                        Done
                      </span>
                    )}
                  </div>

                  <p className="plan-item-equipment">
                    {workout.equipment}
                  </p>

                  <div className="plan-item-stats">
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{workout.duration} min</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Flame className="w-3 h-3 text-[#ccff00]" />
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="plan-item-actions">
                <Link
                  href={`/workout/${workout.id}`}
                  className="btn-details"
                >
                  View Details
                </Link>

                {activeTab === "today" ? (
                  <button
                    onClick={() => toggleMarkAsDone(workout.id)}
                    className={`btn-done ${workout.isDone ? "completed" : ""}`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{workout.isDone ? "Completed" : "Mark as Done"}</span>
                  </button>
                ) : isWorkoutInPlan(workout.id) ? (
                  <button
                    disabled
                    className="btn-done completed"
                    style={{ cursor: "default" }}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>In Plan</span>
                  </button>
                ) : (
                  <button
                    onClick={() => addToTodayPlan(workout)}
                    className="btn-done"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add to Plan</span>
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromTodayPlan(workout.id)
                      : removeFromSaved(workout.id)
                  }
                  className="btn-remove"
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
