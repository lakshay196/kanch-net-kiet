import { Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import type { Metadata } from "next";
import DemoShell from "@/components/demo/DemoShell";
import "./demo.css";

const demoSans = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-demo-sans",
  display: "swap",
});

const demoSerif = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["600", "700"],
  variable: "--font-demo-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanch-Net demo",
  description:
    "Independent illustrative demo for one glass-bangle order. Money is simulated.",
};

export default function DemoPage() {
  return (
    <div className={`${demoSans.variable} ${demoSerif.variable} demo-root`}>
      <DemoShell />
    </div>
  );
}
