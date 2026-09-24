import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "./context/PlanContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "FitLog — Train with Intent. Log Every Set.",
  description: "A dark, no-nonsense gym companion and workout library.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0e] text-white antialiased">
        <PlanProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#18181b",
                color: "#ffffff",
                border: "1px solid #27272a",
                fontSize: "13px",
              },
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}