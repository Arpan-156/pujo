import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from './Icons';
import { PUJA_START, STAGES } from '../data/site';
import { PUJAS } from '../data/pujas';

type Message = { id: string; role: 'user' | 'bot'; text: string };

function generateId() {
  return Math.random().toString(36).slice(2);
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s\u0980-\u09FF]/gi, '').trim();
}

function findAnswer(query: string): string {
  const q = query.toLowerCase();
  const norm = normalize(query);
  
  if (q.match(/\b(hi|hello|hey|namaste|pranam)\b/)) {
    return "Namaskar! 🙏 I am your Banglar Pujo Guide. You can ask me about any Puja, theme, location, or dates!";
  }
  
  if (q.includes('arpan') || q.includes('creator') || q.includes('developer')) {
    return "Arpan Ganguly is the brilliant developer who created this website and chatbot!";
  }
  
  if (q.match(/\b(when|date|dates|start|panchami|shashthi|saptami|ashtami|navami|dashami)\b/)) {
    const stage = STAGES.find(s => q.includes(s.id.toLowerCase()) || q.includes(s.name.toLowerCase()));
    if (stage) return `${stage.name} is on ${stage.date}. ${stage.text}`;
    return `Durga Puja starts on ${PUJA_START.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}! The festival runs through Dashami.`;
  }
  
  if (q.match(/\b(best|featured|top|famous|all|list|kon kon)\b/)) {
    const featured = PUJAS.filter(p => p.featured).slice(0, 5);
    return `Some of the most popular featured pandals in Burdwan include: ${featured.map(f => f.name).join(', ')}. You can explore all of them on our interactive Map!`;
  }
  
  if (q.match(/\b(where|map|navigate)\b/) && !q.includes('theme')) {
    return "You can explore the locations of all major pandals on our interactive Map page! Just click 'Explore Bardhaman' in the menu.";
  }

  let matchedPuja = null;
  let highestOverlap = 0;
  
  for (const p of PUJAS) {
    const nameWords = normalize(p.name).split(/\s+/);
    const overlap = nameWords.filter(w => w.length > 2 && norm.includes(w)).length;
    if (overlap > highestOverlap) {
      highestOverlap = overlap;
      matchedPuja = p;
    }
  }
  
  if (matchedPuja && highestOverlap > 0) {
    if (q.includes('theme')) {
      return `The theme for ${matchedPuja.name} is "${matchedPuja.theme}".`;
    }
    if (q.includes('where') || q.includes('location')) {
      return `${matchedPuja.name} is located at ${matchedPuja.location}.`;
    }
    return `${matchedPuja.name} is located at ${matchedPuja.location}. This year's theme is "${matchedPuja.theme}". ${matchedPuja.description}`;
  }

  return "I'm still learning! You can ask me about specific pujas (like 'Sripally theme' or 'Alamganj location'), important dates, or ask to see the featured pandals.";
}

export function Chatbot({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'Namaskar! 🙏 I am your Banglar Pujo Guide. Ask me anything about the pandals, dates, or themes!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    if (open) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = '';
    }
    
    return () => { document.body.style.overflow = ''; };
  }, [messages, open, isTyping]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { id: generateId(), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const responseText = findAnswer(userMsg.text);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: generateId(), role: 'bot', text: responseText }]);
    }, 400 + Math.random() * 300);
  };

  return (
    <div className={`chatbot-wrapper ${visible ? 'show' : ''} ${open ? 'open' : ''}`}>
      <div className="chat-panel" role="dialog" aria-label="Chatbot" aria-hidden={!open}>
        <div className="chat-head">
          <div>
            <p className="chat-title">Pujo Guide</p>
            <p className="chat-status">Online • Ask me anything</p>
          </div>
          <button className="icon-btn" aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button>
        </div>
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble ${msg.role}`}>
              {msg.text.split('\n').map((line, i) => <span key={i} style={{display: 'block'}}>{line}</span>)}
            </div>
          ))}
          {isTyping && <div className="chat-bubble bot typing"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>}
          <div ref={messagesEndRef} style={{ height: 1 }} />
        </div>
        <form className="chat-input-area" onSubmit={handleSend}>
          <input type="text" placeholder="Type your question..." value={input} onChange={e => setInput(e.target.value)} aria-label="Chat input" />
          <button type="submit" className="chat-send-btn" aria-label="Send message" disabled={!input.trim()}><Send size={18} /></button>
        </form>
      </div>
      <button className="chat-fab" onClick={() => setOpen(prev => !prev)} aria-label={open ? 'Close chat' : 'Open chat'}><MessageCircle size={22} /></button>
    </div>
  );
}
