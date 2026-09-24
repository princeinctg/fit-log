
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Flame,
  Star,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Workout, parseNumber } from "../types/workout";

type ApiWorkout = Workout & {
  caloriesBurned?: number;
  muscleGroups?: string[];
};

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<ApiWorkout[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState<
    "Duration" | "Calories" | "Rating"
  >("Duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        return res.json();
      })
      .then((data: unknown) => {
        const list: ApiWorkout[] = Array.isArray(data)
          ? data
          : typeof data === "object" &&
              data !== null &&
              "data" in data &&
              Array.isArray(data.data)
            ? data.data
            : [];

        setWorkouts(list);
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Sort workouts
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "Duration") {
      return (
        parseNumber(a.duration) -
        parseNumber(b.duration)
      );
    }

    if (sortBy === "Calories") {
      return (
        Number(b.caloriesBurned ?? 0) -
        Number(a.caloriesBurned ?? 0)
      );
    }

    if (sortBy === "Rating") {
      return (
        parseNumber(b.rating) -
        parseNumber(a.rating)
      );
    }

    return 0;
  });

  return (
    <section
      id="library"
      className="w-full bg-[#0d0d0e] py-16 px-6 md:px-12 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              THE LIBRARY
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort By */}
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

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#9CA3AF]">
            <Loader2
              size={36}
              className="animate-spin text-[#C2F800] mb-3"
            />

            <p className="text-sm">
              Loading workouts…
            </p>
          </div>
        ) : (
          /* Workout Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout: ApiWorkout) => {
              const tags: string[] = Array.isArray(
                workout.muscleGroups
              )
                ? workout.muscleGroups
                : [];

              return (
                <Link
                  key={workout.id}
                  href={`/workout/${workout.id}`}
                  className="group bg-[#141416] border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 bg-zinc-900 overflow-hidden">
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
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Muscle Group Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {tags.map(
                          (tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-zinc-800/80 border border-zinc-700 text-[10px] uppercase font-bold text-zinc-300 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>

                      {/* Workout Name */}
                      <h3 className="font-extrabold text-base uppercase tracking-tight text-white group-hover:text-[#ccff00] transition">
                        {workout.name || workout.title}
                      </h3>

                      {/* Equipment */}
                      <p className="text-zinc-400 text-xs mt-1">
                        Equipment:{" "}
                        <span className="text-zinc-300">
                          {Array.isArray(workout.equipment)
                            ? workout.equipment.join(", ")
                            : workout.equipment ||
                              "Bodyweight"}
                        </span>
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3 mt-4 text-zinc-400 text-xs font-medium">
                      {/* Duration */}
                      <div className="flex items-center gap-1">
                        <Clock
                          size={14}
                          className="text-zinc-500"
                        />

                        <span>
                          {workout.duration ?? "N/A"}
                        </span>
                      </div>

                      {/* Calories */}
                      <div className="flex items-center gap-1">
                        <Flame
                          size={14}
                          className="text-orange-400"
                        />

                        <span>
                          {workout.caloriesBurned !==
                            undefined &&
                          workout.caloriesBurned !== null
                            ? `${workout.caloriesBurned} kcal`
                            : "N/A"}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="text-[#C2F800]"
                        />

                        <span>
                          {workout.rating ?? "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}