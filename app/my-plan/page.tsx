"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, X, Clock, Flame, Star, Dumbbell, ExternalLink } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
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

  return (
    <main className="min-h-screen bg-[#0d0d0e] text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">MY PLAN</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#141416] border border-zinc-800 rounded-lg p-5">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Exercises
            </span>
            <p className="text-3xl font-black text-white mt-1">{totalExercises}</p>
          </div>
          <div className="bg-[#141416] border border-zinc-800 rounded-lg p-5">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Minutes
            </span>
            <p className="text-3xl font-black text-white mt-1">{totalMinutes}</p>
          </div>
          <div className="bg-[#141416] border border-zinc-800 rounded-lg p-5">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Calories
            </span>
            <p className="text-3xl font-black text-[#ccff00] mt-1">{totalCalories} kcal</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 mb-8">
          <button
            onClick={() => setActiveTab("plan")}
            className={`pb-3 px-6 text-sm font-bold uppercase transition ${
              activeTab === "plan"
                ? "text-[#ccff00] border-b-2 border-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({todayPlan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 px-6 text-sm font-bold uppercase transition ${
              activeTab === "saved"
                ? "text-[#ccff00] border-b-2 border-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved ({savedList.length})
          </button>
        </div>

        {/* Empty State */}
        {currentList.length === 0 ? (
          <div className="bg-[#141416] border border-zinc-800 rounded-lg py-16 px-6 text-center max-w-md mx-auto my-12">
            <Dumbbell className="mx-auto text-zinc-600 mb-4" size={42} />
            <h3 className="text-lg font-black tracking-tight text-white uppercase">
              NOTHING HERE YET
            </h3>
            <p className="text-zinc-400 text-xs mt-2 mb-6">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-2.5 rounded hover:bg-[#b8e600] transition"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Cards List */
          <div className="space-y-4">
            {currentList.map((item) => (
              <div
                key={item.id}
                className={`bg-[#141416] border rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition ${
                  item.isDone ? "border-green-600/50 opacity-80" : "border-zinc-800"
                }`}
              >
                {/* Thumbnail  */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-20 h-16 bg-zinc-900 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || item.thumbnail || "/banner.png"}
                      alt={item.name || item.title || "Workout"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-bold text-sm uppercase ${
                          item.isDone ? "line-through text-zinc-500" : "text-white"
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
                      {Array.isArray(item.equipment) ? item.equipment.join(", ") : item.equipment}
                    </p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-6 text-zinc-400 text-xs font-medium w-full md:w-auto justify-between md:justify-start">
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {item.duration || "25 min"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={13} className="text-orange-400" /> {item.calories || "180 kcal"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={13} className="text-[#ccff00]" /> {item.rating || "4.8"}
                  </span>
                </div>

                {/* Action Buttons  */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${item.id}`}
                    className="flex items-center gap-1 text-xs border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-3 py-1.5 rounded transition"
                  >
                    <ExternalLink size={13} /> View Details
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
                      <Check size={14} /> {item.isDone ? "Undo" : "Mark as Done"}
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