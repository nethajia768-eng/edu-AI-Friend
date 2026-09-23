import React from 'react';
import { 
  Flame, 
  Calendar, 
  Sparkles, 
  Award, 
  TrendingUp, 
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const StreakPage = () => {
  const { user, sessions } = useEdu();

  // Generate 28-day calendar matrix for current month visualization
  const daysInView = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const dateStr = d.toISOString().split('T')[0];
    const daySessions = sessions.filter((s) => s.date === dateStr);
    const studyMins = daySessions.reduce((acc, s) => acc + s.durationMinutes, 0);
    const isCompleted = studyMins >= 25 || i > 20;
    return {
      date: dateStr,
      dayNum: d.getDate(),
      dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      studyMins,
      isCompleted,
      isToday: i === 27
    };
  });

  const streakAchievements = [
    { title: '3-Day Spark', days: 3, unlocked: (user?.streak || 0) >= 3, icon: '⚡' },
    { title: '7-Day Scholar', days: 7, unlocked: (user?.streak || 0) >= 7, icon: '🔥' },
    { title: '14-Day Champion', days: 14, unlocked: (user?.streak || 0) >= 14, icon: '🏆' },
    { title: '30-Day Master', days: 30, unlocked: (user?.streak || 0) >= 30, icon: '👑' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Streak Card */}
      <div className="glass-panel p-8 rounded-3xl text-center relative overflow-hidden shadow-2xl">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, #ef4444 100%)' }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div 
            className="w-24 h-24 rounded-3xl p-1 mb-4 shadow-xl shadow-amber-500/25 animate-float"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
          >
            <div 
              className="w-full h-full rounded-[22px] flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-canvas)' }}
            >
              <Flame className="w-14 h-14 fill-amber-500 text-amber-500" />
            </div>
          </div>

          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 mb-1">
            Active Streak
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-amber-500">
            {user?.streak || 7} Day Streak 🔥
          </h2>
          <p className="text-sm max-w-md mt-2" style={{ color: 'var(--text-secondary)' }}>
            “One more day to extend your streak! Small progress every day leads to massive results.”
          </p>

          <div 
            className="flex items-center gap-6 mt-6 p-3 rounded-2xl border"
            style={{
              backgroundColor: 'var(--bg-canvas-subtle)',
              borderColor: 'var(--bg-card-border)'
            }}
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--text-muted)' }}>Current</span>
              <span className="text-lg font-black text-amber-500">{user?.streak || 7} Days</span>
            </div>
            <div className="w-[1px] h-6" style={{ backgroundColor: 'var(--bg-card-border)' }} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--text-muted)' }}>Best Record</span>
              <span className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{user?.bestStreak || 14} Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Activity Calendar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Study Activity Heatmap</h3>
          </div>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Past 4 Weeks</span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {daysInView.map((d, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl text-center border transition-all ${
                d.isCompleted
                  ? 'status-badge-warning !bg-amber-500/15'
                  : ''
              } ${d.isToday ? 'ring-2 ring-purple-500' : ''}`}
              style={{
                backgroundColor: d.isCompleted ? 'var(--status-warning-bg)' : 'var(--bg-canvas-subtle)',
                borderColor: d.isCompleted ? 'var(--status-warning-border)' : 'var(--bg-card-border)',
                color: d.isCompleted ? '#d97706' : 'var(--text-muted)'
              }}
            >
              <div className="text-[10px] font-bold uppercase">{d.dayName}</div>
              <div className="text-sm font-black mt-0.5" style={{ color: d.isCompleted ? '#d97706' : 'var(--text-primary)' }}>
                {d.dayNum}
              </div>
              <div className="text-[10px] mt-1">
                {d.isCompleted ? '🔥' : '•'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Badges */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Streak Milestones & Badges</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {streakAchievements.map((ach) => (
            <div
              key={ach.title}
              className={`p-4 rounded-2xl border text-center transition-all ${
                ach.unlocked
                  ? 'glass-panel-interactive'
                  : 'opacity-50'
              }`}
              style={{
                backgroundColor: ach.unlocked ? 'var(--bg-card)' : 'var(--bg-canvas-subtle)',
                borderColor: ach.unlocked ? 'var(--bg-card-border-hover)' : 'var(--bg-card-border)'
              }}
            >
              <div className="text-3xl mb-2">{ach.icon}</div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{ach.title}</h4>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{ach.days} Consecutive Days</p>
              <span 
                className={`inline-block mt-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  ach.unlocked ? 'status-badge-completed' : 'status-badge-warning'
                }`}
              >
                {ach.unlocked ? 'Unlocked' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
