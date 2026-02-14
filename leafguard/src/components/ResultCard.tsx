import type { ScanResult } from '../types';

interface Props {
  result: ScanResult;
  onSave: () => void;
  isSaved: boolean;
}

const SEVERITY_COLOR: Record<string, string> = {
  none: 'var(--green-mid)',
  low: 'var(--green-mid)',
  moderate: 'var(--amber)',
  high: 'var(--red)',
};

const WEATHER_CLASS: Record<string, string> = {
  low: 'weather-low',
  mid: 'weather-mid',
  high: 'weather-high',
};

const CONF_CLASS = (conf: number) =>
  conf >= 0.8 ? 'conf-high' : conf >= 0.6 ? 'conf-mid' : 'conf-low';

export function ResultCard({ result, onSave, isSaved }: Props) {
  const { label, confidence, info, weatherRisk } = result;
  const pct = Math.round(confidence * 100);

  return (
    <div className="result-card" role="region" aria-label="Diagnosis result">
      {/* Header */}
      <div className="result-header">
        <div>
          <p className="result-plant">{info.plant.toUpperCase()}</p>
          <h2 className="result-disease">{label}</h2>
        </div>
        <span className={`conf-pill ${CONF_CLASS(confidence)}`}>{pct}%</span>
      </div>

      {/* Weather badge */}
      {weatherRisk && (
        <div className={`weather-badge ${WEATHER_CLASS[weatherRisk.level]}`}>
          <span>{weatherRisk.icon}</span>
          <span>{weatherRisk.text}</span>
        </div>
      )}

      {/* Severity */}
      <div className="result-section">
        <p className="section-label">Spread Risk</p>
        <p className="section-text">{info.severityLabel}</p>
        <div className="severity-track">
          <div
            className="severity-fill"
            style={{
              width: `${info.severity}%`,
              background: SEVERITY_COLOR[info.severityLevel] ?? 'var(--amber)',
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="result-section bordered">
        <p className="section-label">What's Happening</p>
        <p className="section-text">{info.description}</p>
      </div>

      {/* Treatments */}
      <div className="result-section bordered">
        <p className="section-label">Recommended Actions</p>
        <ul className="treatment-list">
          {info.treatments.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      {/* Save button */}
      <button className="save-btn" onClick={onSave} disabled={isSaved}>
        {isSaved ? '✓ Saved to field log' : '+ Save to field log'}
      </button>
    </div>
  );
}
