import React from "react";
import { RiskBadge } from "./RiskBadge";
import { Info, Volume2, Activity, Zap } from "lucide-react";

export const RiskCriteriaLegend: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-sm p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white text-base">
            Kriteria Status Risiko (Fusi Sensor)
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Logika fusi data sensor suara akustik dan getaran untuk menentukan tingkat ancaman penebangan ilegal
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rendah */}
        <div className="p-4 rounded-lg bg-slate-50/70 dark:bg-slate-950/30 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <RiskBadge risk="Rendah" />
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <Activity className="w-3.5 h-3.5" />
              Sensor Tunggal
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
            Muncul jika <span className="font-bold text-slate-700 dark:text-slate-200">hanya salah satu sensor</span> mendeteksi aktivitas mencurigakan.
          </p>
        </div>

        {/* Sedang */}
        <div className="p-4 rounded-lg bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 space-y-2">
          <div className="flex items-center justify-between">
            <RiskBadge risk="Sedang" />
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              <Volume2 className="w-3.5 h-3.5" />
              Akustik Berulang
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
            Muncul ketika <span className="font-bold text-slate-700 dark:text-slate-200">sensor akustik mendeteksi suara mencurigakan berulang</span>, tetapi belum disertai getaran tidak normal.
          </p>
        </div>

        {/* Tinggi */}
        <div className="p-4 rounded-lg bg-rose-50/30 dark:bg-rose-950/10 border border-rose-200/50 dark:border-rose-900/30 space-y-2">
          <div className="flex items-center justify-between">
            <RiskBadge risk="Tinggi" />
            <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
              <Zap className="w-3.5 h-3.5" />
              Fusi Ganda
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
            Muncul jika <span className="font-bold text-slate-700 dark:text-slate-200">suara mencurigakan dan getaran tidak normal</span> terdeteksi dalam waktu berdekatan.
          </p>
        </div>
      </div>
    </div>
  );
};
