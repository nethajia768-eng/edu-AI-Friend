import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Key, 
  Flame, 
  Award, 
  Clock, 
  Check, 
  Save, 
  ShieldCheck,
  Target,
  Palette,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const ProfilePage = () => {
  const { 
    user, 
    updateUser, 
    apiKey, 
    saveApiKey, 
    goals, 
    quizzes, 
    themeMode, 
    changeThemeMode, 
    colorPalette, 
    changeColorPalette,
    COLOR_PALETTES 
  } = useEdu();

  const [name, setName] = useState(user?.name || 'Nethaji');
  const [email, setEmail] = useState(user?.email || 'nethaji@edufriend.ai');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(user?.dailyGoalMinutes || 60);
  const [avatar, setAvatar] = useState(user?.avatar || '👨‍🎓');
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const avatars = ['👨‍🎓', '👩‍🎓', '🧠', '🚀', '⚡', '🦉', '💻', '💡'];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      dailyGoalMinutes: Number(dailyGoalMinutes),
      avatar
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    saveApiKey(keyInput.trim());
  };

  const completedGoals = goals.filter(g => g.completed).length;
  const bestQuizScore = quizzes.length > 0 
    ? Math.max(...quizzes.map(q => q.percentage || 0)) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Header Banner */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div 
              className="w-24 h-24 rounded-3xl p-[2px] shadow-xl"
              style={{ background: 'var(--gradient-hero)' }}
            >
              <div 
                className="w-full h-full rounded-[22px] flex items-center justify-center text-5xl"
                style={{ backgroundColor: 'var(--bg-canvas)' }}
              >
                {avatar}
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                {name}
              </h2>
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: 'var(--chip-bg)',
                  borderColor: 'var(--chip-border)',
                  color: 'var(--accent-purple)'
                }}
              >
                Scholar
              </span>
            </div>
            <p className="text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-1.5"
               style={{ color: 'var(--text-muted)' }}>
              <Mail className="w-3.5 h-3.5" />
              <span>{email}</span>
            </p>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t text-center"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <div>
            <span className="text-[10px] uppercase font-bold block" style={{ color: 'var(--text-muted)' }}>
              Study Time
            </span>
            <span className="text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>
              {Math.round((user?.totalStudyMinutes || 480) / 60)} hrs
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold block" style={{ color: 'var(--text-muted)' }}>
              Streak
            </span>
            <span className="text-base font-extrabold text-amber-500">
              {user?.streak || 7} Days 🔥
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold block" style={{ color: 'var(--text-muted)' }}>
              Best Quiz
            </span>
            <span className="text-base font-extrabold" style={{ color: 'var(--status-completed)' }}>
              {bestQuizScore}%
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold block" style={{ color: 'var(--text-muted)' }}>
              Goals Done
            </span>
            <span className="text-base font-extrabold" style={{ color: 'var(--accent-cyan)' }}>
              {completedGoals}
            </span>
          </div>
        </div>
      </div>

      {/* 🎨 Dedicated Theme & Visual Appearance Setting */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Theme & AI Color System
            </h3>
          </div>
          <span 
            className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
            style={{
              backgroundColor: 'var(--chip-bg)',
              color: 'var(--accent-purple)'
            }}
          >
            Active: {themeMode}
          </span>
        </div>

        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Choose your preferred visual mode. The entire color hierarchy, contrast tokens, gradients, and backgrounds will smoothly transition with fluid 400ms physics.
        </p>

        {/* 3 Visual Modes Interactive Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 'dark',
              title: 'Dark Mode',
              subtitle: 'AI Technology & Focus',
              desc: 'Midnight navy background, crisp light text, electric blue + AI purple + cyan accents with subtle neon glow.',
              icon: Moon,
              bgPreview: '#050814',
              accentPreview: '#8b5cf6',
              textColor: '#f8fafc'
            },
            {
              id: 'light',
              title: 'Light Mode',
              subtitle: 'Clean Educational',
              desc: 'Pure off-white background, deep navy text, harmonious blue + purple accents, and soft colorful card borders.',
              icon: Sun,
              bgPreview: '#f8fafc',
              accentPreview: '#2563eb',
              textColor: '#0f172a'
            },
            {
              id: 'colorful',
              title: 'Bright / Colorful Mode',
              subtitle: 'Energetic Student Learning',
              desc: 'Light sky/violet background, visible colorful gradients, cyan, purple, blue, and teal accents for high motivation.',
              icon: Sparkles,
              bgPreview: '#eef2ff',
              accentPreview: '#06b6d4',
              textColor: '#0b1329'
            }
          ].map((modeItem) => {
            const Icon = modeItem.icon;
            const isSelected = themeMode === modeItem.id;
            return (
              <div
                key={modeItem.id}
                onClick={() => changeThemeMode(modeItem.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative border ${
                  isSelected
                    ? 'ring-2 shadow-xl scale-[1.02]'
                    : 'opacity-85 hover:opacity-100 hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--accent-purple)' : 'var(--bg-card-border)',
                  ringColor: 'var(--accent-purple)'
                }}
              >
                {isSelected && (
                  <span 
                    className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                    style={{ background: 'var(--gradient-blue-purple)' }}
                  >
                    Active
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                    style={{ background: isSelected ? 'var(--gradient-blue-purple)' : 'var(--bg-canvas-subtle)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isSelected ? '#ffffff' : 'var(--accent-purple)' }} />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {modeItem.title}
                    </h4>
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {modeItem.subtitle}
                    </span>
                  </div>
                </div>

                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {modeItem.desc}
                </p>

                {/* Color Swatch Preview */}
                <div 
                  className="mt-4 p-2.5 rounded-xl border flex items-center justify-between"
                  style={{
                    backgroundColor: modeItem.bgPreview,
                    borderColor: 'rgba(150, 150, 150, 0.2)'
                  }}
                >
                  <span className="text-[11px] font-bold" style={{ color: modeItem.textColor }}>
                    Aa Text
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-xs" />
                    <span className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-xs" />
                    <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-xs" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-xs" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Color Palette Accent Family */}
        <div className="pt-4 border-t" style={{ borderColor: 'var(--bg-card-border)' }}>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
            Accent Color Family
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(COLOR_PALETTES || {}).map((pKey) => {
              const pal = COLOR_PALETTES[pKey];
              const isSelected = colorPalette === pKey;
              return (
                <button
                  key={pKey}
                  type="button"
                  onClick={() => changeColorPalette(pKey)}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all border text-left"
                  style={{
                    backgroundColor: isSelected ? 'var(--chip-bg)' : 'var(--bg-card)',
                    borderColor: isSelected ? 'var(--bg-card-border-hover)' : 'var(--bg-card-border)',
                    color: isSelected ? 'var(--accent-purple)' : 'var(--text-secondary)'
                  }}
                >
                  <span 
                    className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: pal.accent }}
                  />
                  <span className="truncate">{pal.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          Student Details & Preferences
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Choose Avatar
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {avatars.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setAvatar(av)}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border transition-all"
                  style={{
                    backgroundColor: avatar === av ? 'var(--chip-bg)' : 'var(--bg-canvas-subtle)',
                    borderColor: avatar === av ? 'var(--accent-purple)' : 'var(--bg-card-border)',
                    transform: avatar === av ? 'scale(1.06)' : 'none'
                  }}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl px-3.5 py-2.5 text-sm transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--bg-input-border)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl px-3.5 py-2.5 text-sm transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--bg-input-border)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Daily Study Target (Minutes)
            </label>
            <input
              type="number"
              min="15"
              max="360"
              value={dailyGoalMinutes}
              onChange={(e) => setDailyGoalMinutes(e.target.value)}
              className="w-full max-w-xs border rounded-xl px-3.5 py-2.5 text-sm transition-colors focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--bg-input-border)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="btn-ai-primary"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
            {savedSuccess && (
              <span className="status-badge-completed px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> Changes Saved!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* AI Settings / OpenAI API Key Configuration */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            AI Engine Configuration
          </h3>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          EduFriend uses a built-in intelligent extractor by default. To use your personal OpenAI GPT model for quiz generation, paste your API key below. The key is stored safely in your browser only.
        </p>

        <form onSubmit={handleSaveKey} className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="password"
            placeholder="sk-..."
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="flex-1 border rounded-xl px-3.5 py-2.5 text-sm font-mono text-xs transition-colors focus:outline-none"
            style={{
              backgroundColor: 'var(--bg-input)',
              borderColor: 'var(--bg-input-border)',
              color: 'var(--text-primary)'
            }}
          />
          <button
            type="submit"
            className="btn-ai-cyan"
          >
            Save API Key
          </button>
        </form>
      </div>
    </div>
  );
};
