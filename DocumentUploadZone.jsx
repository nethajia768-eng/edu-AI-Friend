import React, { useState } from 'react';
import { 
  FileUp, 
  FileText, 
  Camera, 
  Sparkles, 
  AlertCircle, 
  Upload, 
  FileCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Search,
  BookOpen
} from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../../services/documentAnalyzerService';

export const DocumentUploadZone = ({ onAnalyze, isAnalyzing, progressState }) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDocType, setSelectedDocType] = useState('auto'); // 'auto' | 'assignment' | 'resume' | 'notes'
  const [manualText, setManualText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    const validExts = ['.pdf', '.docx', '.txt', '.png', '.jpg', '.jpeg'];
    const lowerName = file.name.toLowerCase();
    const isValid = validExts.some(ext => lowerName.endsWith(ext)) || file.type.startsWith('image/') || file.type.includes('pdf') || file.type.includes('word');
    
    if (!isValid) {
      alert('Supported file formats: PDF, DOCX, TXT, PNG, JPG, JPEG');
      return;
    }

    setSelectedFile(file);
  };

  const triggerAnalysis = () => {
    if (showTextInput && manualText.trim()) {
      onAnalyze({
        rawText: manualText,
        fileName: 'Pasted_Document.txt',
        documentType: selectedDocType
      });
      return;
    }

    if (selectedFile) {
      onAnalyze({
        file: selectedFile,
        documentType: selectedDocType
      });
    }
  };

  const loadPreset = (presetKey) => {
    const preset = SAMPLE_DOCUMENTS[presetKey];
    if (preset) {
      onAnalyze({
        rawText: preset.content,
        fileName: preset.fileName,
        documentType: preset.type
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Upload Box */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
        className={`relative rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          dragOver 
            ? 'border-indigo-500 scale-[1.01]' 
            : 'hover:border-indigo-400/60'
        }`}
        style={{
          backgroundColor: dragOver ? 'var(--bg-card-hover)' : 'var(--bg-card)',
          borderColor: dragOver ? 'var(--accent-purple)' : 'var(--bg-card-border)'
        }}
      >
        <div 
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'var(--gradient-hero)' }}
        />

        {isAnalyzing ? (
          /* Animated AI Scanning Status */
          <div className="py-10 space-y-6 max-w-md mx-auto">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-full h-full rounded-2xl animate-spin"
                   style={{ background: 'var(--gradient-blue-purple)', padding: '3px' }}>
                <div className="w-full h-full rounded-[13px] flex items-center justify-center"
                     style={{ backgroundColor: 'var(--bg-canvas)' }}>
                  <Cpu className="w-8 h-8 animate-pulse text-indigo-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Scanning in Progress...
              </span>
              <h3 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                {progressState?.label || 'Analyzing Document Quality...'}
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Scanning → Understanding → Checking Grammar & OCR → Generating Report
              </p>
            </div>

            {/* Scanning Progress Bar */}
            <div className="w-full bg-slate-800/50 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressState?.percent || 20}%`,
                  background: 'var(--gradient-hero)'
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] pt-2" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center justify-center gap-1">
                <Search className="w-3 h-3 text-indigo-400" /> OCR Engine
              </span>
              <span className="flex items-center justify-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" /> Syntax Logic
              </span>
              <span className="flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Format Audit
              </span>
            </div>
          </div>
        ) : (
          /* Normal Upload State */
          <div className="space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-xl"
                 style={{ background: 'var(--gradient-blue-purple)' }}>
              <FileUp className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Upload Your Document
              </h3>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Drag & drop your PDF, assignment, resume, notes, or image here
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Maximum file size: <strong>25 MB</strong> • OCR enabled for scanned documents & photos
              </p>
            </div>

            {/* Selected File Badge */}
            {selectedFile && (
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border mx-auto animate-in zoom-in-95 duration-200"
                style={{
                  backgroundColor: 'var(--chip-bg)',
                  borderColor: 'var(--chip-border)',
                  color: 'var(--accent-purple)'
                }}
              >
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                <button 
                  onClick={() => setSelectedFile(null)} 
                  className="ml-2 hover:opacity-80 text-rose-400"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <label className="btn-ai-glass cursor-pointer !py-2.5 !px-4 !text-xs !rounded-xl">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>📁 Choose File</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,image/*"
                  onChange={handleFileChange}
                />
              </label>

              <label className="btn-ai-glass cursor-pointer !py-2.5 !px-4 !text-xs !rounded-xl">
                <Camera className="w-4 h-4 text-indigo-400" />
                <span>📷 Scan Document / Photo</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                />
              </label>

              <button
                type="button"
                onClick={() => setShowTextInput(!showTextInput)}
                className="btn-ai-glass !py-2.5 !px-4 !text-xs !rounded-xl"
              >
                <BookOpen className="w-4 h-4 text-violet-400" />
                <span>✍️ Paste Text Directly</span>
              </button>

              <button
                type="button"
                onClick={triggerAnalysis}
                disabled={!selectedFile && (!showTextInput || !manualText.trim())}
                className="btn-ai-primary !py-2.5 !px-6 !text-xs !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>✨ Analyze with AI</span>
              </button>
            </div>

            {/* Paste Text Area */}
            {showTextInput && (
              <div className="mt-4 pt-4 border-t border-white/10 text-left max-w-2xl mx-auto space-y-2">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Paste Assignment, Essay, Resume, or Notes content:
                </label>
                <textarea
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="Paste your document text here for rapid linguistic and structure analysis..."
                  rows={6}
                  className="w-full rounded-2xl p-4 text-xs font-mono resize-none focus:outline-none border"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--bg-input-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            )}

            {/* Supported Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
              {['PDF', 'DOCX', 'TXT', 'JPG', 'PNG', 'Scanned Docs', 'Handwritten OCR', 'Resumes', 'Essays'].map((tag) => (
                <span 
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-md font-medium border"
                  style={{
                    backgroundColor: 'var(--bg-canvas-subtle)',
                    borderColor: 'var(--bg-card-border)',
                    color: 'var(--text-muted)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Test Presets (Ready-to-use sample documents) */}
      <div 
        className="glass-panel p-5 rounded-2xl border"
        style={{ borderColor: 'var(--bg-card-border)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Instant Demo Presets
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Test the analyzer instantly with pre-loaded academic documents:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => loadPreset('assignment')}
            disabled={isAnalyzing}
            className="p-3 rounded-xl border text-left glass-panel-interactive flex flex-col justify-between gap-2 group"
            style={{ borderColor: 'var(--bg-card-border)' }}
          >
            <div>
              <span className="text-base mb-1 block">📄</span>
              <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                College AI Assignment
              </p>
              <p className="text-[11px] line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                Contains subject-verb agreement errors, articles, and formatting issues.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-indigo-400 group-hover:underline">
              Load & Analyze →
            </span>
          </button>

          <button
            onClick={() => loadPreset('resume')}
            disabled={isAnalyzing}
            className="p-3 rounded-xl border text-left glass-panel-interactive flex flex-col justify-between gap-2 group"
            style={{ borderColor: 'var(--bg-card-border)' }}
          >
            <div>
              <span className="text-base mb-1 block">💼</span>
              <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                Engineering Resume / CV
              </p>
              <p className="text-[11px] line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                Triggers Resume Mode: checks contact, skills, projects, and impact metrics.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-cyan-400 group-hover:underline">
              Load & Analyze →
            </span>
          </button>

          <button
            onClick={() => loadPreset('scannedNotes')}
            disabled={isAnalyzing}
            className="p-3 rounded-xl border text-left glass-panel-interactive flex flex-col justify-between gap-2 group"
            style={{ borderColor: 'var(--bg-card-border)' }}
          >
            <div>
              <span className="text-base mb-1 block">📷</span>
              <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                Scanned Unit Notes (OCR)
              </p>
              <p className="text-[11px] line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                Scanned handwriting OCR anomalies, low-confidence flags, and summary conversion.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 group-hover:underline">
              Load & Analyze →
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};
