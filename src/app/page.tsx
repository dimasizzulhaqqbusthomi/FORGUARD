"use client";

import React, { useState, useEffect } from "react";
import { HeaderDashboard } from "../components/HeaderDashboard";
import { StatCard } from "../components/StatCard";
import { MonitoringMap } from "../components/MonitoringMap";
import { LatestAlertCard } from "../components/LatestAlertCard";
import { AlertHistoryTable } from "../components/AlertHistoryTable";
import { ActivityChart } from "../components/ActivityChart";
import { RiskCriteriaLegend } from "../components/RiskCriteriaLegend";
import { SensorStatusTable } from "../components/SensorStatusTable";
import { sensors, Sensor } from "../data/sensors";
import { alerts, Alert } from "../data/alerts";
import { Radio, AlertTriangle, ShieldCheck, AreaChart, Sun, Moon } from "lucide-react";

export default function Home() {
  const [selectedSensorId, setSelectedSensorId] = useState<string>("FRG-001");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize theme from localStorage or system preference on client mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("forguard-theme");
    if (savedTheme !== null) {
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Sync theme changes with html class & localStorage
  const toggleDarkMode = () => {
    const nextState = !isDarkMode;
    setIsDarkMode(nextState);
    if (nextState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("forguard-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("forguard-theme", "light");
    }
  };

  // Find currently selected sensor data
  const selectedSensor =
    sensors.find((s) => s.id === selectedSensorId) || sensors[0];

  // Construct standard alert info from selected sensor
  const activeAlertDetail = {
    sensorId: selectedSensor.id,
    location: `${selectedSensor.kecamatan}, ${selectedSensor.kabupaten}`,
    time: selectedSensor.lastAlertTime !== "-" ? selectedSensor.lastAlertTime || "" : selectedSensor.lastActive,
    riskLevel: selectedSensor.riskLevel,
    detectionType: selectedSensor.detectionType !== "-" ? selectedSensor.detectionType : "Suara dan Getaran",
    soundIntensity: selectedSensor.soundIntensity || 35,
    vibrationIntensity: selectedSensor.vibrationIntensity || 0.1,
    recommendation: selectedSensor.recommendation || "Pemantauan rutin",
  };

  const handleSelectSensor = (sensor: Sensor) => {
    setSelectedSensorId(sensor.id);
    // Scroll smoothly to detail card on mobile
    if (window.innerWidth < 768) {
      document.getElementById("detail-card-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectAlert = (alert: Alert) => {
    setSelectedSensorId(alert.sensorId);
    if (window.innerWidth < 768) {
      document.getElementById("detail-card-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate dynamic stats
  const totalSensors = sensors.length;
  const activeSensors = sensors.filter((s) => s.status === "Aktif").length;
  const priorityAreasCount = Array.from(
    new Set(
      sensors
        .filter((s) => s.riskLevel === "Tinggi")
        .map((s) => s.kabupaten)
    )
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080d0b] transition-colors duration-300">
      {/* Top Navbar Utilities */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-semibold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors cursor-pointer"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Mode Terang
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-500" />
              Mode Gelap
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 space-y-6 md:space-y-8 pb-16">
        {/* Header Section */}
        <HeaderDashboard />

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Total Sensor"
            value={totalSensors}
            icon={<Radio className="w-5.5 h-5.5" />}
            description={`${activeSensors} sensor beroperasi online`}
          />
          <StatCard
            title="Peringatan Hari Ini"
            value={7}
            icon={<AlertTriangle className="w-5.5 h-5.5" />}
            description="Tingkat aktivitas di atas ambang batas"
            trend={{ value: "+2 kasus", isPositive: false }}
          />
          <StatCard
            title="Kabupaten Berisiko Tinggi"
            value={5}
            icon={<AreaChart className="w-5.5 h-5.5" />}
            description={`Dari total ${priorityAreasCount} wilayah berisiko tinggi`}
          />
          <StatCard
            title="Status Sistem"
            value="Aktif"
            icon={<ShieldCheck className="w-5.5 h-5.5" />}
            description="Semua subsistem berjalan normal"
            highlight={true}
          />
        </div>

        {/* Map and Active Alert Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Map Area */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm p-4 md:p-6 flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-500" />
                Peta Pemantauan Real-Time
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Sebaran sensor deteksi dini di wilayah Kalimantan Tengah. Klik marker untuk melihat info detail.
              </p>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-850">
              <MonitoringMap
                sensors={sensors}
                onSelectSensor={handleSelectSensor}
                selectedSensorId={selectedSensorId}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          {/* Selected Alert Details */}
          <div id="detail-card-section" className="lg:col-span-4">
            <LatestAlertCard
              alert={activeAlertDetail}
              title={
                selectedSensor.riskLevel === "Rendah"
                  ? "Detail Kondisi Sensor"
                  : "Detail Peringatan Sensor"
              }
            />
          </div>
        </div>

        {/* Warning Logs and Weekly Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Alert History Table */}
          <div className="lg:col-span-7">
            <AlertHistoryTable
              alerts={alerts}
              onSelectAlert={handleSelectAlert}
              selectedAlertId={
                alerts.find((a) => a.sensorId === selectedSensorId)?.id
              }
            />
          </div>

          {/* Chart */}
          <div className="lg:col-span-5">
            <ActivityChart />
          </div>
        </div>

        {/* All Sensors Telemetry Status */}
        <div className="w-full">
          <SensorStatusTable
            sensors={sensors}
            onSelectSensor={handleSelectSensor}
            selectedSensorId={selectedSensorId}
          />
        </div>
      </div>
    </div>
  );
}
