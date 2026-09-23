import React from 'react';
import { 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { useEdu } from '../context/EduContext';

export const Toast = () => {
  const { toast } = useEdu();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    streak: <Flame className="w-5 h-5 text-amber-500 shrink-0 animate-bounce" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Sparkles className="w-5 h-5 shrink-0" style={{ color: 'var(--accent-cyan)' }} />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short">
      <div 
        className="flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel shadow-2xl border"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--bg-card-border-hover)',
          color: 'var(--text-primary)'
        }}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
};
