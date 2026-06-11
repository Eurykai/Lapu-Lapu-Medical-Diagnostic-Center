import React from "react";
import { Award } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8 space-y-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Simplified Header block */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-light-blue text-brand-blue text-xs font-bold rounded-full uppercase tracking-widest border border-brand-blue/10">
            <Award size={14} />
            <span>Medical Authority & Precision</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
            A Diagnostic Laboratory Cebu Patients Can Deeply Trust
          </h2>
          
          <p className="text-sm md:text-base text-gray-500 leading-relaxed font-semibold">
            For several years, Lapu-Lapu Medical Diagnostic Center Inc. (LLMDCI) has served as an essential healthcare utility on Mactan Island. Managed by licensed pathologists and medical technology associates, we blend modern machinery with compassionate patient service.
          </p>
        </div>

      </div>
    </section>
  );
}
