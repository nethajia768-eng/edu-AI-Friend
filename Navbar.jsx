import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Video, 
  Moon, 
  Sun, 
  Eye, 
  Flame, 
  Target, 
  Timer, 
  BookText, 
  History, 
  BarChart3, 
  User, 
  Menu, 
  X,
  Tv,
  FileCheck2
} from 'lucide-react';
import { useEdu, COLOR_PALETTES, STUDY_VIDEOS } from '../context/EduContext';

export const Navbar = ({ onOpenAuth }) => {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    visualMode, 
    changeVisualMode, 
    themeMode, 
    changeThemeMode, 
    colorPalette, 
    changeColorPalette,
    videoTheme,
    changeVideoTheme
  } = useEdu();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'document-analyzer', label: '📄 AI Document Analyzer', icon: FileCheck2, highlight: true },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'timer', label: 'Study Timer', icon: Timer },
    { id: 'notes', label: 'Notes', icon: BookText },
    { id: 'quizzes', label: 'Quiz History', icon: History },
    { id: 'streak', label: 'Streak', icon: Flame },
    { id: 'progress', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-500"
      style={{
        backgroundColor: 'var(--bg-nav)',
        borderColor: 'var(--bg-nav-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl p-[2px] transition-transform group-hover:scale-105 duration-200"
                 style={{ background: 'var(--gradient-blue-purple)' }}>
              <div className="w-full h-full rounded-[10px] flex items-center justify-center"
                   style={{ backgroundColor: 'var(--bg-canvas)' }}>
                <span className="text-xl">🎓</span>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight gradient-text-hero">
                EduFriend
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold border transition-colors"
                    style={{
                      backgroundColor: 'var(--chip-bg)',
                      borderColor: 'var(--chip-border)',
                      color: 'var(--accent-purple)'
                    }}>
                AI Companion
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'shadow-sm'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--chip-bg)' : 'transparent',
                    color: isActive ? 'var(--accent-purple)' : 'var(--text-muted)',
                    borderColor: isActive ? 'var(--bg-card-border-hover)' : 'transparent',
                    borderWidth: '1px'
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: isActive ? 'var(--accent-purple)' : 'currentColor' }} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Visual Mode Selector, Color Palette & Profile */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Visual Mode Selector Popover / Button */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="btn-ai-glass !py-1.5 !px-3 !text-xs !rounded-xl"
                title="Themes & Visual Customization"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: 'var(--accent-cyan)' }} />
                <span className="capitalize">{visualMode} • {themeMode}</span>
              </button>

              {/* Theme & Visual Mode Dropdown */}
              {themeDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 glass-panel p-4 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  style={{ borderColor: 'var(--bg-card-border-hover)' }}
                  onMouseLeave={() => setThemeDropdownOpen(false)}
                >
                  {/* 1. Three Theme Modes (Light, Dark, Bright/Colorful) */}
                  <div className="mb-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-2"
                          style={{ color: 'var(--text-muted)' }}>
                      🎨 Display Theme Mode
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'dark', label: 'Dark', sub: 'Midnight Navy', icon: Moon },
                        { id: 'light', label: 'Light', sub: 'Clean Off-White', icon: Sun },
                        { id: 'colorful', label: 'Colorful', sub: 'Energetic AI', icon: Sparkles }
                      ].map((t) => {
                        const Icon = t.icon;
                        const isSelected = themeMode === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => changeThemeMode(t.id)}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all ${
                              isSelected
                                ? 'shadow-md scale-102 ring-1'
                                : 'hover:scale-102'
                            }`}
                            style={{
                              background: isSelected ? 'var(--gradient-blue-purple)' : 'var(--bg-canvas-subtle)',
                              color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                              ringColor: 'var(--accent-cyan)'
                            }}
                          >
                            <Icon className="w-4 h-4 mb-1" />
                            <span className="text-xs font-bold leading-none">{t.label}</span>
                            <span className="text-[9px] opacity-75 mt-0.5">{t.sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Visual Background Mode */}
                  <div className="mb-3.5 pt-3 border-t" style={{ borderColor: 'var(--bg-card-border)' }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-2"
                          style={{ color: 'var(--text-muted)' }}>
                      ✨ Ambient Mode
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'animated', label: 'AI Particles', icon: Sparkles },
                        { id: 'video', label: 'Video Scene', icon: Video },
                        { id: 'minimal', label: 'Focus', icon: Eye }
                      ].map((m) => {
                        const Icon = m.icon;
                        const isSelected = visualMode === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => changeVisualMode(m.id)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[11px] font-semibold transition-all ${
                              isSelected
                                ? 'text-white shadow-md'
                                : 'hover:opacity-80'
                            }`}
                            style={{
                              background: isSelected ? 'var(--gradient-purple-violet)' : 'var(--bg-canvas-subtle)',
                              color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                            }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Color Palette Family */}
                  <div className="pt-3 border-t" style={{ borderColor: 'var(--bg-card-border)' }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-2"
                          style={{ color: 'var(--text-muted)' }}>
                      🌈 Color Accent System
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.keys(COLOR_PALETTES).map((pKey) => {
                        const pal = COLOR_PALETTES[pKey];
                        const isSelected = colorPalette === pKey;
                        return (
                          <button
                            key={pKey}
                            onClick={() => changeColorPalette(pKey)}
                            className="flex items-center gap-2 p-1.5 px-2 rounded-xl text-[11px] font-medium transition-all"
                            style={{
                              backgroundColor: isSelected ? 'var(--chip-bg)' : 'transparent',
                              color: isSelected ? 'var(--accent-purple)' : 'var(--text-secondary)',
                              border: isSelected ? '1px solid var(--bg-card-border-hover)' : '1px solid transparent'
                            }}
                          >
                            <span 
                              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs" 
                              style={{ backgroundColor: pal.accent }} 
                            />
                            <span className="truncate">{pal.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. If Video mode active, allow choosing study video */}
                  {visualMode === 'video' && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--bg-card-border)' }}>
                      <span className="text-[10px] font-bold uppercase tracking-wider block mb-1.5"
                            style={{ color: 'var(--text-muted)' }}>
                        Study Video Scene
                      </span>
                      <div className="space-y-1">
                        {Object.keys(STUDY_VIDEOS).map((vKey) => {
                          const v = STUDY_VIDEOS[vKey];
                          const isSelected = videoTheme === vKey;
                          return (
                            <button
                              key={vKey}
                              onClick={() => changeVideoTheme(vKey)}
                              className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between"
                              style={{
                                backgroundColor: isSelected ? 'var(--chip-bg)' : 'transparent',
                                color: isSelected ? 'var(--accent-purple)' : 'var(--text-secondary)'
                              }}
                            >
                              <span>{v.name}</span>
                              <Tv className="w-3 h-3" style={{ color: 'var(--accent-purple)' }} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Streak Badge */}
            <button 
              onClick={() => setActiveTab('streak')}
              className="status-badge-warning flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs font-bold hover:scale-105"
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{user?.streak || 0}d</span>
            </button>

            {/* Profile Avatar button */}
            <button
              onClick={() => setActiveTab('profile')}
              className="btn-ai-glass !py-1 !pl-2 !pr-3 !rounded-full !text-xs"
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                style={{ background: 'var(--gradient-cyan-blue)' }}
              >
                {user?.avatar || '🎓'}
              </div>
              <span className="font-semibold max-w-[90px] truncate">{user?.name || 'Student'}</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => changeThemeMode(themeMode === 'dark' ? 'light' : themeMode === 'light' ? 'colorful' : 'dark')}
              className="p-2 rounded-xl border text-xs"
              style={{
                backgroundColor: 'var(--bg-canvas-subtle)',
                borderColor: 'var(--bg-card-border)',
                color: 'var(--accent-purple)'
              }}
              title="Toggle Theme"
            >
              {themeMode === 'dark' ? <Moon className="w-4 h-4" /> : themeMode === 'light' ? <Sun className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl border"
              style={{
                backgroundColor: 'var(--bg-canvas-subtle)',
                borderColor: 'var(--bg-card-border)',
                color: 'var(--text-primary)'
              }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div 
          className="lg:hidden px-4 pt-2 pb-6 border-b backdrop-blur-2xl"
          style={{
            backgroundColor: 'var(--bg-nav)',
            borderColor: 'var(--bg-nav-border)'
          }}
        >
          {/* Mobile Theme Switcher Bar */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'colorful', label: 'Colorful', icon: Sparkles }
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = themeMode === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => changeThemeMode(t.id)}
                  className="flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold"
                  style={{
                    background: isSelected ? 'var(--gradient-blue-purple)' : 'var(--bg-card)',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: isActive ? 'var(--chip-bg)' : 'var(--bg-card)',
                    color: isActive ? 'var(--accent-purple)' : 'var(--text-secondary)',
                    border: isActive ? '1px solid var(--bg-card-border-hover)' : '1px solid var(--bg-card-border)'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
