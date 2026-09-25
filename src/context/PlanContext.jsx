"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedPlanData = localStorage.getItem("fitlog_today_plan");
    const savedWorkoutsData = localStorage.getItem("fitlog_saved_workouts");

    if (savedPlanData) {
      try {
        setTodayPlan(JSON.parse(savedPlanData));
      } catch (err) {
        console.error(err);
      }
    }

    if (savedWorkoutsData) {
      try {
        setSavedWorkouts(JSON.parse(savedWorkoutsData));
      } catch (err) {
        console.error(err);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
    }
  }, [todayPlan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_saved_workouts", JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts, isLoaded]);

  const addToTodayPlan = (workout) => {
    const alreadyExists = todayPlan.some((item) => item.id === workout.id);
    if (alreadyExists) {
      toast.error(`${workout.name} is already in today's plan!`, { id: `plan-exists-${workout.id}` });
      return false;
    }

    if (todayPlan.length >= 5) {
      toast.error("Cap reached: Maximum 5 lifts allowed for today's plan!", { id: "plan-cap" });
      return false;
    }

    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success(`${workout.name} added to today's plan!`, { id: `plan-added-${workout.id}` });
    return true;
  };

  const addToSaved = (workout) => {
    const alreadySaved = savedWorkouts.some((item) => item.id === workout.id);
    if (alreadySaved) {
      toast.error(`${workout.name} is already saved!`, { id: `saved-exists-${workout.id}` });
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success(`${workout.name} saved for later!`, { id: `saved-added-${workout.id}` });
    return true;
  };

  const removeFromTodayPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from today's plan", { id: `remove-plan-${id}` });
  };

  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from saved", { id: `remove-saved-${id}` });
  };

  const markAsDone = (id) => {
    const target = todayPlan.find((item) => item.id === id);
    if (!target) return;
    if (target.isDone) return;

    setTodayPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDone: true } : item))
    );
    toast.success(`${target.name} marked as completed! 🎉`, { id: `done-${id}` });
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        isLoaded,
        addToTodayPlan,
        addToSaved,
        removeFromTodayPlan,
        removeFromSaved,
        markAsDone,
        toggleMarkAsDone: markAsDone,
      }}
    >
      {isLoaded && (
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#1a1d24",
              color: "#f3f4f6",
              borderRadius: "8px",
            },
          }}
        />
      )}
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
