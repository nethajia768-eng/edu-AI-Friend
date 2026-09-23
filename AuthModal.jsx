import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  X,
  AlertCircle
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { updateUser, showToast, setActiveTab } = useEdu();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('nethaji@edufriend.ai');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Nethaji');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!isLogin && !name) {
      setError('Please enter your full name.');
      return;
    }

    updateUser({
      name: isLogin ? (name || 'Nethaji') : name,
      email
    });

    showToast(isLogin ? `Welcome back, ${name || 'Nethaji'}!` : 'Registration successful! Welcome to EduFriend!', 'success');
    setActiveTab('dashboard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border animate-in fade-in zoom-in-95 duration-200"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--bg-card-border-hover)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div 
            className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-white text-xl mb-3 shadow-lg"
            style={{ background: 'var(--gradient-blue-purple)' }}
          >
            🎓
          </div>
          <h3 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
            {isLogin ? 'Welcome Back' : 'Create Student Account'}
          </h3>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'Continue your daily study streak' : 'Start your journey with EduFriend AI'}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl status-badge-danger text-xs mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Nethaji"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--bg-input-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--bg-input-border)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--bg-input-border)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--bg-input-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="hover:underline text-xs" style={{ color: 'var(--accent-purple)' }}>
                Forgot password?
              </button>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full btn-ai-primary !py-3 !text-sm"
            >
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-bold hover:underline ml-1"
                style={{ color: 'var(--accent-purple)' }}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="font-bold hover:underline ml-1"
                style={{ color: 'var(--accent-purple)' }}
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
