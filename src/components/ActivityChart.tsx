"use client";

import React, { useEffect, useState } from "react";
import { chartData } from "../data/chartData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const ActivityChart: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-sm h-[320px] flex items-center justify-center">
        <span className="text-sm font-semibold text-slate-400 animate-pulse-slow">Memuat Grafik Aktivitas...</span>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-xs">
          <p className="font-bold mb-1">{payload[0].payload.hari}</p>
          <p className="font-medium text-emerald-400">
            {payload[0].value} Peringatan
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-sm p-6 flex flex-col h-full">
      <div>
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-base">
          <span className="w-2.5 h-2.5 rounded-full bg-forest-500" />
          Grafik Aktivitas Mingguan
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Jumlah peringatan yang tercatat selama 7 hari terakhir
        </p>
      </div>

      <div className="w-full flex-1 min-h-[220px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAlert" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#047857" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis
              dataKey="hari"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(16, 185, 129, 0.04)" }} />
            <Bar
              dataKey="peringatan"
              fill="url(#colorAlert)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
