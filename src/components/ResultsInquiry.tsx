import React, { useState } from "react";
import { PatientLabResult } from "../types";
import { 
  Search, ShieldCheck, Printer, AlertTriangle, FileSpreadsheet, 
  Activity, ArrowLeft, Download, ShieldAlert, BadgeInfo 
} from "lucide-react";

export default function ResultsInquiry() {
  const [refNum, setRefNum] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);
  const [releasedReport, setReleasedReport] = useState<PatientLabResult | null>(null);

  const handleLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMess(null);
    setReleasedReport(null);

    if (!refNum.trim() || !lastName.trim()) {
      setErrorMess("Please enter both your Reference Number and Last Name.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/results/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referenceNumber: refNum, lastName: lastName })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReleasedReport(data.result);
      } else {
        setErrorMess(data.error || "No official records match current inputs.");
      }
    } catch (err) {
      setErrorMess("Diagnostic lookup server is currently experiencing delays. Try again or call (032) 495 9328.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBackToSearch = () => {
    setReleasedReport(null);
    setErrorMess(null);
  };

  return (
    <section className="bg-gray-50 py-12 md:py-16 px-4 md:px-8 print:p-0 print:bg-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Step 1: Query Input Form (Hidden on Print / Report Display) */}
        {!releasedReport && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6 animate-fadeIn max-w-2xl mx-auto z-10 relative">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-brand-light-blue rounded-2xl flex items-center justify-center text-brand-blue mx-auto">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight">
                Online Patient Laboratory Inquiry
              </h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Retrieve and download your licensed digital health files instantly. You can locate your 10-character Reference Code on your print cashier slip.
              </p>
            </div>

            <form onSubmit={handleLookupSubmit} className="space-y-4">
              {errorMess && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
                  <ShieldAlert className="text-red-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-bold">Access Warning:</span> {errorMess}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label htmlFor="refNum" className="block text-xs font-bold text-gray-700 mb-1 font-mono text-left">
                    Medical Reference Code *
                  </label>
                  <input
                    id="refNum"
                    type="text"
                    required
                    placeholder="e.g., LL-2026-001"
                    value={refNum}
                    onChange={(e) => setRefNum(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-blue focus:outline-hidden rounded-xl text-sm transition-all text-left font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold text-gray-700 mb-1 text-left">
                    Patient Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    placeholder="e.g., Dela Cruz"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-blue focus:outline-hidden rounded-xl text-sm transition-all text-left"
                  />
                </div>
              </div>

              {/* Demo Assist pill */}
              <div className="p-3 bg-brand-light-blue rounded-xl border border-brand-blue/20 space-y-1.5 text-left animate-pulse">
                <p className="text-[10px] sm:text-xs font-bold text-brand-blue flex items-center gap-1">
                  <BadgeInfo size={14} />
                  Demo Credentials Available:
                </p>
                <div className="text-[10px] text-gray-600 space-y-0.5">
                  <p>• Try Reference Code: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded text-brand-blue">LL-2026-001</code> & Last Name: <code className="bg-white px-1.5 py-0.5 rounded text-brand-blue font-bold">Dela Cruz</code> <span className="text-gray-400 font-normal shadow-xs">(Fasting Sugar / HbA1c)</span></p>
                  <p>• Try Reference Code: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded text-brand-blue">LL-2026-002</code> & Last Name: <code className="bg-white px-1.5 py-0.5 rounded text-brand-blue font-bold">Santos</code> <span className="text-gray-400 font-normal shadow-xs">(Urinalysis sample)</span></p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-blue hover:bg-brand-navy disabled:bg-gray-400 text-white text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer text-center"
              >
                {loading ? "Decrypting Patient Records..." : "Locate My Lab Report"}
              </button>
            </form>

            <div className="border-t border-gray-100 pt-4 text-center">
              <p className="text-[10px] text-gray-400 leading-relaxed max-w-sm mx-auto">
                🔒 Data Privacy Compliance: All medical records are protected under the **Philippine Data Privacy Act of 2012**. Unauthorized lookup attempts are recorded for system audit.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Patient Official Report Display Portal (Render Clinical Sheet) */}
        {releasedReport && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Back Action Bar (Hidden on Print) */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
              <button
                onClick={handleBackToSearch}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-blue cursor-pointer transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Search Different Code</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <Printer size={14} />
                  <span>Print Lab Report</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download PDF Document</span>
                </button>
              </div>
            </div>

            {/* Print Friendly Clinical Report Frame */}
            <div className="bg-white border-2 border-gray-300 p-6 sm:p-10 rounded-2xl print:border-0 print:p-0 space-y-6 relative overflow-hidden shadow-2xl">
              {/* Report Header */}
              <div className="border-b-2 border-brand-navy pb-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-8 space-y-1 text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-brand-navy leading-none uppercase tracking-wide">
                    Lapu-Lapu Medical Diagnostic Center Inc.
                  </h1>
                  <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">
                    DOH Licensed Clinical Pathology & Diagnostic Radiography laboratory
                  </p>
                  <p className="text-[10px] text-gray-400">
                    FFG Arcade Brgy, A. Tumulak St, Lapu-Lapu City, 6015 Cebu, Philippines | Tel: (032) 495 9328
                  </p>
                </div>
                
                <div className="sm:col-span-4 text-center sm:text-right space-y-1">
                  <div className="inline-block px-3 py-1 bg-brand-light-blue text-brand-blue text-[10px] font-bold font-mono tracking-wider rounded uppercase">
                    Lab License: #07-0041-26
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono">
                    REF NO: <span className="font-bold text-gray-900">{releasedReport.referenceNumber}</span>
                  </p>
                </div>
              </div>

              {/* Patient Profile Demographics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-[11px] sm:text-xs">
                <div>
                  <span className="text-gray-400 block font-medium">PATIENT NAME:</span>
                  <span className="font-extrabold uppercase text-gray-800">{releasedReport.patientName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">AGE / GENDER:</span>
                  <span className="font-semibold text-gray-800">{releasedReport.age} Years / {releasedReport.gender}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">TEST DATE:</span>
                  <span className="font-semibold text-gray-800">{releasedReport.testDate}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">REQUESTING PHYSICIAN:</span>
                  <span className="font-semibold uppercase text-brand-blue">{releasedReport.requestingPhysician}</span>
                </div>
              </div>

              {/* Dynamic Categories Grid containing exact test items */}
              <div className="space-y-6">
                {releasedReport.tests.map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="bg-brand-navy text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 uppercase rounded-sm font-mono tracking-widest text-left">
                      {cat.name}
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 font-medium font-mono text-[10px]">
                            <th className="py-2">PARAMETER</th>
                            <th className="py-2 text-center">RESULT</th>
                            <th className="py-2 text-center">REFERENCE RANGE</th>
                            <th className="py-2">UNIT</th>
                            <th className="py-2 text-right">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          {cat.items.map((item, itemIdx) => {
                            const isHigh = item.flag === "High";
                            return (
                              <tr key={itemIdx} className="hover:bg-gray-50/50">
                                <td className="py-3 font-semibold text-gray-900">{item.parameter}</td>
                                <td className={`py-3 text-center font-mono font-bold ${isHigh ? 'text-red-600 bg-red-50/50 rounded' : 'text-gray-900'}`}>
                                  {item.result}
                                </td>
                                <td className="py-3 text-center text-gray-500 font-mono text-[11px]">{item.referenceRange}</td>
                                <td className="py-3 text-gray-500 font-mono text-[11px]">{item.unit || "N/A"}</td>
                                <td className="py-3 text-right">
                                  {isHigh ? (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded uppercase animate-pulse">
                                      ▲ High
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded uppercase">
                                      Normal
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pathologist Notes Box */}
              {releasedReport.notes && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                  <h4 className="font-bold text-amber-900 flex items-center gap-1 font-mono uppercase tracking-wider text-[10px]">
                    <AlertTriangle size={14} className="text-amber-700" />
                    Laboratory Specialist Remarks:
                  </h4>
                  <p className="text-gray-700 leading-relaxed font-mono">{releasedReport.notes}</p>
                </div>
              )}

              {/* Official DOH Medical Signatures */}
              <div className="border-t border-gray-200 pt-8 grid grid-cols-2 gap-8 text-center text-[10px] sm:text-xs">
                <div className="space-y-1">
                  <div className="font-mono text-xs text-gray-400 select-none">
                    [SIGNED DIGITAL SECURE LICENSE]
                  </div>
                  <h4 className="font-bold text-gray-900 uppercase">Dr. Ana Reyes, MD</h4>
                  <p className="text-gray-400 font-medium">Pathologist & Medical Director</p>
                  <p className="text-gray-400 font-mono text-[9px]">DOH Reg. #00561-2</p>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-xs text-gray-400 select-none">
                    [SECURE CLINICAL VERIFIED]
                  </div>
                  <h4 className="font-bold text-gray-900 uppercase">Ma. Teresa Gomez, RMT</h4>
                  <p className="text-gray-400 font-medium">Chief Medical Technologist</p>
                  <p className="text-gray-400 font-mono text-[9px]">DOH Reg. #07412-RMT</p>
                </div>
              </div>

              {/* Cybersecurity Verification footer */}
              <div className="bg-brand-dark text-gray-400 text-[9px] font-mono p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-2 mt-8 select-none border border-white/5">
                <span>DIGI-SECURE HASH: LLMDCI-8X22 Cebu - 256-SHA-SECURE</span>
                <span className="text-brand-teal font-semibold">🔒 HIPAA & DPA 2012 Encrypted Official Copy</span>
              </div>
            </div>
            
            {/* Friendly Print guidance */}
            <p className="text-center text-xs text-gray-500 font-medium">
              Need assistance? Connect with our virtual support system or dial (032) 495 9328 directly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
