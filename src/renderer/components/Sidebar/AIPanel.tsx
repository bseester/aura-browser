import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot, Trash2, FileText, Settings } from 'lucide-react';
import { useTabStore } from '../../store/useTabStore';
import { useSettingsStore } from '../../store/useSettingsStore';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AIPanel() {
  const { tabs, activeTabId } = useTabStore();
  const activeTab = tabs.find(t => t.id === activeTabId);
  const settings = useSettingsStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const saved = localStorage.getItem('ai-chat-history');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          role: 'assistant',
          content: 'Merhaba! Ben Morrow AI. Size nasıl yardımcı olabilirim?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  const saveHistory = (msgs: Message[]) => {
    localStorage.setItem('ai-chat-history', JSON.stringify(msgs));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveHistory(updatedMessages);
    setInput('');
    setIsTyping(true);

    // Real AI Integration with Puter.js (v2 Guest Mode + Streaming)
    try {
      // Sayfayı özetle veya oku derse sayfa içeriğini ekle
      const lowerInput = input.toLowerCase();
      
      let aiPrompt = input;
      
      const systemPrompt = `Sen Morrow Tarayıcı'nın akıllı asistanısın. 
      Kullanıcının tarayıcıyı kontrol etmesine yardımcı olabilirsin.
      Eğer kullanıcı bir ayar değişikliği veya navigasyon isterse, yanıtının en sonunda şu formatta bir komut ekle:
      [COMMAND: KOMUT_ADI, DATA: VERİ]

      Desteklenen Komutlar ve Beklenen Datlar:
      - SET_THEME (DATA: 'light' veya 'dark')
      - SET_ACCENT (DATA: #6366f1 gibi hex renkleri)
      - NAVIGATE (DATA: url)
      - NEW_TAB (DATA: url veya boş)
      - TOGGLE_SIDEBAR (DATA: yok)
      - TOGGLE_PIP (DATA: yok)
      - CLEAR_HISTORY (DATA: yok)

      Örnek: "Tabii, koyu modu açıyorum. [COMMAND: SET_THEME, DATA: 'dark']"
      Örnek: "Yeni bir sekmede Google'ı açıyorum. [COMMAND: NEW_TAB, DATA: 'https://google.com']"
      
      Soruya yanıt verirken eğer bir komut gerekiyorsa mutlaka ekle. Yanıtın doğal olsun ama komutu en sona ekle.`;

      if (lowerInput.includes('özetle') || lowerInput.includes('bu sayfa') || lowerInput.includes('incele') || lowerInput.includes('analiz')) {
        let pageContent = '';
        try {
          // Timeout ekleyerek asılı kalmasını önle
          const contentPromise = window.electronAPI.tabs.executeJavaScript(`document.body.innerText.substring(0, 3500)`);
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000));
          pageContent = await Promise.race([contentPromise, timeoutPromise]) as string;
        } catch (e) {
          console.warn('Page analysis context extraction failed:', e);
          pageContent = 'Sayfa içeriği alınamadı.';
        }

        aiPrompt = `${systemPrompt}\n\nAşağıdaki sayfa içeriğini detaylıca analiz et, önemli noktaları maddeler halinde çıkar ve ana fikri özetle.
         Sayfa Başlığı: ${activeTab?.title || 'Bilinmiyor'}
         İçerik: ${pageContent}
         
         Soru/Komut: ${input}`;
      } else {
        aiPrompt = `${systemPrompt}\n\nKullanıcı Komutu: ${input}`;
      }

      // 1. Boş bir asistan mesajı ekle
      const assistantMsgId = Date.now();
      const initialAssistantMsg: Message = {
        role: 'assistant',
        content: 'Düşünüyor...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, initialAssistantMsg]);
      setIsTyping(false);

      // 2. Puter.js v2 Stream Çağrısı
      // @ts-ignore
      const response = await window.puter.ai.chat(aiPrompt, {
        model: 'gpt-4o-mini',
        stream: true
      });

      let fullContent = '';
      
      // Stream objesi kontrolü ve işlenmesi
      if (response && typeof response[Symbol.asyncIterator] === 'function') {
        // @ts-ignore
        for await (const part of response) {
          // Puter.js v2'den gelen veriyi en geniş şekilde yakala
          const text = part?.text || 
                       part?.delta?.content || 
                       part?.message?.content || 
                       (typeof part === 'string' ? part : '');
          
          if (text) {
            fullContent += text;
            // Görsel olarak komutları gizle (saf deneyim)
            const displayContent = fullContent.replace(/\[COMMAND:.*?\]/g, '').replace(/\[COMMAND:.*$/g, '').trim();
            
            setMessages(prev => {
              const last = [...prev];
              last[last.length - 1] = {
                ...last[last.length - 1],
                content: displayContent || 'Düşünüyor...'
              };
              return last;
            });
          }
        }
      } 
      
      // Eğer stream boş kaldıysa veya iterable değilse normal objeyi dene
      if (!fullContent) {
        const rawBody = response?.message?.content || 
                      response?.text || 
                      (typeof response === 'string' ? response : '');
        
        fullContent = rawBody;
        const displayContent = rawBody.replace(/\[COMMAND:.*?\]/g, '').trim();

        if (displayContent) {
          setMessages(prev => {
            const last = [...prev];
            last[last.length - 1] = {
              ...last[last.length - 1],
              content: displayContent
            };
            return last;
          });
        } else if (!fullContent && response?.toString) {
           // ... (existing logic)
        }
      }
      
      // 3. Komutları ayıkla ve çalıştır
      const commandMatch = fullContent.match(/\[COMMAND:\s*(\w+)(?:,\s*DATA:\s*'?(.*?)'?)?\]/);
      if (commandMatch) {
          const cmd = commandMatch[1];
          const data = commandMatch[2]?.replace(/'/g, ''); // Tırnakları temizle
          
          console.log(`AI Command Triggered: ${cmd} with data: ${data}`);
          
          switch (cmd) {
              case 'SET_THEME':
                  if (data === 'light' || data === 'dark') settings.setTheme(data);
                  break;
              case 'SET_ACCENT':
                  if (data) settings.setAccentColor(data);
                  break;
              case 'NAVIGATE':
                  if (data) window.electronAPI.nav.go(data);
                  break;
              case 'NEW_TAB':
                  window.electronAPI.tabs.create(data || 'https://google.com');
                  break;
              case 'TOGGLE_SIDEBAR':
                  settings.toggleSidebar();
                  break;
              case 'TOGGLE_PIP':
                  window.electronAPI.tabs.togglePip();
                  break;
              case 'CLEAR_HISTORY':
                  window.electronAPI.history.clear();
                  break;
          }
          
          // Yanıttan komut kısmını temizleyerek geçmişe kaydet (görsel kirlilik olmasın)
          const cleanContent = fullContent.replace(/\[COMMAND:.*?\]/g, '').trim();
          saveHistory([...updatedMessages, { 
            role: 'assistant', 
            content: cleanContent, 
            timestamp: initialAssistantMsg.timestamp 
          }]);
      } else {
          saveHistory([...updatedMessages, { 
            role: 'assistant', 
            content: fullContent, 
            timestamp: initialAssistantMsg.timestamp 
          }]);
      }

    } catch (error) {
      console.error('Puter AI Error:', error);
      const errorMsg: Message = {
        role: 'assistant',
        content: 'Üzgünüm, şu an yanıt veremiyorum. Lütfen sayfayı yenileyip tekrar deneyin.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => {
        const last = [...prev];
        if (last[last.length - 1].content === '') {
           return [...last.slice(0, -1), errorMsg];
        }
        return last;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    const defaultMsg: Message[] = [{
      role: 'assistant',
      content: 'Merhaba! Sohbeti temizlediniz. Size nasıl yardımcı olabilirim?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    setMessages(defaultMsg);
    saveHistory(defaultMsg);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-secondary)',
      overflow: 'hidden'
    }}>
      {/* Messages */}
      <div 
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
        className="custom-scrollbar"
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                gap: '4px'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-muted)',
                fontSize: '11px',
                marginBottom: '2px'
              }}>
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} color="var(--accent)" />}
                <span>{msg.role === 'user' ? 'Siz' : 'Morrow AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>
              <div style={{
                maxWidth: '90%',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                fontSize: '13px',
                lineHeight: '1.5',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-subtle)',
                boxShadow: msg.role === 'user' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
              }}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', gap: '4px', padding: '8px' }}
            >
              <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
              <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animationDelay: '0.2s' }} />
              <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animationDelay: '0.4s' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(255,255,255,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-primary)',
          borderRadius: '20px',
          border: '1px solid var(--border-subtle)',
          padding: '4px 4px 4px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="AI'ya bir şey sor..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '13px',
              padding: '8px 0'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            style={{
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <Send size={16} />
          </motion.button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Morrow AI v1.0 • Beta</span>
          <button 
            onClick={clearChat}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}>
            <Trash2 size={12} /> Temizle
          </button>
        </div>
      </div>

      <style>{`
        .typing-dot {
          animation: typing 1.4s infinite ease-in-out;
        }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
