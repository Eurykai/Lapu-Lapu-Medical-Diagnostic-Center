import React, { useState, useEffect } from "react";
import { TEST_PACKAGES } from "../data";
import { AppointmentPayload, ScheduledAppointment } from "../types";
import { 
  Clipboard, Calendar, Clock, Phone, AlertCircle, 
  CheckCircle, History, Sparkles, User, Mail, PlusCircle, Printer 
} from "lucide-react";

interface BookingFormProps {
  selectedTestId: string;
  setSelectedTestId: (id: string) => void;
}

export default function BookingForm({ selectedTestId, setSelectedTestId }: BookingFormProps) {
  const [formData, setFormData] = useState<AppointmentPayload>({
    name: "",
    contact: "",
    email: "",
    testSelection: selectedTestId || "",
    preferredDate: "",
    preferredTime: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);
  const [successApt, setSuccessApt] = useState<ScheduledAppointment | null>(null);
  const [historyApts, setHistoryProps] = useState<ScheduledAppointment[]>([]);

  // Sync prop changes
  useEffect(() => {
    if (selectedTestId) {
      setFormData((prev) => ({ ...prev, testSelection: selectedTestId }));
    }
  }, [selectedTestId]);

  // Fetch historic bookings from the server/localstorage
  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      if (res.ok) {
        const data = await res.json();
        // Sort descending
        data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setHistoryProps(data);
      }
    } catch (e) {
      console.error("Failed to load appointments history", e);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Check preparation details on the fly
  const chosenPackage = TEST_PACKAGES.find(pkg => pkg.id === formData.testSelection);
  const requiresFasting = chosenPackage?.preps.some(p => p.toLowerCase().includes("fasting"));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "testSelection") {
      setSelectedTestId(value);
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMess(null);
    setSuccessApt(null);

    // Basic Validation
    if (!formData.name.trim() || !formData.contact.trim() || !formData.testSelection || !formData.preferredDate || !formData.preferredTime) {
      setErrorMess("Please complete all required fields (*).");
      return;
    }

    // Philippine Contact Number Quick Verification
    const cleanPhone = formData.contact.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMess("Please enter a valid Philippine mobile number (e.g. 09171234567).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessApt(data.appointment);
        // Clear primary fields
        setFormData({
          name: "",
          contact: "",
          email: "",
          testSelection: "",
          preferredDate: "",
          preferredTime: ""
        });
        setSelectedTestId("");
        // Reload list
        fetchAppointments();
      } else {
        setErrorMess(data.error || "An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      setErrorMess("Network connection lost. Failed to lock booking. Please refresh or call (032) 495 9328.");
    } finally {
      setLoading(false);
    }
  };

  const currentLocalDateString = new Date().toISOString().split('T')[0];

  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Booking Form Interface column (Col: 7) */}
        <div className="lg:col-span-7 bg-gray-50/60 p-6 sm:p-8 rounded-3xl border border-gray-100 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-2xl font-extrabold text-brand-dark flex items-start sm:items-center gap-2">
              <PlusCircle className="text-brand-blue shrink-0 mt-0.5 sm:mt-0" size={22} />
              <span>Schedule Diagnostic Screening</span>
            </h2>
            <p className="text-xs text-gray-500">
              Complete this encrypted patient registration form. We will coordinate queue reservations and prepare test tubes preceding your walk-in slot.
            </p>
          </div>

          {successApt && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-fadeIn">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={22} />
                <div className="space-y-1">
                  <h3 className="font-bold text-emerald-900 text-sm sm:text-base">
                    Appointment Scheduled Successfully!
                  </h3>
                  <p className="text-xs text-emerald-800">
                    A confirmation SMS receipt is queued for delivery to <span className="font-semibold">{successApt.contact}</span>.
                  </p>
                </div>
              </div>

              {/* Secure Receipt display */}
              <div className="bg-white border border-emerald-100 rounded-xl p-4 font-mono text-[11px] sm:text-xs text-brand-dark space-y-2 max-w-md shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 bg-emerald-100 text-emerald-800 font-bold uppercase tracking-widest text-[9px]">
                  CONFIRMED
                </div>
                <div className="border-b border-dashed border-gray-200 pb-2 text-center font-bold text-gray-400">
                  LLMDCI RECEIPT SLIP
                </div>
                <div className="flex justify-between">
                  <span>CONTROL CODE:</span>
                  <span className="font-bold text-brand-blue">{successApt.referenceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>PATIENT:</span>
                  <span className="font-semibold uppercase">{successApt.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>TEST MODULE:</span>
                  <span className="font-semibold text-gray-700">{successApt.testSelection}</span>
                </div>
                <div className="flex justify-between">
                  <span>SCHEDULE:</span>
                  <span className="font-semibold">{successApt.preferredDate} @ {successApt.preferredTime}</span>
                </div>
                <div className="border-t border-dashed border-gray-100 pt-2 text-center text-gray-400 text-[10px]">
                  Bring primary DOH identification card & referral forms
                </div>
              </div>
              
              <button
                onClick={() => setSuccessApt(null)}
                className="px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Schedule Another Test
              </button>
            </div>
          )}

          {!successApt && (
            <form onSubmit={handleBookSubmit} className="space-y-5">
              {errorMess && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-medium text-red-700 animate-fadeIn">
                  <AlertCircle size={16} className="text-red-600 shrink-0" />
                  <span>{errorMess}</span>
                </div>
              )}

              {/* Grid 1: Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                    <User size={12} className="text-gray-400" />
                    Full Patient Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-blue focus:outline-hidden rounded-xl text-sm transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                    <Phone size={12} className="text-gray-400" />
                    Mobile Contact Number *
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-blue focus:outline-hidden rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              {/* Email Optional but helpful */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                  <Mail size={12} className="text-gray-400" />
                  Email Address <span className="text-gray-400 font-normal">(Optional, for PDF reports backup)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-blue focus:outline-hidden rounded-xl text-sm transition-all"
                />
              </div>

              {/* Selecting screening module */}
              <div>
                <label htmlFor="testSelection" className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                  <Clipboard size={12} className="text-gray-400" />
                  Select Laboratory Test Module *
                </label>
                <select
                  id="testSelection"
                  name="testSelection"
                  required
                  value={formData.testSelection}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-blue focus:outline-hidden rounded-xl text-sm text-gray-700 transition-all cursor-pointer"
                >
                  <option value="" disabled>--- Tap to choose standard clinic test ---</option>
                  {TEST_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} — ₱{pkg.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic fasting checklist / warnings block */}
              {requiresFasting && chosenPackage && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 animate-slideDown">
                  <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 uppercase tracking-wide">
                    <AlertCircle size={14} className="text-amber-700 animate-pulse" />
                    CRITICAL PREPARATION ALERT: {chosenPackage.name}
                  </h4>
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    This selection demands strict fasting protocols:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-amber-800 font-semibold">
                    {chosenPackage.preps.slice(0, 2).map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-amber-600 font-medium italic">
                    💡 If your fasting exceeds 14 hours, please cancel and schedule on a different morning to avoid cellular decay bias.
                  </p>
                </div>
              )}

              {/* Grid 2: Schedule parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                    <Calendar size={12} className="text-gray-400" />
                    Preferred Appointment Date *
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    required
                    min={currentLocalDateString}
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-blue focus:outline-hidden rounded-xl text-sm transition-all"
                  />
                  <div className="text-[10px] text-gray-400 mt-1">
                    Note: Closed on Sundays.
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                    <Clock size={12} className="text-gray-400" />
                    Preferred Dispatch Time Window *
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-blue focus:outline-hidden rounded-xl text-sm text-gray-700 transition-all cursor-pointer"
                  >
                    <option value="" disabled>--- Select desired window ---</option>
                    <option value="06:00 AM - 08:30 AM">06:00 AM - 08:30 AM (Ideal for Fasting/FBS)</option>
                    <option value="08:30 AM - 10:00 AM">08:30 AM - 10:00 AM (Ideal for OGTT Base)</option>
                    <option value="10:00 AM - 12:00 NN">10:00 AM - 12:00 NN (Ultrasounds Wave 1)</option>
                    <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM (Pre-employment / Drug tests)</option>
                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM (Ultrasounds Wave 2)</option>
                  </select>
                </div>
              </div>

              <div className="bg-brand-light-blue p-4 border border-brand-blue/20 rounded-2xl text-[11px] text-brand-blue flex items-start gap-2">
                <span className="font-bold">✓</span>
                <p className="leading-relaxed">
                  <strong>Walk-in flexibility:</strong> Scheduled patients receive higher lane triage. If you arrive 30 minutes outside your chosen window, your reservation is still fully honored!
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-blue hover:bg-brand-navy disabled:bg-gray-400 text-white text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer text-center relative overflow-hidden"
              >
                {loading ? "Locking Laboratory Queue..." : "Confirm & Book Diagnostic Appointment"}
              </button>
            </form>
          )}
        </div>

        {/* Historic Queue Reservations column (Col: 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-dark text-white p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2 text-brand-teal">
              <History size={18} />
              <span>Your Queue Reservations</span>
            </h3>
            <p className="text-xs text-gray-300">
              Track of scheduled test sequences verified on this client browser.
            </p>

            {historyApts.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs">
                No active bookings recorded in this session.
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {historyApts.map((apt) => (
                  <div key={apt.id} className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-brand-teal font-mono">{apt.referenceCode}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-brand-blue/30 text-brand-teal font-bold rounded-md uppercase">
                        {apt.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-white uppercase truncate">{apt.name}</p>
                      <p className="text-gray-300 font-medium truncate">{apt.testSelection}</p>
                      <p className="text-gray-400 text-[10px]">
                        📅 {apt.preferredDate} | ⏰ {apt.preferredTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick FAQ summary relating to fasting */}
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4">
            <h4 className="font-bold text-brand-dark text-xs sm:text-sm uppercase tracking-wide">
              Quick Appointment Reminders
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-brand-blue font-bold">•</span>
                <p>
                  <strong>What to Bring:</strong> Your physician's request form (if applicable) and one valid Philippine Government ID.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-blue font-bold">•</span>
                <p>
                  <strong>Payment Options:</strong> Cash, G-Cash, and major local credit cards are accepted directly upon arrival.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-blue font-bold">•</span>
                <p>
                  <strong>Urgent Concerns:</strong> If your appointment schedule is on the weekend, please coordinate availability before leaving by dialing <strong>(032) 495 9328</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
