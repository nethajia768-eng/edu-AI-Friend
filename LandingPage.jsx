import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Video, 
  Layers
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const LandingPage = ({ onGetStarted, onLogin }) => {
  const { changeVisualMode, visualMode } = useEdu();

  // Helper for interactive letter-by-letter hover animation
  const renderInteractiveText = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="interactive-letter"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="space-y-24 py-8 sm:py-16 animate-in fade-in duration-300">
      
      {/* Hero Section with Interactive Typography */}
      <section className="text-center max-w-4xl mx-auto space-y-6 px-4">
        
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border animate-pulse-slow"
          style={{
            backgroundColor: 'var(--chip-bg)',
            borderColor: 'var(--chip-border)',
            color: 'var(--accent-purple)'
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-cyan)' }} />
          <span>Next-Gen AI Daily Study Companion • 3 Visual Themes</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
          {renderInteractiveText('Study Smarter.')} <br />
          <span className="gradient-text-hero">
            {renderInteractiveText('Stay Motivated.')}
          </span>{' '}
          {renderInteractiveText('Learn Better.')}
        </h1>

        <p className="text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          EduFriend is your friendly AI-powered study companion that helps you plan your study goals, create quizzes from your notes, and maintain study streaks with dynamic ambient backgrounds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onGetStarted}
            className="btn-ai-primary !w-full sm:!w-auto !px-8 !py-4 !text-sm !rounded-2xl"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onLogin}
            className="btn-ai-glass !w-full sm:!w-auto !px-8 !py-4 !text-sm !rounded-2xl"
          >
            Log In to Demo Account
          </button>
        </div>

        {/* Visual Mode Showcase Pills */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-medium mr-2" style={{ color: 'var(--text-muted)' }}>Try Visual Mode:</span>
          {[
            { id: 'animated', label: 'Dynamic Gradients & Particles', icon: Sparkles },
            { id: 'video', label: 'Study Video Ambient', icon: Video },
            { id: 'minimal', label: 'Deep Focus Mode', icon: Layers }
          ].map((m) => {
            const Icon = m.icon;
            const isSelected = visualMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => changeVisualMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected ? 'btn-ai-primary' : 'btn-ai-glass'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Highlights Banner */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl glass-panel-interactive">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Daily Goals</div>
            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Targeted study time</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel-interactive">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Focus Timer</div>
            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Pomodoro logging</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel-interactive">
            <div className="text-2xl mb-1">🤖</div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>AI Note Quizzes</div>
            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Strictly from notes</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel-interactive">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-sm font-bold text-amber-500">Study Streaks</div>
            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Habit calendar tracking</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>How EduFriend Works</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Four simple steps to transform your college study sessions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Set Your Targets',
              desc: 'Define subjects, focus minutes, and daily milestones with priority tags.'
            },
            {
              step: '02',
              title: 'Study & Time',
              desc: 'Run the built-in focus timer with gentle audio ticks to record your actual study minutes.'
            },
            {
              step: '03',
              title: 'Take Notes',
              desc: 'Write or paste lecture summaries, definitions, and formulas into your digital notebook.'
            },
            {
              step: '04',
              title: 'Generate AI Quiz',
              desc: 'Click "Generate Quiz" to test yourself immediately with AI questions made strictly from your notes.'
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel-interactive p-6 rounded-3xl relative">
              <span 
                className="text-3xl font-black block mb-2 opacity-30"
                style={{ color: 'var(--accent-purple)' }}
              >
                {item.step}
              </span>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
