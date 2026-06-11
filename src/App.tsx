import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BookingForm from "./components/BookingForm";
import ResultsInquiry from "./components/ResultsInquiry";
import AboutUs from "./components/AboutUs";
import BlogTips from "./components/BlogTips";
import ContactUs from "./components/ContactUs";


import { 
  ClipboardCheck, Clock, ShieldCheck, Star, Sparkles, 
  ArrowRight, Phone, MessageSquare, HeartHandshake, CheckCircle2 
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedTestId, setSelectedTestId] = useState<string>("");

  const handleTestPreviewClick = (testId: string) => {
    setSelectedTestId(testId);
    setCurrentPage("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800 font-sans selection:bg-brand-blue selection:text-white">
      {/* Sticky Top Header bar */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === "home" && (
          <div className="space-y-16 pb-20 animate-fadeIn">
            {/* Elegant trust Hero */}
            <Hero setCurrentPage={setCurrentPage} />

            {/* Core Values: Why Choose LLMDCI */}
            <section className="bg-emerald-50 text-gray-800 py-16 px-4 md:px-8 relative overflow-hidden text-center border-y border-emerald-100">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-light-blue rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none"></div>
              
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <div className="space-y-3">
                  <span className="text-brand-blue text-sm font-bold uppercase tracking-widest inline-block bg-white px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                    Our Patient Assurances
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    Fast Results. Precise Science.<br /> Compassionate Care.
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-semibold max-w-2xl mx-auto">
                  We designed every point of your diagnostic experience to reduce anxiety and bypass queues. See how we support Cebu families daily.
                </p>
              </div>
            </section>



            {/* Bento Grid of Real Local Trust Reviews & Google Maps Feedback */}
            <section className="py-20 px-4 md:px-8">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-1.5 text-xs text-brand-blue font-bold bg-brand-light-blue px-3 py-1.5 rounded-full">
                    <Star className="fill-brand-blue text-brand-blue" size={14} />
                    <span>Highly Rated Lapu-Lapu Clinic on Google Maps</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">Patient Satisfaction Reviews</h3>
                  <p className="text-sm sm:text-base text-gray-500 font-medium">
                    Don’t just take our word for it. Read real reviews from patients and our team’s official diagnostic fee responses on Google Maps!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative z-10">
                  {/* Review 1 */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-light-blue text-brand-blue flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                        MF
                      </div>
                      <div className="leading-tight">
                        <h4 className="text-xs font-bold text-gray-800">Mark Florenze Java LPT</h4>
                        <span className="text-[10px] text-gray-400">Google Local Reviewer</span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      <Star size={12} className="fill-amber-400" />
                      <Star size={12} className="fill-amber-400" />
                      <Star size={12} className="fill-amber-400" />
                      <Star size={12} className="fill-amber-400" />
                      <Star size={12} className="fill-amber-400" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic">
                      "My first impression of this center is accommodating and patient, and they will answer your questions. Try to call them as well in their phone indicated and they will answer most of your questions in their convenient time."
                    </p>
                  </div>

                  {/* Review 2 WITH OFFICIAL FEE RESPONSE */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-xs flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                          BM
                        </div>
                        <div className="leading-tight">
                          <h4 className="text-xs font-bold text-gray-800">Blett Malatumbaga</h4>
                          <span className="text-[10px] text-gray-400 font-semibold tracking-wider text-teal-600">Local Guide</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-800 font-bold">
                        "Do you have PNS (Paranasal sinuses) xray?"
                      </p>
                    </div>

                    <div className="bg-brand-light-blue/60 p-3.5 rounded-xl border border-brand-light-blue text-[11px] space-y-1 mt-2">
                      <span className="font-bold text-brand-blue uppercase tracking-widest text-[8px] block">
                        Response from Owner:
                      </span>
                      <p className="text-gray-700 italic font-medium">
                        "Yes, we do. paranasal sinuses X-Ray. Fee is **₱460.00**."
                      </p>
                    </div>
                  </div>

                  {/* Review 3 WITH OFFICIAL FEE RESPONSE */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-xs flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                          YS
                        </div>
                        <div className="leading-tight">
                          <h4 className="text-xs font-bold text-gray-800">Yhuan Sumalinog</h4>
                          <span className="text-[10px] text-gray-400">Mactan Resident</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-800 font-bold">
                        "Hello po, may I ask if naa mo available OGTT test for pregnant, and may I know if pila sad?"
                      </p>
                    </div>

                    <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-50 text-[11px] space-y-1 mt-2">
                      <span className="font-bold text-brand-emerald uppercase tracking-widest text-[8px] block">
                        Response from Owner:
                      </span>
                      <p className="text-gray-700 italic font-medium">
                        "Yes, OGTT is available for pregnant mothers for **₱910.00** per test."
                      </p>
                    </div>
                  </div>

                  {/* Review 4 with chest X-ray fee */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-xs flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                          JK
                        </div>
                        <div className="leading-tight">
                          <h4 className="text-xs font-bold text-gray-800">Jn Kyang</h4>
                          <span className="text-[10px] text-gray-400">Pre-employment applicant</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-800 font-bold">
                        "hi naa mo available CXR-PA? and pila pod?"
                      </p>
                    </div>

                    <div className="bg-brand-light-blue/60 p-3.5 rounded-xl border border-brand-light-blue text-[11px] space-y-1 mt-2">
                      <span className="font-bold text-brand-blue uppercase tracking-widest text-[8px] block">
                        Response from Owner:
                      </span>
                      <p className="text-gray-700 italic font-medium">
                        "Yes, Chest X-Ray PA (CXR-PA) is available. Fee is only **₱250.00**."
                      </p>
                    </div>
                  </div>

                  {/* Review 5 */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-xs flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                          JD
                        </div>
                        <div className="leading-tight">
                          <h4 className="text-xs font-bold text-gray-800">Joevic Domencil</h4>
                          <span className="text-[10px] text-gray-400">Occupational health</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-800 font-bold">
                        "Hello good afternoon, do you have an HbA1c test and how much is it?"
                      </p>
                    </div>

                    <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-50 text-[11px] space-y-1 mt-2">
                      <span className="font-bold text-brand-emerald uppercase tracking-widest text-[8px] block">
                        Response from Owner:
                      </span>
                      <p className="text-gray-700 italic font-medium">
                        "Yes, HbA1c screening is fully available for **₱675.00**."
                      </p>
                    </div>
                  </div>

                  {/* Review 6 */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                        RL
                      </div>
                      <div className="leading-tight">
                        <h4 className="text-xs font-bold text-gray-800">Rodello Lauron</h4>
                        <span className="text-[10px] text-gray-400">Regular walk-in patient</span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      <Star size={12} className="fill-amber-400" />
                      <Star size={12} className="fill-amber-400" />
                      <Star size={12} className="fill-amber-400" />
                      <Star size={12} className="fill-amber-400" />
                      <Star size={12} className="fill-amber-400" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic">
                      "The staffs are very friendly."
                    </p>
                  </div>
                </div>
              </div>
            </section>


          </div>
        )}

        {currentPage === "services" && (
          <Services setCurrentPage={setCurrentPage} setSelectedTestId={setSelectedTestId} />
        )}

        {currentPage === "booking" && (
          <BookingForm selectedTestId={selectedTestId} setSelectedTestId={setSelectedTestId} />
        )}

        {currentPage === "results" && (
          <ResultsInquiry />
        )}

        {currentPage === "about" && (
          <AboutUs />
        )}

        {currentPage === "blog" && (
          <BlogTips />
        )}

        {currentPage === "contact" && (
          <ContactUs />
        )}
      </main>





      {/* Corporate Clinical Page Footer */}
      <footer className="bg-brand-dark text-gray-400 py-12 px-4 md:px-8 border-t border-white/5 print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          {/* Col 1 */}
          <div className="md:col-span-8 space-y-4">
            <h4 className="text-white font-extrabold text-sm sm:text-base leading-none">
              Lapu-Lapu Medical Diagnostic Center Inc.
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-semibold">
              The primary clinical pathology facility inside FFG Arcade Lapu-Lapu. Driven by modern calibration science and compassionate personnel since 2018.
            </p>
          </div>

          <div className="md:col-span-1"></div>

          {/* Col 3 */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px]">Phone Number</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-1.5 font-semibold text-gray-300">
                <Phone size={13} className="text-brand-teal" />
                <span>(032) 495 9328 (Desk Line)</span>
              </p>
              <p className="leading-relaxed text-[11px] text-gray-500">
                FFG Arcade, Brgy. Basak, A. Tumulak St, Lapu-Lapu, 6015 Cebu, Philippines.
              </p>
              <p className="text-[10px] text-gray-500 bg-white/5 px-2 py-1.5 rounded font-mono">
                🕒 Mon - Sat: 6:00 AM to 5:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs">
          <p>© 2026 Lapu-Lapu Medical Diagnostic Center Inc. (LLMDCI). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
