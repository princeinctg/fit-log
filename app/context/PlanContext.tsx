
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Workout, parseNumber } from "../types/workout";
import toast from "react-hot-toast";

interface PlanContextType {
  todayPlan: Workout[];
  savedList: Workout[];
  planCount: number;
  savedCount: number;
  addToTodayPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromTodayPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
  totalExercises: number;
  totalMinutes: number;
  totalCalories: number;
}

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

// Get calories from different possible API field names
const getWorkoutCalories = (workout: Workout): number => {
  const item = workout as Workout & {
    calories_burned?: number | string;
    calorie?: number | string;
    kcal?: number | string;
  };

  const calories =
    item.calories ??
    item.caloriesBurned ??
    item.calories_burned ??
    item.calorie ??
    item.kcal;

  return parseNumber(calories);
};

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedPlan = localStorage.getItem(
          "fitlog_today_plan"
        );

        const savedLater = localStorage.getItem(
          "fitlog_saved_list"
        );

        if (savedPlan) {
          setTodayPlan(JSON.parse(savedPlan));
        }

        if (savedLater) {
          setSavedList(JSON.parse(savedLater));
        }
      } catch (error) {
        console.error("LocalStorage loading error:", error);
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save today's plan
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        "fitlog_today_plan",
        JSON.stringify(todayPlan)
      );
    }
  }, [todayPlan, isHydrated]);

  // Save saved workouts
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        "fitlog_saved_list",
        JSON.stringify(savedList)
      );
    }
  }, [savedList, isHydrated]);

  // Add workout to today's plan
  const addToTodayPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.error(
        "Cap reached! Today's plan is limited to 5 lifts."
      );
      return;
    }

    const exists = todayPlan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (exists) {
      toast("Workout already in today's plan!", {
        icon: "⚠️",
      });
      return;
    }

    setTodayPlan((prev) => [
      ...prev,
      {
        ...workout,
        isDone: false,
      },
    ]);

    toast.success("Added to today's plan");
  };

  // Add workout to saved list
  const addToSaved = (workout: Workout) => {
    const exists = savedList.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (exists) {
      toast("Workout already in saved list!", {
        icon: "⚠️",
      });
      return;
    }

    setSavedList((prev) => [...prev, workout]);

    toast.success("Saved for later");
  };

  // Remove workout from today's plan
  const removeFromTodayPlan = (id: string | number) => {
    setTodayPlan((prev) =>
      prev.filter((item) => String(item.id) !== String(id))
    );

    toast.success("Removed from today's plan");
  };

  // Remove workout from saved list
  const removeFromSaved = (id: string | number) => {
    setSavedList((prev) =>
      prev.filter((item) => String(item.id) !== String(id))
    );

    toast.success("Removed from saved list");
  };

  // Mark workout as done or undo
  const markAsDone = (id: string | number) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item
      )
    );

    toast.success("Workout status updated!");
  };

  // Total exercises
  const totalExercises = todayPlan.length;

  // Total minutes
  const totalMinutes = todayPlan.reduce(
    (total, item) => total + parseNumber(item.duration),
    0
  );

  // Total calories
  const totalCalories = todayPlan.reduce(
    (total, item) => total + getWorkoutCalories(item),
    0
  );

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedList,

        planCount: todayPlan.length,
        savedCount: savedList.length,

        addToTodayPlan,
        addToSaved,

        removeFromTodayPlan,
        removeFromSaved,

        markAsDone,

        totalExercises,
        totalMinutes,
        totalCalories,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used within PlanProvider"
    );
  }

  return context;
}