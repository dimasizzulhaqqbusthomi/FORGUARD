import React from "react";

type RiskLevel = "Aman" | "Waspada" | "Prioritas" | "Darurat";

interface RiskBadgeProps {
  risk: RiskLevel | string;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ risk, className = "" }) => {
  const getRiskStyles = (level: string) => {
    switch (level) {
      case "Aman":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
          dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
          label: "Aman",
        };
      case "Waspada":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
          dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
          label: "Waspada",
        };
      case "Prioritas":
        return {
          bg: "bg-orange-50 text-orange-700 border-orange-200/60 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30",
          dot: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]",
          label: "Prioritas",
        };
      case "Darurat":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
          dot: "bg-rose-500 animate-ping-slow shadow-[0_0_12px_rgba(244,63,94,0.8)]",
          label: "Darurat",
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-200/60 dark:bg-slate-950/20 dark:text-slate-400 dark:border-slate-900/30",
          dot: "bg-slate-400",
          label: level,
        };
    }
  };

  const styles = getRiskStyles(risk);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${styles.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {styles.label}
    </span>
  );
};
