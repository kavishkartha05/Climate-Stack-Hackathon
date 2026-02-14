import React, { useRef, useState, useCallback } from 'react';

interface Props {
  onImageSelected: (dataUrl: string) => void;
}

export function UploadZone({ onImageSelected }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) onImageSelected(e.target.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="upload-section">
      <div
        className={`upload-zone${isDragging ? ' dragging' : ''}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
        aria-label="Upload leaf image"
      >
        <input ref={fileRef} type="file" accept="image/*" onChange={onInputChange} hidden />
        <span className="upload-icon">🌿</span>
        <p className="upload-title">Drop a leaf photo here</p>
        <p className="upload-sub">or click to browse files</p>
      </div>

      <button className="camera-btn" onClick={() => cameraRef.current?.click()}>
        <span>📷</span> Take a photo with camera
      </button>
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onInputChange}
        hidden
      />
    </div>
  );
}
