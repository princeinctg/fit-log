"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0b] border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog Logo" width={26} height={26} />
          <span className="font-extrabold text-xl tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className={`transition ${
              pathname === "/"
                ? "text-[#C2F800] font-semibold border-b-2 border-[#C2F800] pb-0.5"
                : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`transition ${
              pathname === "/my-plan"
                ? "text-[#C2F800] font-semibold border-b-2 border-[#C2F800] pb-0.5"
                : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Plan and Saved Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-full hover:bg-[#b8e600] transition"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] text-[11px] px-1.5 py-0.2 rounded-full">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-zinc-700 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-full hover:border-zinc-500 transition"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 text-[#9CA3AF] text-[11px] px-1.5 py-0.2 rounded-full">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}