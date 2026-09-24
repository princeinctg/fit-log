import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#0d0d0e] text-white px-6 text-center">
      <h1 className="text-7xl font-black text-[#C2F800] mb-2 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold uppercase">Page Not Found</h2>
      <p className="text-[#9CA3AF] text-sm mt-2 max-w-sm">
        The workout route you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 bg-[#C2F800] text-black font-bold text-xs uppercase px-6 py-3 rounded hover:bg-[#b8e600] transition"
      >
        Back to Library
      </Link>
    </div>
  );
}