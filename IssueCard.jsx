import React from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Lightbulb, 
  Wand2, 
  EyeOff, 
  MessageSquare,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export const IssueCard = ({ 
  issue, 
  index, 
  onApplyFix, 
  onIgnore, 
  onAskAI, 
  language = 'en',
  isSelected,
  onSelect 
}) => {
  const getSeverityBadge = () => {
    switch (issue.severity) {
      case 'high':
        return (
          <span className="status-badge-danger text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Definite Error
          </span>
        );
      case 'medium':
        return (
          <span className="status-badge-warning text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Possible Issue
          </span>
        );
      default:
        return (
          <span className="status-badge-info text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Lightbulb className="w-3 h-3" /> Suggestion
          </span>
        );
    }
  };

  const getCategoryLabel = () => {
    switch (issue.category) {
      case 'grammar': return '📝 Grammar';
      case 'spelling': return '🔤 Spelling';
      case 'character_ocr': return '📷 Letter / OCR';
      case 'formatting': return '📐 Formatting';
      case 'sentence_quality': return '💡 Clarity';
      case 'structure': return '🏗️ Structure';
      default: return '🔍 Quality';
    }
  };

  return (
    <div 
      onClick={() => onSelect && onSelect(issue)}
      className={`rounded-2xl p-4 border transition-all duration-200 space-y-3 cursor-pointer ${
        issue.resolved 
          ? 'opacity-50 line-through' 
          : isSelected 
          ? 'ring-2 ring-indigo-500 shadow-lg' 
          : 'glass-panel-interactive'
      }`}
      style={{
        backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        borderColor: isSelected ? 'var(--accent-purple)' : 'var(--bg-card-border)'
      }}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Page {issue.page || 1}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-md border"
                style={{
                  backgroundColor: 'var(--bg-canvas-subtle)',
                  borderColor: 'var(--bg-card-border)',
                  color: 'var(--text-muted)'
                }}>
            {getCategoryLabel()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {issue.confidence && issue.confidence < 0.9 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20" title="Low OCR confidence">
              OCR: {Math.round(issue.confidence * 100)}% (Verify)
            </span>
          )}
          {getSeverityBadge()}
        </div>
      </div>

      {/* Comparison: Original vs Suggested */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl border bg-rose-500/5 border-rose-500/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
            ❌ Original
          </span>
          <span className="font-mono text-rose-300 font-medium break-words">
            "{issue.original}"
          </span>
        </div>

        <div className="p-2.5 rounded-xl border bg-emerald-500/5 border-emerald-500/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            ✅ Suggested Fix
          </span>
          <span className="font-mono text-emerald-300 font-semibold break-words">
            "{issue.correction}"
          </span>
        </div>
      </div>

      {/* Explanation & Learning Tip */}
      <div className="text-xs space-y-1.5 p-3 rounded-xl border"
           style={{
             backgroundColor: 'var(--bg-canvas-subtle)',
             borderColor: 'var(--bg-card-border)'
           }}>
        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
          💡 <span className="font-bold">Explanation:</span> {issue.explanation}
        </p>
        {issue.learningTip && (
          <p className="text-[11px] text-indigo-400 italic">
            🎓 <span className="font-semibold">Learning Tip:</span> {issue.learningTip}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {!issue.resolved && (
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onApplyFix(issue); }}
              className="btn-ai-primary !py-1.5 !px-3 !text-xs !rounded-lg flex items-center gap-1 shadow"
            >
              <Wand2 className="w-3 h-3" />
              <span>Apply Fix</span>
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onIgnore(issue); }}
              className="btn-ai-glass !py-1.5 !px-2.5 !text-xs !rounded-lg hover:opacity-80"
              title="Ignore this suggestion"
            >
              <EyeOff className="w-3 h-3 text-slate-400" />
              <span>Ignore</span>
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onAskAI(issue); }}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </div>
      )}

      {issue.resolved && (
        <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Fixed & Updated in Document Preview
        </div>
      )}

    </div>
  );
};
