import React from 'react';
import { 
  BarChart3, 
  Clock, 
  Award, 
  HelpCircle, 
  TrendingUp, 
  CheckCircle,
  Flame
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const ProgressPage = () => {
  const { sessions, goals, quizzes, user } = useEdu();

  // Weekly study data for Mon-Sun
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 65 },
    { day: 'Sun', minutes: 40 }
  ];

  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 80);
  const totalWeeklyMinutes = weeklyData.reduce((acc, d) => acc + d.minutes, 0);
  const totalHours = ((user?.totalStudyMinutes || 480) / 60).toFixed(1);
  const completedGoalsCount = goals.filter(g => g.completed).length;

  const avgQuizScore = quizzes.length > 0
    ? Math.round(quizzes.reduce((acc, q) => acc + (q.percentage || 0), 0) / quizzes.length)
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <BarChart3 className="w-6 h-6" style={{ color: 'var(--accent-purple)' }} />
          <span>Progress & Learning Analytics</span>
        </h2>
        <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
          Visualize your study consistency, weekly hours, and quiz mastery over time.
        </p>
      </div>

      {/* Top Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Total Study Hours</span>
          <div className="text-2xl font-black mt-1" style={{ color: 'var(--text-primary)' }}>
            {totalHours} <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>hrs</span>
          </div>
          <span className="text-[11px] font-medium" style={{ color: 'var(--accent-purple)' }}>All sessions recorded</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Weekly Study Time</span>
          <div className="text-2xl font-black mt-1" style={{ color: 'var(--accent-blue)' }}>
            {totalWeeklyMinutes} <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>mins</span>
          </div>
          <span className="text-[11px] font-medium" style={{ color: 'var(--status-completed)' }}>↑ 18% vs previous week</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Goals Completed</span>
          <div className="text-2xl font-black mt-1" style={{ color: 'var(--status-completed)' }}>
            {completedGoalsCount} / {goals.length}
          </div>
          <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Active daily milestones</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Average Quiz Score</span>
          <div className="text-2xl font-black mt-1" style={{ color: 'var(--accent-cyan)' }}>
            {avgQuizScore}%
          </div>
          <span className="text-[11px] font-medium" style={{ color: 'var(--accent-cyan)' }}>Across {quizzes.length} quizzes</span>
        </div>
      </div>

      {/* Weekly Study Time Bar Chart */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Weekly Study Time</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Daily focus minutes (Current Week)</p>
          </div>
          <span 
            className="text-xs font-bold px-3 py-1 rounded-full border"
            style={{
              backgroundColor: 'var(--chip-bg)',
              borderColor: 'var(--chip-border)',
              color: 'var(--accent-purple)'
            }}
          >
            Target: 60m / day
          </span>
        </div>

        {/* CSS/SVG Bar Chart */}
        <div className="pt-6 pb-2">
          <div className="h-52 flex items-end justify-between gap-2 sm:gap-4 px-2">
            {weeklyData.map((item, idx) => {
              const heightPercent = (item.minutes / maxMinutes) * 100;
              const isHigh = item.minutes >= 60;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                    {item.minutes}m
                  </span>
                  <div 
                    className="w-full max-w-[48px] rounded-2xl p-1 flex items-end h-40"
                    style={{ backgroundColor: 'var(--bg-canvas-subtle)' }}
                  >
                    <div
                      className={`w-full rounded-xl transition-all duration-700 ease-out ${
                        isHigh ? 'shadow-md' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        height: `${heightPercent}%`,
                        background: isHigh ? 'var(--gradient-blue-purple)' : 'var(--accent-blue)'
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold mt-1" style={{ color: 'var(--text-muted)' }}>{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subject Distribution & Performance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Subject Time Breakdown</h3>
          <div className="space-y-3">
            {[
              { subject: 'Machine Learning', percent: 45, gradient: 'var(--gradient-blue-purple)' },
              { subject: 'Data Structures', percent: 30, gradient: 'var(--gradient-cyan-blue)' },
              { subject: 'Python', percent: 25, gradient: 'var(--gradient-violet-pink)' }
            ].map((sub, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span style={{ color: 'var(--text-secondary)' }}>{sub.subject}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{sub.percent}%</span>
                </div>
                <div 
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-canvas-subtle)' }}
                >
                  <div className="h-full rounded-full" style={{ width: `${sub.percent}%`, background: sub.gradient }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Study Habit Insights</h3>
          <div className="space-y-3 text-xs">
            <div 
              className="p-3.5 rounded-2xl border flex items-center gap-3"
              style={{
                backgroundColor: 'var(--bg-canvas-subtle)',
                borderColor: 'var(--bg-card-border)'
              }}
            >
              <span className="text-2xl">⏰</span>
              <div>
                <strong className="block font-semibold" style={{ color: 'var(--text-primary)' }}>Peak Productivity Hour</strong>
                <span style={{ color: 'var(--text-muted)' }}>Most focused sessions happen between 6:00 PM – 9:00 PM.</span>
              </div>
            </div>
            <div 
              className="p-3.5 rounded-2xl border flex items-center gap-3"
              style={{
                backgroundColor: 'var(--bg-canvas-subtle)',
                borderColor: 'var(--bg-card-border)'
              }}
            >
              <span className="text-2xl">💡</span>
              <div>
                <strong className="block font-semibold" style={{ color: 'var(--text-primary)' }}>Quiz Retention Rate</strong>
                <span style={{ color: 'var(--text-muted)' }}>Taking quizzes immediately after notes increases retention by 73%.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
