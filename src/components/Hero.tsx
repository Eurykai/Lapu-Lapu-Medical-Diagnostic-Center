import React from "react";
import { ClipboardCheck, Sparkles, ShieldAlert, Award, CalendarDays, Headphones, ArrowRight } from "lucide-react";

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white text-gray-900 py-20 lg:py-28 px-4 md:px-8 shadow-sm border-b border-gray-100">
      {/* Subtle organic light orbs */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-brand-light-blue to-transparent opacity-60 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-t from-emerald-50 to-transparent opacity-60 blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center space-y-8 animate-fadeIn">
        {/* Accent notification badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-light-blue border border-brand-blue/20 text-brand-navy text-xs font-bold rounded-full uppercase tracking-wider">
            <Sparkles size={14} className="text-brand-blue" />
            <span>Modern Diagnostic Center in Lapu-Lapu City</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-500/20 text-emerald-900 text-xs font-bold rounded-full uppercase tracking-wider">
            <Award size={14} className="text-emerald-700 animate-pulse" />
            <span>Accredited Philhealth Yakap Program</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight pb-2 leading-[1.1] text-brand-dark">
          Accurate Medical Reports <br className="hidden sm:inline" />
          <span className="text-brand-blue">
            You Can Rest Your Health On
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl font-medium leading-relaxed">
          DOH-Licensed laboratory delivering fast, precise, and budget-friendly diagnostic testing in Cebu. Trusted by local patients, OFWs, expecting mothers, and referring physicians.
        </p>

        {/* Quick trust assurances */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-semibold text-gray-500 pt-4">
          <span className="flex items-center gap-2 bg-emerald-50/50 text-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-100">
            <Award size={16} className="text-emerald-700 animate-pulse" />
            <span>Accredited Philhealth Yakap Program</span>
          </span>
          <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <Award size={16} className="text-brand-blue" />
            <span>DOH Accredited Clinical Lab #07-0041-26</span>
          </span>
          <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <ClipboardCheck size={16} className="text-brand-blue" />
            <span>Pristine PDF Patient Reports</span>
          </span>
        </div>
      </div>
    </section>
  );
}
