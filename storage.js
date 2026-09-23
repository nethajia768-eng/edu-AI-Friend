// Local storage keys and mock database initial state for EduFriend

const STORAGE_KEYS = {
  USER: 'edufriend_user',
  GOALS: 'edufriend_goals',
  NOTES: 'edufriend_notes',
  QUIZZES: 'edufriend_quizzes',
  SESSIONS: 'edufriend_sessions',
  STREAK_CALENDAR: 'edufriend_streak_calendar',
  SETTINGS: 'edufriend_settings',
  DOCUMENT_ANALYSIS: 'edufriend_document_history'
};

const INITIAL_USER = {
  id: 'usr_nethaji_01',
  name: 'Nethaji',
  email: 'nethaji@edufriend.ai',
  avatar: '👨‍🎓',
  streak: 7,
  bestStreak: 14,
  totalStudyMinutes: 480,
  dailyGoalMinutes: 60,
  createdAt: '2026-03-01'
};

const INITIAL_GOALS = [
  {
    id: 'goal_1',
    title: 'Complete Introduction to Neural Networks',
    subject: 'Machine Learning',
    targetMinutes: 60,
    completed: false,
    priority: 'High',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  },
  {
    id: 'goal_2',
    title: 'Practice Binary Search Trees and LeetCode problems',
    subject: 'Data Structures',
    targetMinutes: 45,
    completed: true,
    priority: 'Medium',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'goal_3',
    title: 'Revise Python Decorators and Generators',
    subject: 'Python',
    targetMinutes: 30,
    completed: true,
    priority: 'Low',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

const INITIAL_NOTES = [
  {
    id: 'note_1',
    title: 'Introduction to Machine Learning',
    subject: 'Machine Learning',
    content: `Machine learning is a branch of artificial intelligence that enables computers to learn from data without being explicitly programmed.

Key Types of Machine Learning:
1. Supervised Learning: The algorithm is trained on labeled data where inputs are paired with correct outputs. Examples include classification (spam detection) and regression (predicting house prices).
2. Unsupervised Learning: Finds hidden patterns or groupings in unlabeled datasets. Common algorithms include K-Means clustering and Principal Component Analysis (PCA).
3. Reinforcement Learning: An agent learns to make decisions by taking actions in an environment to maximize cumulative rewards through trial and error.

Key Terminology:
- Features: Individual measurable properties or characteristics of phenomena observed.
- Overfitting: When a model learns noise in training data too closely and performs poorly on unseen test data.
- Epoch: One complete pass through the entire training dataset.`,
    createdAt: '2026-03-10T10:30:00.000Z',
    updatedAt: '2026-03-12T14:20:00.000Z'
  },
  {
    id: 'note_2',
    title: 'Data Structures - Trees & Graphs',
    subject: 'Data Structures',
    content: `Trees are hierarchical data structures consisting of nodes connected by edges.
- Binary Search Tree (BST): A tree where for each node, all left subtree values are smaller, and all right subtree values are larger.
- Time Complexity of BST operations: Average lookup/insert is O(log n), worst-case is O(n) for degenerate trees.
- Balanced Trees (AVL, Red-Black): Maintain O(log n) worst-case height by self-balancing during insertions and deletions.

Graph Representations:
- Adjacency Matrix: 2D array, space complexity O(V^2), fast edge lookup O(1).
- Adjacency List: Array of lists, space complexity O(V + E), ideal for sparse graphs.`,
    createdAt: '2026-03-11T12:00:00.000Z',
    updatedAt: '2026-03-11T12:00:00.000Z'
  },
  {
    id: 'note_3',
    title: 'Python Essentials & Object-Oriented Principles',
    subject: 'Python',
    content: `Python is a high-level, dynamically typed programming language known for readable syntax.
Core OOP Pillars:
- Encapsulation: Bundling data and methods that operate on that data inside classes.
- Inheritance: Mechanism where a new class inherits properties and behaviors from an existing class.
- Polymorphism: Ability of different classes to respond to the same message or method call in their unique way.
- Abstraction: Hiding internal complex implementation details and showing only necessary features.

List Comprehensions provide concise syntax: [x**2 for x in range(10) if x % 2 == 0].
Generators use the 'yield' keyword to produce values lazily without storing entire sequences in memory.`,
    createdAt: '2026-03-14T09:15:00.000Z',
    updatedAt: '2026-03-14T09:15:00.000Z'
  }
];

const INITIAL_QUIZZES = [
  {
    id: 'quiz_1',
    noteId: 'note_1',
    title: 'ML Basics & Fundamentals',
    subject: 'Machine Learning',
    difficulty: 'Medium',
    questionCount: 5,
    score: 4,
    percentage: 80,
    date: '2026-03-14',
    createdAt: '2026-03-14T15:30:00.000Z',
    questions: [
      {
        question: 'What is Machine Learning?',
        options: [
          'A programming language used for web development',
          'A branch of AI that enables computers to learn from data without explicit programming',
          'A database indexing technique',
          'A hardware architecture for high-speed graphics'
        ],
        answer: 'A branch of AI that enables computers to learn from data without explicit programming',
        selectedAnswer: 'A branch of AI that enables computers to learn from data without explicit programming'
      },
      {
        question: 'Which type of machine learning uses labeled inputs paired with correct outputs?',
        options: [
          'Unsupervised Learning',
          'Supervised Learning',
          'Reinforcement Learning',
          'Zero-shot Learning'
        ],
        answer: 'Supervised Learning',
        selectedAnswer: 'Supervised Learning'
      },
      {
        question: 'What is overfitting in machine learning?',
        options: [
          'When a model trains in less than one epoch',
          'When a model fails to run due to insufficient GPU RAM',
          'When a model learns noise in training data and performs poorly on unseen data',
          'When the dataset has too many duplicate rows'
        ],
        answer: 'When a model learns noise in training data and performs poorly on unseen data',
        selectedAnswer: 'When a model learns noise in training data and performs poorly on unseen data'
      },
      {
        question: 'Which of the following is a common unsupervised learning algorithm?',
        options: [
          'K-Means Clustering',
          'Linear Regression',
          'Support Vector Classifier',
          'Decision Tree Classifier'
        ],
        answer: 'K-Means Clustering',
        selectedAnswer: 'Linear Regression'
      },
      {
        question: 'What does one "epoch" represent in neural network training?',
        options: [
          'One single forward pass of a mini-batch',
          'One complete pass through the entire training dataset',
          'A unit of CPU clock frequency',
          'The total time taken to deploy a model'
        ],
        answer: 'One complete pass through the entire training dataset',
        selectedAnswer: 'One complete pass through the entire training dataset'
      }
    ]
  },
  {
    id: 'quiz_2',
    noteId: 'note_3',
    title: 'Python Core & OOP Review',
    subject: 'Python',
    difficulty: 'Easy',
    questionCount: 4,
    score: 4,
    percentage: 100,
    date: '2026-03-13',
    createdAt: '2026-03-13T18:10:00.000Z',
    questions: [
      {
        question: 'Which keyword is used in Python to produce generator values lazily?',
        options: ['return', 'yield', 'lazy', 'next'],
        answer: 'yield',
        selectedAnswer: 'yield'
      },
      {
        question: 'What is encapsulation in OOP?',
        options: [
          'Bundling data and methods that operate on that data inside classes',
          'Importing packages dynamically',
          'Creating recursive function definitions',
          'Compiling bytecode to machine instructions'
        ],
        answer: 'Bundling data and methods that operate on that data inside classes',
        selectedAnswer: 'Bundling data and methods that operate on that data inside classes'
      }
    ]
  }
];

const INITIAL_SESSIONS = [
  { id: 'sess_1', subject: 'Machine Learning', durationMinutes: 25, date: '2026-03-15', timestamp: Date.now() - 3600000 },
  { id: 'sess_2', subject: 'Data Structures', durationMinutes: 35, date: '2026-03-14', timestamp: Date.now() - 86400000 },
  { id: 'sess_3', subject: 'Python', durationMinutes: 40, date: '2026-03-13', timestamp: Date.now() - 172800000 },
  { id: 'sess_4', subject: 'Machine Learning', durationMinutes: 50, date: '2026-03-12', timestamp: Date.now() - 259200000 },
  { id: 'sess_5', subject: 'Data Structures', durationMinutes: 30, date: '2026-03-11', timestamp: Date.now() - 345600000 },
  { id: 'sess_6', subject: 'Python', durationMinutes: 45, date: '2026-03-10', timestamp: Date.now() - 432000000 },
  { id: 'sess_7', subject: 'Machine Learning', durationMinutes: 60, date: '2026-03-09', timestamp: Date.now() - 518400000 }
];

export const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage`, e);
    return fallback;
  }
};

export const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage`, e);
  }
};

export const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    setStored(STORAGE_KEYS.USER, INITIAL_USER);
  }
  if (!localStorage.getItem(STORAGE_KEYS.GOALS)) {
    setStored(STORAGE_KEYS.GOALS, INITIAL_GOALS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
    setStored(STORAGE_KEYS.NOTES, INITIAL_NOTES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
    setStored(STORAGE_KEYS.QUIZZES, INITIAL_QUIZZES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SESSIONS)) {
    setStored(STORAGE_KEYS.SESSIONS, INITIAL_SESSIONS);
  }
};

export { STORAGE_KEYS };
