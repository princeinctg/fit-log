import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0b] border-t border-zinc-800 text-[#6B7280] py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog Logo" width={22} height={22} />
          <span className="font-extrabold text-sm tracking-wider text-white">FITLOG</span>
        </div>
        <p className="text-xs text-[#6B7280]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}