import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  Home 
} from 'lucide-react';
import { useEdu } from '../context/EduContext';
import confetti from 'canvas-confetti';

export const QuizPlayer = ({ quiz, onFinish, onBack }) => {
  const { saveQuizResult, showToast } = useEdu();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState(null);

  const questions = quiz?.questions || [];
  const currentQ = questions[currentIndex];

  const handleSelectOption = (option) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: option
    });
  };

  const handleSubmit = () => {
    let score = 0;
    const answeredQuestions = questions.map((q, idx) => {
      const selected = selectedAnswers[idx] || null;
      const isCorrect = selected === q.answer;
      if (isCorrect) score += 1;
      return {
        ...q,
        selectedAnswer: selected,
        isCorrect
      };
    });

    const percentage = Math.round((score / questions.length) * 100);
    const result = {
      noteId: quiz.noteId,
      title: quiz.title,
      subject: quiz.subject,
      difficulty: quiz.difficulty,
      questionCount: questions.length,
      score,
      percentage,
      questions: answeredQuestions
    };

    saveQuizResult(result);
    setScoreData(result);
    setIsSubmitted(true);

    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast(`Quiz Completed! You scored ${score}/${questions.length} (${percentage}%)! 🌟`, 'streak');
    } else {
      showToast(`Quiz finished with ${percentage}%. Great practice!`, 'info');
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreData(null);
    setCurrentIndex(0);
  };

  if (!quiz || questions.length === 0) {
    return (
      <div className="p-8 text-center glass-panel rounded-3xl">
        <p style={{ color: 'var(--text-secondary)' }}>No quiz questions loaded.</p>
        <button onClick={onBack} className="mt-4 btn-ai-primary">
          Back
        </button>
      </div>
    );
  }

  // Result Summary View
  if (isSubmitted && scoreData) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="glass-panel p-8 rounded-3xl text-center relative overflow-hidden shadow-2xl">
          <div 
            className="w-20 h-20 mx-auto rounded-3xl p-[2px] mb-4 shadow-xl"
            style={{ background: 'var(--gradient-hero)' }}
          >
            <div 
              className="w-full h-full rounded-[22px] flex items-center justify-center text-4xl"
              style={{ backgroundColor: 'var(--bg-canvas)' }}
            >
              <Trophy className="w-10 h-10 text-amber-500" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>Quiz Completed! 🎉</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{scoreData.title}</p>

          <div 
            className="my-6 inline-flex items-center gap-6 px-6 py-3 rounded-2xl border"
            style={{
              backgroundColor: 'var(--bg-canvas-subtle)',
              borderColor: 'var(--bg-card-border)'
            }}
          >
            <div>
              <span className="text-xs block uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>Your Score</span>
              <span className="text-2xl font-black" style={{ color: 'var(--accent-purple)' }}>
                {scoreData.score} / {scoreData.questionCount}
              </span>
            </div>
            <div className="w-[1px] h-8" style={{ backgroundColor: 'var(--bg-card-border)' }} />
            <div>
              <span className="text-xs block uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>Percentage</span>
              <span 
                className="text-2xl font-black"
                style={{ color: scoreData.percentage >= 70 ? 'var(--status-completed)' : '#d97706' }}
              >
                {scoreData.percentage}%
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetry}
              className="btn-ai-glass"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={onFinish}
              className="btn-ai-primary"
            >
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Detailed Review of Answers */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Question Review</h3>
          <div className="space-y-4">
            {scoreData.questions.map((q, idx) => {
              const isCorrect = q.selectedAnswer === q.answer;
              return (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border ${
                    isCorrect ? 'status-badge-completed' : 'status-badge-danger'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
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
                  <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 rounded-lg status-badge-completed">
                      <span className="font-bold mr-1">Correct Answer:</span> {q.answer}
                    </div>
                    {!isCorrect && (
                      <div className="p-2 rounded-lg status-badge-danger">
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
    );
  }

  // Active Quiz Playing View
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Header with Progress */}
      <div className="glass-panel p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span 
            className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
            style={{
              backgroundColor: 'var(--chip-bg)',
              borderColor: 'var(--chip-border)',
              color: 'var(--accent-purple)'
            }}
          >
            {quiz.subject} • {quiz.difficulty}
          </span>
          <h2 className="text-lg font-bold mt-1 truncate max-w-md" style={{ color: 'var(--text-primary)' }}>{quiz.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold" style={{ color: 'var(--accent-purple)' }}>
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-canvas-subtle)' }}
      >
        <div
          className="h-full transition-all duration-300 rounded-full"
          style={{ 
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
            background: 'var(--gradient-cyan-blue)'
          }}
        />
      </div>

      {/* Question Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: 'var(--accent-purple)' }}>
            Question {currentIndex + 1}
          </span>
          <h3 className="text-lg sm:text-xl font-bold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {currentQ.question}
          </h3>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = selectedAnswers[currentIndex] === opt;
            const letter = String.fromCharCode(65 + oIdx);
            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className="w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all duration-200 border"
                style={{
                  backgroundColor: isSelected ? 'var(--chip-bg)' : 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--accent-purple)' : 'var(--bg-card-border)',
                  transform: isSelected ? 'scale(1.01)' : 'none',
                  color: isSelected ? 'var(--accent-purple)' : 'var(--text-secondary)'
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-purple)' : 'var(--bg-canvas-subtle)',
                    color: isSelected ? '#ffffff' : 'var(--text-muted)'
                  }}
                >
                  {letter}
                </div>
                <span className="text-sm font-medium flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div 
          className="flex items-center justify-between mt-8 pt-6 border-t"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="btn-ai-primary !py-2 !px-5 !text-xs"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-ai-cyan !py-2 !px-5 !text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Quiz</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
