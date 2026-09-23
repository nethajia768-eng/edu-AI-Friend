import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Target, 
  BookText, 
  HelpCircle, 
  Play, 
  CheckCircle2, 
  Circle, 
  Plus, 
  ArrowRight
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const Dashboard = ({ onStartQuiz, onOpenAddGoal }) => {
  const { 
    user, 
    goals, 
    toggleGoal, 
    notes, 
    quizzes, 
    sessions, 
    setActiveTab, 
    getMotivationalQuote 
  } = useEdu();

  // Compute Today's Stats
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySessions = sessions.filter((s) => s.date === todayStr);
  const todayStudyMinutes = todaySessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const dailyGoalMinutes = user?.dailyGoalMinutes || 60;
  const progressPercent = Math.min(100, Math.round((todayStudyMinutes / dailyGoalMinutes) * 100));

  // Average Quiz Score
  const avgQuizScore = quizzes.length > 0
    ? Math.round(quizzes.reduce((acc, q) => acc + (q.percentage || 0), 0) / quizzes.length)
    : 0;

  const todayGoals = goals.filter((g) => g.date === todayStr || !g.completed);
  const recentNotes = notes.slice(0, 3);
  const motivation = getMotivationalQuote();

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome & Motivational Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl">
        <div 
          className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: 'var(--gradient-hero)' }}
        />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span 
                className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border"
                style={{
                  backgroundColor: 'var(--chip-bg)',
                  borderColor: 'var(--chip-border)',
                  color: 'var(--accent-purple)'
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-cyan)' }} /> 
                EduFriend AI Daily Companion
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {getGreeting()}, {user?.name || 'Student'}! 👋
            </h1>
            <p className="text-sm sm:text-base font-medium max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              Ready to make today's study session count?
            </p>

            {/* Dynamic AI Motivational Quote */}
            <div 
              className="mt-4 p-3.5 rounded-2xl max-w-2xl border"
              style={{
                backgroundColor: 'var(--bg-canvas-subtle)',
                borderColor: 'var(--bg-card-border)'
              }}
            >
              <p className="text-xs sm:text-sm italic" style={{ color: 'var(--text-primary)' }}>
                {motivation.quote}
              </p>
            </div>
          </div>

          {/* Quick Actions CTA with modern AI buttons */}
          <div className="flex flex-wrap md:flex-col gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('timer')}
              className="btn-ai-primary !px-6 !py-3 !text-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Timer</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className="btn-ai-glass !px-6 !py-3 !text-sm"
            >
              <BookText className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
              <span>View Notes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured AI Document & Assignment Analyzer Hero Banner */}
      <div 
        className="glass-panel p-6 sm:p-7 rounded-3xl border relative overflow-hidden group transition-all duration-300 hover:shadow-2xl"
        style={{
          borderColor: 'var(--bg-card-border-hover)'
        }}
      >
        <div 
          className="absolute -right-16 -top-16 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'var(--gradient-hero)' }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">📄</span>
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider border"
                style={{
                  backgroundColor: 'var(--chip-bg)',
                  borderColor: 'var(--chip-border)',
                  color: 'var(--accent-purple)'
                }}
              >
                NEW FEATURE
              </span>
              <span className="text-xs font-semibold text-indigo-400">
                AI Document & Assignment Analyzer
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              Find mistakes. Understand them. Improve your document.
            </h2>

            <p className="text-xs sm:text-sm font-medium max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Upload your PDF, DOCX, scanned handwritten notes, resumes, or essays. Our AI scans spelling, grammar, OCR anomalies, sentence clarity, and formatting with interactive fix suggestions.
            </p>

            {/* Quick Metrics Visual */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                18 Issues Found → 12 Fixed → 6 Suggestions
              </span>
              <span className="text-xs px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                🇬🇧 English & 🇮🇳 தமிழ் Support
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('document-analyzer')}
              className="btn-ai-primary !px-5 !py-3 !text-xs !rounded-xl flex items-center gap-2 shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>Upload Document</span>
            </button>

            <button
              onClick={() => setActiveTab('document-analyzer')}
              className="btn-ai-glass !px-4 !py-3 !text-xs !rounded-xl flex items-center gap-1.5"
            >
              <span>View Previous Reports</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Today's Study Time */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Today's Study</span>
            <span 
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'var(--chip-bg)', color: 'var(--accent-purple)' }}
            >
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {todayStudyMinutes} <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>min</span>
          </div>
          <div className="mt-2 text-xs font-medium" style={{ color: 'var(--accent-purple)' }}>
            Goal: {dailyGoalMinutes} min
          </div>
        </div>

        {/* Daily Goal Progress */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Goal Progress</span>
            <span 
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'var(--status-progress-bg)', color: 'var(--status-progress)' }}
            >
              <Target className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {progressPercent}%
          </div>
          <div 
            className="w-full h-2 rounded-full mt-3 overflow-hidden"
            style={{ backgroundColor: 'var(--bg-canvas-subtle)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: 'var(--gradient-cyan-blue)'
              }}
            />
          </div>
        </div>

        {/* Current Streak */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Current Streak</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Flame className="w-4 h-4 fill-amber-500" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-amber-500 flex items-center gap-1">
            {user?.streak || 0} <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Days 🔥</span>
          </div>
          <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            Best: {user?.bestStreak || 14} days
          </div>
        </div>

        {/* Quiz Score Avg */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Quiz Average</span>
            <span 
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'var(--status-info-bg)', color: 'var(--status-info)' }}
            >
              <HelpCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold" style={{ color: 'var(--accent-cyan)' }}>
            {avgQuizScore}%
          </div>
          <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            {quizzes.length} quizzes completed
          </div>
        </div>

        {/* Notes Created */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Notes Created</span>
            <span 
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'var(--chip-bg)', color: 'var(--accent-violet)' }}
            >
              <BookText className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {notes.length}
          </div>
          <div className="mt-2 text-xs" style={{ color: 'var(--accent-purple)' }}>
            Ready for AI Quizzes
          </div>
        </div>
      </div>

      {/* Main Content Grid: Daily Goals & Recent Study Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Today's Goals Section (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Daily Study Goals</h3>
            </div>
            <button
              onClick={() => setActiveTab('goals')}
              className="text-xs font-semibold flex items-center gap-1 transition-colors"
              style={{ color: 'var(--accent-purple)' }}
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {todayGoals.length === 0 ? (
              <div 
                className="p-6 text-center rounded-2xl border"
                style={{
                  backgroundColor: 'var(--bg-canvas-subtle)',
                  borderColor: 'var(--bg-card-border)',
                  color: 'var(--text-muted)'
                }}
              >
                <p className="text-sm">No pending goals for today!</p>
                <button
                  onClick={() => setActiveTab('goals')}
                  className="mt-3 btn-ai-primary !py-2 !px-4 !text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Goal
                </button>
              </div>
            ) : (
              todayGoals.slice(0, 4).map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                    goal.completed
                      ? 'opacity-60'
                      : 'glass-panel-interactive'
                  }`}
                  style={{
                    backgroundColor: goal.completed ? 'var(--bg-canvas-subtle)' : 'var(--bg-card)',
                    borderColor: 'var(--bg-card-border)'
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      className="shrink-0 transition-transform active:scale-90"
                      style={{ color: goal.completed ? 'var(--status-completed)' : 'var(--text-muted)' }}
                    >
                      {goal.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <p 
                        className={`text-sm font-semibold truncate ${goal.completed ? 'line-through' : ''}`}
                        style={{ color: goal.completed ? 'var(--text-muted)' : 'var(--text-primary)' }}
                      >
                        {goal.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span 
                          className="text-[11px] px-2 py-0.5 rounded-md font-medium border"
                          style={{
                            backgroundColor: 'var(--chip-bg)',
                            borderColor: 'var(--chip-border)',
                            color: 'var(--accent-purple)'
                          }}
                        >
                          {goal.subject}
                        </span>
                        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                          ⏱ {goal.targetMinutes} min
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      goal.priority === 'High'
                        ? 'status-badge-danger'
                        : goal.priority === 'Medium'
                        ? 'status-badge-warning'
                        : 'status-badge-completed'
                    }`}
                  >
                    {goal.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Study Notes & AI Quiz Launcher (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookText className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Recent Notes</h3>
            </div>
            <button
              onClick={() => setActiveTab('notes')}
              className="text-xs font-semibold flex items-center gap-1 transition-colors"
              style={{ color: 'var(--accent-cyan)' }}
            >
              <span>All Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {recentNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-2xl glass-panel-interactive relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span 
                      className="status-badge-info text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                    >
                      {note.subject}
                    </span>
                    <h4 
                      className="text-sm font-bold mt-1.5 truncate max-w-[190px]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {note.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => onStartQuiz(note)}
                    className="btn-ai-purple !py-1 !px-2.5 !text-xs !rounded-xl shrink-0"
                    title="Generate AI Quiz from this note"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Quiz</span>
                  </button>
                </div>
                <p className="text-xs line-clamp-2 mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
