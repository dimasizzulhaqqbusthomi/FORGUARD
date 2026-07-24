"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Calendar, Clock } from "lucide-react";

export const HeaderDashboard: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Set initial time
    const formatTime = () => {
      const now = new Date();
      return now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    };
    setTime(formatTime());

    // Update every second
    const timer = setInterval(() => {
      setTime(formatTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("id-ID", options);
  };

  return (
    <header className="relative w-full bg-gradient-to-r from-emerald-900 via-forest-800 to-teal-950 text-white rounded-2xl shadow-xl overflow-hidden border border-emerald-800/40 p-6 md:p-8">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          {/* Header Title & Status */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-teal-100">
              FORGUARD
            </h1>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-semibold rounded-full shadow-inner backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Sistem Aktif
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold mt-2 text-emerald-50/95">
            Dashboard Pemantauan Hutan
          </h2>
          <p className="text-sm md:text-base text-emerald-200/90 font-medium mt-1 max-w-3xl leading-relaxed">
            Sistem Deteksi Dini Penebangan Ilegal Berbasis Sensor Akustik dan Getaran
          </p>
        </div>

        {/* Date and Time Panel */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-black/25 border border-white/5 rounded-xl px-4 py-3 backdrop-blur-md self-start md:self-center">
          <div className="flex items-center gap-2 text-emerald-200">
            <Calendar className="w-4.5 h-4.5 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
              {getFormattedDate()}
            </span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/10" />
          <div className="flex items-center gap-2 text-emerald-200">
            <Clock className="w-4.5 h-4.5 text-emerald-400" />
            <span className="text-xs font-semibold font-mono tracking-wider w-[72px]">
              {time || "--:--:--"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
