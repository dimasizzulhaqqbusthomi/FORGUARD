import React, { useState } from "react";
import { Sensor } from "../data/sensors";
import { Battery, Wifi, AlertTriangle, CheckCircle2, XCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface SensorStatusTableProps {
  sensors: Sensor[];
  onSelectSensor: (sensor: Sensor) => void;
  selectedSensorId?: string;
}

export const SensorStatusTable: React.FC<SensorStatusTableProps> = ({
  sensors,
  onSelectSensor,
  selectedSensorId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter & Search logic
  const filteredSensors = sensors.filter((sensor) => {
    const matchesSearch =
      sensor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.kabupaten.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.kecamatan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "Semua" || sensor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredSensors.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSensors = filteredSensors.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper to render battery color and icon
  const getBatteryIcon = (level: number) => {
    let color = "text-emerald-500";
    if (level < 20) color = "text-rose-500";
    else if (level < 50) color = "text-amber-500";

    return (
      <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-350">
        <Battery className={`w-4 h-4 ${color}`} />
        <span>{level}%</span>
      </div>
    );
  };

  // Helper to render signal color and icon
  const getSignalIcon = (strength: number) => {
    let color = "text-emerald-500";
    if (strength < 30) color = "text-rose-500";
    else if (strength < 70) color = "text-amber-500";

    return (
      <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-350">
        <Wifi className={`w-4 h-4 ${color}`} />
        <span>{strength}%</span>
      </div>
    );
  };

  // Helper to render status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktif":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 px-2 py-0.5 rounded-md text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Aktif
          </span>
        );
      case "Perlu Pemeriksaan":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30 px-2 py-0.5 rounded-md text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            Perlu Pemeriksaan
          </span>
        );
      case "Tidak Aktif":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30 px-2 py-0.5 rounded-md text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5" />
            Tidak Aktif
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Table Header with Search and Filter */}
      <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-base">
            <span className="w-2.5 h-2.5 rounded-full bg-forest-500" />
            Status Perangkat Sensor
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Informasi kesehatan perangkat sensor suara dan getaran di lapangan
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-lg px-2.5 py-1.5 text-xs w-full sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            <input
              type="text"
              placeholder="Cari sensor / lokasi..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent w-full text-slate-700 dark:text-slate-200 focus:outline-none placeholder-slate-400 font-medium"
            />
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <span className="font-medium text-slate-500 mr-1">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Semua">Semua</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Aktif">Aktif</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Perlu Pemeriksaan">Perlu Pemeriksaan</option>
              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 dark:bg-slate-950/20 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-3.5">ID Sensor</th>
              <th className="px-6 py-3.5">Lokasi</th>
              <th className="px-6 py-3.5 text-center">Baterai</th>
              <th className="px-6 py-3.5 text-center">Sinyal</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Terakhir Aktif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {paginatedSensors.length > 0 ? (
              paginatedSensors.map((sensor) => {
                const isSelected = sensor.id === selectedSensorId;
                return (
                  <tr
                    key={sensor.id}
                    onClick={() => onSelectSensor(sensor)}
                    className={`cursor-pointer transition-colors duration-155 ${
                      isSelected
                        ? "bg-forest-50/40 dark:bg-forest-950/10 hover:bg-forest-50/60 dark:hover:bg-forest-950/20"
                        : "hover:bg-slate-50/50 dark:hover:bg-slate-950/10"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-forest-750 dark:text-emerald-400">
                      {sensor.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{sensor.name}</div>
                        <div className="text-xs text-slate-450 dark:text-slate-500 font-medium">
                          {sensor.kecamatan}, {sensor.kabupaten}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center">{getBatteryIcon(sensor.battery)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center">{getSignalIcon(sensor.signal)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(sensor.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400 font-medium">
                      {sensor.lastActive}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                  Tidak ada perangkat sensor yang cocok dengan pencarian / filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-50/30 dark:bg-slate-950/5">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Menampilkan <span className="font-bold text-slate-600 dark:text-slate-350">{startIndex + 1}</span>-
            <span className="font-bold text-slate-600 dark:text-slate-350">
              {Math.min(startIndex + itemsPerPage, filteredSensors.length)}
            </span>{" "}
            dari <span className="font-bold text-slate-600 dark:text-slate-350">{filteredSensors.length}</span> sensor
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
