/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Book, 
  Search, 
  CheckSquare, 
  History, 
  MessageSquareText, 
  ArrowRight,
  FileText,
  Briefcase,
  ShieldCheck,
  Flag,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { SOP } from '../../types';

export default function SOPLibrary() {
  const { user } = useAuth();
  const [activePillar, setActivePillar] = useState<'Journalism' | 'Research' | 'Operations' | 'All'>('All');
  const [selectedSOP, setSelectedSOP] = useState<SOP | null>(MOCK_SOPS[0]);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string[] | null>(null);

  const filteredSOPs = activePillar === 'All' 
    ? MOCK_SOPS 
    : MOCK_SOPS.filter(s => s.pillar === activePillar);

  const handleSummarize = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setSummary([
        "Utilize JICA/MINT standards for initial startup identification.",
        "Perform binary cleaning on 'Crunchbase for Ethiopia' datasets before entry.",
        "Secure double-verification for 'Elite' founder status via official documents."
      ]);
      setIsSummarizing(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
      {/* Header */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded-lg flex items-center justify-between shrink-0 shadow-sm border-l-4 border-l-accent-orange">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center border border-accent-orange/20">
            <Book className="w-5 h-5 text-accent-orange" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-text-primary">Institutional SOP Library</h2>
            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-tight opacity-60">Shega Media Operational Blueprint / Version 4.2.0-Alpha</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-1.5 bg-bg-deep border border-border-dim rounded text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all">
             <History className="w-3.5 h-3.5" />
             Archival Log
           </button>
           {(user?.role === 'Admin' || user?.role === 'Governance Admin') && (
             <button className="flex items-center gap-2 px-4 py-1.5 bg-accent-blue text-white rounded text-[11px] font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md">
               Draft Procedure
             </button>
           )}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Bookshelf Sidebar */}
        <div className="w-[340px] flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar">
          <div className="high-density-panel flex flex-col p-4 bg-bg-surface/50">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
              <input 
                type="text" 
                placeholder="Query SOP identifiers..." 
                className="w-full bg-bg-deep border border-border-dim rounded-lg py-2 pl-10 pr-4 text-[11px] focus:outline-none focus:border-accent-orange transition-all"
              />
            </div>
            
            <div className="space-y-4">
               {['Journalism', 'Research', 'Operations'].map((pillar) => (
                 <div key={pillar} className="space-y-2">
                    <button 
                      onClick={() => setActivePillar(pillar as any)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-1.5 rounded-md text-[10px] font-extrabold uppercase tracking-widest transition-all",
                        activePillar === pillar ? "bg-bg-deep text-accent-orange border border-border-dim" : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                       <span className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            pillar === 'Journalism' && "bg-red-500",
                            pillar === 'Research' && "bg-accent-blue",
                            pillar === 'Operations' && "bg-accent-green"
                          )} />
                          {pillar}
                       </span>
                       <ChevronDown className={cn("w-3 h-3 transition-transform", activePillar === pillar ? "" : "-rotate-90")} />
                    </button>
                    
                    {activePillar === pillar && (
                      <div className="space-y-1.5 pl-3 border-l border-border-dim ml-1.5 animate-in slide-in-from-top-2 duration-300">
                         {MOCK_SOPS.filter(s => s.pillar === pillar).map(sop => (
                           <button
                             key={sop.id}
                             onClick={() => { setSelectedSOP(sop); setSummary(null); }}
                             className={cn(
                               "w-full text-left p-3 rounded-lg border transition-all relative overflow-hidden group",
                               selectedSOP?.id === sop.id 
                                 ? "bg-bg-surface border-accent-orange shadow-lg" 
                                 : "bg-transparent border-transparent hover:bg-bg-elevated/40"
                             )}
                           >
                             <div className="flex justify-between items-start mb-1">
                                <span className="text-[8px] font-mono opacity-40 uppercase">SH-SOP-{sop.id}</span>
                                <span className="text-[8px] font-bold text-accent-orange opacity-0 group-hover:opacity-100 transition-opacity">v{sop.version}</span>
                             </div>
                             <h4 className={cn(
                               "text-[11px] font-bold leading-tight uppercase tracking-tight",
                               selectedSOP?.id === sop.id ? "text-accent-orange" : "text-text-primary opacity-80"
                             )}>
                               {sop.title}
                             </h4>
                           </button>
                         ))}
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* SOP Blueprint View */}
        <div className="flex-1 high-density-panel flex flex-col min-w-0 bg-bg-surface/50 border-2 border-border-dim/50 shadow-2xl relative overflow-hidden">
          {/* Watermark Background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
             <div className="text-[120px] font-extrabold uppercase -rotate-45 tracking-[0.5em] text-accent-orange">SOVEREIGN</div>
          </div>
          
          {selectedSOP ? (
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
              <div className="max-w-4xl mx-auto space-y-12">
                {/* Protocol Header */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px bg-border-dim flex-1" />
                    <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.4em] text-text-secondary">
                       <ShieldCheck className="w-4 h-4 text-accent-orange" />
                       Standard Operating Procedure
                    </div>
                    <div className="h-px bg-border-dim flex-1" />
                  </div>
                  <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold uppercase tracking-tighter leading-none">{selectedSOP.title}</h1>
                    <div className="flex items-center justify-center gap-8 py-2 border-y border-border-dim text-[11px] font-mono font-bold uppercase tracking-widest text-text-secondary">
                      <div className="flex items-center gap-2"><Flag className="w-3.5 h-3.5" /> ID: SH-SOP-{selectedSOP.id}</div>
                      <div className="flex items-center gap-2 text-accent-orange">PILLAR: {selectedSOP.pillar.toUpperCase()}</div>
                      <div className="flex items-center gap-2">REVISION: {selectedSOP.version}</div>
                    </div>
                  </div>
                </div>

                {/* AI Mobilization Widget (Ask an SOP) */}
                <div className="bg-bg-deep border-2 border-accent-blue/20 rounded-xl p-6 flex flex-col gap-4 shadow-xl group">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center border border-accent-blue/30 group-hover:scale-110 transition-transform">
                            <MessageSquareText className="w-5 h-5 text-accent-blue" />
                         </div>
                         <div>
                            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-text-primary">AI Rapid Mobilization (Ask an SOP)</h4>
                            <p className="text-[9px] text-text-secondary uppercase font-bold tracking-tight opacity-60">Instant 3-Point Checklist Summarization</p>
                         </div>
                      </div>
                      {!summary && (
                        <button 
                          onClick={handleSummarize}
                          disabled={isSummarizing}
                          className="bg-accent-blue text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:brightness-110 shadow-lg shadow-accent-blue/20 disabled:opacity-30 transition-all font-mono"
                        >
                          {isSummarizing ? "Synthesizing Protocol..." : "MOBILIZE CHECKLIST"}
                        </button>
                      )}
                   </div>
                   {summary && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-4 duration-500">
                        {summary.map((line, i) => (
                          <div key={i} className="bg-bg-surface p-4 rounded-lg border border-border-dim border-l-4 border-l-accent-blue flex flex-col gap-3 relative overflow-hidden group/item">
                             <div className="absolute top-0 right-0 p-4 opacity-[0.02] text-4xl font-extrabold">{i+1}</div>
                             <p className="text-[11px] italic font-bold leading-relaxed text-text-primary relative z-10 antialiased">
                                {line}
                             </p>
                          </div>
                        ))}
                     </div>
                   )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
                  {/* Left Col: Metadata */}
                  <div className="md:col-span-1 space-y-10">
                    <section className="space-y-4">
                       <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                         <Briefcase className="w-4 h-4 text-accent-orange" />
                         Operational Roles
                       </h3>
                       <div className="flex flex-col gap-3">
                         {selectedSOP.content.roles.map((role, idx) => (
                           <div key={idx} className="bg-bg-deep border border-border-dim px-4 py-3 rounded-lg text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-primary flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                              {role}
                           </div>
                         ))}
                       </div>
                    </section>
                    
                    <section className="space-y-4">
                       <div className="p-5 bg-bg-deep border border-border-dim rounded-lg space-y-2">
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary">Governance Data</h4>
                          <div className="text-[12px] font-bold text-text-primary flex justify-between">
                            <span className="opacity-40">APPROVED BY</span>
                            <span className="text-accent-blue">{selectedSOP.approvedBy}</span>
                          </div>
                          <div className="text-[12px] font-bold text-text-primary flex justify-between">
                            <span className="opacity-40">LAST SYNC</span>
                            <span>{new Date(selectedSOP.lastUpdated).toLocaleDateString()}</span>
                          </div>
                       </div>
                    </section>
                  </div>

                  {/* Right Col: Procedures */}
                  <div className="md:col-span-2 space-y-10">
                    <section className="space-y-4">
                       <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                         <FileText className="w-4 h-4 text-accent-orange" />
                         Master Objective
                       </h3>
                       <p className="text-[14px] leading-relaxed text-text-primary font-medium italic opacity-90 border-l-4 border-l-border-dim pl-6 py-2">
                         "{selectedSOP.content.objective}"
                       </p>
                    </section>

                    <section className="space-y-6">
                       <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                         <History className="w-4 h-4 text-accent-orange" />
                         Procedural Workflow
                       </h3>
                       <div className="space-y-5">
                          {selectedSOP.content.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-6 group">
                               <div className="flex flex-col items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-bg-deep border-2 border-border-dim group-hover:border-accent-orange transition-all flex items-center justify-center font-extrabold text-[12px] shrink-0 text-text-secondary group-hover:text-accent-orange shadow-lg">
                                    {String(idx + 1).padStart(2, '0')}
                                  </div>
                                  {idx < selectedSOP.content.steps.length - 1 && <div className="w-0.5 h-full bg-border-dim group-hover:bg-accent-orange/30 transition-all"></div>}
                               </div>
                               <div className="pt-1.5 pb-2">
                                  <p className="text-[13px] text-text-primary leading-relaxed antialiased font-bold tracking-tight">
                                    {step}
                                  </p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </section>

                    <section className="space-y-6 bg-accent-green/5 border-2 border-accent-green/20 p-8 rounded-2xl shadow-xl">
                       <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-accent-green flex items-center gap-2">
                         <CheckSquare className="w-5 h-5" />
                         "Gold Standard" Operational Checklist
                       </h3>
                       <div className="grid grid-cols-1 gap-4">
                          {selectedSOP.content.checklist.map((item, idx) => (
                            <div key={idx} className="bg-bg-surface p-4 rounded-xl border border-accent-green/10 flex items-start gap-4 hover:shadow-lg transition-all cursor-pointer group/check">
                               <div className="w-5 h-5 rounded border-2 border-accent-green/30 flex items-center justify-center transition-all group-hover/check:bg-accent-green group-hover/check:border-accent-green">
                                  <CheckSquare className="w-3.5 h-3.5 text-accent-green group-hover/check:text-bg-deep" />
                               </div>
                               <span className="text-[12px] font-extrabold text-text-primary tracking-tight">{item}</span>
                            </div>
                          ))}
                       </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center gap-6 select-none">
               <Book className="w-24 h-24 mb-4 group-hover:scale-110 transition-transform duration-700" />
               <div className="text-xl font-extrabold uppercase tracking-[0.5em] text-accent-orange">Procedure Locked</div>
               <p className="text-[11px] uppercase font-bold tracking-[0.3em] max-w-[320px] leading-loose">Select established SOP node from the institutional bookshelf to initialize orientation sequence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MOCK_SOPS: SOP[] = [
  {
    id: '1',
    title: 'Startup Ecosystem Mapping Protocol',
    pillar: 'Research',
    version: '3.1.2',
    lastUpdated: '2026-04-12',
    approvedBy: 'SH_ADMIN_KIDMAN',
    content: {
      objective: 'Standardized methodology for mapping Ethiopian startups to align with JICA/MINT reporting standards and Global Investor Intelligence expectations.',
      roles: ['Head of Data Research', 'Ecosystem Analyst'],
      steps: [
        "Initialize node discovery via Hub Direct-Entry feeds and SPO archival records.",
        "Perform Binary Verification: Does the entity meet MINT definition of a 'Digital Enterprise'?",
        "Sectoral Intelligence Assignment: Map entity to one of 14 primary fintech/agtech clusters.",
        "Revenue Density Calculation: Estimate ARR based on known employee tier metrics and funding history.",
        "Peer Consensus Review: Multi-agent check for data integrity before final hub sync."
      ],
      checklist: [
        "MINT/Ministry Compliance Verified",
        "Currency Normalization (ETB to USD at Dynamic Rate)",
        "Elite Founder Tagging for Rolodex Entry",
        "Source Citation KB-ID Generated"
      ]
    }
  },
  {
    id: '2',
    title: 'Executive Interview Standard (The Shega Protocol)',
    pillar: 'Journalism',
    version: '2.4.0',
    lastUpdated: '2026-03-28',
    approvedBy: 'SH_EDITOR_AHMED',
    content: {
      objective: 'The premium "Shega" standard for conducting high-level regulatory and executive interviews to ensure unmatched depth and data integrity.',
      roles: ['Senior Journalist', 'Lead Editor'],
      steps: [
        "Rolodex Clearance: Validate source reliability and private interaction history.",
        "Brain Sync: Conduct 30-minute AI-led intelligence briefing on source's previous policy stances.",
        "The Triple-Link Method: Structure interview to bridge current news, historical data, and future projection.",
        "Immediate Ingestion: Sync audio/transcription to RAG pipeline for immediate cross-referencing."
      ],
      checklist: [
        "Off-the-record Boundaries Defined",
        "Reliability Score Updated Post-Interview",
        "Citation Cluster Updated for News Evaluator"
      ]
    }
  },
  {
    id: '3',
    title: 'INGO Client Partner Onboarding',
    pillar: 'Operations',
    version: '1.2.0',
    lastUpdated: '2026-01-15',
    approvedBy: 'SH_MGMT_BOARD',
    content: {
      objective: 'Seamless end-to-end mobilization of strategic partners including JICA, Gates Foundation, and AfDB to ensure project alignment with SIH sovereign data standards.',
      roles: ['Operations Director', 'Relationship Manager'],
      steps: [
        "Legal Node Finalization: Confirm contract encryption and fiscal deposit sync.",
        "Cluster Provisioning: Set up sovereign SPO folders and Notion workspaces.",
        "Strategic Analyst Assignment: Pair lead researcher based on Expertise Vector mapping.",
        "Hub Ingestion Boot: Initialize 'Direct-Link' pointers for partner data sources."
      ],
      checklist: [
        "Compliance Audit Complete",
        "Mentorship Pairing Logic Synchronized",
        "Admin Governance Keys Rotated"
      ]
    }
  }
];
