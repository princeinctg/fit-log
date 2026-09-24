"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout, parseNumber } from "@/types/workout";
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

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // LocalStorage 
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog_today_plan");
      const savedLater = localStorage.getItem("fitlog_saved_list");
      if (savedPlan) setTodayPlan(JSON.parse(savedPlan));
      if (savedLater) setSavedList(JSON.parse(savedLater));
    } catch {
      // fallback
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // LocalStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
    }
  }, [todayPlan, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog_saved_list", JSON.stringify(savedList));
    }
  }, [savedList, isHydrated]);

  const addToTodayPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.error("Cap reached! Today's plan is limited to 5 lifts.");
      return;
    }
    const exists = todayPlan.some((w) => String(w.id) === String(workout.id));
    if (exists) {
      toast("Workout already in today's plan!", { icon: "⚠️" });
      return;
    }
    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout: Workout) => {
    const exists = savedList.some((w) => String(w.id) === String(workout.id));
    if (exists) {
      toast("Workout already in saved list!", { icon: "⚠️" });
      return;
    }
    setSavedList((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromTodayPlan = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((w) => String(w.id) !== String(id)));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSavedList((prev) => prev.filter((w) => String(w.id) !== String(id)));
    toast.success("Removed from saved list");
  };

  const markAsDone = (id: string | number) => {
    setTodayPlan((prev) =>
      prev.map((w) =>
        String(w.id) === String(id) ? { ...w, isDone: !w.isDone } : w
      )
    );
    toast.success("Marked as done!");
  };

 
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (acc, cur) => acc + parseNumber(cur.duration),
    0
  );
  const totalCalories = todayPlan.reduce(
    (acc, cur) => acc + parseNumber(cur.calories),
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
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
}