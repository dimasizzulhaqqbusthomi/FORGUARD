import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  highlight = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
        highlight
          ? "bg-gradient-to-br from-forest-800 to-emerald-950 text-white border-forest-700/50 shadow-emerald-900/10"
          : "bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white shadow-sm"
      }`}
    >
      {/* Background design elements */}
      <div
        className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 blur-xl ${
          highlight ? "bg-white" : "bg-emerald-500"
        }`}
      />

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              highlight ? "text-emerald-200/90" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight">{value}</span>
            {trend && (
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                  trend.isPositive
                    ? highlight
                      ? "bg-emerald-400/25 text-emerald-200"
                      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : highlight
                    ? "bg-rose-400/25 text-rose-200"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                }`}
              >
                {trend.value}
              </span>
            )}
          </div>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg border backdrop-blur-sm ${
            highlight
              ? "bg-white/10 border-white/20 text-white"
              : "bg-forest-50/50 dark:bg-forest-950/20 border-forest-100/50 dark:border-forest-900/20 text-forest-600 dark:text-emerald-400"
          }`}
        >
          {icon}
        </div>
      </div>

      {description && (
        <p
          className={`mt-4 text-xs font-medium ${
            highlight ? "text-emerald-200/80" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
