import React from "react";

export default function GeographicMap() {
  return (
    <div className="w-full h-[450px] bg-slate-50 border border-gray-250/75 rounded-3xl overflow-hidden shadow-sm relative">
      <iframe
        id="google-maps-embed-iframe"
        title="Google Maps Location for FFG Arcade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.4371991483844!2d123.953580575916!3d10.306859367735391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9994c637ca25b%3A0xc07c4c153b934cd1!2sLapu-Lapu%20Medical%20Diagnostic%20Center%20Inc.!5e0!3m2!1sen!2sph!4v1718000000000!5m2!1sen!2sph"
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
