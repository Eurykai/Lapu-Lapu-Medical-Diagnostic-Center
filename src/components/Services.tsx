import React, { useState } from "react";
import { TEST_PACKAGES } from "../data";
import { TestPackage } from "../types";
import { Search, Info, HelpCircle, ChevronRight, CheckCircle2, Clock } from "lucide-react";

interface ServicesProps {
  setCurrentPage: (page: string) => void;
  setSelectedTestId: (id: string) => void;
}

type TabCategory = "all" | "chemistry" | "microscopy" | "imaging";

export default function Services({ setCurrentPage, setSelectedTestId }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<TabCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories: { id: TabCategory; label: string }[] = [
    { id: "all", label: "All Tests & Packages" },
    { id: "chemistry", label: "Blood Panels & Chemistry" },
    { id: "microscopy", label: "Clinical Microscopy" },
    { id: "imaging", label: "X-Ray & Ultrasound" }
  ];

  // Filtering Logic
  const filteredPackages = TEST_PACKAGES.filter((pkg) => {
    const matchesCategory = activeCategory === "all" || pkg.category === activeCategory;
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.whoNeedsIt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookTest = (pkg: TestPackage) => {
    setSelectedTestId(pkg.id);
    setCurrentPage("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <section className="bg-gray-50 py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight">
            Diagnostic Services & Transparent Pricing
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            Browse our licensed laboratory offerings and official prices. Every test is backed by standard calibration and signed by our certified Registered Medical Technologists.
          </p>
        </div>

        {/* Filter and Search Bar Row */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center z-10 relative">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedCardId(null);
                }}
                className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                    : "text-gray-600 hover:text-brand-blue hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search tests (e.g., OGTT, Fasting)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-blue focus:outline-hidden rounded-xl text-sm transition-all"
            />
          </div>
        </div>

        {/* Dynamic warning for unavailable inquiries (D-Dimer, Spirometry) to display medical honesty */}
        {searchQuery.trim().length > 1 && filteredPackages.length === 0 && (
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl max-w-2xl mx-auto text-center space-y-2">
            <h4 className="text-sm font-bold text-amber-800">Test Not Rendered In House</h4>
            <p className="text-xs text-amber-700">
              We sorry to advise that **Bronchodilator Spirometry** and **D-Dimer Blood Tests** are currently not available at LLMDCI. Please check with major local Cebu hospitals. Let us assist you with other services!
            </p>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-brand-blue underline"
            >
              Clear Search Query
            </button>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const isExpanded = expandedCardId === pkg.id;
            const hasFasting = pkg.preps.some((p) => p.toLowerCase().includes("fasting"));

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                  isExpanded
                    ? "border-brand-teal shadow-xl ring-1 ring-brand-teal/20 scale-[1.01]"
                    : "border-gray-200/80 hover:border-gray-300 hover:shadow-md hover:scale-[1.005]"
                }`}
              >
                {/* Card Top Section */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight">
                      {pkg.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-gray-400 font-medium block">Official Fee:</span>
                      <span className="font-extrabold text-brand-blue text-lg md:text-xl">
                        ₱{pkg.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Badges and meta labels */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-gray-100 text-gray-600">
                      {pkg.category === "chemistry" ? "Blood Chemistry" : pkg.category === "imaging" ? "Digital Scan" : "Clinical Microscopy"}
                    </span>
                    {hasFasting ? (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-red-50 text-red-600 border border-red-100 flex items-center gap-1">
                        <Clock size={10} />
                        Fasting Required
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">
                        No Fasting Needed
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {pkg.description}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => toggleExpand(pkg.id)}
                      className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? "Hide Details" : "View Preparation & Insights"}</span>
                      <ChevronRight size={14} className={`transform transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Card Expanded details block */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 bg-gray-50/70 border-t border-gray-100 space-y-4 text-xs animate-fadeIn">
                    {/* Who needs this */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Target Patients:</h4>
                      <p className="text-gray-600 leading-relaxed">{pkg.whoNeedsIt}</p>
                    </div>

                    {/* Pre-Test Preparation Checklist */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-1 text-brand-navy">
                        <Info size={12} className="text-brand-teal" />
                        Patient Preparation Rules:
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {pkg.preps.map((prep, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-gray-600 leading-relaxed">
                            <span className="text-brand-blue font-bold shrink-0">{idx + 1}.</span>
                            <span>{prep}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Completion speed */}
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                      <Clock size={12} className="text-gray-400" />
                      <span>Turnaround time: {pkg.duration}</span>
                    </div>
                  </div>
                )}

                {/* Card CTA block */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                    DOH Standard Accredited
                  </span>
                  <button
                    onClick={() => handleBookTest(pkg)}
                    className="px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Set Appointment
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="bg-brand-light-blue p-6 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-9 space-y-1">
            <h4 className="font-bold text-brand-dark text-base md:text-lg">
              Expecting or Coordinating Corporate Pre-Employment Clearances?
            </h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              We support custom corporate laboratory packages and OB-GYN referrals. Send us an inquiry for volume discounts or customized laboratory panels.
            </p>
          </div>
          <div className="md:col-span-3 text-right">
            <button
              onClick={() => setCurrentPage("contact")}
              className="w-full md:w-auto px-5 py-2.5 bg-white text-brand-blue hover:text-brand-dark hover:shadow-xs transition-colors text-xs font-bold rounded-xl border border-brand-blue/20 cursor-pointer"
            >
              Send Partnership Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
