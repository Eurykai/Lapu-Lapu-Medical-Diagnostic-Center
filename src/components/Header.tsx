import React, { useState } from "react";
import { Phone, MapPin, Menu, X, ClipboardCheck, Activity, Home, Info, HelpCircle, ChevronRight } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact & FAQ" }
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white shadow-md border-b border-gray-100">
      {/* Top Banner with Direct Contact Info */}
      <div className="bg-brand-dark text-white text-[11px] sm:text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-300">
              <MapPin size={12} className="text-brand-teal" />
              <span>FFG Arcade, A. Tumulak St, Lapu-Lapu City, Cebu</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-200">
            <span className="text-brand-teal font-semibold text-[10px] sm:text-xs">DOH Licensed Clinical Laboratory</span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <a
              href="tel:0324959328"
              className="flex items-center gap-1 hover:text-brand-teal transition-colors font-medium cursor-pointer"
            >
              <Phone size={12} className="text-brand-teal" />
              <span>(032) 495 9328 (Call Desk)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex justify-between items-center">
        {/* Brand Logo Group */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-[1.03]" id="llmdci_logo_container">
            <svg viewBox="0 0 200 200" className="w-full h-full select-none drop-shadow-sm" xmlns="http://www.w3.org/2000/svg" id="llmdci_logo_svg">
              {/* Outer Golden Shield Outline */}
              <path 
                d="M 40 30 C 70 24, 130 24, 160 30 C 165 95, 155 135, 100 178 C 45 135, 35 95, 40 30 Z" 
                fill="#fbc02d" 
                stroke="#034522" 
                strokeWidth="5.5" 
                strokeLinejoin="round"
              />
              {/* Thin Inner Border */}
              <path 
                d="M 46 36 C 72 31, 128 31, 154 36 C 158 92, 149 128, 100 168 C 51 128, 42 92, 46 36 Z" 
                fill="none" 
                stroke="#034522" 
                strokeWidth="1.8" 
                strokeLinejoin="round"
              />

              {/* Caduceus Staff */}
              <line x1="100" y1="42" x2="100" y2="142" stroke="#034522" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="100" cy="36" r="7" fill="#034522" />

              {/* Wing Layers */}
              {/* Left Wing detailed */}
              <path d="M 100 52 C 80 38, 62 38, 48 46 C 58 56, 76 58, 100 55 Z" fill="#034522" />
              <path d="M 100 55 C 82 46, 68 50, 56 56 C 66 64, 82 64, 100 58 Z" fill="#034522" />
              <path d="M 100 58 C 86 53, 76 56, 66 62 C 74 68, 86 68, 100 61 Z" fill="#034522" />

              {/* Right Wing detailed */}
              <path d="M 100 52 C 120 38, 138 38, 152 46 C 142 56, 124 58, 100 55 Z" fill="#034522" />
              <path d="M 100 55 C 118 46, 132 50, 144 56 C 134 64, 118 64, 100 58 Z" fill="#034522" />
              <path d="M 100 58 C 114 53, 124 56, 134 62 C 126 68, 114 68, 100 61 Z" fill="#034522" />

              {/* Symmetrical Serpents coiling around the staff */}
              {/* Left snake */}
              <path 
                d="M 100 132 C 85 122, 85 109, 100 102 C 115 95, 115 82, 100 75 C 85 68, 85 55, 100 48 C 105 45, 103 41, 99 40" 
                fill="none" 
                stroke="#034522" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Right snake */}
              <path 
                d="M 100 132 C 115 122, 115 109, 100 102 C 85 95, 85 82, 100 75 C 115 71, 115 55, 100 48 C 95 45, 97 41, 101 40" 
                fill="none" 
                stroke="#034522" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Snake heads details */}
              <path d="M 99 40 C 97 39, 96 37, 98 35 C 100 33, 102 35, 101 37" fill="#034522" />
              <path d="M 101 40 C 103 39, 104 37, 102 35 C 100 33, 98 35, 99 37" fill="#034522" />

              {/* Back ribbon folds */}
              <path d="M 30 135 L 42 120 L 42 145 Z" fill="#012110" />
              <path d="M 170 135 L 158 120 L 158 145 Z" fill="#012110" />

              {/* Left ribbon fishtail */}
              <path d="M 12 144 L 42 120 L 42 143 L 18 152 Z" fill="#034522" stroke="#012110" strokeWidth="0.5" />
              {/* Right ribbon fishtail */}
              <path d="M 188 144 L 158 120 L 158 143 L 182 152 Z" fill="#034522" stroke="#012110" strokeWidth="0.5" />

              {/* Main front banner */}
              <path 
                d="M 28 126 Q 100 133 172 126 L 166 153 Q 100 160 34 153 Z" 
                fill="#034522" 
                stroke="#012110" 
                strokeWidth="1.2" 
                strokeLinejoin="round"
              />

              {/* Ribbon text with extremely legible bold layout */}
              <text 
                x="100" 
                y="145" 
                textAnchor="middle" 
                fill="#ffffff" 
                fontSize="17" 
                fontWeight="900" 
                fontFamily="system-ui, -apple-system, sans-serif" 
                letterSpacing="0.5"
              >
                LLMDCI
              </text>
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight leading-none flex items-center gap-1.5">
              <span>LLMDCI</span>
              <span className="text-[10px] sm:text-xs font-bold bg-brand-light-blue text-brand-blue px-2.5 py-0.5 rounded-full uppercase tracking-widest hidden xs:inline">
                Cebu
              </span>
            </h1>
            <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-widest uppercase mt-0.5">
              Lapu-Lapu Medical Diagnostic Center Inc.
            </p>
          </div>
        </div>

        {/* Navigation & Actions Group */}
        <div className="flex items-center gap-3 lg:gap-8">
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                      : "text-gray-600 hover:text-brand-dark hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-800 hover:text-brand-blue hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 animate-fadeIn shadow-2xl absolute w-full left-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4">
            
            {/* List of Navigation Links with Clean Linings/Dividers */}
            <div className="border border-gray-150/80 rounded-2xl overflow-hidden bg-gray-50/50 divide-y divide-gray-100 shadow-xs">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                
                // Get corresponding icon
                let IconComponent = Home;
                if (item.id === "about") IconComponent = Info;
                if (item.id === "contact") IconComponent = HelpCircle;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-sm sm:text-base font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-brand-light-blue text-brand-blue border-l-4 border-l-brand-blue pl-[16px]"
                        : "text-gray-750 hover:text-brand-dark hover:bg-gray-50/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`p-2 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? "bg-white text-brand-blue shadow-xs" : "bg-white/80 text-gray-400 group-hover:text-brand-dark"
                      }`}>
                        <IconComponent size={18} />
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-200 ${
                      isActive ? "text-brand-blue translate-x-1" : "text-gray-300"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Contact Action Button */}
            <div className="pt-2">
              <a
                href="tel:0324959328"
                className="w-full text-center px-4 py-4 text-sm font-bold text-white bg-brand-dark hover:bg-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md shadow-brand-dark/15 active:scale-[0.99]"
              >
                <Phone size={16} />
                <span>Call Front Desk: (032) 495 9328</span>
              </a>
            </div>
            
          </div>
        </div>
      )}
    </header>
  );
}
