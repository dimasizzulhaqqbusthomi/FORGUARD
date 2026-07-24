"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Sensor } from "../data/sensors";

interface MonitoringMapProps {
  sensors: Sensor[];
  onSelectSensor: (sensor: Sensor) => void;
  selectedSensorId?: string;
  isDarkMode?: boolean;
}

export const MonitoringMap = dynamic<MonitoringMapProps>(
  () => import("./MonitoringMapInner").then((mod) => mod.MonitoringMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="bg-slate-100 dark:bg-slate-950/20 rounded-xl w-full h-full min-h-[350px] md:min-h-[450px] flex items-center justify-center border border-slate-200/60 dark:border-slate-800/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-forest-600 border-t-transparent animate-spin" />
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse-slow">
            Memuat Peta Pemantauan...
          </span>
        </div>
      </div>
    ),
  }
);
