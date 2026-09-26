"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft, Bookmark, PlusCircle, CheckCircle2 } from "lucide-react";

export default function WorkoutDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  // context theke state and actions nicchi
  const { addToTodayPlan, addToSaved, todayPlan, savedWorkouts } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("/hero-gym.jpg");

  // id change hole ba component mount hole data load korbo
  useEffect(() => {
    if (id) {
      fetchWorkoutDetails();
    }
  }, [id]);

  // API theke specific workout er details data anchi
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
      <div className="empty-box">
        <h2 className="empty-title">Workout Not Found</h2>
        <p className="empty-desc">
          The workout you are looking for does not exist or has been removed.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>
    );
  }

  // check kortesi already plan ba saved list e ache kina
  const isAlreadyInPlan = todayPlan.some((item) => item.id === workout.id);
  const isAlreadySaved = savedWorkouts.some((item) => item.id === workout.id);
  const isCapReached = todayPlan.length >= 5 && !isAlreadyInPlan;

  // UI te details spec dekhate array banano holo
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
    <div className="details-container">
      <button onClick={() => router.back()} className="back-btn">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Workouts</span>
      </button>

      <div className="details-grid">
        <div className="details-media">
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

        <div className="details-info">
          <div>
            <h1 className="details-title">{workout.name}</h1>
            <p className="details-desc">{workout.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
              {workout.muscleGroups?.map((muscle, index) => (
                <span key={index} className="badge-tag">{muscle}</span>
              ))}
            </div>
          </div>

          <div className="specs-box">
            {specs.map((spec, index) => (
              <div key={index} className="spec-row">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>

          {workout.instructions && workout.instructions.length > 0 && (
            <div className="instructions-box">
              <h3 className="instructions-title">INSTRUCTIONS</h3>
              <ol className="instructions-list">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="instruction-item">
                    <span className="step-num">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="details-actions">
            <button
              onClick={() => addToTodayPlan(workout)}
              className={`btn-add-plan ${isAlreadyInPlan ? "in-plan" : isCapReached ? "disabled" : ""}`}
            >
              {isAlreadyInPlan ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>In Today's Plan</span>
                </>
              ) : isCapReached ? (
                <>
                  <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Plan Full (Max 5)</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Add to today's plan</span>
                </>
              )}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className={`btn-save-plan ${isAlreadySaved ? "saved" : ""}`}
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
