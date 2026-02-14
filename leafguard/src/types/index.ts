export type SeverityLevel = 'low' | 'moderate' | 'high' | 'none';
export type WeatherRiskFactor = 'humidity' | 'rain' | null;
export type WeatherRiskLevel = 'low' | 'mid' | 'high';

export interface DiseaseInfo {
  plant: string;
  severity: number; // 0–100
  severityLabel: string;
  severityLevel: SeverityLevel;
  description: string;
  treatments: string[];
  weatherRiskFactor: WeatherRiskFactor;
}

export interface ModelPrediction {
  label: string;
  confidence: number; // 0–1
}

export interface ScanResult {
  id: string;
  label: string;
  confidence: number;
  info: DiseaseInfo;
  imageDataUrl: string;
  timestamp: number;
  weatherRisk?: WeatherBadgeData;
}

export interface WeatherBadgeData {
  level: WeatherRiskLevel;
  icon: string;
  text: string;
}
