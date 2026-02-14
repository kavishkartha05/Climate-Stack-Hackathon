import { useState, useCallback } from 'react';
import type { ModelPrediction, ScanResult, WeatherBadgeData } from '../types';
import { DISEASE_DB, getFallbackEntry } from '../data/diseases';

// ─────────────────────────────────────────────────────
//  CONFIG: point this at your inference API when ready
//  POST body:  { image: string }  (base64-encoded)
//  Expected:   { label: string, confidence: number }
// ─────────────────────────────────────────────────────
const MODEL_ENDPOINT: string | null = null;

// Davis, CA fallback coordinates
const DEFAULT_LAT = 38.5449;
const DEFAULT_LON = -121.7405;

async function callModel(imageDataUrl: string): Promise<ModelPrediction> {
  if (MODEL_ENDPOINT) {
    const base64 = imageDataUrl.split(',')[1];
    const res = await fetch(MODEL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64 }),
    });
    if (!res.ok) throw new Error(`Model API error: ${res.status}`);
    return res.json();
  }

  // Mock response for development
  await new Promise((r) => setTimeout(r, 1800));
  const classes = Object.keys(DISEASE_DB).filter((k) => k !== 'Healthy');
  const label = classes[Math.floor(Math.random() * classes.length)]!;
  const confidence = 0.72 + Math.random() * 0.25;
  return { label, confidence };
}

async function getUserCoords(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve({ lat: DEFAULT_LAT, lon: DEFAULT_LON }),
      { timeout: 3000 },
    );
  });
}

async function fetchWeatherRisk(
  riskFactor: 'humidity' | 'rain' | null,
): Promise<WeatherBadgeData | undefined> {
  if (!riskFactor) return undefined;

  try {
    const { lat, lon } = await getUserCoords();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=relative_humidity_2m,precipitation,temperature_2m&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();
    const humidity: number = data.current.relative_humidity_2m;
    const precipitation: number = data.current.precipitation;

    if (riskFactor === 'humidity') {
      if (humidity > 80)
        return { level: 'high', icon: '⚠️', text: `${humidity}% humidity — ideal conditions for fungal spread. Act promptly.` };
      if (humidity > 60)
        return { level: 'mid', icon: '🌫️', text: `${humidity}% humidity — moderate spread risk. Monitor closely.` };
      return { level: 'low', icon: '✓', text: `${humidity}% humidity — unfavorable for rapid spread.` };
    }

    if (riskFactor === 'rain') {
      if (precipitation > 2)
        return { level: 'high', icon: '⚠️', text: `${precipitation}mm rain today — wet conditions accelerate spore release.` };
      if (precipitation > 0)
        return { level: 'mid', icon: '🌧️', text: `${precipitation}mm rain today — some splash spread risk present.` };
      return { level: 'low', icon: '☀️', text: 'No precipitation today — spread risk currently low.' };
    }
  } catch {
    return undefined;
  }
}

export function useAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (imageDataUrl: string) => {
    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const prediction = await callModel(imageDataUrl);
      const info = DISEASE_DB[prediction.label] ?? getFallbackEntry(prediction.label);
      const weatherRisk = await fetchWeatherRisk(info.weatherRiskFactor);

      setResult({
        id: crypto.randomUUID(),
        label: prediction.label,
        confidence: prediction.confidence,
        info,
        imageDataUrl,
        timestamp: Date.now(),
        weatherRisk,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { analyze, isAnalyzing, result, error, reset };
}
