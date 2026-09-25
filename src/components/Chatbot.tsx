import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from './Icons';
import { PUJA_START, STAGES } from '../data/site';
import { PUJAS } from '../data/pujas';

type Message = { id: string; role: 'user' | 'bot'; text: string };

function generateId() {
  return Math.random().toString(36).slice(2);
}

function findAnswer(query: string): string {
  const lower = query.toLowerCase();
  
  if (lower.match(/\b(hi|hello|hey|namaste|pranam)\b/)) {
    return "Namaste! 🙏 I am your Banglar Pujo Guide. How can I help you explore the beautiful pandals of Burdwan today?";
  }
  
  if (lower.match(/\b(who are you|your name|what are you)\b/)) {
    return "I am the Banglar Pujo Chatbot, designed to help you navigate the festival. I can tell you about pujas, locations, dates, and themes!";
  }
  
  if (lower.match(/\b(how are you)\b/)) {
    return "I am doing great, feeling the festive spirit! 🌸 How can I assist you with your Pujo plans?";
  }

  if (lower.match(/\b(when is pujo|start date|date|dates|when)\b/)) {
    return `Durga Puja starts on ${PUJA_START.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}. The first major day is Shashthi.`;
  }
  
  if (lower.match(/\b(stage|mahalaya|panchami|shashthi|saptami|ashtami|navami|dashami)\b/)) {
    const stage = STAGES.find(s => lower.includes(s.id.toLowerCase()));
    if (stage) {
      return `${stage.name} is on ${stage.date}. Ritual: ${stage.ritual}. ${stage.text}`;
    }
  }

  // Search for specific puja
  for (const puja of PUJAS) {
    if (lower.includes(puja.name.toLowerCase())) {
      return `Ah, ${puja.name}! Located at ${puja.location}. ${puja.description} This year's theme is around ${puja.theme}.`;
    }
  }
  
  if (lower.match(/\b(best|featured|top|famous)\b/)) {
    const featured = PUJAS.filter(p => p.featured).slice(0, 3);
    return `Some of the most popular featured pandals include: ${featured.map(f => f.name).join(', ')}. You can find more on the Featured section!`;
  }
  
  if (lower.match(/\b(location|where|map)\b/)) {
    return "You can explore the locations of all major pandals on our interactive Map page! Just click 'Explore Bardhaman' in the menu.";
  }

  if (lower.match(/\b(bye|thank you|thanks)\b/)) {
    return "You're very welcome! 🙏 Enjoy the festivities and have a wonderful Durga Puja!";
  }

  return "I'm sorry, I couldn't quite find the answer to that. You can try asking about specific pujas, dates, or simply say 'What are the featured pujas?'.";
}

export function Chatbot({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'Namaskar! 🙏 I am your personal Banglar Pujo Guide. Ask me anything about the pandals, dates, or themes!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
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
    
    // Simulate thinking delay
    setTimeout(() => {
      const responseText = findAnswer(userMsg.text);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: generateId(), role: 'bot', text: responseText }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className={`chatbot-wrapper ${visible ? 'show' : ''} ${open ? 'open' : ''}`}>
      <div className="chat-panel" role="dialog" aria-label="Chatbot" aria-hidden={!open}>
        <div className="chat-head">
          <div>
            <p className="chat-title">Pujo Guide</p>
            <p className="chat-status">Online • Ask me anything</p>
          </div>
          <button className="icon-btn" aria-label="Close chat" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble ${msg.role}`}>
              {msg.text.split('\n').map((line, i) => (
                <span key={i} style={{display: 'block'}}>{line}</span>
              ))}
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble bot typing">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} style={{ height: 1 }} />
        </div>
        
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type your question..." 
            value={input} 
            onChange={e => setInput(e.target.value)}
            aria-label="Chat input"
          />
          <button type="submit" className="chat-send-btn" aria-label="Send message" disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>

      <button 
        className="chat-fab" 
        onClick={() => setOpen(prev => !prev)} 
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
