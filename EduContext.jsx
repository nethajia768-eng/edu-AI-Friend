import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStored, setStored, STORAGE_KEYS, initStorage } from '../services/storage';

const EduContext = createContext(null);

export const COLOR_PALETTES = {
  purple: {
    id: 'purple',
    name: 'Electric Blue & AI Purple',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    primary: 'purple',
    accent: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.4)',
    orbs: [
      'from-blue-600/35 to-purple-600/30',
      'from-cyan-500/25 via-indigo-600/25 to-purple-600/25',
      'from-violet-600/30 to-pink-500/20'
    ]
  },
  cyan: {
    id: 'cyan',
    name: 'Ocean Cyan & Teal',
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
    primary: 'cyan',
    accent: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    orbs: [
      'from-cyan-500/35 to-blue-600/30',
      'from-teal-400/25 via-sky-500/25 to-indigo-600/25',
      'from-emerald-400/25 to-cyan-600/30'
    ]
  },
  violet: {
    id: 'violet',
    name: 'Violet & Sky Blue',
    gradient: 'from-violet-600 via-purple-600 to-sky-500',
    primary: 'violet',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    orbs: [
      'from-violet-600/35 to-pink-600/25',
      'from-purple-500/25 via-sky-500/25 to-indigo-600/25',
      'from-pink-500/25 to-violet-600/30'
    ]
  },
  emerald: {
    id: 'emerald',
    name: 'Aurora Emerald & Neon',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    primary: 'emerald',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    orbs: [
      'from-emerald-500/35 to-teal-600/25',
      'from-cyan-500/25 via-emerald-600/25 to-blue-600/25',
      'from-lime-500/20 to-teal-700/30'
    ]
  }
};

export const STUDY_VIDEOS = {
  cosmic: {
    id: 'cosmic',
    name: 'Cosmic Library',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4',
    fallbackGradient: 'from-indigo-950 via-purple-950 to-slate-950'
  },
  lofi: {
    id: 'lofi',
    name: 'Rainy Cafe Study',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-water-of-a-lake-seen-up-close-18312-large.mp4',
    fallbackGradient: 'from-slate-950 via-blue-950 to-slate-900'
  },
  aurora: {
    id: 'aurora',
    name: 'Glowing Particle Stream',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    fallbackGradient: 'from-violet-950 via-slate-950 to-indigo-950'
  }
};

