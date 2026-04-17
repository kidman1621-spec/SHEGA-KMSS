/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NewsEvaluation } from '../../types';
import { 
  ShieldCheck, 
  Search, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight,
  Send,
  Sparkles,
  BarChart3,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function NewsEvaluator() {
  const { user } = useAuth();
  const [draft, setDraft] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<NewsEvaluation | null>(null);

  const handleEvaluate = () => {
    if (!draft.trim()) return;
    setIsEvaluating(true);
    
    // Simulate multi-agent evaluation
    setTimeout(() => {
      setEvaluation({
        id: Date.now().toString(),
        title: "Analysis of Ethiopian EV Subsidies",
        draft: draft,
        timestamp: new Date().toISOString(),
        authorId: user?.id || 'anon',
        score: 7.8,
        feedback: {
          style: { 
            status: 'Warning', 
            notes: 'Tone is slightly too academic. Ensure "Bloomberg for Africa" density. Use active voice for policy impacts.' 
          },
          factCheck: { 
            status: 'Pass', 
            notes: 'Matches JICA report data [KB-492]. Correctly identifies VAT exemption clauses.' 
          },
          localization: { 
            status: 'Fail', 
            notes: 'Missing Amharic/Swahili core context for regional manufacturers. ETB/USD conversion rate is stale (using 2024 rates).' 
          }
        }
      });
      setIsEvaluating(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
      {/* Header */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded-lg flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
            <ShieldCheck className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-text-primary">AI News Quality Guard</h2>
            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-tight opacity-60">Multi-Agent Review Protocol: Bloomberg Standard V4.0</p>
          </div>
        </div>
        {!evaluation && (
          <div className="flex items-center gap-6 px-4 py-1.5 bg-bg-deep rounded border border-border-dim">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-50 text-text-secondary">Style Agent Ready</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-50 text-text-secondary">Fact Agent Active</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-50 text-text-secondary">Market Agent Standby</span>
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Editor Side */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 high-density-panel flex flex-col p-0 overflow-hidden relative">
            <div className="panel-header border-b border-border-dim shrink-0 bg-bg-surface/50">
               <h3 className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Source Draft Entry
               </h3>
               <span className="text-[9px] font-mono opacity-40 uppercase">Markdown Supported</span>
            </div>
            <textarea 
              className="flex-1 p-6 bg-transparent text-[13px] leading-relaxed focus:outline-none resize-none custom-scrollbar font-serif"
              placeholder="Paste your news draft or analysis here for institutional review..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            {!evaluation && (
              <div className="p-4 border-t border-border-dim bg-bg-surface">
                <button 
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !draft.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-accent-blue text-white rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg hover:brightness-110 disabled:opacity-30 transition-all group"
                >
                  {isEvaluating ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin-slow" />
                      Performing Quality Audit...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Initiate Hub Evaluation
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Evaluation Side (Split Screen) */}
        <div className={cn(
          "w-1/2 flex flex-col gap-4 transition-all duration-500",
          !evaluation && "opacity-20 pointer-events-none blur-[2px]"
        )}>
           {evaluation && (
             <>
               {/* Readiness Score Panel */}
               <div className="bg-bg-surface border border-border-dim rounded-lg p-6 flex items-center justify-between shrink-0 border-l-4 border-l-accent-orange relative overflow-hidden">
                  {/* Score Visualization Gradient */}
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-accent-orange/10 to-transparent" />
                  
                  <div className="space-y-1 relative z-10">
                     <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary leading-none">Institutional Readiness Score</h4>
                     <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold tracking-tighter text-accent-orange">{evaluation.score}</span>
                        <span className="text-[12px] font-bold text-text-secondary opacity-40 uppercase">/ 10.0</span>
                     </div>
                     <p className="text-[9px] text-text-secondary uppercase font-bold tracking-tight">Status: {evaluation.score > 8 ? 'Bloomberg-Ready' : 'Requires Revision'}</p>
                  </div>

                  <div className="flex gap-4 relative z-10">
                     <button className="bg-bg-deep border border-border-dim p-2 rounded hover:text-accent-blue">
                        <BarChart3 className="w-4 h-4" />
                     </button>
                     <button className="bg-bg-deep border border-border-dim px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-accent-blue hover:text-white transition-all">
                        Publish Briefing
                     </button>
                  </div>
               </div>

               {/* Agent Review Details */}
               <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
                  {[
                    { id: 'style', label: 'Style & Voice Agent', icon: Sparkles, data: evaluation.feedback.style },
                    { id: 'fact', label: 'Fact-Check Agent (RAG)', icon: Search, data: evaluation.feedback.factCheck },
                    { id: 'market', label: 'Regional Market Agent', icon: Globe, data: evaluation.feedback.localization },
                  ].map((agent) => (
                    <div key={agent.id} className="high-density-panel p-5 animate-in slide-in-from-right-4 duration-300">
                       <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                             <div className={cn(
                               "p-2 rounded-lg border",
                               agent.data.status === 'Pass' && "bg-accent-green/10 border-accent-green/20 text-accent-green",
                               agent.data.status === 'Warning' && "bg-accent-orange/10 border-accent-orange/20 text-accent-orange",
                               agent.data.status === 'Fail' && "bg-red-500/10 border-red-500/20 text-red-400",
                             )}>
                                <agent.icon className="w-4 h-4" />
                             </div>
                             <div>
                                <h4 className="text-[11px] font-extrabold uppercase tracking-wider">{agent.label}</h4>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                   {agent.data.status === 'Pass' && <CheckCircle2 className="w-2.5 h-2.5 text-accent-green" />}
                                   {agent.data.status === 'Warning' && <AlertCircle className="w-2.5 h-2.5 text-accent-orange" />}
                                   {agent.data.status === 'Fail' && <AlertCircle className="w-2.5 h-2.5 text-red-400" />}
                                   <span className="text-[9px] font-bold uppercase opacity-60 tracking-tight">{agent.data.status}</span>
                                </div>
                             </div>
                          </div>
                          <button className="text-[9px] font-bold uppercase tracking-widest text-accent-blue border border-accent-blue/20 px-2 py-0.5 rounded hover:bg-accent-blue hover:text-white transition-all">
                             View Reasoning
                          </button>
                       </div>
                       <div className="p-3 bg-bg-deep/50 border border-border-dim/50 rounded text-[11px] text-text-primary leading-relaxed italic">
                          "{agent.data.notes}"
                       </div>
                    </div>
                  ))}
               </div>

               {/* Re-Evaluate Bar */}
               <div className="p-4 bg-bg-surface border border-border-dim rounded-lg flex items-center justify-between shrink-0">
                   <div className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">
                      Evaluation Cycle Complete - 1,244 Nodes Scanned
                   </div>
                   <button 
                     onClick={() => setEvaluation(null)}
                     className="flex items-center gap-2 text-accent-blue text-[10px] font-bold uppercase tracking-widest hover:underline"
                   >
                      Retire Draft & Rewire
                      <ArrowRight className="w-3.5 h-3.5" />
                   </button>
               </div>
             </>
           )}

           {!evaluation && (
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-30 select-none">
                <Search className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-extrabold uppercase tracking-widest mb-2">Audit Queue Empty</h3>
                <p className="text-[11px] uppercase font-bold tracking-tight max-w-[240px] leading-relaxed">System awaiting institutional draft to initialize multi-agent quality check protocol.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
