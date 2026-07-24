import React from "react";
import { MapPin, Clock, Volume2, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import { RiskBadge } from "./RiskBadge";

interface LatestAlertCardProps {
  alert: {
    location: string;
    time: string;
    riskLevel: string;
    detectionType: string;
    soundIntensity?: number; // dB
    vibrationIntensity?: number; // m/s²
    recommendation: string;
    sensorId?: string;
  };
  title?: string;
}

export const LatestAlertCard: React.FC<LatestAlertCardProps> = ({
  alert,
  title = "Peringatan Terbaru",
}) => {
  const {
    location,
    time,
    riskLevel,
    detectionType,
    soundIntensity = 0,
    vibrationIntensity = 0,
    recommendation,
    sensorId,
  } = alert;

  // Helper to determine intensity colors
  const getSoundColor = (db: number) => {
    if (db >= 85) return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    if (db >= 65) return "text-orange-500 bg-orange-500/10 border-orange-500/20";
    if (db >= 50) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
  };

  const getVibrationColor = (val: number) => {
    if (val >= 5.0) return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    if (val >= 3.0) return "text-orange-500 bg-orange-500/10 border-orange-500/20";
    if (val >= 1.0) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
  };

  // Recommendations styling based on risk level
  const getRecommendationStyles = (level: string) => {
    switch (level) {
      case "Tinggi":
        return {
          bg: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30 text-rose-800 dark:text-rose-300",
          icon: <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />,
        };
      case "Sedang":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-300",
          icon: <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
        };
      case "Rendah":
      default:
        return {
          bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
        };
    }
  };

  const getRiskExplanation = (level: string) => {
    switch (level) {
      case "Tinggi":
        return "Suara mencurigakan dan getaran tidak normal terdeteksi dalam waktu berdekatan.";
      case "Sedang":
        return "Sensor akustik mendeteksi suara mencurigakan berulang, tetapi belum disertai getaran tidak normal.";
      case "Rendah":
      default:
        return "Hanya salah satu sensor mendeteksi aktivitas mencurigakan.";
    }
  };

  const recStyles = getRecommendationStyles(riskLevel);

  // sound percentage for simple indicator progress bar (max 120 dB)
  const soundPercent = Math.min(100, Math.max(0, (soundIntensity / 120) * 100));
  // vibration percentage (max 10 m/s²)
  const vibPercent = Math.min(100, Math.max(0, (vibrationIntensity / 10) * 100));

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      {/* Card Header */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-base">
          <span className="w-2.5 h-2.5 rounded-full bg-forest-500 dark:bg-emerald-400" />
          {title}
        </h3>
        {sensorId && (
          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800/50">
            {sensorId}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          {/* Risk and Detection type */}
          <div className="flex items-center justify-between gap-4">
            <RiskBadge risk={riskLevel} />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Deteksi: <span className="font-bold text-slate-700 dark:text-slate-200">{detectionType}</span>
            </span>
          </div>

          {/* Location and Time info */}
          <div className="space-y-2.5 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-lg border border-slate-100 dark:border-slate-800/40">
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-350">
              <MapPin className="w-4 h-4 text-forest-600 dark:text-emerald-400 shrink-0" />
              <span className="text-sm font-semibold truncate">{location}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs font-medium">{time}</span>
            </div>
          </div>

          {/* Indicators for sound and vibration */}
          <div className="grid grid-cols-2 gap-4">
            {/* Sound intensity */}
            <div className="space-y-2 border border-slate-100 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-900/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  Suara
                </span>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${getSoundColor(soundIntensity)}`}>
                  {soundIntensity} dB
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    soundIntensity >= 85
                      ? "bg-rose-500"
                      : soundIntensity >= 65
                      ? "bg-orange-500"
                      : soundIntensity >= 50
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${soundPercent}%` }}
                />
              </div>
            </div>

            {/* Vibration intensity */}
            <div className="space-y-2 border border-slate-100 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-900/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  Getaran
                </span>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${getVibrationColor(vibrationIntensity)}`}>
                  {vibrationIntensity} m/s²
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    vibrationIntensity >= 5.0
                      ? "bg-rose-500"
                      : vibrationIntensity >= 3.0
                      ? "bg-orange-500"
                      : vibrationIntensity >= 1.0
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${vibPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Risk Explanation Box */}
          <div className="bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-lg p-3 text-xs space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">
              Analisis Fusi Sensor ({riskLevel}):
            </span>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {getRiskExplanation(riskLevel)}
            </p>
          </div>
        </div>

        {/* Action Recommendation */}
        <div className={`border p-4 rounded-lg flex gap-3 ${recStyles.bg}`}>
          {recStyles.icon}
          <div className="space-y-0.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wide">Rekomendasi Tindakan:</h4>
            <p className="text-sm font-semibold">{recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