export const EduProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [notes, setNotes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [toast, setToast] = useState(null);

  // Document Analyzer State
  const [documentHistory, setDocumentHistory] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [analyzerLanguage, setAnalyzerLanguage] = useState('en'); // 'en' | 'ta'

  // Visual System State
  const [visualMode, setVisualMode] = useState('animated'); // 'animated' | 'video' | 'minimal'
  const [themeMode, setThemeMode] = useState('dark'); // 'dark' | 'light' | 'lofi'
  const [colorPalette, setColorPalette] = useState('purple'); // 'purple' | 'cyan' | 'sunset' | 'emerald'
  const [videoTheme, setVideoTheme] = useState('cosmic');

  useEffect(() => {
    initStorage();
    setUser(getStored(STORAGE_KEYS.USER, null));
    setGoals(getStored(STORAGE_KEYS.GOALS, []));
    setNotes(getStored(STORAGE_KEYS.NOTES, []));
    setQuizzes(getStored(STORAGE_KEYS.QUIZZES, []));
    setSessions(getStored(STORAGE_KEYS.SESSIONS, []));
    setDocumentHistory(getStored(STORAGE_KEYS.DOCUMENT_ANALYSIS, []));
    setApiKey(getStored('edufriend_api_key', ''));

    const savedVisual = getStored('edufriend_visual_mode', 'animated');
    let savedTheme = getStored('edufriend_theme_mode', 'dark');
    if (savedTheme === 'lofi') savedTheme = 'colorful'; // migrate legacy lofi mode to colorful
    const savedPalette = getStored('edufriend_color_palette', 'purple');
    const savedVideo = getStored('edufriend_video_theme', 'cosmic');

    setVisualMode(savedVisual);
    setThemeMode(savedTheme);
    setColorPalette(savedPalette);
    setVideoTheme(savedVideo);

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const changeVisualMode = (mode) => {
    setVisualMode(mode);
    setStored('edufriend_visual_mode', mode);
    showToast(`Visual Mode set to: ${mode.toUpperCase()}`, 'info');
  };

  const changeThemeMode = (mode) => {
    const targetMode = mode === 'lofi' ? 'colorful' : mode;
    setThemeMode(targetMode);
    setStored('edufriend_theme_mode', targetMode);
    document.documentElement.setAttribute('data-theme', targetMode);
    document.body.setAttribute('data-theme', targetMode);

    const friendlyNames = {
      dark: 'DARK MODE (Midnight Deep Navy)',
      light: 'LIGHT MODE (Clean Educational)',
      colorful: 'BRIGHT / COLORFUL MODE (Energetic AI)'
    };
    showToast(`Theme: ${friendlyNames[targetMode] || targetMode.toUpperCase()}`, 'info');
  };

  const changeColorPalette = (paletteKey) => {
    setColorPalette(paletteKey);
    setStored('edufriend_color_palette', paletteKey);
    showToast(`Color Pattern: ${COLOR_PALETTES[paletteKey]?.name}`, 'info');
  };

  const changeVideoTheme = (vKey) => {
    setVideoTheme(vKey);
    setStored('edufriend_video_theme', vKey);
    showToast(`Study Video: ${STUDY_VIDEOS[vKey]?.name}`, 'info');
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr && curr.id ? null : curr));
    }, 4000);
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      setStored(STORAGE_KEYS.USER, updated);
      return updated;
    });
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    setStored('edufriend_api_key', key);
    showToast('OpenAI API Key saved securely in your browser!', 'success');
  };

  const addGoal = (goal) => {
    const newGoal = {
      id: 'goal_' + Date.now(),
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      completed: false,
      ...goal
    };
    const updated = [newGoal, ...goals];
    setGoals(updated);
    setStored(STORAGE_KEYS.GOALS, updated);
    showToast(`New goal added: ${newGoal.title}`, 'success');
    return newGoal;
  };

  const toggleGoal = (id) => {
    let completedState = false;
    const updated = goals.map((g) => {
      if (g.id === id) {
        completedState = !g.completed;
        return { ...g, completed: completedState };
      }
      return g;
    });
    setGoals(updated);
    setStored(STORAGE_KEYS.GOALS, updated);

    if (completedState) {
      const allCompletedToday = updated.filter((g) => !g.completed).length === 0;
      if (allCompletedToday && user) {
        updateUser({ streak: (user.streak || 0) + 1 });
        showToast('🔥 Goal completed! Your study streak increased!', 'streak');
      } else {
        showToast('Great job! Goal marked as completed!', 'success');
      }
    }
  };

  const deleteGoal = (id) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    setStored(STORAGE_KEYS.GOALS, updated);
    showToast('Goal removed', 'info');
  };

  const addNote = (note) => {
    const newNote = {
      id: 'note_' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...note
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    setStored(STORAGE_KEYS.NOTES, updated);
    showToast(`Note "${newNote.title}" created successfully!`, 'success');
    return newNote;
  };

  const updateNote = (id, fields) => {
    const updated = notes.map((n) => {
      if (n.id === id) {
        return { ...n, ...fields, updatedAt: new Date().toISOString() };
      }
      return n;
    });
    setNotes(updated);
    setStored(STORAGE_KEYS.NOTES, updated);
    showToast('Note updated!', 'success');
  };

  const deleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    setStored(STORAGE_KEYS.NOTES, updated);
    showToast('Note deleted', 'info');
  };

  const recordStudySession = (minutes, subject = 'General Study') => {
    const newSession = {
      id: 'sess_' + Date.now(),
      subject,
      durationMinutes: minutes,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now()
    };
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    setStored(STORAGE_KEYS.SESSIONS, updatedSessions);

    if (user) {
      const newTotal = (user.totalStudyMinutes || 0) + minutes;
      updateUser({ totalStudyMinutes: newTotal });
    }

    showToast(`Logged ${minutes} minutes of ${subject}! Fantastic focus!`, 'streak');
  };

  const saveQuizResult = (quizData) => {
    const newQuiz = {
      id: 'quiz_' + Date.now(),
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      ...quizData
    };
    const updated = [newQuiz, ...quizzes];
    setQuizzes(updated);
    setStored(STORAGE_KEYS.QUIZZES, updated);
    return newQuiz;
  };

  const saveDocumentAnalysis = (analysisData) => {
    const newDoc = {
      id: analysisData.id || ('doc_' + Date.now()),
      createdAt: new Date().toISOString(),
      ...analysisData
    };
    const updated = [newDoc, ...documentHistory.filter(d => d.id !== newDoc.id)];
    setDocumentHistory(updated);
    setActiveDocument(newDoc);
    setStored(STORAGE_KEYS.DOCUMENT_ANALYSIS, updated);
    showToast(`AI Analysis saved for "${newDoc.fileName}"`, 'success');
    return newDoc;
  };

  const deleteDocumentAnalysis = (id) => {
    const updated = documentHistory.filter(d => d.id !== id);
    setDocumentHistory(updated);
    setStored(STORAGE_KEYS.DOCUMENT_ANALYSIS, updated);
    if (activeDocument && activeDocument.id === id) {
      setActiveDocument(null);
    }
    showToast('Analysis report deleted.', 'info');
  };

  const applyDocumentFix = (issueId, fixOriginal, fixCorrection) => {
    if (!activeDocument) return;

    let updatedText = activeDocument.text;
    if (fixOriginal && fixCorrection) {
      updatedText = updatedText.replace(fixOriginal, fixCorrection);
    }

    const updatedIssues = (activeDocument.issues || []).map(iss => {
      if (iss.id === issueId) {
        return { ...iss, resolved: true };
      }
      return iss;
    });

    const resolvedCount = updatedIssues.filter(i => i.resolved).length;
    const remainingCount = updatedIssues.filter(i => !i.resolved).length;
    const newScore = Math.min(100, (activeDocument.overallScore || 80) + 2);

    const updatedDoc = {
      ...activeDocument,
      text: updatedText,
      issues: updatedIssues,
      overallScore: newScore
    };

    setActiveDocument(updatedDoc);
    const updatedHistory = documentHistory.map(d => d.id === updatedDoc.id ? updatedDoc : d);
    setDocumentHistory(updatedHistory);
    setStored(STORAGE_KEYS.DOCUMENT_ANALYSIS, updatedHistory);
    showToast(`Fix applied! Score improved to ${newScore}/100 ✨`, 'success');
  };

  const applyAllSafeFixes = () => {
    if (!activeDocument || !activeDocument.issues) return;

    let updatedText = activeDocument.text;
    let fixCount = 0;

    const updatedIssues = activeDocument.issues.map(iss => {
      if (!iss.resolved && iss.original && iss.correction && iss.severity !== 'low') {
        updatedText = updatedText.split(iss.original).join(iss.correction);
        fixCount++;
        return { ...iss, resolved: true };
      }
      return iss;
    });

    const newScore = Math.min(100, (activeDocument.overallScore || 80) + (fixCount * 2));
    const updatedDoc = {
      ...activeDocument,
      text: updatedText,
      issues: updatedIssues,
      overallScore: newScore
    };

    setActiveDocument(updatedDoc);
    const updatedHistory = documentHistory.map(d => d.id === updatedDoc.id ? updatedDoc : d);
    setDocumentHistory(updatedHistory);
    setStored(STORAGE_KEYS.DOCUMENT_ANALYSIS, updatedHistory);
    showToast(`Applied ${fixCount} safe fixes automatically! Document score is now ${newScore}/100 🎉`, 'streak');
  };

  const getMotivationalQuote = () => {
    const todayMinutes = sessions
      .filter((s) => s.date === new Date().toISOString().split('T')[0])
      .reduce((acc, s) => acc + s.durationMinutes, 0);

    const goal = user?.dailyGoalMinutes || 60;
    const pct = Math.round((todayMinutes / goal) * 100);

    if (pct >= 100) {
      return {
        quote: "“Fantastic work! You have hit today's study target. Keep the momentum going!”",
        author: "EduFriend AI"
      };
    } else if (pct >= 50) {
      return {
        quote: "“You're more than halfway through today's goal. Consistency turns knowledge into mastery!”",
        author: "EduFriend AI"
      };
    } else {
      return {
        quote: "“Small progress every day leads to big results. You don't have to study perfectly. Just keep moving forward.”",
        author: "EduFriend AI"
      };
    }
  };

  return (
    <EduContext.Provider
      value={{
        user,
        updateUser,
        goals,
        addGoal,
        toggleGoal,
        deleteGoal,
        notes,
        addNote,
        updateNote,
        deleteNote,
        quizzes,
        saveQuizResult,
        sessions,
        recordStudySession,
        activeTab,
        setActiveTab,
        activeQuiz,
        setActiveQuiz,
        toast,
        showToast,
        apiKey,
        saveApiKey,
        getMotivationalQuote,
        visualMode,
        changeVisualMode,
        themeMode,
        changeThemeMode,
        colorPalette,
        changeColorPalette,
        videoTheme,
        changeVideoTheme,
        currentPalette: COLOR_PALETTES[colorPalette] || COLOR_PALETTES.purple,
        currentVideo: STUDY_VIDEOS[videoTheme] || STUDY_VIDEOS.cosmic,
        // Document Analyzer
        documentHistory,
        activeDocument,
        setActiveDocument,
        analyzerLanguage,
        setAnalyzerLanguage,
        saveDocumentAnalysis,
        deleteDocumentAnalysis,
        applyDocumentFix,
        applyAllSafeFixes
      }}
    >
      {children}
    </EduContext.Provider>
  );
};

export const useEdu = () => {
  const context = useContext(EduContext);
  if (!context) {
    throw new Error('useEdu must be used within an EduProvider');
  }
  return context;
};
