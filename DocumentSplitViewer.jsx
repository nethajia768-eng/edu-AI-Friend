import React, { useState } from 'react';
import { 
  FileText, 
  Wand2, 
  Filter, 
  Download, 
  Sparkles, 
  CheckCheck, 
  Eye, 
  FileCode,
  Copy,
  Printer
} from 'lucide-react';
import { IssueCard } from './IssueCard';

export const DocumentSplitViewer = ({ 
  documentData, 
  onApplyFix, 
  onApplyAllSafe, 
  onIgnore, 
  onAskAI,
  language = 'en'
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activePage, setActivePage] = useState(1);

  if (!documentData) return null;

  const issues = documentData.issues || [];
  const filteredIssues = issues.filter(iss => {
    if (selectedCategory === 'all') return true;
    return iss.category === selectedCategory;
  });

  const resolvedCount = issues.filter(i => i.resolved).length;
  const pendingCount = issues.filter(i => !i.resolved).length;

  // Export report as clean printable HTML / Markdown
  const handleDownloadReport = () => {
    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>EduFriend Analysis Report - ${documentData.fileName}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
          h1 { color: #4f46e5; }
          .score-box { background: #e0e7ff; padding: 15px 25px; border-radius: 12px; display: inline-block; font-size: 20px; font-weight: bold; margin-bottom: 20px; }
          .issue { border-left: 4px solid #f43f5e; padding: 10px 16px; margin-bottom: 12px; background: #fff1f2; border-radius: 6px; }
          .issue.grammar { border-color: #6366f1; background: #eef2ff; }
          pre { background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; }
        </style>
      </head>
      <body>
        <h1>📄 EduFriend AI Document Analysis Report</h1>
        <p><strong>File Name:</strong> ${documentData.fileName} | <strong>Date:</strong> ${new Date(documentData.uploadedAt || Date.now()).toLocaleDateString()}</p>
        <div class="score-box">Overall Document Score: ${documentData.overallScore} / 100</div>
        
        <h2>Audited Document Content</h2>
        <pre>${documentData.text}</pre>

        <h2>Detected Issues & Corrections (${issues.length})</h2>
        ${issues.map((iss, i) => `
          <div class="issue ${iss.category}">
            <strong>#${i + 1} [${iss.category.toUpperCase()}] (Page ${iss.page}):</strong><br/>
            <span>Original: "<em>${iss.original}</em>"</span><br/>
            <span>Correction: "<strong>${iss.correction}</strong>"</span><br/>
            <span>Explanation: ${iss.explanation}</span>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduFriend_Report_${documentData.fileName.replace(/\.[^/.]+$/, '')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCorrectedText = () => {
    const blob = new Blob([documentData.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Corrected_${documentData.fileName.replace(/\.[^/.]+$/, '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Highlighting matching words in the preview
  const renderHighlightedDocument = () => {
    let raw = documentData.text || '';
    const paragraphs = raw.split(/\n\s*\n/);

    return paragraphs.map((para, pIdx) => {
      let paraContent = para;
      return (
        <div key={pIdx} className="mb-4 text-xs font-mono leading-relaxed p-2 rounded-xl transition-colors hover:bg-white/5">
          {paraContent}
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      
      {/* Action Toolbar */}
      <div 
        className="glass-panel p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3"
        style={{ borderColor: 'var(--bg-card-border)' }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
            <Filter className="w-3.5 h-3.5 text-indigo-400" /> Filter Issues:
          </span>
          {[
            { id: 'all', label: `All (${issues.length})` },
            { id: 'grammar', label: 'Grammar' },
            { id: 'spelling', label: 'Spelling' },
            { id: 'character_ocr', label: 'Letter / OCR' },
            { id: 'formatting', label: 'Formatting' },
            { id: 'sentence_quality', label: 'Clarity' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                  : 'hover:border-indigo-400/50'
              }`}
              style={{
                backgroundColor: selectedCategory === cat.id ? undefined : 'var(--bg-canvas-subtle)',
                borderColor: selectedCategory === cat.id ? undefined : 'var(--bg-card-border)',
                color: selectedCategory === cat.id ? undefined : 'var(--text-secondary)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Global Batch Actions & Exports */}
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <button
              onClick={onApplyAllSafe}
              className="btn-ai-primary !py-1.5 !px-3 !text-xs !rounded-xl flex items-center gap-1.5 shadow"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Apply Safe Fixes ({pendingCount})</span>
            </button>
          )}

          <button
            onClick={handleDownloadReport}
            className="btn-ai-glass !py-1.5 !px-3 !text-xs !rounded-xl flex items-center gap-1"
            title="Download full styled HTML report"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Download Report</span>
          </button>

          <button
            onClick={handleDownloadCorrectedText}
            className="btn-ai-glass !py-1.5 !px-3 !text-xs !rounded-xl flex items-center gap-1"
            title="Download updated corrected document"
          >
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Text</span>
          </button>
        </div>
      </div>

      {/* Split Viewer: LEFT Document Preview | RIGHT Detected Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT Pane: Document Preview (6 cols) */}
        <div 
          className="lg:col-span-6 glass-panel p-6 rounded-3xl border flex flex-col h-[650px]"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold truncate max-w-[200px]" style={{ color: 'var(--text-primary)' }}>
                {documentData.fileName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <span>Live Preview</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Active Highlight Banner */}
          {selectedIssue && (
            <div className="p-3 mb-3 rounded-xl border bg-indigo-500/10 border-indigo-500/20 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-indigo-300">Selected: </span>
                <span className="font-mono text-rose-300">"{selectedIssue.original}"</span>
                <span className="text-slate-400"> → </span>
                <span className="font-mono text-emerald-300">"{selectedIssue.correction}"</span>
              </div>
              <button 
                onClick={() => setSelectedIssue(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* Document Content Scroll Area */}
          <div 
            className="flex-1 overflow-y-auto pr-2 rounded-2xl p-4 border font-mono text-xs whitespace-pre-wrap leading-relaxed select-text"
            style={{
              backgroundColor: 'var(--bg-canvas-subtle)',
              borderColor: 'var(--bg-card-border)',
              color: 'var(--text-primary)'
            }}
          >
            {documentData.text}
          </div>

          <div className="pt-3 flex items-center justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>Words: {documentData.wordCount || 0}</span>
            <span>Est. Reading Time: ~{Math.max(1, Math.round((documentData.wordCount || 100) / 180))} min</span>
          </div>
        </div>

        {/* RIGHT Pane: AI Detected Issues (6 cols) */}
        <div 
          className="lg:col-span-6 glass-panel p-6 rounded-3xl border flex flex-col h-[650px]"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                🔍 Detected Issues ({filteredIssues.length})
              </h3>
            </div>
            <div className="text-xs font-semibold flex items-center gap-2">
              <span className="text-emerald-400">{resolvedCount} Fixed</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400">{pendingCount} Remaining</span>
            </div>
          </div>

          {/* Issues List Scroll */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {filteredIssues.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <CheckCheck className="w-10 h-10 mx-auto text-emerald-400" />
                <p className="text-sm font-bold text-slate-200">No issues in this category!</p>
                <p className="text-xs text-slate-400">Great job! The document is clean for this check.</p>
              </div>
            ) : (
              filteredIssues.map((iss, index) => (
                <IssueCard
                  key={iss.id || index}
                  issue={iss}
                  index={index}
                  language={language}
                  isSelected={selectedIssue?.id === iss.id}
                  onSelect={(selected) => setSelectedIssue(selected)}
                  onApplyFix={(issueToFix) => onApplyFix(issueToFix)}
                  onIgnore={(issueToIgnore) => onIgnore(issueToIgnore)}
                  onAskAI={(issueToAsk) => onAskAI(issueToAsk)}
                />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
