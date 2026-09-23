# 🎓 Friendly AI Education (EduFriend)
### AI-Powered Academic Companion & Document Analyzer

EduFriend is a modern, responsive, and publish-ready educational platform designed to empower students and educators with AI study habits, quizzes, streak tracking, study timers, and the new **AI Document & Assignment Analyzer**.

---

## 🌟 New Feature: 📄 AI Document & Assignment Analyzer

> **“Upload your document. Let AI find mistakes, explain them, and help you improve.”**

### Key Capabilities:
- **Supported Formats**: PDF, DOCX, TXT, JPG, JPEG, PNG, Scanned Assignment Photos, Notes, and Resumes.
- **Multimodal Scanning Progress**: `Uploading → Reading Document → Extracting Text → Checking Content → Checking Grammar → Checking Format → Generating Report`.
- **Comprehensive Quality Checks**:
  1. **Spelling**: Detects typographical mistakes, missing/extra letters, and repeated words.
  2. **Grammar & Syntax**: Identifies subject-verb disagreements, tense mismatches, missing articles, and preposition errors.
  3. **Sentence Quality & Readability**: Highlights overlong or difficult sentences and suggests split alternatives.
  4. **Letter / Character Formation (OCR)**: Scans OCR outputs with confidence flags (*"Possible OCR issue — please verify"*).
  5. **Formatting Analysis**: Audits heading hierarchies, font consistency, paragraph spacing, and layout breaks.
  6. **Assignment Structure Audit**: Checks Title, Introduction, Main Content, Examples, Conclusion, and References.
  7. **Resume & CV Health Report**: Evaluates Contact Info, Objective, Skills, Projects, and Experience with objective ATS recommendations.
  8. **Study Notes High-Yield Mode**: Converts raw notes into clean, bulleted exam revision summaries.
- **Interactive Split Viewer**:
  - **Left**: Document text preview.
  - **Right**: Detected issues list with severity filters (*Definite Error*, *Possible Issue*, *Suggestion*), "Why is this wrong?", and "How can I remember this?" learning tips.
- **One-Click Fixes**: "Apply Fix" updates document live, plus "Apply Safe Fixes" for batch corrections.
- **Document-Aware AI Chat**: Ask questions directly about the uploaded document (`"Explain page 1 mistakes"`, `"Explain this in Tamil"`, `"Summarize main concepts"`).
- **Bilingual Experience**: Full switch between 🇬🇧 **English** and 🇮🇳 **தமிழ் (Tamil)** for all explanations and AI interactions.
- **Export Options**: Download formatted HTML/Printable Report or Corrected Text.

---

## 🚀 Architecture & Deployment

### 1. Frontend (Static Hosting: Vercel, Netlify, GitHub Pages)
- Built with **React 19**, **Vite 8**, **Tailwind CSS 4**, and **Lucide Icons**.
- Runs standalone with built-in client NLP & heuristic OCR parsing, or seamlessly hooks into the backend when deployed.

#### Run Frontend Locally:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```
The production bundle is generated in the `dist/` directory, ready to deploy to Netlify, Vercel, or GitHub Pages.

---

### 2. Backend (Node.js & Express API)
A dedicated, secure backend is located in `/backend`. It ensures that API keys (such as `OPENAI_API_KEY`) remain strictly confidential on the server.

#### Backend Setup:
```bash
cd backend

# Install server dependencies
npm install

# Copy configuration
cp .env.example .env
```

Edit `backend/.env` with your OpenAI API key:
```env
PORT=5000
OPENAI_API_KEY=sk-your-openai-api-key-here
FRONTEND_URL=*
```

#### Start Backend:
```bash
# Production start
npm start

# Development mode (with auto-reload)
npm run dev
```

The backend provides:
- `POST /api/documents/analyze` — Multipart upload with OCR & structured AI analysis.
- `POST /api/documents/:id/chat` — Document-context Q&A in English and Tamil.
- `POST /api/documents/:id/apply-fix` — Safe correction text generation.
- `GET /api/health` — Health and AI engine status check.

Deploy the backend easily to **Render**, **Railway**, **Fly.io**, or **Heroku**.

---

## 🔒 Privacy & Security
- User document history is persisted securely in local browser storage (`localStorage`).
- Uploaded files in the backend reside temporarily in in-memory buffers during analysis and are never written to unencrypted public disk stores.
- API keys are strictly handled on the backend and never exposed to the frontend client.

---

## 👨‍💻 Project Information
- **Project**: Friendly AI Education (EduFriend)
- **Author**: Nethaji
- **Version**: 2.0.0 (AI Document Analyzer Edition)
