"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Sensor } from "../data/sensors";
import { RiskBadge } from "./RiskBadge";
import { Volume2, Activity, Wifi, Battery, MapPin } from "lucide-react";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

interface MonitoringMapInnerProps {
  sensors: Sensor[];
  onSelectSensor: (sensor: Sensor) => void;
  selectedSensorId?: string;
  isDarkMode?: boolean;
}

// Sub-component to center map when selected sensor changes
const MapViewCenterController: React.FC<{ coords: [number, number] | null }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 9, { animate: true, duration: 0.8 });
    }
  }, [coords, map]);
  return null;
};

export const MonitoringMapInner: React.FC<MonitoringMapInnerProps> = ({
  sensors,
  onSelectSensor,
  selectedSensorId,
  isDarkMode = false,
}) => {
  // Center of Central Kalimantan
  const defaultCenter: [number, number] = [-1.68, 113.38];
  const defaultZoom = 7.5;

  // Find the selected sensor's coordinates to focus map
  const selectedSensor = sensors.find((s) => s.id === selectedSensorId);
  const activeCoordinates = selectedSensor ? selectedSensor.coordinates : null;

  // Custom marker icon based on risk status
  const createMarkerIcon = (sensor: Sensor) => {
    const isSelected = sensor.id === selectedSensorId;
    let colorClass = "bg-emerald-500 border-emerald-300";
    let ringClass = "bg-emerald-400";
    
    if (sensor.riskLevel === "Tinggi") {
      colorClass = "bg-rose-500 border-rose-300";
      ringClass = "bg-rose-400";
    } else if (sensor.riskLevel === "Sedang") {
      colorClass = "bg-amber-500 border-amber-300";
      ringClass = "bg-amber-400";
    }

    const shadowEffect = isSelected 
      ? "ring-4 ring-emerald-500/30 scale-125 z-[999]" 
      : "hover:scale-115";

    const pulseMarkup = sensor.riskLevel === "Tinggi"
      ? `<span class="absolute inline-flex h-full w-full rounded-full ${ringClass} opacity-75 animate-ping-slow"></span>`
      : "";

    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div class="relative flex items-center justify-center w-7 h-7 transition-all duration-300 ${shadowEffect}">
          ${pulseMarkup}
          <div class="relative w-4 h-4 rounded-full ${colorClass} border-2 border-white shadow-lg flex items-center justify-center">
            <span class="w-1.5 h-1.5 rounded-full bg-white opacity-40"></span>
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  };

  return (
    <div className="w-full h-full relative min-h-[350px] md:min-h-[450px]">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="w-full h-full"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* CartoDB Map Tiles (Voyager for light, Dark Matter for dark mode) */}
        <TileLayer
          key={isDarkMode ? "dark-tiles" : "light-tiles"}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={
            isDarkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          }
        />

        {/* Center tracker */}
        <MapViewCenterController coords={activeCoordinates} />

        {/* Render markers for each sensor */}
        {sensors.map((sensor) => (
          <Marker
            key={sensor.id}
            position={sensor.coordinates}
            icon={createMarkerIcon(sensor)}
            eventHandlers={{
              click: () => onSelectSensor(sensor),
            }}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-1 space-y-3 min-w-[220px]">
                {/* ID & Status */}
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">
                    {sensor.id}
                  </span>
                  <RiskBadge risk={sensor.riskLevel} />
                </div>

                {/* Name & Regency */}
                <div className="space-y-0.5">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-600 dark:text-emerald-400 shrink-0" />
                    {sensor.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {sensor.kecamatan}, {sensor.kabupaten}
                  </p>
                </div>

                {/* Telemetry data */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <Battery className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="font-semibold">{sensor.battery}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <Wifi className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="font-semibold">{sensor.signal}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 col-span-2 border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Deteksi Terakhir:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 truncate">{sensor.detectionType}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectSensor(sensor)}
                  className="w-full text-center bg-forest-600 hover:bg-forest-750 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Detail Pemantauan
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

  export default MonitoringMapInner;
