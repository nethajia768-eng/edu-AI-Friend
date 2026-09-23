import React, { useState } from 'react';
import { EduProvider, useEdu } from './context/EduContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { Dashboard } from './components/Dashboard';
import { StudyTimer } from './components/StudyTimer';
import { GoalsPage } from './components/GoalsPage';
import { NotesPage } from './components/NotesPage';
import { QuizGeneratorModal } from './components/QuizGeneratorModal';
import { QuizPlayer } from './components/QuizPlayer';
import { QuizHistoryPage } from './components/QuizHistoryPage';
import { StreakPage } from './components/StreakPage';
import { ProgressPage } from './components/ProgressPage';
import { ProfilePage } from './components/ProfilePage';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DocumentAnalyzerPage } from './components/DocumentAnalyzer/DocumentAnalyzerPage';

function MainApp() {
  const { activeTab, setActiveTab, activeQuiz, setActiveQuiz } = useEdu();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [generatorNote, setGeneratorNote] = useState(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  const handleOpenGenerator = (note) => {
    setGeneratorNote(note);
    setIsGeneratorOpen(true);
  };

  const handleQuizGenerated = (quizData) => {
    setActiveQuiz(quizData);
    setActiveTab('quiz-player');
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans">
      <AnimatedBackground />
      <Navbar onOpenAuth={() => { setAuthMode('login'); setAuthOpen(true); }} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Router View by Active Tab */}
        {activeTab === 'home' && (
          <LandingPage
            onGetStarted={() => { setAuthMode('register'); setAuthOpen(true); }}
            onLogin={() => { setAuthMode('login'); setAuthOpen(true); }}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            onStartQuiz={handleOpenGenerator}
            onOpenAddGoal={() => setActiveTab('goals')}
          />
        )}

        {activeTab === 'document-analyzer' && <DocumentAnalyzerPage />}

        {activeTab === 'goals' && <GoalsPage />}

        {activeTab === 'timer' && (
          <div className="max-w-2xl mx-auto">
            <StudyTimer />
          </div>
        )}

        {activeTab === 'notes' && (
          <NotesPage onGenerateQuiz={handleOpenGenerator} />
        )}

        {activeTab === 'quiz-player' && activeQuiz && (
          <QuizPlayer
            quiz={activeQuiz}
            onFinish={() => setActiveTab('dashboard')}
            onBack={() => setActiveTab('notes')}
          />
        )}

        {activeTab === 'quizzes' && <QuizHistoryPage />}

        {activeTab === 'streak' && <StreakPage />}

        {activeTab === 'progress' && <ProgressPage />}

        {activeTab === 'profile' && <ProfilePage />}
      </main>

      {/* Modals & Toasts */}
      <QuizGeneratorModal
        isOpen={isGeneratorOpen}
        note={generatorNote}
        onClose={() => setIsGeneratorOpen(false)}
        onQuizGenerated={handleQuizGenerated}
      />

      <AuthModal
        isOpen={authOpen}
        initialMode={authMode}
        onClose={() => setAuthOpen(false)}
      />

      <Toast />

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-500 backdrop-blur-md">
        <p>EduFriend — AI-Powered Daily Study Companion. Crafted for Academic Excellence.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <EduProvider>
      <MainApp />
    </EduProvider>
  );
}
