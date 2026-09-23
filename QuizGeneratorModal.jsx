import React, { useState } from 'react';
import { 
  Sparkles, 
  Loader2, 
  X,
  AlertCircle
} from 'lucide-react';
import { generateQuizFromNote } from '../services/aiQuizService';
import { useEdu } from '../context/EduContext';

export const QuizGeneratorModal = ({ note, isOpen, onClose, onQuizGenerated }) => {
  const { apiKey } = useEdu();
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !note) return null;

  const handleGenerate = async () => {
    if (!note.content || note.content.trim().length < 30) {
      setError('Please add more content to your study note before generating a quiz.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const generatedQuestions = await generateQuizFromNote({
        noteContent: note.content,
        noteTitle: note.title,
        subject: note.subject,
        questionCount: Number(questionCount),
        difficulty,
        apiKey
      });

      if (!generatedQuestions || generatedQuestions.length === 0) {
        throw new Error('Could not parse questions from notes');
      }

      onQuizGenerated({
        noteId: note.id,
        title: `${note.subject}: ${note.title}`,
        subject: note.subject,
        difficulty,
        questionCount: generatedQuestions.length,
        questions: generatedQuestions
      });

      onClose();
    } catch (err) {
      console.error(err);
      setError('Quiz generation failed. Please try again with longer note content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div 
        className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border animate-in fade-in zoom-in-95 duration-200"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--bg-card-border-hover)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 p-2 rounded-xl transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{ background: 'var(--gradient-blue-purple)' }}
          >
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Quiz Generator</h3>
            <p className="text-xs" style={{ color: 'var(--accent-purple)' }}>Creates tailored questions strictly from your study note</p>
          </div>
        </div>

        {/* Source Note Info */}
        <div 
          className="p-4 rounded-2xl border mb-6"
          style={{
            backgroundColor: 'var(--bg-canvas-subtle)',
            borderColor: 'var(--bg-card-border)'
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent-purple)' }}>Target Note</span>
          <h4 className="text-sm font-semibold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>{note.title}</h4>
          <span 
            className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-xs font-medium border"
            style={{
              backgroundColor: 'var(--chip-bg)',
              borderColor: 'var(--chip-border)',
              color: 'var(--accent-purple)'
            }}
          >
            {note.subject}
          </span>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl status-badge-danger text-xs mb-5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Configurations */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Number of Questions ({questionCount})
            </label>
            <div className="flex gap-2">
              {[3, 5, 8, 10].map((num) => {
                const isSelected = questionCount === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    disabled={loading}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                      isSelected ? 'btn-ai-primary' : 'btn-ai-glass'
                    }`}
                  >
                    {num} Qs
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Difficulty Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['Easy', 'Medium', 'Hard'].map((lvl) => {
                const isSelected = difficulty === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    disabled={loading}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      isSelected ? 'btn-ai-purple' : 'btn-ai-glass'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Loading Indicator or Action */}
        {loading ? (
          <div 
            className="flex flex-col items-center justify-center p-6 border rounded-2xl text-center space-y-3"
            style={{
              backgroundColor: 'var(--chip-bg)',
              borderColor: 'var(--chip-border)'
            }}
          >
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-purple)' }} />
            <div className="text-sm font-semibold" style={{ color: 'var(--accent-purple)' }}>
              EduFriend AI is synthesizing questions... 🤖
            </div>
            <p className="text-xs max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Analyzing key concepts, definitions, and questions from "{note.title}"
            </p>
          </div>
        ) : (
          <button
            onClick={handleGenerate}
            className="w-full btn-ai-primary !py-3.5 !text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate & Start Quiz</span>
          </button>
        )}
      </div>
    </div>
  );
};
