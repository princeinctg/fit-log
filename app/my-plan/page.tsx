
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  X,
  Clock,
  Flame,
  Star,
  Dumbbell,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { usePlan } from "../context/PlanContext";
import { Workout, parseNumber } from "../types/workout";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] = useState<
    "Duration" | "Calories" | "Rating"
  >("Duration");

  const {
    todayPlan,
    savedList,
    removeFromTodayPlan,
    removeFromSaved,
    markAsDone,
    totalExercises,
    totalMinutes,
    totalCalories,
  } = usePlan();

  const currentList = activeTab === "plan" ? todayPlan : savedList;

  // Sort workouts
  const sortedCurrentList = [...currentList].sort((a, b) => {
    if (sortBy === "Duration") {
      return parseNumber(a.duration) - parseNumber(b.duration);
    }

    if (sortBy === "Calories") {
      return parseNumber(b.calories) - parseNumber(a.calories);
    }

    if (sortBy === "Rating") {
      return parseNumber(b.rating) - parseNumber(a.rating);
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-[#0d0d0e] text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>

          <p className="text-[#9CA3AF] text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Exercises */}
          <div className="bg-[#141416] border border-zinc-800 rounded-lg p-5">
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <Dumbbell size={15} />

              <span className="text-xs font-semibold uppercase tracking-wider">
                Exercises
              </span>
            </div>

            <p className="text-3xl font-black text-white mt-1">
              {totalExercises}
            </p>
          </div>

          {/* Minutes */}
          <div className="bg-[#141416] border border-zinc-800 rounded-lg p-5">
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <Clock size={15} />

              <span className="text-xs font-semibold uppercase tracking-wider">
                Minutes
              </span>
            </div>

            <p className="text-3xl font-black text-white mt-1">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="bg-[#141416] border border-zinc-800 rounded-lg p-5">
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <Flame size={15} />

              <span className="text-xs font-semibold uppercase tracking-wider">
                Calories
              </span>
            </div>

            <p className="text-3xl font-black text-[#C2F800] mt-1">
              {totalCalories} kcal
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 mb-6">
          <button
            onClick={() => setActiveTab("plan")}
            className={`pb-3 px-6 text-sm font-bold uppercase transition ${
              activeTab === "plan"
                ? "text-[#C2F800] border-b-2 border-[#C2F800]"
                : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            Today&apos;s Plan ({todayPlan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 px-6 text-sm font-bold uppercase transition ${
              activeTab === "saved"
                ? "text-[#C2F800] border-b-2 border-[#C2F800]"
                : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            Saved ({savedList.length})
          </button>
        </div>

        {/* Sort By */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Sort By:
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "Duration"
                      | "Calories"
                      | "Rating"
                  )
                }
                className="appearance-none bg-[#171719] border border-zinc-700 text-xs font-medium text-white px-3 py-2 pr-8 rounded-md cursor-pointer focus:outline-none focus:border-[#ccff00]"
              >
                <option value="Duration">Duration</option>
                <option value="Calories">Calories</option>
                <option value="Rating">Rating</option>
              </select>

              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {sortedCurrentList.length === 0 ? (
          <div className="bg-[#141416] border border-zinc-800 rounded-lg py-16 px-6 text-center max-w-md mx-auto my-12">
            <Dumbbell
              className="mx-auto text-zinc-600 mb-4"
              size={42}
            />

            <h3 className="text-lg font-black tracking-tight text-white uppercase">
              NOTHING HERE YET
            </h3>

            <p className="text-[#9CA3AF] text-xs mt-2 mb-6">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="inline-block bg-[#C2F800] text-black font-bold text-xs uppercase px-5 py-2.5 rounded hover:bg-[#b8e600] transition"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout List */
          <div className="space-y-4">
            {sortedCurrentList.map((item: Workout) => (
              <div
                key={item.id}
                className={`bg-[#141416] border rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition ${
                  item.isDone
                    ? "border-green-600/50 opacity-80"
                    : "border-zinc-800"
                }`}
              >
                {/* Workout Information */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-20 h-16 bg-zinc-900 rounded overflow-hidden shrink-0">
                    <Image
                      src={
                        item.image ||
                        item.thumbnail ||
                        "/banner.png"
                      }
                      alt={item.name || item.title || "Workout"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-bold text-sm uppercase ${
                          item.isDone
                            ? "line-through text-zinc-500"
                            : "text-white"
                        }`}
                      >
                        {item.name || item.title}
                      </h4>

                      {item.isDone && (
                        <span className="text-[10px] bg-green-950 text-green-400 font-bold px-1.5 py-0.5 rounded border border-green-800">
                          DONE
                        </span>
                      )}
                    </div>

                    <p className="text-zinc-400 text-xs mt-0.5">
                      {Array.isArray(item.equipment)
                        ? item.equipment.join(", ")
                        : item.equipment}
                    </p>
                  </div>
                </div>

                {/* Workout Stats */}
                <div className="flex items-center gap-6 text-zinc-400 text-xs font-medium w-full md:w-auto justify-between md:justify-start">
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {item.duration || "25 min"}
                  </span>

                  <span className="flex items-center gap-1">
                    <Flame
                      size={13}
                      className="text-orange-400"
                    />
                    {item.calories || "180 kcal"}
                  </span>

                  <span className="flex items-center gap-1">
                    <Star
                      size={13}
                      className="text-[#ccff00]"
                    />
                    {item.rating || "4.8"}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${item.id}`}
                    className="flex items-center gap-1 text-xs border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-3 py-1.5 rounded transition"
                  >
                    <ExternalLink size={13} />
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded transition ${
                        item.isDone
                          ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                          : "bg-green-600 hover:bg-green-500 text-white"
                      }`}
                    >
                      <Check size={14} />
                      {item.isDone ? "Undo" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromTodayPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="text-zinc-500 hover:text-red-400 p-1.5 transition"
                    title="Remove"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}