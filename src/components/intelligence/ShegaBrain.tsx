/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useKnowledge } from '../../contexts/KnowledgeContext';
import { ChatMessage, KnowledgeAsset } from '../../types';
import { Send, Bot, User, Sparkles, Paperclip, Search, ExternalLink, ShieldAlert, Cpu, Database } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function ShegaBrain() {
  const { user } = useAuth();
  const { assets } = useKnowledge();
  const [messages, setMessages] = useState<ChatMessage[]>(DEBUG_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. RAG Context Retrieval with RBAC Security
      // Filter assets by clearance level before retrieval
      const secureAssets = assets.filter(a => (a.clearanceLevel || 1) <= (user?.clearanceLevel || 1));
      
      const keywords = input.toLowerCase().split(' ');
      const relevantAssets = secureAssets.filter(asset => 
        keywords.some(kw => 
          kw.length > 3 && (
            asset.title.toLowerCase().includes(kw) || 
            asset.tags.some(t => t.toLowerCase().includes(kw)) ||
            (asset.content && asset.content.toLowerCase().includes(kw))
          )
        )
      ).slice(0, 5);

      const knowledgeGap = relevantAssets.length === 0;

      // 2. Build Context String for Shega Brain
      const contextString = !knowledgeGap 
        ? `RELEVANT INTERNAL KNOWLEDGE SOURCES (RBAC CLEARED):\n${relevantAssets.map(a => `- [KB-${a.id.slice(0,4)}] ${a.title} (${a.type}): ${a.content || a.fileName || a.sourceUrl}`).join('\n')}`
        : "ALERT: No direct internal knowledge matches found in Shega Hub. This is a potential Knowledge Gap.";

      // 3. System Prompt Construction per SIH Spec
      const systemPrompt = `Act as the "Shega Brain" (SIH). Your mission is to serve as the institutional memory for Shega Media, driving its 'Bloomberg for Africa' vision.

CORE ARCHITECTURE:
- DATA SOVEREIGNTY: Treat all uploaded reports (JICA, Gates Foundation, etc.) as the primary truth. Prioritize internal data over general training data.
- RBAC LOGIC: You are interacting with ${user?.name} (Role: ${user?.role}, Clearance: ${user?.clearanceLevel}). Do not disclose level 3 data to users with lower clearance.
- THE BRIDGE CONCEPT: You do not store SharePoint/Notion files; you index their metadata pointers. Use sourceUrl to direct users back to original sources when appropriate.
- AESTHETIC TONE: Your responses MUST reflect a 'Bloomberg Terminal' style—high-density, professional, and data-centric. Use tables, bulleted lists, and bold headers.
- GLOBAL MANDATE: Every factual answer must include a 'Source' tag with the [KB-ID]. 
- KNOWLEDGE GAPS: If the requested knowledge is missing from internal data, flag it explicitly: "SEARCH_KNOWLEDGE_GAP: [Topic]. Suggesting expert inquiry or external market research."

USER CONTEXT:
User Role: ${user?.role}
User Department: ${user?.department || 'Not Specified'}
Available Clearance: ${user?.clearanceLevel}

INTERNAL RESEARCH RETRIEVAL:
${contextString}`;

      // 4. Call Gemini
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.1, // Low temperature for factual precision
        }
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I was unable to process that analysis.",
        timestamp: new Date().toISOString(),
        sources: relevantAssets.map(a => ({ title: a.title, id: a.id }))
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Shega Brain RAG Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "CRITICAL: Intelligence Node Desync. Verify API cluster health and RBAC token validity.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
      {/* Search & Mode Bar */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded-lg flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center border border-accent-orange/20">
              <Cpu className="w-5 h-5 text-accent-orange" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-green rounded-full border-2 border-bg-surface" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-text-primary">Shega Brain <span className="text-[9px] bg-accent-blue text-white px-1.5 py-0.5 rounded-full ml-2 font-bold tracking-tighter shadow-sm">CORE V3.1</span></h2>
            <div className="flex items-center gap-2 mt-1">
               <Database className="w-3 h-3 text-text-secondary opacity-40" />
               <p className="text-[9px] text-text-secondary font-bold uppercase tracking-tight opacity-60">Sovereign RAG Active / Global Ingestion Index: 14.4K Nodes</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {['Deep Analysis', 'Fact Check', 'SOP Draft'].map(mode => (
            <button key={mode} className="text-[9px] font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 bg-bg-deep border border-border-dim rounded-md hover:border-accent-orange hover:text-accent-orange transition-all">
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Chat Canvas (Bloomberg Terminal Style) */}
        <div className="flex-1 high-density-panel flex flex-col p-0 overflow-hidden border-2 border-border-dim/50 shadow-2xl relative">
          {/* Grid Background Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,100,33,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,100,33,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar relative z-10" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={cn(
                "flex gap-5 animate-in slide-in-from-bottom-2 duration-300",
                msg.role === 'assistant' ? "items-start" : "items-start flex-row-reverse"
              )}>
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border-2 transition-transform hover:scale-110",
                  msg.role === 'assistant' ? "bg-bg-deep border-accent-orange shadow-[0_0_10px_rgba(210,153,34,0.2)]" : "bg-bg-elevated border-border-dim"
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5 text-accent-orange" /> : <User className="w-5 h-5 text-text-secondary" />}
                </div>
                <div className={cn(
                  "max-w-[85%] space-y-2",
                  msg.role === 'user' && "text-right"
                )}>
                  <div className={cn(
                    "p-5 rounded-xl text-[12px] leading-relaxed font-sans shadow-md",
                    msg.role === 'assistant' ? "bg-bg-surface border border-border-dim text-text-primary" : "bg-accent-blue/10 border border-accent-blue/20 text-text-primary font-medium"
                  )}>
                    {msg.content}
                    
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-border-dim/50 flex flex-wrap gap-3">
                        {msg.sources.map(src => (
                          <div key={src.id} className="flex items-center gap-2 px-3 py-1 bg-bg-deep border border-border-dim rounded text-[9px] font-bold text-accent-orange hover:bg-accent-orange hover:text-bg-deep cursor-pointer transition-all uppercase tracking-widest leading-none">
                            <Database className="w-3 h-3" />
                            {src.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-text-secondary opacity-30 px-1 flex items-center gap-2 justify-end">
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <div className="w-1 h-1 rounded-full bg-border-dim" />
                    <span>SECURE NODE 014</span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-5 items-start">
                <div className="w-9 h-9 rounded-lg bg-bg-deep border-2 border-accent-orange/30 flex items-center justify-center animate-pulse">
                  <Bot className="w-5 h-5 text-accent-orange opacity-40" />
                </div>
                <div className="p-5 bg-bg-surface border border-border-dim rounded-xl text-[11px] text-text-secondary flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span className="font-mono uppercase tracking-[0.2em] text-[9px]">Querying RAG Context...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area (Bloomberg Style) */}
          <div className="p-6 border-t border-border-dim bg-bg-surface relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                 <Terminal className="w-4 h-4 text-text-secondary opacity-40 group-focus-within:text-accent-orange group-focus-within:opacity-100 transition-all" />
              </div>
              <input 
                type="text" 
                placeholder="Institutional Strategy Insight Needed... (Shift+Enter for multi-line)" 
                className="w-full bg-bg-deep border-2 border-border-dim rounded-xl py-4 pl-12 pr-16 text-[13px] font-bold focus:outline-none focus:border-accent-orange transition-all placeholder:opacity-30 tracking-tight"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-accent-orange text-bg-deep hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-20 disabled:grayscale"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.3em] text-text-secondary px-2">
              <div className="flex items-center gap-5">
                <button className="flex items-center gap-2 hover:text-accent-orange transition-colors"><Paperclip className="w-3.5 h-3.5" /> Attach Repo</button>
                <button className="flex items-center gap-2 hover:text-accent-blue transition-colors"><Search className="w-3.5 h-3.5" /> External Web</button>
                <div className="w-[1px] h-3 bg-border-dim" />
                <span className="text-accent-green">RBAC: Level {user?.clearanceLevel || 1} Validated</span>
              </div>
              <div className="flex items-center gap-2 opacity-40 italic">
                LATENCY: 122MS / TOKENS: 1422
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Context Panel */}
        <div className="w-[320px] flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar">
          {/* Quick Tasks */}
          <div className="high-density-panel p-5 bg-gradient-to-br from-bg-surface to-bg-deep border-l-4 border-l-accent-orange shrink-0">
            <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-accent-orange flex items-center gap-2 mb-4">
               <Sparkles className="w-3.5 h-3.5" /> Institutional Commands
            </h4>
            <div className="space-y-2.5">
              {[
                { label: 'Summarize Fintech Reports', cmd: '/summarize-fintech' },
                { label: 'Draft Expansion Brief', cmd: '/brief-lagos' },
                { label: 'Verify Rolodex Trust', cmd: '/verify-contacts' },
                { label: 'Check SOP Alignment', cmd: '/sop-check' }
              ].map(task => (
                <button 
                  key={task.label}
                  onClick={() => setInput(task.cmd)}
                  className="w-full text-left p-3 rounded-lg bg-bg-surface border border-border-dim text-[11px] font-bold hover:border-accent-orange hover:bg-accent-orange/5 transition-all group flex justify-between items-center"
                >
                  <span className="text-text-primary truncate mr-2">{task.label}</span>
                  <Terminal className="w-3 h-3 opacity-20 group-hover:opacity-100 group-hover:text-accent-orange" />
                </button>
              ))}
            </div>
          </div>

          {/* RAG Context Monitor */}
          <div className="flex-1 high-density-panel p-5 flex flex-col gap-4">
             <div className="flex justify-between items-center">
                <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-text-secondary">RAG Context Map</h4>
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-green opacity-40" />
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-green opacity-20" />
                </div>
             </div>
             <div className="flex-1 bg-bg-deep/50 rounded-lg border border-border-dim border-dashed flex flex-col items-center justify-center p-6 text-center group">
                <Database className="w-10 h-10 text-accent-orange/20 mb-3 group-hover:scale-110 transition-transform duration-500" />
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary leading-normal">
                   Retrieval Map<br />
                   <span className="opacity-40 italic font-mono text-[8px] tracking-tight">Indexing Secure Nodes...</span>
                </div>
             </div>
             <div className="space-y-3">
                {[
                  { label: 'Knowledge Coverage', value: '98.2%', color: 'bg-accent-green' },
                  { label: 'Source Confidence', value: '94.5%', color: 'bg-accent-blue' },
                ].map(metric => (
                  <div key={metric.label} className="space-y-1.5">
                     <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-widest">
                        <span className="text-text-secondary">{metric.label}</span>
                        <span className="text-text-primary">{metric.value}</span>
                     </div>
                     <div className="h-1 bg-bg-deep rounded-full overflow-hidden">
                        <div className={cn("h-full", metric.color)} style={{ width: metric.value }} />
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Terminal } from 'lucide-react';

const DEBUG_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Institutional Memory Bridge Secured. Personnel Identity: KIDMAN_ADMIN_01. System Mode: HIGH_DENSITY_ANALYST. How shall I leverage our sovereign data repository today?",
    timestamp: new Date().toISOString(),
  }
];
