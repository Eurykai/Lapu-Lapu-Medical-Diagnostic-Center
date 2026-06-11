import React from "react";

export default function GeographicMap() {
  return (
    <div className="w-full h-[450px] bg-slate-50 border border-gray-250/75 rounded-3xl overflow-hidden shadow-sm relative">
      <iframe
        id="google-maps-embed-iframe"
        title="Google Maps Location for Lapu-Lapu Medical Diagnostic Center Inc."
        src="https://maps.google.com/maps?q=Lapu-Lapu%20Medical%20Diagnostic%20Center%20Inc.,%20B.%20Benedicto%20St,%20Gun-ob,%20Lapu-Lapu%20City,%20Cebu&t=&z=17&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
