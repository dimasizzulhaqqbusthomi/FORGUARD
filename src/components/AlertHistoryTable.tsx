import React, { useState } from "react";
import { Alert } from "../data/alerts";
import { RiskBadge } from "./RiskBadge";
import { Filter, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface AlertHistoryTableProps {
  alerts: Alert[];
  onSelectAlert: (alert: Alert) => void;
  selectedAlertId?: string;
}

export const AlertHistoryTable: React.FC<AlertHistoryTableProps> = ({
  alerts,
  onSelectAlert,
  selectedAlertId,
}) => {
  const [filterRisk, setFilterRisk] = useState<string>("Semua");
  const [filterType, setFilterType] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filter logic
  const filteredAlerts = alerts.filter((alert) => {
    const matchRisk = filterRisk === "Semua" || alert.riskLevel === filterRisk;
    const matchType = filterType === "Semua" || alert.detectionType === filterType;
    return matchRisk && matchType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlerts = filteredAlerts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Table Header and Filters */}
      <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-base">
            <span className="w-2.5 h-2.5 rounded-full bg-forest-500" />
            Riwayat Peringatan
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Daftar aktivitas mencurigakan yang terdeteksi oleh jaringan sensor
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500 mr-1.5">Risiko:</span>
            <select
              value={filterRisk}
              onChange={(e) => {
                setFilterRisk(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Semua">Semua</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Aman">Aman</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Waspada">Waspada</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Prioritas">Prioritas</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Darurat">Darurat</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500 mr-1.5">Deteksi:</span>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Semua">Semua</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Suara">Suara</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Getaran">Getaran</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Suara dan Getaran">Suara & Getaran</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 dark:bg-slate-950/20 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-3.5">Waktu</th>
              <th className="px-6 py-3.5">Lokasi</th>
              <th className="px-6 py-3.5">Jenis Deteksi</th>
              <th className="px-6 py-3.5">Status Risiko</th>
              <th className="px-6 py-3.5">Rekomendasi Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {paginatedAlerts.length > 0 ? (
              paginatedAlerts.map((alert) => {
                const isSelected = alert.id === selectedAlertId;
                return (
                  <tr
                    key={alert.id}
                    onClick={() => onSelectAlert(alert)}
                    className={`cursor-pointer transition-colors duration-150 ${
                      isSelected
                        ? "bg-forest-50/40 dark:bg-forest-950/10 hover:bg-forest-50/60 dark:hover:bg-forest-950/20"
                        : "hover:bg-slate-50/50 dark:hover:bg-slate-950/10"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {alert.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-forest-500 dark:text-emerald-400 shrink-0" />
                        {alert.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-600 dark:text-slate-350">
                        {alert.detectionType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RiskBadge risk={alert.riskLevel} />
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-semibold max-w-xs truncate">
                      {alert.recommendation}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                  Tidak ada riwayat peringatan yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-50/30 dark:bg-slate-950/5">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Menampilkan <span className="font-bold text-slate-600 dark:text-slate-350">{startIndex + 1}</span>-
            <span className="font-bold text-slate-600 dark:text-slate-350">
              {Math.min(startIndex + itemsPerPage, filteredAlerts.length)}
            </span>{" "}
            dari <span className="font-bold text-slate-600 dark:text-slate-350">{filteredAlerts.length}</span> data
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-350 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold px-2 text-slate-600 dark:text-slate-350">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-350 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
