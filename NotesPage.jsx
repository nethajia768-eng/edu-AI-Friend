import React, { useState, useRef } from 'react';
import { 
  BookText, 
  Plus, 
  Search, 
  Sparkles, 
  Trash2, 
  Edit3, 
  X, 
  FileText, 
  Upload, 
  FileUp, 
  CheckCircle2 
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const NotesPage = ({ onGenerateQuiz }) => {
  const { notes, addNote, updateNote, deleteNote, showToast } = useEdu();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Machine Learning');
  const [content, setContent] = useState('');
  
  // File Upload State
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const subjects = ['All', 'Machine Learning', 'Data Structures', 'Python', 'Web Development', 'Other'];

  const filteredNotes = notes.filter((n) => {
    const matchesSubject = selectedSubject === 'All' || n.subject === selectedSubject;
    const matchesSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const handleOpenNew = () => {
    setEditingNote(null);
    setTitle('');
    setSubject('Machine Learning');
    setContent('');
    setUploadedFileName('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setUploadedFileName('');
    setIsEditorOpen(true);
  };

  // Helper to read and parse uploaded file content
  const processFile = (file) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('File is too large. Please upload files under 5MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      if (text) {
        setContent(text);
        setUploadedFileName(file.name);
        
        if (!title.trim()) {
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
          setTitle(capitalized);
        }
        
        showToast(`Imported ${file.name} successfully!`, 'success');
      }
    };

    reader.onerror = () => {
      showToast('Failed to read file content. Please try another text or markdown file.', 'error');
    };

    reader.readAsText(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      updateNote(editingNote.id, {
        title: title.trim(),
        subject,
        content: content.trim()
      });
    } else {
      addNote({
        title: title.trim(),
        subject,
        content: content.trim()
      });
    }

    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <BookText className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
            <span>Study Notes & AI Quiz Hub</span>
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            Write notes or upload study files (.txt, .md, code). Generate instant AI quizzes.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="btn-ai-cyan"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search notes by keyword, concept or term..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-2xl text-sm transition-colors focus:outline-none"
            style={{
              backgroundColor: 'var(--bg-input)',
              borderColor: 'var(--bg-input-border)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {subjects.map((subj) => {
            const isSelected = selectedSubject === subj;
            return (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border"
                style={{
                  backgroundColor: isSelected ? 'var(--chip-bg)' : 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--bg-card-border-hover)' : 'var(--bg-card-border)',
                  color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                }}
              >
                {subj}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotes.length === 0 ? (
          <div 
            className="col-span-full glass-panel p-12 rounded-3xl text-center"
            style={{ color: 'var(--text-muted)' }}
          >
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--accent-cyan)' }} />
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              No notes found
            </p>
            <p className="text-xs mt-1">Create or upload a study file to auto-generate personalized AI quizzes!</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="glass-panel-interactive p-6 rounded-3xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="status-badge-info text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg">
                    {note.subject}
                  </span>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(note)}
                      className="p-1.5 rounded-lg hover:scale-110 transition-transform"
                      style={{ color: 'var(--text-muted)' }}
                      title="Edit Note"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 rounded-lg hover:scale-110 transition-transform hover:text-red-500"
                      style={{ color: 'var(--text-muted)' }}
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 
                  className="text-base font-bold mb-2 leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {note.title}
                </h3>
                <p 
                  className="text-xs line-clamp-4 leading-relaxed whitespace-pre-line"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {note.content}
                </p>
              </div>

              <div 
                className="pt-5 mt-4 border-t flex items-center justify-between"
                style={{ borderColor: 'var(--bg-card-border)' }}
              >
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>

                {/* Generate Quiz Button */}
                <button
                  onClick={() => onGenerateQuiz(note)}
                  className="btn-ai-purple !py-1.5 !px-3 !text-xs !rounded-xl"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Quiz</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Note Editor Modal with File Upload */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--bg-card-border-hover)'
            }}
          >
            <button
              onClick={() => setIsEditorOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ background: 'var(--gradient-cyan-blue)' }}
              >
                <BookText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {editingNote ? 'Edit Study Note' : 'Create New Study Note'}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Write notes manually or upload your documents/lecture summaries (.txt, .md, .csv, code).
                </p>
              </div>
            </div>

            {/* File Upload Zone */}
            <div className="mb-5">
              <label className="block text-xs font-semibold mb-2 flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" style={{ color: 'var(--accent-cyan)' }} />
                  <span>Upload File to Auto-Fill Content</span>
                </span>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Supports .txt, .md, .py, .js, .json, .csv</span>
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt,.md,.markdown,.json,.csv,.py,.js,.jsx,.ts,.tsx,.html,.css,.cpp,.c,.java"
                className="hidden"
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'scale-[1.01]'
                    : ''
                }`}
                style={{
                  backgroundColor: isDragging ? 'var(--chip-bg)' : 'var(--bg-canvas-subtle)',
                  borderColor: isDragging ? 'var(--accent-cyan)' : 'var(--bg-card-border)'
                }}
              >
                {uploadedFileName ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-semibold truncate max-w-xs">{uploadedFileName}</span>
                    <span className="text-[11px] underline ml-2">Click to replace file</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <FileUp className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
                    <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      <span className="font-bold hover:underline" style={{ color: 'var(--accent-cyan)' }}>Click to upload file</span> or drag and drop here
                    </p>
                    <p className="text-[11px]">
                      Instantly populates title & note content for quiz generation
                    </p>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Note Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Introduction to Machine Learning"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--bg-input-border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--bg-input-border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Python">Python</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
                  <span>Note Content & Summary</span>
                  {content.length > 0 && (
                    <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      {content.length} chars ({content.split(/\s+/).filter(Boolean).length} words)
                    </span>
                  )}
                </label>
                <textarea
                  rows="8"
                  required
                  placeholder="Paste or write definitions, bullet points, and key concepts here, or upload a file above. EduFriend AI will synthesize high-yield quiz questions based on this text..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border rounded-xl p-3 text-xs leading-relaxed focus:outline-none transition-colors font-mono"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--bg-input-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-ai-cyan"
                >
                  {editingNote ? 'Save Changes' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
