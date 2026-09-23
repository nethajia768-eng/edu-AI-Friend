import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Clock, 
  History, 
  Layers, 
  Trash2, 
  Eye, 
  Languages, 
  ArrowLeft,
  BookOpen,
  MessageSquare,
  Wand2
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';
import { DocumentUploadZone } from './DocumentUploadZone';
import { DocumentAnalyticsDashboard } from './DocumentAnalyticsDashboard';
import { DocumentSplitViewer } from './DocumentSplitViewer';
import { DocumentChatDrawer } from './DocumentChatDrawer';
import { analyzeDocument } from '../../services/documentAnalyzerService';

export const DocumentAnalyzerPage = () => {
  const { 
    activeDocument, 
    setActiveDocument, 
    documentHistory, 
    saveDocumentAnalysis, 
    deleteDocumentAnalysis,
    applyDocumentFix,
    applyAllSafeFixes,
    analyzerLanguage,
    setAnalyzerLanguage,
    showToast
  } = useEdu();

  const [currentView, setCurrentView] = useState(activeDocument ? 'report' : 'upload'); // 'upload' | 'report' | 'history'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressState, setProgressState] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  // Trigger analysis pipeline
  const handleAnalyze = async (uploadPayload) => {
    setIsAnalyzing(true);
    setCurrentView('upload');

    try {
      const result = await analyzeDocument({
        ...uploadPayload,
        language: analyzerLanguage,
        onProgress: (prog) => setProgressState(prog)
      });

      if (result) {
        saveDocumentAnalysis(result);
        setCurrentView('report');
      }
    } catch (err) {
      console.error(err);
      showToast('We could not analyze this document. Please check the file and try again.', 'info');
    } finally {
      setIsAnalyzing(false);
      setProgressState(null);
    }
  };

  const handleApplyFix = (issue) => {
    applyDocumentFix(issue.id, issue.original, issue.correction);
  };

  const handleIgnore = (issue) => {
    applyDocumentFix(issue.id, null, null); // mark resolved/ignored
    showToast('Issue marked as ignored', 'info');
  };

  const handleAskAI = (issue) => {
    setShowChatModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Navigation & Subtitle Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              AI Document & Assignment Analyzer
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
            “Upload your document. Let AI find mistakes, explain them, and help you improve.”
          </p>
        </div>

        {/* Action Tabs & Language Pill */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentView('upload')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              currentView === 'upload' ? 'bg-indigo-600 text-white border-indigo-500 shadow' : 'btn-ai-glass'
            }`}
          >
            + Upload New
          </button>

          {activeDocument && (
            <button
              onClick={() => setCurrentView('report')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                currentView === 'report' ? 'bg-indigo-600 text-white border-indigo-500 shadow' : 'btn-ai-glass'
              }`}
            >
              Active Analysis
            </button>
          )}

          <button
            onClick={() => setCurrentView('history')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              currentView === 'history' ? 'bg-indigo-600 text-white border-indigo-500 shadow' : 'btn-ai-glass'
            }`}
          >
            <History className="w-3.5 h-3.5 text-indigo-400" />
            <span>History ({documentHistory.length})</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={() => {
              const next = analyzerLanguage === 'en' ? 'ta' : 'en';
              setAnalyzerLanguage(next);
              showToast(`Analysis Language: ${next === 'ta' ? 'தமிழ் (Tamil)' : 'English'}`, 'info');
            }}
            className="btn-ai-glass !py-1.5 !px-3 !text-xs !rounded-xl flex items-center gap-1.5"
            title="Toggle between English and Tamil AI explanations"
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span>{analyzerLanguage === 'en' ? '🇬🇧 EN' : '🇮🇳 தமிழ்'}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: UPLOAD ZONE */}
      {currentView === 'upload' && (
        <DocumentUploadZone 
          onAnalyze={handleAnalyze} 
          isAnalyzing={isAnalyzing} 
          progressState={progressState} 
        />
      )}

      {/* VIEW 2: ACTIVE ANALYSIS REPORT */}
      {currentView === 'report' && activeDocument && (
        <div className="space-y-8">
          
          {/* Visual Analytics Dashboard */}
          <DocumentAnalyticsDashboard documentData={activeDocument} />

          {/* Page-by-Page Split Viewer */}
          <DocumentSplitViewer 
            documentData={activeDocument}
            language={analyzerLanguage}
            onApplyFix={handleApplyFix}
            onApplyAllSafe={applyAllSafeFixes}
            onIgnore={handleIgnore}
            onAskAI={handleAskAI}
          />

          {/* Bottom Module: Document-Aware AI Chat */}
          <div className="pt-2">
            <DocumentChatDrawer 
              documentData={activeDocument}
              language={analyzerLanguage}
              onLanguageChange={(l) => setAnalyzerLanguage(l)}
            />
          </div>
        </div>
      )}

      {/* VIEW 3: DOCUMENT HISTORY */}
      {currentView === 'history' && (
        <div 
          className="glass-panel p-6 rounded-3xl border space-y-4"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                My Document History
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {documentHistory.length} analyses stored locally
            </span>
          </div>

          {documentHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <BookOpen className="w-10 h-10 mx-auto opacity-40 text-indigo-400" />
              <p className="text-sm">No documents analyzed yet.</p>
              <button
                onClick={() => setCurrentView('upload')}
                className="btn-ai-primary !py-2 !px-4 !text-xs"
              >
                Upload First Document
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-3 font-semibold">Document</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Issues</th>
                    <th className="pb-3 font-semibold">Score</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {documentHistory.map((doc) => (
                    <tr key={doc.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span className="truncate max-w-xs">{doc.fileName}</span>
                      </td>
                      <td className="py-3.5 capitalize">
                        <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {doc.documentType || 'Assignment'}
                        </span>
                      </td>
                      <td className="py-3.5 text-amber-400 font-bold">
                        {doc.issues ? doc.issues.length : 0}
                      </td>
                      <td className="py-3.5">
                        <span className="font-extrabold text-emerald-400">
                          {doc.overallScore || 84}
                        </span>
                        <span className="text-[10px] text-slate-500"> / 100</span>
                      </td>
                      <td className="py-3.5 text-slate-400">
                        {new Date(doc.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setActiveDocument(doc);
                            setCurrentView('report');
                          }}
                          className="btn-ai-glass !py-1 !px-2.5 !text-xs !rounded-lg"
                        >
                          Open Analysis
                        </button>
                        <button
                          onClick={() => deleteDocumentAnalysis(doc.id)}
                          className="p-1 rounded hover:bg-rose-500/10 text-rose-400 transition-colors"
                          title="Delete report"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
