import { useState, useCallback } from 'react';
import { UploadZone } from './components/UploadZone';
import { ResultCard } from './components/ResultCard';
import { FieldLog } from './components/FieldLog';
import { Toast } from './components/Toast';
import { useAnalysis } from './hooks/useAnalysis';
import { useFieldLog } from './hooks/useFieldLog';
import type { ScanResult } from './types';

type Tab = 'scan' | 'log' | 'about';

const SPECIES = [
  'Tomato', 'Apple', 'Corn', 'Grape', 'Potato',
  'Pepper', 'Cherry', 'Peach', 'Strawberry',
  'Squash', 'Raspberry', 'Soybean', 'Blueberry',
];

export default function App() {
  const [tab, setTab] = useState<Tab>('scan');
  const [image, setImage] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const { analyze, isAnalyzing, result, error, reset } = useAnalysis();
  const { log, addEntry, removeEntry } = useFieldLog();

  const handleImageSelected = useCallback(
    (dataUrl: string) => {
      setImage(dataUrl);
      reset();
    },
    [reset],
  );

  const handleClear = () => {
    setImage(null);
    reset();
  };

  const handleSave = (entry: ScanResult) => {
    addEntry(entry);
    setSavedIds((prev) => new Set(prev).add(entry.id));
    setToast('Saved to field log');
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <span className="logo">LeafGuard</span>
        <span className="logo-sub">// plant diagnostics</span>
      </header>

      {/* Nav */}
      <nav className="nav">
        {(['scan', 'log', 'about'] as Tab[]).map((t) => (
          <button
            key={t}
            className={`nav-btn${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'scan' ? 'Scan' : t === 'log' ? `Field Log${log.length > 0 ? ` (${log.length})` : ''}` : 'About'}
          </button>
        ))}
      </nav>

      {/* ── Scan ── */}
      {tab === 'scan' && (
        <main className="page">
          {!image ? (
            <UploadZone onImageSelected={handleImageSelected} />
          ) : (
            <>
              {/* Preview */}
              <div className="preview-wrap">
                <img src={image} alt="Leaf to analyze" className="preview-img" />
                <button className="preview-clear" onClick={handleClear} aria-label="Remove image">✕</button>
              </div>

              {/* Analyze / loading */}
              {!result && !isAnalyzing && (
                <button className="analyze-btn" onClick={() => analyze(image)}>
                  Analyze leaf →
                </button>
              )}

              {isAnalyzing && (
                <div className="loading-wrap">
                  <div className="loading-bar">
                    <div className="loading-bar-inner" />
                  </div>
                  <p className="loading-text">Analyzing leaf...</p>
                </div>
              )}

              {error && (
                <div className="error-banner">
                  ⚠ {error}
                  <button onClick={() => analyze(image)}>Retry</button>
                </div>
              )}

              {result && (
                <ResultCard
                  result={result}
                  onSave={() => handleSave(result)}
                  isSaved={savedIds.has(result.id)}
                />
              )}
            </>
          )}
        </main>
      )}

      {/* ── Field Log ── */}
      {tab === 'log' && (
        <main className="page">
          <div className="log-header">
            <h1 className="page-title">Field Log</h1>
            <span className="log-count">{log.length} {log.length === 1 ? 'scan' : 'scans'}</span>
          </div>
          <FieldLog log={log} onDelete={removeEntry} />
        </main>
      )}

      {/* ── About ── */}
      {tab === 'about' && (
        <main className="page">
          <section className="about-section">
            <h1 className="page-title">About LeafGuard</h1>
            <p className="about-body">
              LeafGuard uses a computer vision model trained on the PlantDoc dataset to identify
              plant diseases from leaf photographs. Snap a photo, get an instant diagnosis and
              treatment plan — no agronomist required.
            </p>
            <div className="model-tag">
              <strong>PlantDoc Dataset</strong>
              <span>2,598 images · 13 plant species · 17 disease classes</span>
            </div>
          </section>

          <hr className="divider" />

          <section className="about-section">
            <h2 className="about-subtitle">Supported Species</h2>
            <div className="species-grid">
              {SPECIES.map((s) => (
                <span key={s} className="species-chip">{s}</span>
              ))}
            </div>
          </section>

          <hr className="divider" />

          <section className="about-section">
            <h2 className="about-subtitle">Climate Context</h2>
            <p className="about-body">
              Weather risk badges are powered by Open-Meteo. Disease spread rates
              for fungal and bacterial pathogens correlate with humidity and temperature —
              LeafGuard surfaces that context so you can act before an outbreak spreads.
            </p>
          </section>

          <hr className="divider" />

          <section className="about-section">
            <h2 className="about-subtitle">API Integration</h2>
            <p className="about-body">
              Connect your trained model by pointing <code>MODEL_ENDPOINT</code> in{' '}
              <code>src/hooks/useAnalysis.ts</code> to your inference API.
              The hook POSTs <code>{'{ image: string }'}</code> (base64) and expects{' '}
              <code>{'{ label: string, confidence: number }'}</code> back.
            </p>
          </section>
        </main>
      )}

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
