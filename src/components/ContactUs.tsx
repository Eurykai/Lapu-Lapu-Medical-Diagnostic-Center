import React, { useState } from "react";
import GeographicMap from "./GeographicMap";
import { 
  Phone, MapPin, Clock, Mail, Send, CheckCircle, 
  AlertCircle, Facebook
} from "lucide-react";

export default function ContactUs() {
  const [inquiryData, setInquiryData] = useState({
    name: "",
    contact: "",
    subject: "General Inquiry",
    message: ""
  });

  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const emailSubject = encodeURIComponent(`[LLMDCI Inquiry] ${inquiryData.subject}`);
    const emailBody = encodeURIComponent(
      `Mabuhay LLMDCI Cebu,\n\n` +
      `Name: ${inquiryData.name}\n` +
      `Contact Number: ${inquiryData.contact}\n` +
      `Subject: ${inquiryData.subject}\n\n` +
      `Inquiry Details:\n${inquiryData.message}\n\n` +
      `Sent via LLMDCI Diagnostics Portal`
    );

    const mailtoUrl = `mailto:llmdci07@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-8 space-y-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Contact Information Cards & Map embed (Col: 7) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3 text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight">
              Connect With LLMDCI Cebu
            </h2>
            <p className="text-sm text-gray-500">
              Need driving directions or checking vaccine/drug-testing availability? Walk in directly at our clinic, or get in touch below.
            </p>
          </div>

          {/* Custom Geographic Map Section */}
          <GeographicMap />
        </div>

        {/* Right Side: Fast-acting Contact Form (Col: 5) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm grow">
          <h3 className="font-extrabold text-brand-dark text-xl mb-2">Send an Instant Message</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 font-semibold">
            Connecting our administrative desk for corporate tie-ups or HMO alignments. All patient bookings should ideally leverage the Book a Test tab!
          </p>

           {formSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-4 animate-fadeIn">
              <CheckCircle className="text-emerald-500 shrink-0 mx-auto" size={40} />
              <div className="space-y-1">
                <h4 className="font-bold text-emerald-950 text-sm sm:text-base">Inquiry Prepared!</h4>
                <p className="text-xs text-emerald-700 leading-relaxed font-semibold">
                  A pre-formatted email draft has been opened to send directly to <span className="font-extrabold text-emerald-900 underline">llmdci07@gmail.com</span>. 
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Please review and click "Send" in your email client to dispatch your details to our administrative desk. Our receptionist will revert back shortly!
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button 
                  onClick={() => {
                    setFormSuccess(false);
                    setInquiryData({
                      name: "",
                      contact: "",
                      subject: "General Inquiry",
                      message: ""
                    });
                  }}
                  className="px-4 py-2 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-colors cursor-pointer w-full text-center"
                >
                  Compose Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-5 text-left">
              <div>
                <label htmlFor="form-name" className="block text-sm font-bold text-gray-700 mb-1.5">Your Full Name *</label>
                <input
                  id="form-name"
                  type="text"
                  required
                  name="name"
                  value={inquiryData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-800 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="form-contact" className="block text-sm font-bold text-gray-700 mb-1.5">Contact Number *</label>
                <input
                  id="form-contact"
                  type="tel"
                  required
                  name="contact"
                  value={inquiryData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-800 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="form-subject" className="block text-sm font-bold text-gray-700 mb-1.5">Subject Matter *</label>
                <select
                  id="form-subject"
                  name="subject"
                  value={inquiryData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-800 rounded-xl text-sm text-gray-700 font-semibold cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Corporate Clearance Package">Corporate/Employment Packages</option>
                  <option value="OB-GYN / Baby Ultrasound availability">HMO Medical Alignments</option>
                  <option value="Billing Details Support">Feedback and Assistance</option>
                </select>
              </div>

              <div>
                <label htmlFor="form-message" className="block text-sm font-bold text-gray-700 mb-1.5">Inquiry details *</label>
                <textarea
                  id="form-message"
                  name="message"
                  rows={4}
                  required
                  value={inquiryData.message}
                  onChange={handleInputChange}
                  placeholder="Write details of your medical inquiries here..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-800 rounded-xl text-sm font-semibold text-gray-900"
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-8 py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white text-sm font-bold rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all min-w-[185px]"
                >
                  <span>{formLoading ? "Sending..." : "Submit Inquiry"}</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
