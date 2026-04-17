/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Leaf, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  FileCheck, 
  Download, 
  ClipboardCheck, 
  AlertCircle,
  Bot,
  History,
  ShieldAlert,
  Archive,
  Star,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { KnowledgeHarvestSession } from '../../types';

export default function HarvestModule() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [session, setSession] = useState<KnowledgeHarvestSession>({
    id: `harvest-${Date.now()}`,
    userId: user?.id || 'unknown',
    status: 'In-Progress',
    steps: {
      contactTransfer: { status: 'Pending', entries: 3 },
      tacitInterview: { 
        status: 'Pending', 
        transcript: [
          { question: "What is one thing about your role that isn't written in the SOPs?", answer: "" },
          { question: "Who are the top 3 stakeholders to manage with extreme caution and why?", answer: "" },
          { question: "If the system fails, what is the 'undocumented' fix you always apply?", answer: "" }
        ] 
      },
      assetAudit: { status: 'Pending', links: [] }
    },
    startedAt: new Date().toISOString()
  });

  const handleAnswerChange = (index: number, val: string) => {
    const next = { ...session };
    next.steps.tacitInterview.transcript[index].answer = val;
    setSession(next);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4 overflow-hidden">
      {/* Offboarding Protocol Header */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded-lg flex items-center justify-between shrink-0 shadow-sm border-l-4 border-l-accent-orange">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center border border-accent-orange/20">
            <Leaf className="w-5 h-5 text-accent-orange" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-text-primary">Knowledge Harvest Unit</h2>
            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-tight opacity-60">Institutional Retention Protocol / Exit Sequence Active</p>
          </div>
        </div>
        <div className="flex bg-bg-deep rounded-lg p-1 border border-border-dim shadow-inner">
           {[1, 2, 3].map(s => (
             <div key={s} className={cn(
               "px-6 py-2 rounded-md text-[10px] font-extrabold transition-all uppercase tracking-widest",
               activeStep === s ? "bg-bg-elevated text-text-primary shadow-lg border border-border-dim" : "text-text-secondary opacity-40 grayscale"
             )}>
                Step {s}: {s === 1 ? 'Contacts' : s === 2 ? 'Tacit' : 'Assets'}
             </div>
           ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Main Harvesting Deck */}
        <div className="flex-1 high-density-panel flex flex-col min-w-0 bg-bg-surface/50 border-2 border-border-dim/50 relative overflow-hidden">
          {/* Progress Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
             <Archive className="w-[600px] h-[600px] text-accent-orange" />
          </div>

          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
            {activeStep === 1 && (
               <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                     <h3 className="text-2xl font-extrabold uppercase tracking-tighter flex items-center gap-3">
                        <Users className="w-8 h-8 text-accent-blue" />
                        Rolodex & Network Sync
                     </h3>
                     <p className="text-[14px] text-text-secondary italic leading-relaxed border-l-4 border-l-accent-blue pl-6 py-2">
                        System requires synchronization of institutional relationships. Transitioning experts from your personal workspace to the sovereign institutional memory.
                     </p>
                  </div>

                  <div className="space-y-3">
                     <div className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-text-secondary opacity-40 mb-4">Linked Nodes for Re-Assignment</div>
                     {[
                       { name: 'Dr. Abiy Melaku', org: 'MinT', role: 'Elite Support' },
                       { name: 'Biniam Gebre', org: 'Safaricom', role: 'Strategic Node' }
                     ].map((node, i) => (
                       <div key={i} className="bg-bg-deep border border-border-dim p-5 rounded-xl flex items-center justify-between group hover:border-accent-blue transition-all shadow-lg">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-lg bg-bg-surface border border-border-dim flex items-center justify-center font-extrabold text-accent-blue group-hover:scale-110 transition-transform">
                                {node.name[0]}
                             </div>
                             <div>
                                <div className="text-[14px] font-extrabold tracking-tight">{node.name}</div>
                                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{node.org} / {node.role}</div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <select className="bg-bg-surface border-2 border-border-dim rounded-lg px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-text-secondary focus:border-accent-blue transition-all">
                                <option>Select Successor...</option>
                                <option>Hana Belay (Editor)</option>
                                <option>Sara Ahmed (Admin)</option>
                             </select>
                             <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue cursor-pointer hover:bg-accent-blue hover:text-white transition-all">
                                <ChevronRight className="w-4 h-4" />
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>

                  <button 
                    onClick={() => setActiveStep(2)}
                    className="ml-auto flex items-center gap-3 bg-accent-blue px-8 py-3 rounded-xl text-white text-[11px] font-extrabold uppercase tracking-[0.2em] shadow-xl hover:brightness-110 transition-all"
                  >
                     CONTINUE HARVEST <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            )}

            {activeStep === 2 && (
               <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center space-y-4">
                     <Bot className="w-12 h-12 text-accent-orange mx-auto animate-bounce-slow" />
                     <h3 className="text-3xl font-extrabold uppercase tracking-tighter">AI-Led Tacit Interview</h3>
                     <p className="text-[12px] text-text-secondary font-bold uppercase tracking-[0.2em] italic">"What is not written in the SOPs?"</p>
                  </div>

                  <div className="space-y-8">
                     {session.steps.tacitInterview.transcript.map((q, i) => (
                       <div key={i} className="space-y-3 relative">
                          <div className="absolute -left-12 top-0 text-3xl font-extrabold text-accent-orange opacity-10 italic">0{i+1}</div>
                          <label className="block text-[13px] font-extrabold text-text-primary uppercase tracking-tight antialiased">
                             {q.question}
                          </label>
                          <textarea 
                            className="w-full bg-bg-deep border-2 border-border-dim rounded-2xl p-6 text-[13px] italic font-medium leading-relaxed focus:border-accent-orange transition-all min-h-[120px] shadow-inner"
                            placeholder="De-brief institutional intelligence here..."
                            value={q.answer}
                            onChange={(e) => handleAnswerChange(i, e.target.value)}
                          />
                       </div>
                     ))}
                  </div>

                  <div className="flex justify-between items-center pt-8 border-t border-border-dim">
                     <button onClick={() => setActiveStep(1)} className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary hover:text-text-primary px-4 py-2">BACK</button>
                     <button 
                        onClick={() => setActiveStep(3)}
                        className="bg-accent-orange text-bg-deep px-8 py-3 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
                      >
                         PROCEED TO AUDIT &rarr;
                      </button>
                  </div>
               </div>
            )}

            {activeStep === 3 && (
               <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4 border-b border-border-dim pb-6">
                     <FileCheck className="w-10 h-10 text-accent-green" />
                     <div>
                        <h3 className="text-3xl font-extrabold uppercase tracking-tighter">Asset & Document Clear-Out</h3>
                        <p className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em]">Sovereign Workspace Synchronization Check</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-5">
                        <div className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                           <ShieldAlert className="w-3.5 h-3.5" />
                           Active Access Nodes
                        </div>
                        {[
                          { title: 'JICA Fintech Baseline v2', host: 'Notion', sync: true },
                          { title: 'Horn of Africa Logic Repo', host: 'SharePoint', sync: false },
                          { title: 'Private Rolodex Cluster', host: 'Internal SPO', sync: true }
                        ].map((asset, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-bg-deep border border-border-dim rounded-xl hover:border-accent-green transition-all shadow-md group">
                             <div className="flex flex-col">
                                <span className="text-[12px] font-extrabold tracking-tight">{asset.title}</span>
                                <span className="text-[9px] font-bold uppercase opacity-40">{asset.host} Node</span>
                             </div>
                             <button className={cn(
                                "p-2 rounded-lg transition-all",
                                asset.sync ? "bg-accent-green/10 text-accent-green" : "bg-bg-surface border border-border-dim text-text-secondary hover:text-accent-green"
                             )}>
                                <ClipboardCheck className="w-4 h-4" />
                             </button>
                          </div>
                        ))}
                     </div>

                     <div className="bg-bg-deep rounded-2xl p-8 border border-border-dim flex flex-col justify-between shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                           <Star className="w-32 h-32" />
                        </div>
                        <div className="space-y-6 relative z-10">
                           <div className="space-y-1">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary">Harvest Progress Index</span>
                              <div className="flex items-end justify-between font-mono">
                                 <span className="text-6xl font-extrabold text-accent-green leading-none tracking-tight">96%</span>
                                 <div className="flex flex-col items-end opacity-40">
                                    <span className="text-[10px] uppercase">Reliability Score</span>
                                    <span className="text-[10px] uppercase">Alpha Logic 09</span>
                                 </div>
                              </div>
                           </div>
                           <div className="h-2 bg-bg-surface rounded-full overflow-hidden border border-border-dim/50">
                              <div className="h-full bg-accent-green shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ width: '96%' }} />
                           </div>
                           <p className="text-[11px] font-bold text-text-secondary italic leading-relaxed">
                              "Step 3 Audit shows minor synchronization gaps in SPO private sectors. 2 interaction logs require successor tagging."
                           </p>
                        </div>

                        <button 
                           onClick={() => setActiveStep(4)}
                           className="w-full mt-10 py-5 bg-accent-green text-bg-deep rounded-xl text-[13px] font-extrabold uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all shadow-accent-green/20"
                        >
                           GENERATE SUCCESSOR BRIEF
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {activeStep === 4 && (
               <div className="max-w-4xl mx-auto py-4 animate-in zoom-in-95 duration-700">
                  <div className="p-12 bg-bg-surface border-4 border-double border-border-dim shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative">
                     {/* Official Document Layout */}
                     <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 select-none">
                        <Leaf className="w-64 h-64 text-accent-orange" />
                     </div>
                     
                     <div className="flex justify-between items-start mb-12 pb-6 border-b-2 border-border-dim relative z-10">
                        <div className="space-y-2">
                           <div className="inline-flex items-center gap-2 bg-accent-orange text-bg-deep px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
                              CONFIDENTIAL // INSTITUTIONAL LEGACY
                           </div>
                           <h1 className="text-4xl font-extrabold uppercase tracking-tighter antialiased">Successor Briefing Intelligence</h1>
                        </div>
                        <div className="text-right font-mono text-[10px] font-bold text-text-secondary">
                           <div>DOCUMENT_REF: SIH_RETENT_009_KS</div>
                           <div>TIMESTAMP: {new Date().toISOString().split('T')[0]}</div>
                           <div>STATUS: HARVEST_COMPLETE</div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                        <div className="space-y-10">
                           <section className="space-y-4">
                              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-accent-blue border-b border-accent-blue/20 pb-1">Departing Node Authority</h4>
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-bg-deep border border-border-dim flex items-center justify-center text-accent-blue font-extrabold text-lg shadow-xl uppercase">
                                    {user?.name?.[0]}
                                 </div>
                                 <div>
                                    <div className="text-[16px] font-extrabold text-text-primary uppercase tracking-tight antialiased">{user?.name}</div>
                                    <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{user?.role} / Shega Intelligence</div>
                                 </div>
                              </div>
                           </section>

                           <section className="space-y-4">
                              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-accent-blue border-b border-accent-blue/20 pb-1">Inherited Expert Cluster</h4>
                              <div className="space-y-2">
                                 {['Dr. Abiy Melaku (MinT)', 'Elsa Tesfaye (Kifiya)', 'Biniam Gebre (Safaricom)'].map((c, i) => (
                                   <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-text-primary px-3 py-2 bg-bg-deep rounded-lg border border-border-dim/50 cursor-pointer hover:border-accent-blue transition-all">
                                      <div className="w-1.5 h-1.5 bg-accent-blue rounded-full" />
                                      {c}
                                   </div>
                                 ))}
                              </div>
                           </section>
                        </div>

                        <div className="space-y-10">
                           <section className="bg-bg-deep p-8 rounded-2xl border border-border-dim shadow-inner relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                                 <Bot className="w-24 h-24" />
                              </div>
                              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-accent-orange mb-6 flex items-center gap-2 relative z-10">
                                 <MessageSquare className="w-4 h-4" />
                                 Tribal Knowledge De-Brief
                              </h4>
                              <div className="space-y-8 relative z-10">
                                 {session.steps.tacitInterview.transcript.slice(0, 2).map((q, i) => (
                                   <div key={i} className="space-y-2">
                                      <p className="text-[9px] font-extrabold uppercase text-text-secondary leading-tight tracking-[0.05em]">{q.question}</p>
                                      <p className="text-[12px] text-text-primary font-medium italic border-l-2 border-l-accent-orange pl-4 leading-relaxed antialiased">"{q.answer || "N/A"}"</p>
                                   </div>
                                 ))}
                                 <div className="pt-2 text-center">
                                    <span className="text-[9px] font-extrabold uppercase text-accent-orange italic opacity-60">Full transcript accessible under Admin clearance L3</span>
                                 </div>
                              </div>
                           </section>
                        </div>
                     </div>

                     <div className="mt-16 pt-8 border-t border-border-dim text-center relative z-10">
                        <div className="flex items-center justify-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.5em] text-text-secondary opacity-30 italic">
                           <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                           Institutional Memory Secured & Encrypted
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-center gap-4 py-8">
                     <button className="flex items-center gap-3 px-8 py-3 bg-bg-elevated border border-border-dim rounded-xl text-[11px] font-extrabold uppercase tracking-widest hover:text-text-primary shadow-lg transition-all">
                        <Download className="w-4 h-4" /> EXPORT PDF LOG
                     </button>
                     <button 
                       onClick={() => setActiveStep(1)}
                       className="flex items-center gap-3 px-8 py-3 bg-accent-orange text-bg-deep rounded-xl text-[11px] font-extrabold uppercase tracking-widest hover:brightness-110 shadow-xl transition-all"
                     >
                       FINALIZE OFFBOARDING
                     </button>
                  </div>
               </div>
            )}
          </div>
        </div>

        {/* Departure Queue Sidebar */}
        <div className="w-[340px] flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar">
           <div className="high-density-panel p-6 bg-bg-surface/50 border-l-4 border-l-accent-orange flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                 <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-text-secondary">Harvest Queue</h3>
                 <p className="text-[9px] text-text-primary italic opacity-60 uppercase font-bold">Active departure nodes pending de-brief</p>
              </div>
              
              <div className="space-y-4">
                 {[
                   { user: 'Sarah Ahmed', dept: 'Media Desk', departure: '2 Days', state: 'ACTIVE' },
                   { user: 'Elsa Tesfaye', dept: 'Research Unit', departure: '14 Days', state: 'PENDING' }
                 ].map((node, i) => (
                   <div key={i} className="bg-bg-deep p-4 rounded-xl border border-border-dim group hover:border-accent-orange transition-all shadow-xl">
                      <div className="flex justify-between items-center mb-3">
                         <div className="text-[13px] font-extrabold text-text-primary tracking-tight">{node.user}</div>
                         <div className={cn(
                           "text-[8px] font-extrabold px-2 py-0.5 rounded tracking-tighter",
                           node.state === 'ACTIVE' ? "bg-accent-green/10 text-accent-green" : "bg-bg-surface text-text-secondary"
                         )}>{node.state}</div>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-text-secondary uppercase">{node.dept}</span>
                         <span className="text-[10px] font-mono font-extrabold text-accent-orange">{node.departure} LEFT</span>
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="mt-8 bg-bg-deep p-4 rounded-xl border border-border-dim border-dashed text-center space-y-3">
                 <History className="w-10 h-10 mx-auto text-text-secondary opacity-20" />
                 <div className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary leading-relaxed">
                    Sovereign Retention Intelligence System V2.4
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
