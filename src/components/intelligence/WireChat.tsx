/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Send, 
  Hash, 
  Users, 
  Zap, 
  MessageCircle,
  Clock,
  ChevronRight,
  Shield,
  Activity,
  Globe
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  content: string;
  timestamp: Date;
  type: 'broadcast' | 'direct' | 'system';
}

export default function CommunicationWire() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial seeded messages
    setMessages([
      { 
        id: '1', 
        userId: 'system', 
        userName: 'SYSTEM_HUB', 
        userRole: 'CORE', 
        content: 'Institutional Wire Synchronized. Secure channel established.', 
        timestamp: new Date(Date.now() - 3600000), 
        type: 'system' 
      },
      { 
        id: '2', 
        userId: 'admin_1', 
        userName: 'Governance Admin', 
        userRole: 'Governance Admin', 
        content: 'All editors please verify the new SOP clusters for the Hawassa rollout.', 
        timestamp: new Date(Date.now() - 1800000), 
        type: 'broadcast' 
      },
      { 
        id: '3', 
        userId: 'editor_1', 
        userName: 'Sarah Ahmed', 
        userRole: 'Personnel Node', 
        content: 'SOP Hub synced. Working on localization for the Oromo cluster now.', 
        timestamp: new Date(Date.now() - 600000), 
        type: 'broadcast' 
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      content: message,
      timestamp: new Date(),
      type: 'broadcast'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4 overflow-hidden">
      {/* Wire Header */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded-lg flex items-center justify-between shrink-0 shadow-sm border-l-4 border-l-accent-blue">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
            <MessageCircle className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-text-primary">Communication Wire</h2>
            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-tight opacity-60">Sovereign Encryption Node // Real-time Personnel Sync</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-deep border border-border-dim rounded-lg">
             <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
             <span className="text-[10px] font-mono font-bold text-accent-green">ENCRYPTION: AES-4096-INSTITUTIONAL</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Chat Interface */}
        <div className="flex-1 high-density-panel flex flex-col min-w-0 bg-bg-surface/50 border-2 border-border-dim/50 shadow-2xl relative overflow-hidden">
          <div className="panel-header border-b border-border-dim px-6 py-4 shrink-0 flex items-center justify-between bg-bg-surface/50">
            <h3 className="flex items-center gap-2 uppercase tracking-widest text-[12px] font-extrabold">
              <Hash className="w-4 h-4 text-accent-blue" />
              Main Institutional Feed
            </h3>
            <div className="flex items-center gap-4 text-[10px] font-bold text-text-secondary">
              <span className="uppercase opacity-40 font-mono tracking-tighter">Active Nodes: 14/14 Online</span>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6 bg-bg-deep/30"
          >
            {messages.map((msg, i) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex gap-4 group animate-in slide-in-from-bottom-2 duration-300",
                  msg.userId === user?.id ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-black text-[12px] shrink-0 border-2 border-bg-surface shadow-lg group-hover:scale-110 transition-transform",
                  msg.userId === 'system' ? "bg-bg-elevated text-text-secondary" : 
                  msg.userId === user?.id ? "bg-accent-blue text-white" : "bg-accent-orange text-white"
                )}>
                  {msg.userName.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className={cn(
                  "flex flex-col gap-1.5 max-w-[70%]",
                  msg.userId === user?.id ? "items-end" : "items-start"
                )}>
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">{msg.userName}</span>
                    <span className="text-[8px] font-bold text-text-secondary opacity-40 uppercase tracking-tighter">{msg.userRole}</span>
                    <span className="text-[8px] font-mono text-text-secondary opacity-40">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  
                  <div className={cn(
                    "p-4 rounded-2xl text-[13px] font-medium leading-relaxed shadow-lg relative",
                    msg.userId === 'system' ? "bg-bg-surface border border-border-dim border-dashed italic text-text-secondary" :
                    msg.userId === user?.id ? "bg-accent-blue text-white rounded-tr-none" : "bg-bg-surface border border-border-dim text-text-primary rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-border-dim bg-bg-surface/50">
            <form onSubmit={handleSend} className="relative group max-w-5xl mx-auto flex gap-3">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Broadcast to institutional wire..." 
                  className="w-full bg-bg-deep border-2 border-border-dim rounded-2xl py-4 pl-12 pr-4 text-[14px] font-bold focus:outline-none focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10 transition-all shadow-inner"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-blue opacity-40" />
              </div>
              <button 
                type="submit"
                disabled={!message.trim()}
                className="bg-accent-blue text-white px-8 rounded-2xl flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-accent-blue/20 disabled:opacity-50 disabled:active:scale-100"
              >
                <Send className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase tracking-widest">Broadcast</span>
              </button>
            </form>
          </div>
        </div>

        {/* Channels Sidebar */}
        <div className="w-64 flex flex-col gap-4 shrink-0">
          <div className="high-density-panel flex flex-col bg-bg-surface/50 border border-border-dim p-4">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Channels
             </h4>
             <div className="space-y-1">
                {[
                  { label: 'General', icon: Hash, active: true },
                  { label: 'Governance', icon: Shield, active: false },
                  { label: 'Localization', icon: Globe, active: false },
                  { label: 'Research', icon: Activity, active: false },
                ].map(chan => (
                  <button 
                    key={chan.label}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-bold transition-all",
                      chan.active ? "bg-accent-blue/10 text-accent-blue" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                    )}
                  >
                    <chan.icon className="w-4 h-4" />
                    {chan.label}
                  </button>
                ))}
             </div>
          </div>

          <div className="high-density-panel flex-1 bg-bg-surface/50 border border-border-dim p-4 flex flex-col overflow-hidden">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Online Nodes
             </h4>
             <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {[
                   { name: 'Sarah Ahmed', status: 'online', role: 'Editor' },
                   { name: 'Elsa Tesfaye', status: 'online', role: 'Admin' },
                   { name: 'Michael Kassa', status: 'away', role: 'Research' },
                   { name: 'Hana Belay', status: 'online', role: 'Editor' },
                   { name: 'Abebe Kebede', status: 'offline', role: 'Data' },
                ].map(node => (
                  <div key={node.name} className="flex items-center gap-3">
                    <div className="relative">
                       <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border-dim flex items-center justify-center text-[10px] font-black">
                          {node.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div className={cn(
                         "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-bg-surface",
                         node.status === 'online' ? "bg-accent-green" :
                         node.status === 'away' ? "bg-accent-orange" : "bg-bg-elevated"
                       )} />
                    </div>
                    <div>
                       <div className="text-[11px] font-bold text-text-primary leading-tight">{node.name}</div>
                       <div className="text-[9px] font-bold text-text-secondary uppercase opacity-40">{node.role}</div>
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
