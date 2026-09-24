
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarPlus,
  Loader2,
  ArrowLeft,
  Bookmark,
} from "lucide-react";

import { Workout } from "../../types/workout";
import { usePlan } from "../../context/PlanContext";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const { addToTodayPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    fetch(`https://api.abcz.workers.dev/api/fitlog/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch workout details");
        }

        return res.json();
      })
      .then((data) => {
        const item = data.data || data;
        setWorkout(item);
      })
      .catch((err) => {
        console.error("Workout fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-white">
        <Loader2
          className="animate-spin text-[#C2F800] mb-3"
          size={40}
        />

        <p className="text-sm text-[#9CA3AF]">
          Loading workout details…
        </p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-2xl font-bold">
          Workout Not Found
        </h2>

        <Link
          href="/"
          className="mt-4 text-[#C2F800] hover:underline text-sm"
        >
          Return to Library
        </Link>
      </div>
    );
  }

  const tags: string[] = Array.isArray(workout.category)
    ? workout.category
    : workout.category
    ? [workout.category]
    : [];

  return (
    <main className="min-h-screen bg-[#0d0d0e] text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Back to Library */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-white text-xs font-semibold mb-8 uppercase tracking-wider transition"
        >
          <ArrowLeft size={14} />
          Back to Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Workout Image */}
          <div className="relative w-full h-[380px] md:h-[480px] bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            <Image
              src={
                workout.image ||
                workout.thumbnail ||
                "/banner.png"
              }
              alt={
                workout.name ||
                workout.title ||
                "Workout"
              }
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Workout Details */}
          <div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-zinc-800 text-[#9CA3AF] text-[11px] font-bold uppercase px-2.5 py-1 rounded border border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              {workout.name || workout.title}
            </h1>

            {/* Description */}
            <p className="text-[#9CA3AF] text-sm mt-3 leading-relaxed">
              {workout.description ||
                "A compound press that builds muscle thickness, strength, and pressing power."}
            </p>

            {/* Workout Information */}
            <div className="bg-[#141416] border border-zinc-800 rounded-lg p-5 mt-6 divide-y divide-zinc-800/80">

              {/* Equipment */}
              <div className="grid grid-cols-2 py-2 text-xs">
                <span className="text-[#9CA3AF] font-semibold uppercase">
                  Equipment
                </span>

                <span className="text-zinc-200 text-right">
                  {Array.isArray(workout.equipment)
                    ? workout.equipment.join(", ")
                    : workout.equipment || "Barbell, Bench"}
                </span>
              </div>

              {/* Difficulty */}
              <div className="grid grid-cols-2 py-2 text-xs">
                <span className="text-[#9CA3AF] font-semibold uppercase">
                  Difficulty
                </span>

                <span className="text-zinc-200 text-right">
                  {workout.difficulty || "Intermediate"}
                </span>
              </div>

              {/* Sets and Reps */}
              <div className="grid grid-cols-2 py-2 text-xs">
                <span className="text-[#9CA3AF] font-semibold uppercase">
                  Sets / Reps
                </span>

                <span className="text-zinc-200 text-right">
                  {workout.sets || 4} Sets /{" "}
                  {workout.reps || "8-12"} Reps
                </span>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-2 py-2 text-xs">
                <span className="text-[#9CA3AF] font-semibold uppercase">
                  Duration
                </span>

                <span className="text-zinc-200 text-right">
                  {workout.duration || "25 min"}
                </span>
              </div>

              {/* Calories */}
              <div className="grid grid-cols-2 py-2 text-xs">
                <span className="text-[#9CA3AF] font-semibold uppercase">
                  Calories
                </span>

                <span className="text-zinc-200 text-right">
                  {workout.calories || "180 kcal"}
                </span>
              </div>

              {/* Rating */}
              <div className="grid grid-cols-2 py-2 text-xs">
                <span className="text-[#9CA3AF] font-semibold uppercase">
                  Rating
                </span>

                <span className="text-right text-[#C2F800] font-bold">
                  ★ {workout.rating || "4.8"}
                </span>
              </div>

            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-3">
                Instructions
              </h3>

              <ol className="space-y-2.5">
                {(
                  workout.instructions &&
                  workout.instructions.length > 0
                    ? workout.instructions
                    : [
                        "Lie flat on the bench with feet firmly planted.",
                        "Grip the bar with hands slightly wider than shoulder-width.",
                        "Lower the bar under control to mid-chest level.",
                        "Drive through your chest and triceps to push the bar back up.",
                      ]
                ).map((step: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-xs text-[#9CA3AF]"
                  >
                    <span className="shrink-0 w-5 h-5 rounded bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-[11px]">
                      {index + 1}
                    </span>

                    <span className="leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              {/* Add to Today's Plan */}
              <button
                onClick={() => addToTodayPlan(workout)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-3.5 rounded hover:bg-[#b8e600] transition"
              >
                <CalendarPlus
                  size={16}
                  strokeWidth={2.5}
                />

                Add to today&apos;s plan
              </button>

              {/* Save for Later */}
              <button
                onClick={() => addToSaved(workout)}
                className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-semibold text-xs uppercase px-5 py-3.5 rounded transition"
              >
                <Bookmark size={16} />

                Save for later
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}