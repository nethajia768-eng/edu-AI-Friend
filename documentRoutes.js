import express from 'express';
import multer from 'multer';
import { extractTextFromFile } from '../services/documentParser.js';
import { runAIAnalysis, runDocumentChat } from '../services/aiService.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

// In-memory document session cache
const documentStore = new Map();

/**
 * POST /api/documents/analyze
 * Accepts multipart file or JSON text
 */
router.post('/analyze', upload.single('document'), async (req, res) => {
  try {
    let text = req.body.text || '';
    let fileName = req.body.fileName || 'Document.txt';
    let language = req.body.language || 'en';
    let documentType = req.body.documentType || 'auto';

    if (req.file) {
      fileName = req.file.originalname;
      text = await extractTextFromFile(req.file);
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'We could not extract readable text from this document. Please check the file and try again.'
      });
    }

    const analysisResult = await runAIAnalysis({
      text,
      fileName,
      documentType,
      language
    });

    const docId = 'doc_' + Date.now();
    const fullDocument = {
      id: docId,
      fileName,
      fileSize: req.file ? req.file.size : text.length,
      fileType: req.file ? req.file.mimetype : 'text/plain',
      wordCount: (text.match(/\b\w+\b/g) || []).length,
      pageCount: Math.max(1, Math.ceil(text.split(/\n\s*\n/).length / 4)),
      uploadedAt: new Date().toISOString(),
      text,
      ...analysisResult
    };

    documentStore.set(docId, fullDocument);

    return res.json({
      success: true,
      data: fullDocument
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      success: false,
      error: 'We couldn’t analyze this document. Please check the file and try again.'
    });
  }
});

/**
 * GET /api/documents/:id
 */
router.get('/:id', (req, res) => {
  const doc = documentStore.get(req.params.id);
  if (!doc) {
    return res.status(404).json({ success: false, error: 'Document not found' });
  }
  return res.json({ success: true, data: doc });
});

/**
 * POST /api/documents/:id/chat
 */
router.post('/:id/chat', async (req, res) => {
  try {
    const { query, language = 'en', fallbackText = '' } = req.body;
    const doc = documentStore.get(req.params.id);
    const textContext = doc ? doc.text : fallbackText;

    if (!textContext) {
      return res.status(400).json({ success: false, error: 'Document context is required for chat.' });
    }

    const answer = await runDocumentChat({
      text: textContext,
      query,
      language
    });

    return res.json({ success: true, answer });
  } catch (err) {
    console.error('Chat endpoint error:', err);
    return res.status(500).json({ success: false, error: 'AI tutor service encountered an issue.' });
  }
});

/**
 * POST /api/documents/:id/apply-fix
 */
router.post('/:id/apply-fix', (req, res) => {
  const { original, correction, entireDoc = false } = req.body;
  const doc = documentStore.get(req.params.id);

  if (!doc) {
    return res.status(404).json({ success: false, error: 'Document not found' });
  }

  if (entireDoc && Array.isArray(doc.issues)) {
    let fixedText = doc.text;
    doc.issues.forEach(iss => {
      if (iss.original && iss.correction && iss.severity !== 'low') {
        fixedText = fixedText.split(iss.original).join(iss.correction);
      }
    });
    doc.text = fixedText;
    return res.json({ success: true, updatedText: fixedText });
  }

  if (original && correction) {
    doc.text = doc.text.replace(original, correction);
  }

  return res.json({ success: true, updatedText: doc.text });
});

/**
 * DELETE /api/documents/:id
 */
router.delete('/:id', (req, res) => {
  documentStore.delete(req.params.id);
  return res.json({ success: true, message: 'Document removed securely.' });
});

export default router;
