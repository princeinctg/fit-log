
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#15171D] border-b border-zinc-800 text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
        {/* Left Column */}
        <div>
          <p className="text-[#C2F800] text-xs font-bold tracking-widest uppercase">
            WORKOUT LIBRARY
          </p>
          <h1 className="text-[60px] md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-3 leading-tight font-oswald whitespace-nowrap">
            TRAIN WITH INTENT.<br />
            LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 mt-5 text-sm md:text-base leading-relaxed max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div className="mt-8">
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#C2F800] text-black font-extrabold text-sm px-6 py-3.5 rounded-md hover:bg-[#b8e600] transition"
            >
              BROWSE WORKOUTS
              <ArrowDown size={12} />
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/assets/banner.png"
            alt="FitLog Hero Model"
            width={480}
            height={420}
            className="w-full max-w-md object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}