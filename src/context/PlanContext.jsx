"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

import { Toaster } from "react-hot-toast";

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
    if (todayPlan.length >= 5) {
      toast.error("Cap reached: Maximum 5 lifts allowed for today's plan!");
      return false;
    }

    const alreadyExists = todayPlan.some((item) => item.id === workout.id);
    if (alreadyExists) {
      toast.error(`${workout.name} is already in today's plan!`);
      return false;
    }

    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success(`${workout.name} added to today's plan!`);
    return true;
  };

  const addToSaved = (workout) => {
    const alreadySaved = savedWorkouts.some((item) => item.id === workout.id);
    if (alreadySaved) {
      toast.error(`${workout.name} is already saved!`);
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success(`${workout.name} saved for later!`);
    return true;
  };

  const removeFromTodayPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success("Workout removed from saved");
  };

  const toggleMarkAsDone = (id) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedStatus = !item.isDone;
          if (updatedStatus) {
            toast.success(`${item.name} marked as completed! 🎉`);
          } else {
            toast("Marked as incomplete", { icon: "↩️" });
          }
          return { ...item, isDone: updatedStatus };
        }
        return item;
      })
    );
  };

  const totalMinutes = todayPlan.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);

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
        toggleMarkAsDone,
        metrics: {
          exercises: todayPlan.length,
          minutes: totalMinutes,
          calories: totalCalories,
        },
      }}
    >
      {isLoaded && (
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#161922",
              color: "#f3f4f6",
              border: "1px solid #282f3d",
              fontSize: "13px",
              fontWeight: "500",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            },
            success: {
              iconTheme: {
                primary: "#ccff00",
                secondary: "#000000",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      )}
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
