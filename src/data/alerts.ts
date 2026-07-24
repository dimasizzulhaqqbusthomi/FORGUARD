export interface Alert {
  id: string;
  time: string;
  sensorId: string;
  location: string;
  detectionType: "Suara" | "Getaran" | "Suara dan Getaran";
  riskLevel: "Aman" | "Waspada" | "Prioritas" | "Darurat";
  soundIntensity: number; // in dB
  vibrationIntensity: number; // in m/s²
  recommendation: string;
}

export const alerts: Alert[] = [
  {
    id: "ALT-001",
    time: "19 Juli 2026, 13:58",
    sensorId: "FRG-001",
    location: "Katingan Hulu, Kab. Katingan",
    detectionType: "Suara dan Getaran",
    riskLevel: "Darurat",
    soundIntensity: 92,
    vibrationIntensity: 6.8,
    recommendation: "Kirim tim patroli segera",
  },
  {
    id: "ALT-002",
    time: "19 Juli 2026, 13:55",
    sensorId: "FRG-011",
    location: "Kahayan Hulu Utara, Kab. Gunung Mas",
    detectionType: "Suara dan Getaran",
    riskLevel: "Darurat",
    soundIntensity: 96,
    vibrationIntensity: 7.2,
    recommendation: "Kirim tim patroli segera",
  },
  {
    id: "ALT-003",
    time: "19 Juli 2026, 13:52",
    sensorId: "FRG-004",
    location: "Mentaya Hulu, Kab. Kotawaringin Timur",
    detectionType: "Getaran",
    riskLevel: "Prioritas",
    soundIntensity: 55,
    vibrationIntensity: 4.8,
    recommendation: "Kirim tim verifikasi",
  },
  {
    id: "ALT-004",
    time: "19 Juli 2026, 13:50",
    sensorId: "FRG-016",
    location: "Seruyan Hulu, Kab. Seruyan",
    detectionType: "Suara",
    riskLevel: "Prioritas",
    soundIntensity: 78,
    vibrationIntensity: 1.5,
    recommendation: "Kirim tim verifikasi",
  },
  {
    id: "ALT-005",
    time: "19 Juli 2026, 13:48",
    sensorId: "FRG-007",
    location: "Kapuas Tengah, Kab. Kapuas",
    detectionType: "Suara dan Getaran",
    riskLevel: "Prioritas",
    soundIntensity: 84,
    vibrationIntensity: 4.2,
    recommendation: "Kirim tim verifikasi",
  },
  {
    id: "ALT-006",
    time: "19 Juli 2026, 13:42",
    sensorId: "FRG-002",
    location: "Katingan Tengah, Kab. Katingan",
    detectionType: "Suara",
    riskLevel: "Waspada",
    soundIntensity: 68,
    vibrationIntensity: 1.2,
    recommendation: "Pantau ulang titik sensor",
  },
  {
    id: "ALT-007",
    time: "19 Juli 2026, 13:30",
    sensorId: "FRG-009",
    location: "Mantangai, Kab. Kapuas",
    detectionType: "Suara",
    riskLevel: "Waspada",
    soundIntensity: 62,
    vibrationIntensity: 0.8,
    recommendation: "Pantau ulang titik sensor",
  },
  {
    id: "ALT-008",
    time: "19 Juli 2026, 13:22",
    sensorId: "FRG-019",
    location: "Lahei, Kab. Barito Utara",
    detectionType: "Getaran",
    riskLevel: "Waspada",
    soundIntensity: 48,
    vibrationIntensity: 3.2,
    recommendation: "Pantau ulang titik sensor",
  },
  {
    id: "ALT-009",
    time: "19 Juli 2026, 13:15",
    sensorId: "FRG-013",
    location: "Tanah Siang, Kab. Murung Raya",
    detectionType: "Getaran",
    riskLevel: "Waspada",
    soundIntensity: 50,
    vibrationIntensity: 3.1,
    recommendation: "Pantau ulang titik sensor",
  },
];
