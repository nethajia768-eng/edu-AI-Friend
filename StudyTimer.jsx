import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Flame,
  Award
} from 'lucide-react';
import { useEdu } from '../context/EduContext';
import confetti from 'canvas-confetti';

export const StudyTimer = ({ onSessionCompleted }) => {
  const { recordStudySession, user } = useEdu();
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [subject, setSubject] = useState('Machine Learning');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play subtle synthesized audio beep
  const playSound = (freq = 600, duration = 0.2) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context may be restricted before gesture
    }
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Session finished
      playSound(880, 0.6);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      recordStudySession(selectedMinutes, subject);
      if (onSessionCompleted) onSessionCompleted(selectedMinutes, subject);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleSetPreset = (mins) => {
    setIsRunning(false);
    setSelectedMinutes(mins);
    setTimeLeft(mins * 60);
    playSound(440, 0.1);
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
    playSound(isRunning ? 350 : 650, 0.15);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
    playSound(300, 0.15);
  };

  const handleManualLog = () => {
    const minutesCompleted = Math.max(1, Math.round((selectedMinutes * 60 - timeLeft) / 60));
    if (minutesCompleted < 1) return;
    setIsRunning(false);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    recordStudySession(minutesCompleted, subject);
    setTimeLeft(selectedMinutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((selectedMinutes * 60 - timeLeft) / (selectedMinutes * 60)) * 100;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
      {/* Background glow orb */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: 'var(--gradient-hero)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-2">
            <span 
              className="p-1.5 rounded-lg"
              style={{ backgroundColor: 'var(--chip-bg)', color: 'var(--accent-purple)' }}
            >
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Focus Session
            </span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl border transition-colors"
            style={{
              backgroundColor: 'var(--bg-canvas-subtle)',
              borderColor: 'var(--bg-card-border)',
              color: soundEnabled ? 'var(--text-secondary)' : 'var(--status-danger)'
            }}
            title={soundEnabled ? 'Mute chimes' : 'Enable chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Subject selector */}
        <div className="mb-6 w-full max-w-xs">
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Focus Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isRunning}
            className="w-full border rounded-xl px-3.5 py-2 text-sm focus:outline-none transition-colors"
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
            <option value="General Study">General Study</option>
          </select>
        </div>

        {/* Circular Animated Timer Display */}
        <div className="relative w-56 h-56 flex items-center justify-center my-4">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="112"
              cy="112"
              r="95"
              strokeWidth="10"
              fill="transparent"
              style={{ stroke: 'var(--bg-canvas-subtle)' }}
            />
            <circle
              cx="112"
              cy="112"
              r="95"
              className="transition-all duration-1000 ease-linear"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 95}
              strokeDashoffset={2 * Math.PI * 95 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
              style={{
                stroke: 'var(--accent-purple)',
                filter: 'drop-shadow(0 0 12px var(--accent-glow))'
              }}
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-black tracking-tight font-mono" style={{ color: 'var(--text-primary)' }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span 
              className="text-xs font-bold uppercase tracking-wider mt-1"
              style={{ color: isRunning ? 'var(--status-completed)' : 'var(--accent-purple)' }}
            >
              {isRunning ? 'Studying...' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Preset quick buttons */}
        <div className="flex items-center gap-2 mb-6">
          {[15, 25, 45, 60].map((m) => {
            const isSelected = selectedMinutes === m;
            return (
              <button
                key={m}
                onClick={() => handleSetPreset(m)}
                disabled={isRunning}
                className={isSelected ? 'btn-ai-primary !py-1 !px-3 !text-xs !rounded-xl' : 'btn-ai-glass !py-1 !px-3 !text-xs !rounded-xl'}
              >
                {m}m
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="btn-ai-glass !p-3 !rounded-2xl"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleToggle}
            className={isRunning ? 'px-8 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:scale-105' : 'btn-ai-primary !px-8 !py-3 !text-sm !rounded-2xl'}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start Studying</span>
              </>
            )}
          </button>

          {timeLeft < selectedMinutes * 60 && (
            <button
              onClick={handleManualLog}
              className="btn-ai-cyan !p-3 !rounded-2xl"
              title="End & Save Session Now"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          )}
        </div>

        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          Completing a session automatically logs your study minutes & extends your daily streak!
        </p>
      </div>
    </div>
  );
};
