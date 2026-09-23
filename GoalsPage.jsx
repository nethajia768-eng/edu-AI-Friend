import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Clock, 
  X
} from 'lucide-react';
import { useEdu } from '../context/EduContext';
import confetti from 'canvas-confetti';

export const GoalsPage = () => {
  const { goals, addGoal, toggleGoal, deleteGoal } = useEdu();
  const [filterSubject, setFilterSubject] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Goal Form state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Machine Learning');
  const [targetMinutes, setTargetMinutes] = useState(45);
  const [priority, setPriority] = useState('Medium');

  const subjects = ['All', 'Machine Learning', 'Data Structures', 'Python', 'Web Development', 'Other'];

  const filteredGoals = goals.filter((g) => {
    if (filterSubject === 'All') return true;
    return g.subject === filterSubject;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addGoal({
      title: title.trim(),
      subject,
      targetMinutes: Number(targetMinutes),
      priority
    });

    setTitle('');
    setIsModalOpen(false);
  };

  const handleToggle = (id) => {
    toggleGoal(id);
    const goal = goals.find((g) => g.id === id);
    if (goal && !goal.completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Target className="w-6 h-6" style={{ color: 'var(--accent-purple)' }} />
            <span>Daily Study Goals</span>
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            Set, track, and conquer your learning milestones every day.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-ai-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Goal</span>
        </button>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subjects.map((subj) => {
          const isSelected = filterSubject === subj;
          return (
            <button
              key={subj}
              onClick={() => setFilterSubject(subj)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border"
              style={{
                backgroundColor: isSelected ? 'var(--chip-bg)' : 'var(--bg-card)',
                borderColor: isSelected ? 'var(--bg-card-border-hover)' : 'var(--bg-card-border)',
                color: isSelected ? 'var(--accent-purple)' : 'var(--text-secondary)'
              }}
            >
              {subj}
            </button>
          );
        })}
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGoals.length === 0 ? (
          <div 
            className="col-span-full glass-panel p-10 rounded-3xl text-center"
            style={{ color: 'var(--text-muted)' }}
          >
            <Target className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--accent-purple)' }} />
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              No study goals found in this category
            </p>
            <p className="text-xs mt-1">Add your first target to boost today's streak!</p>
          </div>
        ) : (
          filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                goal.completed
                  ? 'opacity-70'
                  : 'glass-panel-interactive'
              }`}
              style={{
                backgroundColor: goal.completed ? 'var(--bg-canvas-subtle)' : 'var(--bg-card)',
                borderColor: 'var(--bg-card-border)'
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--chip-bg)',
                      borderColor: 'var(--chip-border)',
                      color: 'var(--accent-purple)'
                    }}
                  >
                    {goal.subject}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                      goal.priority === 'High'
                        ? 'status-badge-danger'
                        : goal.priority === 'Medium'
                        ? 'status-badge-warning'
                        : 'status-badge-completed'
                    }`}
                  >
                    {goal.priority} Priority
                  </span>
                </div>

                <h3 
                  className={`text-base font-bold mb-2 ${goal.completed ? 'line-through opacity-70' : ''}`}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {goal.title}
                </h3>
              </div>

              <div 
                className="flex items-center justify-between pt-4 mt-2 border-t"
                style={{ borderColor: 'var(--bg-card-border)' }}
              >
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent-purple)' }} />
                  <span>{goal.targetMinutes} minutes</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(goal.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      goal.completed
                        ? 'status-badge-completed'
                        : 'btn-ai-primary !py-1.5 !px-3'
                    }`}
                  >
                    {goal.completed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Mark Done</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1.5 rounded-xl transition-colors hover:scale-110"
                    style={{ color: 'var(--text-muted)' }}
                    title="Delete goal"
                  >
                    <Trash2 className="w-4 h-4 hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div 
            className="relative w-full max-w-md glass-panel p-6 sm:p-7 rounded-3xl shadow-2xl border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--bg-card-border-hover)'
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Add Daily Study Goal
            </h3>
            <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
              Plan your focus area and time commitment
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Introduction to Neural Networks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--bg-input-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
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
                  <option value="Mathematics">Mathematics</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Target (Minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={targetMinutes}
                    onChange={(e) => setTargetMinutes(e.target.value)}
                    className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--bg-input-border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--bg-input-border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full btn-ai-primary !py-3 !text-sm"
                >
                  Save Study Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
