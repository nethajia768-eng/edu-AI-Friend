import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import documentRoutes from './routes/documentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'EduFriend AI Document Analyzer Backend',
    timestamp: new Date().toISOString(),
    aiEngine: process.env.OPENAI_API_KEY ? 'OpenAI GPT-4o Connected' : 'EduFriend Heuristic NLP Engine'
  });
});

// Mount Routes
app.use('/api/documents', documentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal document processing error. Please try again.'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 EduFriend Document Analyzer Backend running on port ${PORT}`);
});
