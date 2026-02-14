import type { ScanResult } from '../types';

interface Props {
  log: ScanResult[];
  onDelete: (id: string) => void;
}

const CONF_CLASS = (conf: number) =>
  conf >= 0.8 ? 'conf-high' : conf >= 0.6 ? 'conf-mid' : 'conf-low';

function formatDate(ts: number) {
  const d = new Date(ts);
  return {
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
}

export function FieldLog({ log, onDelete }: Props) {
  if (log.length === 0) {
    return (
      <div className="log-empty">
        <span className="log-empty-icon">📋</span>
        <p>No scans saved yet.<br />Run an analysis and save it here.</p>
      </div>
    );
  }

  return (
    <ul className="log-list">
      {log.map((entry) => {
        const { date, time } = formatDate(entry.timestamp);
        const pct = Math.round(entry.confidence * 100);

        return (
          <li key={entry.id} className="log-item">
            <div className="log-thumb">
              {entry.imageDataUrl ? (
                <img src={entry.imageDataUrl} alt={entry.label} />
              ) : (
                <span>🌿</span>
              )}
            </div>

            <div className="log-info">
              <p className="log-plant">{entry.info.plant.toUpperCase()}</p>
              <p className="log-disease">{entry.label}</p>
              <p className="log-meta">{date} · {time}</p>
            </div>

            <div className="log-actions">
              <span className={`conf-pill ${CONF_CLASS(entry.confidence)}`}>{pct}%</span>
              <button
                className="log-delete"
                onClick={() => onDelete(entry.id)}
                aria-label={`Delete ${entry.label} entry`}
              >
                ×
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
