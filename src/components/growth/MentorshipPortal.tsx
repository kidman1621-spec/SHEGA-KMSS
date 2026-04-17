/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  GraduationCap, 
  Flame, 
  Pin, 
  BookOpen, 
  CheckCircle2, 
  UserPlus, 
  Clock,
  ArrowRight,
  TrendingUp,
  Brain,
  FileBadge,
  Sparkles,
  Target as TargetIcon,
  Activity,
  ChevronRight,
  ShieldCheck,
  RefreshCcw,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { NewsBriefing, User } from '../../types';

export default function MentorshipPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'Feed' | 'Pairing' | 'Certification'>('Feed');
  const [briefings, setBriefings] = useState<NewsBriefing[]>(MOCK_BRIEFINGS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);

  const togglePin = (id: string) => {
    setBriefings(prev => prev.map(b => b.id === id ? { ...b, isPinned: !b.isPinned } : b));
  };

  const handleConnect = (mentor: string) => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert(`Institutional sync request dispatched to ${mentor}. Synchronization scheduled.`);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
      {/* Intelligence Feed Header */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded-lg flex items-center justify-between shrink-0 shadow-sm border-l-4 border-l-accent-blue">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
            <Flame className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-text-primary">Institutional Growth Nexus</h2>
            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-tight opacity-60">Daily Briefings & Personnel Development / Shega Media Internal</p>
          </div>
        </div>
        <div className="flex bg-bg-deep rounded p-1 border border-border-dim shadow-inner">
           {['Feed', 'Pairing', 'Certification'].map(tab => (
             <div 
               key={tab} 
               onClick={() => setActiveTab(tab as any)}
               className={cn(
                "px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all",
                activeTab === tab ? "bg-bg-elevated text-text-primary shadow-lg border border-border-dim" : "text-text-secondary hover:text-text-primary"
              )}
             >
               {tab}
             </div>
           ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Core Content Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'Feed' && (
              <motion.div 
                key="feed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 flex flex-col gap-4 overflow-hidden"
              >
                {/* Main Feed */}
                <div className="flex-1 high-density-panel flex flex-col overflow-hidden bg-bg-surface/50">
                  <div className="panel-header border-b border-border-dim shrink-0 bg-bg-surface/50">
                    <h3 className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent-green" />
                        Continental Intelligence Wire
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                        <span className="text-[9px] font-mono text-accent-green uppercase font-bold">LIVE UPDATE SATELLITE 09</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-border-dim/50">
                    {briefings.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)).map((post) => (
                      <div key={post.id} className={cn(
                        "p-6 transition-all hover:bg-bg-elevated/40 group relative overflow-hidden",
                        post.isPinned && "bg-accent-blue/5 border-l-2 border-accent-blue"
                      )}>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex flex-col gap-2">
                            <span className={cn(
                              "w-fit text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border",
                              post.category === 'Client Win' ? "border-accent-green/30 text-accent-green bg-accent-green/5" :
                              post.category === 'System' ? "border-accent-orange/30 text-accent-orange bg-accent-orange/5" :
                              "border-slate-500/30 text-slate-400 bg-slate-500/5"
                            )}>
                              {post.category}
                            </span>
                            <h4 className="text-[15px] font-black text-text-primary group-hover:text-accent-blue transition-colors tracking-tighter uppercase">
                              {post.title}
                            </h4>
                          </div>
                          {(user?.role === 'ADMIN' || user?.role === 'Governance Admin') && (
                            <button 
                              onClick={() => togglePin(post.id)}
                              className={cn("p-1.5 rounded bg-bg-deep border border-border-dim text-text-secondary transition-all", post.isPinned && "text-accent-blue border-accent-blue/30 shadow-lg")}
                            >
                              <Pin className={cn("w-3.5 h-3.5", post.isPinned && "fill-current")} />
                            </button>
                          )}
                        </div>
                        <p className="text-[13px] text-text-secondary leading-relaxed mb-4 max-w-[90%] font-medium">
                          {post.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent-blue" /> {post.date}</span>
                            <div className="w-1 h-1 rounded-full bg-border-dim" />
                            <span className="hover:text-text-primary cursor-pointer transition-colors italic">Sovereign Source Verified</span>
                          </div>
                          <button className="text-[10px] font-black text-accent-blue hover:text-white transition-all flex items-center gap-2 group/btn border border-accent-blue/20 px-3 py-1 rounded-full hover:bg-accent-blue">
                            EXAMINE BRIEF
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Growth Card */}
                <div className="h-[140px] shrink-0 high-density-panel bg-gradient-to-r from-accent-blue/10 to-transparent flex items-center p-6 relative overflow-hidden group border-2 border-accent-blue/20">
                  <div className="absolute right-[-10%] bottom-[-20%] rotate-[-15deg] opacity-10 pointer-events-none group-hover:scale-110 group-hover:rotate-[-10deg] transition-all duration-700">
                      <GraduationCap className="w-48 h-48 text-accent-blue" />
                  </div>
                  <div className="relative z-10 flex gap-6 items-center w-full">
                      <div className="w-16 h-16 rounded-2xl bg-bg-deep border-2 border-accent-blue shadow-2xl flex items-center justify-center shrink-0">
                        <TargetIcon className="w-8 h-8 text-accent-blue" />
                      </div>
                      <div className="space-y-1">
                        <div className="bg-accent-blue text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest w-fit mb-1">Mandatory Training</div>
                        <h3 className="text-xl font-black tracking-tighter uppercase leading-none italic">SOP Certification: Research Matrix</h3>
                        <p className="text-[11px] text-text-secondary max-w-[400px] font-bold uppercase opacity-60">Verified institutional knowledge gate required for L3 clearance.</p>
                      </div>
                      <button className="ml-auto flex items-center gap-2 bg-accent-blue py-4 px-6 rounded-xl text-white text-[11px] font-extrabold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent-blue/20">
                        Launch Simulation
                      </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Pairing' && (
              <motion.div 
                key="pairing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full bg-bg-surface border-2 border-border-dim rounded-2xl p-8 flex flex-col gap-8 shadow-2xl overflow-y-auto custom-scrollbar"
              >
                 <div className="text-center space-y-2">
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Authority Pairing Logic</h3>
                    <p className="text-[11px] text-text-secondary uppercase font-bold tracking-[0.3em] opacity-60">Shega Intelligence Hub / Active Mentor Nodes</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                    {MOCK_MENTORS.map((mentor, i) => (
                      <div key={i} className="bg-bg-deep border-2 border-border-dim rounded-3xl p-6 group hover:border-accent-blue transition-all relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                            <Users className="w-20 h-20" />
                         </div>
                         <div className="flex items-center gap-6 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-bg-surface border-2 border-accent-blue/30 flex items-center justify-center font-black text-2xl text-accent-blue shadow-lg">
                               {mentor.name[0]}
                            </div>
                            <div className="space-y-1">
                               <div className="text-[18px] font-black tracking-tighter uppercase italic">{mentor.name}</div>
                               <div className="text-[10px] font-bold text-accent-blue uppercase tracking-widest bg-accent-blue/10 w-fit px-2 py-0.5 rounded-full">{mentor.role}</div>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-text-secondary opacity-60">
                               <span>Domain Integrity</span>
                               <span>{mentor.match}% Match</span>
                            </div>
                            <div className="h-2 bg-bg-surface rounded-full overflow-hidden border border-border-dim shadow-inner">
                               <div className="h-full bg-accent-blue" style={{ width: `${mentor.match}%` }} />
                            </div>
                         </div>
                         <div className="mt-8 flex gap-3">
                            <button className="flex-1 py-3 border-2 border-border-dim rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all">Profile</button>
                            <button 
                              onClick={() => handleConnect(mentor.name)}
                              disabled={isSyncing}
                              className="flex-3 py-3 bg-accent-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                               {isSyncing ? <RefreshCcw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 fill-current" />}
                               Institutional Sync
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeTab === 'Certification' && (
              <motion.div 
                key="certs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full bg-bg-surface border-2 border-border-dim rounded-2xl p-8 flex flex-col gap-10 shadow-2xl overflow-y-auto custom-scrollbar"
              >
                 <div className="flex items-center justify-between border-b-2 border-border-dim pb-8">
                    <div className="space-y-1">
                       <h3 className="text-3xl font-black uppercase tracking-tighter italic">Certification Matrix</h3>
                       <p className="text-[11px] text-text-secondary uppercase font-bold tracking-[0.3em] opacity-60">Verified Institutional Expertise Pathways</p>
                    </div>
                    <div className="w-16 h-16 rounded-3xl bg-accent-green/10 border-2 border-accent-green/30 flex items-center justify-center shadow-xl">
                       <FileBadge className="w-8 h-8 text-accent-green" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { title: 'Fintech Quality Assurance', code: 'CRT-QA-01', status: 'Certified', date: 'Mar 2026', progress: 100 },
                      { title: 'Data Extraction Protocol', code: 'CRT-DP-09', status: 'Active', date: 'Sync Pending', progress: 68 },
                      { title: 'Institutional News Synthesis', code: 'CRT-NS-04', status: 'Pending', date: 'Initializing', progress: 12 },
                      { title: 'Super-User Governance', code: 'CRT-GV-02', status: 'Locked', date: 'Admin Only', progress: 0 }
                    ].map((cert, i) => (
                      <div key={i} className="bg-bg-deep border-2 border-border-dim p-8 rounded-[2.5rem] space-y-6 relative overflow-hidden transition-all hover:border-accent-green shadow-xl">
                         <div className="flex justify-between items-start">
                           <div className="space-y-1">
                              <span className="text-[10px] font-mono text-accent-green font-bold px-2 py-0.5 border border-accent-green/20 rounded uppercase bg-accent-green/5">{cert.code}</span>
                              <h4 className="text-[20px] font-black uppercase tracking-tight italic leading-tight pt-2">{cert.title}</h4>
                           </div>
                           <div className={cn(
                             "w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-lg",
                             cert.progress === 100 ? "bg-accent-green/10 border-accent-green/30" : "bg-bg-surface border-border-dim"
                           )}>
                              {cert.progress === 100 ? <CheckCircle2 className="w-6 h-6 text-accent-green" /> : <Sparkles className="w-6 h-6 text-text-secondary opacity-30" />}
                           </div>
                         </div>

                         <div className="space-y-3">
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-text-secondary opacity-60">
                               <span>Pathway Saturation</span>
                               <span>{cert.progress}% Complete</span>
                            </div>
                            <div className="h-3 bg-bg-surface rounded-full overflow-hidden border-2 border-border-dim p-[2px]">
                               <div className={cn("h-full rounded-full transition-all duration-1000", cert.progress === 100 ? "bg-accent-green shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-accent-blue")} style={{ width: `${cert.progress}%` }} />
                            </div>
                         </div>

                         <div className="flex justify-between items-center pt-4">
                            <div className="flex flex-col">
                               <span className="text-[9px] font-black text-text-secondary uppercase opacity-40">Seal Verified</span>
                               <span className="text-[11px] font-bold">{cert.date}</span>
                            </div>
                            <button className={cn(
                              "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg",
                              cert.progress === 100 ? "border-2 border-accent-green text-accent-green hover:bg-accent-green hover:text-white" : "bg-accent-blue text-white hover:brightness-110"
                            )}>
                               {cert.progress === 100 ? 'Review Transcript' : 'Resume Protocol'}
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Status & Syncs - Hidden on small layouts */}
        <div className="w-[340px] flex flex-col gap-4 shrink-0">
          {/* Real-time Personnel Dashboard */}
          <div className="high-density-panel flex flex-col p-6 bg-bg-surface/50 border-r-4 border-r-accent-blue shadow-2xl h-full">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-accent-blue">Personnel Pulse</h3>
                <Activity className="w-4 h-4 text-accent-blue animate-pulse" />
             </div>

             <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-4 opacity-40 italic">Active Syncs</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Ahmed', time: 'Tomorrow, 14:00', topic: 'Fintech QA' },
                      { name: 'Dr. Abiy Melaku', time: 'Mon, 09:30', topic: 'Policy Review' }
                    ].map((sync, i) => (
                      <div key={i} className="group p-4 bg-bg-deep border-2 border-border-dim rounded-2xl hover:border-accent-blue transition-all cursor-pointer shadow-lg animate-in fade-in slide-in-from-right-4">
                         <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-bg-surface border-2 border-border-dim flex flex-col items-center justify-center shrink-0">
                               <span className="text-[8px] font-black uppercase opacity-40">{sync.time.split(',')[0].substr(0, 3)}</span>
                               <Calendar className="w-3.5 h-3.5 text-accent-blue" />
                            </div>
                            <div className="min-w-0">
                               <div className="text-[13px] font-black truncate group-hover:text-accent-blue transition-colors italic uppercase">{sync.name}</div>
                               <div className="text-[9px] text-text-secondary font-bold uppercase tracking-tight opacity-60">{sync.topic}</div>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border-dim">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-4 opacity-40 italic">Growth Velocity</h4>
                   <div className="bg-bg-deep p-6 rounded-3xl border-2 border-border-dim relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                         <Sparkles className="w-12 h-12 text-accent-orange" />
                      </div>
                      <div className="text-4xl font-black italic tracking-tighter text-accent-orange mb-1">8.4</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">Monthly Skill Ingestion Coefficient</div>
                   </div>
                </div>
             </div>

             <button className="mt-auto w-full py-4 bg-bg-surface border-2 border-border-dim rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent-blue hover:border-accent-blue transition-all shadow-xl group">
                <div className="flex items-center justify-center gap-2">
                   Institutional Map <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCK_MENTORS = [
  { name: 'Sarah Ahmed', role: 'Fintech Authority', match: 98 },
  { name: 'Kidman Shega', role: 'Operations Strategy', match: 94 },
  { name: 'Elsa Tesfaye', role: 'Regional Analytics', match: 89 },
  { name: 'Michael Kassa', role: 'Research Governance', match: 82 },
];

const MOCK_BRIEFINGS: NewsBriefing[] = [
  {
    id: '1',
    title: 'New Client Win: JICA Digital Economy Study',
    content: 'Shega selected to lead the 2026 digital economy landscape study for JICA. Strategic mapping across 14 emerging clusters begins Q1.',
    date: 'Today, 09:12',
    isPinned: true,
    category: 'Client Win',
  },
  {
    id: '2',
    title: 'System Update: Intelligence Hub v3.1.0',
    content: 'The new RAG spatial mapping and News Evaluator (Quality Guard) modules are now live. Fact-Check Agent V4 is nominal.',
    date: 'Yesterday, 14:30',
    isPinned: false,
    category: 'System',
  },
  {
    id: '3',
    title: 'Ecosystem Shift: Safaricom 5G Expansion Data',
    content: 'Internal report uploaded for level 2+ clearance. Analyzing regional infrastructure spend in Afar and Somali regions.',
    date: 'Oct 15, 10:00',
    isPinned: false,
    category: 'Internal',
  }
];
