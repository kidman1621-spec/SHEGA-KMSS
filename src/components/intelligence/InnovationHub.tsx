/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  ArrowBigUp, 
  MessageSquare, 
  Plus, 
  Send, 
  Filter, 
  TrendingUp,
  User,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { InnovationIdea } from '../../types';
import { cn } from '../../lib/utils';

export default function InnovationHub() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [ideas, setIdeas] = useState<InnovationIdea[]>([
    {
      id: '1',
      title: 'Real-time Currency Fluctuation Alerts',
      description: 'Implement a bot that triggers alerts in Slack/Hub when the Birr fluctuates more than 2% in an hour. Useful for our FX reporting team.',
      authorId: 'user1',
      authorName: 'Nahom T.',
      votes: 12,
      comments: [
        { id: 'c1', authorName: 'Kaleb', content: 'We can use the Alpha Vantage API for this.', createdAt: new Date().toISOString() }
      ],
      createdAt: new Date().toISOString(),
      tags: ['Data', 'Real-time']
    },
    {
      id: '2',
      title: 'Automated SOP Verification via AI',
      description: 'Use the Hub Brain to automatically check if a research paper follows the internal Shega SOP before publication.',
      authorId: 'user2',
      authorName: 'Sara M.',
      votes: 24,
      comments: [],
      createdAt: new Date().toISOString(),
      tags: ['AI', 'Operations']
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const newIdea: InnovationIdea = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      description: newDesc,
      authorId: user?.id || 'anon',
      authorName: user?.name || 'Anonymous Staff',
      votes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      tags: ['New']
    };

    setIdeas(prev => [newIdea, ...prev]);
    setIsAdding(false);
    setNewTitle('');
    setNewDesc('');

    // Trigger notification
    addNotification({
      title: 'New Innovation Proposal',
      message: `New idea posted by ${user?.name}: ${newTitle}`,
      type: 'Idea',
      link: '/innovation'
    });
  };

  const handleVote = (id: string) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    ));
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-accent-blue font-black uppercase text-[10px] tracking-[0.3em]">
            <Lightbulb className="w-4 h-4" />
            Growth Engine
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-text-primary">Innovation Hub</h1>
          <p className="text-[11px] text-text-secondary uppercase font-bold tracking-widest opacity-60">Crowdsourced intelligence & process optimizations</p>
        </div>

        <button 
          onClick={() => setIsAdding(true)}
          className="bg-accent-blue text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:brightness-110 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Propose Idea
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <AnimatePresence>
            {isAdding && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-bg-surface border border-accent-blue/30 rounded-2xl p-6 shadow-2xl"
              >
                <form onSubmit={handleSubmitIdea} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Idea Header</label>
                    <input 
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Concise title for the proposal..."
                      className="w-full bg-bg-deep border border-border-dim rounded-xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-accent-blue transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Detailed Description</label>
                    <textarea 
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Explain the problem, solution, and potential impact..."
                      rows={4}
                      className="w-full bg-bg-deep border border-border-dim rounded-xl px-4 py-3 text-[13px] font-medium focus:outline-none focus:border-accent-blue transition-all"
                    />
                  </div>
                  <div className="flex justify-end gap-3 uppercase text-[10px] font-black">
                    <button 
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-6 py-3 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-accent-blue px-8 py-3 rounded-xl text-white flex items-center gap-2"
                    >
                      Deploy Proposal
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-4">
            {ideas.map((idea) => (
              <motion.div 
                layout
                key={idea.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-bg-surface border border-border-dim rounded-2xl overflow-hidden hover:border-accent-blue/30 transition-all flex group"
              >
                {/* Vote Sidebar */}
                <div className="w-16 bg-bg-deep flex flex-col items-center py-6 gap-1 group-hover:bg-bg-elevated transition-colors border-r border-border-dim">
                  <button 
                    onClick={() => handleVote(idea.id)}
                    className="p-1 hover:text-accent-blue text-text-secondary transition-colors"
                  >
                    <ArrowBigUp className="w-8 h-8 fill-current" />
                  </button>
                  <span className="text-xl font-black text-text-primary">{idea.votes}</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        {idea.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-black uppercase text-accent-blue/60 tracking-widest">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-text-primary group-hover:text-accent-blue transition-colors">
                        {idea.title}
                      </h3>
                    </div>
                    <span className="text-[9px] font-black text-text-secondary bg-bg-deep px-3 py-1 rounded-full border border-border-dim">
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-[13px] text-text-secondary leading-relaxed font-medium line-clamp-2">
                    {idea.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border-dim opacity-60">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[8px] font-black uppercase text-white border border-accent-blue/30">
                        {idea.authorName[0]}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{idea.authorName}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[10px] font-bold">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {idea.comments.length} Comments
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-bg-elevated border border-border-dim rounded-2xl p-6 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue">Community Pulse</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-accent-green" />
                  <span className="text-[11px] font-bold uppercase text-text-secondary">Participation</span>
                </div>
                <span className="text-sm font-black text-accent-green">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-accent-blue" />
                  <span className="text-[11px] font-bold uppercase text-text-secondary">Active Contributors</span>
                </div>
                <span className="text-sm font-black text-text-primary">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent-orange" />
                  <span className="text-[11px] font-bold uppercase text-text-secondary">Approval Delta</span>
                </div>
                <span className="text-sm font-black text-text-primary">4.2d</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border-dim">
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-border-dim rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all">
                <Filter className="w-3.5 h-3.5" />
                Filter by Topic
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent-blue/20 to-transparent border border-accent-blue/20 rounded-2xl p-6">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue mb-2">Bounties</h5>
            <p className="text-[12px] font-medium leading-relaxed mb-4">The board is currently paying 50 points extra for <span className="text-accent-blue font-bold">Market Intelligence</span> improvements.</p>
            <button className="text-[10px] font-black uppercase tracking-widest hover:underline">View Bounties &gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
