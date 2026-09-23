import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  Languages,
  Bot,
  User,
  Loader2
} from 'lucide-react';
import { chatWithDocument } from '../../services/documentAnalyzerService';

export const DocumentChatDrawer = ({ documentData, language = 'en', onLanguageChange }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: language === 'ta' 
        ? 'வணக்கம்! நான் உங்கள் EduFriend ஆவண ஆசிரியர். இந்த ஆவணத்தில் உள்ள பிழைகள், அறிமுகம் அல்லது குறிப்பிட்ட பக்கங்கள் குறித்து என்னிடம் கேட்கலாம்.'
        : 'Hello! I am your EduFriend Document AI Tutor. Ask me anything about this document—from grammar issues, summarizing sections, to improving clarity!'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    { en: 'What mistakes are in this document?', ta: 'இந்த ஆவணத்தில் என்னென்ன பிழைகள் உள்ளன?' },
    { en: 'Explain page 1 mistakes in simple words', ta: 'பக்கம் 1 இல் உள்ள தவறுகளை விளக்குங்கள்' },
    { en: 'How can I make my introduction stronger?', ta: 'எனது அறிமுகப் பகுதியை எவ்வாறு மேம்படுத்துவது?' },
    { en: 'Explain key concepts in Tamil', ta: 'முக்கிய கருத்துக்களை தமிழில் விளக்குங்கள்' },
    { en: 'Summarize the main takeaways', ta: 'முக்கிய கருத்துக்களை சுருக்கமாக கூறுங்கள்' }
  ];

  const handleSend = async (queryToSend) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || loading) return;

    setInputQuery('');
    const newMsgs = [...messages, { role: 'user', content: q }];
    setMessages(newMsgs);
    setLoading(true);

    try {
      const answer = await chatWithDocument({
        docId: documentData?.id,
        textContext: documentData?.text || '',
        query: q,
        language
      });

      setMessages([...newMsgs, { role: 'assistant', content: answer }]);
    } catch (e) {
      setMessages([...newMsgs, { role: 'assistant', content: 'Could not process query. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="glass-panel p-5 rounded-3xl border flex flex-col h-[560px]"
      style={{ borderColor: 'var(--bg-card-border)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-indigo-500/20 text-indigo-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Ask AI About This Document
            </h4>
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Context-Aware Document Tutor • {language === 'ta' ? 'தமிழ் & ஆங்கிலம்' : 'English & Tamil'}
            </p>
          </div>
        </div>

        {/* Language switch */}
        <button
          onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
          className="btn-ai-glass !py-1 !px-2.5 !text-[11px] !rounded-lg flex items-center gap-1.5"
          title="Switch response language"
        >
          <Languages className="w-3 h-3 text-indigo-400" />
          <span>{language === 'en' ? '🇬🇧 English' : '🇮🇳 தமிழ்'}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
        {messages.map((m, idx) => (
          <div 
            key={idx} 
            className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}
            <div 
              className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed border ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white border-indigo-500 rounded-br-none shadow'
                  : 'rounded-bl-none'
              }`}
              style={m.role !== 'user' ? {
                backgroundColor: 'var(--bg-canvas-subtle)',
                borderColor: 'var(--bg-card-border)',
                color: 'var(--text-primary)'
              } : {}}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 items-center text-xs text-indigo-400 italic">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>EduFriend AI is reading and drafting response...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="pt-2 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(language === 'ta' ? p.ta : p.en)}
            className="text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap border shrink-0 hover:border-indigo-400 transition-colors"
            style={{
              backgroundColor: 'var(--bg-canvas-subtle)',
              borderColor: 'var(--bg-card-border)',
              color: 'var(--text-secondary)'
            }}
          >
            💬 {language === 'ta' ? p.ta : p.en}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex items-center gap-2 pt-2 border-t border-white/5"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={language === 'ta' ? 'இந்த ஆவணம் குறித்து கேள்விகளை தட்டச்சு செய்யவும்...' : 'Ask questions about your document...'}
          className="flex-1 rounded-xl px-3.5 py-2 text-xs focus:outline-none border"
          style={{
            backgroundColor: 'var(--bg-input)',
            borderColor: 'var(--bg-input-border)',
            color: 'var(--text-primary)'
          }}
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || loading}
          className="btn-ai-primary !p-2 !rounded-xl disabled:opacity-40 shadow"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
