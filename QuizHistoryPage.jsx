import React, { useState } from 'react';
import { 
  History, 
  HelpCircle, 
  Trophy, 
  Calendar, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  X 
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const QuizHistoryPage = () => {
  const { quizzes } = useEdu();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [filterSubject, setFilterSubject] = useState('All');

  const subjects = ['All', 'Machine Learning', 'Data Structures', 'Python', 'Web Development'];

  const filteredQuizzes = quizzes.filter((q) => {
    if (filterSubject === 'All') return true;
    return q.subject === filterSubject;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <History className="w-6 h-6" style={{ color: 'var(--accent-purple)' }} />
            <span>Quiz History & Records</span>
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            Review past test performance, inspect questions, and identify areas to revise.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {subjects.map((subj) => {
            const isSelected = filterSubject === subj;
            return (
              <button
                key={subj}
                onClick={() => setFilterSubject(subj)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border"
                style={{
                  backgroundColor: isSelected ? 'var(--chip-bg)' : 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--bg-card-border-hover)' : 'var(--bg-card-border)',
                  color: isSelected ? 'var(--accent-purple)' : 'var(--text-secondary)'
                }}
              >
                {subj}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quiz History Table / Cards */}
      {filteredQuizzes.length === 0 ? (
        <div 
          className="glass-panel p-12 rounded-3xl text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--accent-purple)' }} />
          <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>No quiz records found</p>
          <p className="text-xs mt-1">Take a quiz from your notes to build your record!</p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr 
                  className="border-b text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: 'var(--bg-canvas-subtle)',
                    borderColor: 'var(--bg-card-border)',
                    color: 'var(--text-muted)'
                  }}
                >
                  <th className="p-4 sm:px-6">Quiz Title</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Difficulty</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Percentage</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right sm:pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm" style={{ borderColor: 'var(--bg-card-border)' }}>
                {filteredQuizzes.map((q) => (
                  <tr 
                    key={q.id} 
                    className="hover:opacity-90 transition-colors"
                    style={{ backgroundColor: 'var(--bg-card)' }}
                  >
                    <td className="p-4 sm:px-6 font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {q.title}
                    </td>
                    <td className="p-4">
                      <span 
                        className="px-2.5 py-0.5 rounded-md text-xs font-medium border"
                        style={{
                          backgroundColor: 'var(--chip-bg)',
                          borderColor: 'var(--chip-border)',
                          color: 'var(--accent-purple)'
                        }}
                      >
                        {q.subject}
                      </span>
                    </td>
                    <td className="p-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {q.difficulty || 'Medium'}
                    </td>
                    <td className="p-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                      {q.score} / {q.questionCount}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 font-extrabold text-xs px-2.5 py-1 rounded-full ${
                          q.percentage >= 70 ? 'status-badge-completed' : 'status-badge-warning'
                        }`}
                      >
                        {q.percentage}%
                      </span>
                    </td>
                    <td className="p-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {q.date}
                    </td>
                    <td className="p-4 text-right sm:pr-6">
                      <button
                        onClick={() => setSelectedQuiz(q)}
                        className="btn-ai-glass !py-1.5 !px-3 !text-xs !rounded-xl"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div 
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--bg-card-border-hover)'
            }}
          >
            <button
              onClick={() => setSelectedQuiz(null)}
              className="absolute top-5 right-5 p-2 rounded-xl transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Quiz Review: {selectedQuiz.title}
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              Scored {selectedQuiz.score}/{selectedQuiz.questionCount} ({selectedQuiz.percentage}%) on {selectedQuiz.date}
            </p>

            <div className="space-y-4 pt-2">
              {selectedQuiz.questions?.map((q, idx) => {
                const isCorrect = q.isCorrect ?? (q.selectedAnswer === q.answer);
                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      isCorrect ? 'status-badge-completed' : 'status-badge-danger'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Question {idx + 1}</span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
                    <div className="text-xs space-y-1">
                      <div className="p-1.5 rounded-lg status-badge-completed">
                        <span className="font-bold mr-1">Correct Answer:</span> {q.answer}
                      </div>
                      {!isCorrect && (
                        <div className="p-1.5 rounded-lg status-badge-danger">
                          <span className="font-bold mr-1">Your Answer:</span> {q.selectedAnswer || 'Not answered'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
