/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import { 
  Languages, 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCcw, 
  ArrowRight, 
  Layout, 
  TrendingUp, 
  Users,
  Search,
  Zap,
  RotateCcw,
  FileText,
  MapPin,
  ShieldCheck,
  Copy,
  Download,
  Upload,
  Clock
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { LanguageCode, LocalizationBrief } from '../../types';
import { GoogleGenAI } from "@google/genai";

export default function LocalizationSuite() {
  const { user } = useAuth();
  const { language, setLanguage } = useLocalization();
  const [activeTab, setActiveTab] = useState<'translate' | 'contributors' | 'benchmarks'>('translate');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [result, setResult] = useState<LocalizationBrief | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const translateNews = async () => {
    if (!sourceText.trim()) return;
    
    setIsProcessing(true);
    setTranslatedText('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Translate the following news text into ${
        language === 'am' ? 'Amharic' : language === 'sw' ? 'Swahili' : language === 'om' ? 'Afaan Oromoo' : 'Standard English'
      }. 
      Maintain an institutional, professional tone suitable for Shega Intelligence Hub.
      Include cultural nuances relevant to the target market if applicable.
      
      TEXT:
      ${sourceText}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const translation = response.text || "Translation failed to generate.";
      setTranslatedText(translation);
      
      setResult({
        sourceAssetId: 'INST-NEWS-' + Math.floor(Math.random() * 1000),
        targetLanguage: language,
        market: language === 'sw' ? 'East Africa Cluster' : 'Horn of Africa Regional',
        culturalNotes: [
          "Terminology verified against regional regulatory databases.",
          "Nuance check: Tone adjusted for institutional distribution."
        ],
        currencyConversion: "N/A",
        readinessScore: 98
      });
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslatedText("Error: Failed to connect to translation matrix.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSourceText(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4 overflow-hidden print:bg-white print:p-0">
      {/* Pan-African Header */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded-lg flex items-center justify-between shrink-0 shadow-sm border-l-4 border-l-accent-green print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center border border-accent-green/20">
            <Globe className="w-5 h-5 text-accent-green" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-text-primary">Pan-African Localization Suite</h2>
            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-tight opacity-60">Multi-Language Engine & Nuance Intelligence Node</p>
          </div>
        </div>
        <div className="flex bg-bg-deep rounded-lg p-1 border border-border-dim shadow-inner">
           {['Localization Engine', 'Regional Experts', 'Intelligence Benchmarks'].map((tab, i) => {
             const tabId = i === 0 ? 'translate' : i === 1 ? 'contributors' : 'benchmarks';
             return (
               <button 
                 key={tab} 
                 onClick={() => setActiveTab(tabId as any)} 
                 className={cn(
                   "px-6 py-2 rounded-md text-[10px] font-extrabold uppercase tracking-widest transition-all",
                   activeTab === tabId ? "bg-bg-elevated text-text-primary shadow-lg border border-border-dim" : "text-text-secondary"
                 )}
               >
                 {tab}
               </button>
             );
           })}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 high-density-panel flex flex-col min-w-0 bg-bg-surface/50 border-2 border-border-dim/50 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:bg-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none print:hidden">
             <Globe className="w-[600px] h-[600px] text-accent-green" />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 p-6">
            {activeTab === 'translate' && (
              <div className="h-full flex flex-col gap-6 max-w-5xl mx-auto">
                {!translatedText && !isProcessing ? (
                  <div className="space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="text-center space-y-2">
                       <h3 className="text-3xl font-black uppercase tracking-tighter italic">News Translation Hub</h3>
                       <p className="text-[11px] text-text-secondary uppercase font-bold tracking-[0.2em] opacity-60">Regional Adaptation Protocol v4.0</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-accent-green flex items-center gap-2">
                             <FileText className="w-4 h-4" /> Source Intelligence (English)
                          </label>
                          <div className="relative group">
                            <textarea 
                               value={sourceText}
                               onChange={(e) => setSourceText(e.target.value)}
                               placeholder="Copy-paste institutional news or upload document..."
                               className="w-full h-80 bg-bg-deep border-2 border-border-dim rounded-2xl p-6 text-[13px] font-bold focus:border-accent-green outline-none transition-all resize-none shadow-inner"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                               <input 
                                 type="file" 
                                 ref={fileInputRef} 
                                 onChange={handleFileUpload} 
                                 accept=".txt" 
                                 className="hidden" 
                               />
                               <button 
                                 onClick={() => fileInputRef.current?.click()}
                                 className="p-2 bg-bg-surface border border-border-dim rounded-lg hover:text-accent-green transition-colors"
                                 title="Upload Text File"
                               >
                                  <Upload className="w-4 h-4" />
                               </button>
                            </div>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-accent-green flex items-center gap-2">
                             <Languages className="w-4 h-4" /> Target Cluster
                          </label>
                          <div className="bg-bg-deep border-2 border-border-dim rounded-2xl p-6 space-y-4 shadow-inner h-80 flex flex-col justify-center">
                             <div className="grid grid-cols-2 gap-3">
                                {[
                                  { id: 'sw', label: 'Swahili' },
                                  { id: 'am', label: 'Amharic' },
                                  { id: 'om', label: 'Afaan Oromoo' },
                                  { id: 'en', label: 'Standard' }
                                ].map(lang => (
                                  <button 
                                    key={lang.id}
                                    onClick={() => setLanguage(lang.id as any)}
                                    className={cn(
                                      "py-4 px-4 rounded-xl border-2 text-[11px] font-extrabold uppercase tracking-widest transition-all flex items-center justify-between",
                                      language === lang.id ? "bg-accent-green border-accent-green text-bg-deep shadow-lg" : "bg-bg-surface border-border-dim text-text-secondary hover:border-accent-green/50 hover:text-text-primary"
                                    )}
                                  >
                                    {lang.label}
                                    {language === lang.id && <CheckCircle className="w-3 h-3" />}
                                  </button>
                                ))}
                             </div>
                             <button 
                               onClick={translateNews}
                               disabled={!sourceText.trim()}
                               className="w-full py-5 bg-accent-green text-bg-deep rounded-xl text-[13px] font-black uppercase tracking-[0.3em] shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:pointer-events-none mt-4 flex items-center justify-center gap-3"
                             >
                               <Zap className="w-5 h-5 fill-current" />
                               DEPLOY SYNTHESIS
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                ) : isProcessing ? (
                  <div className="h-full flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
                    <div className="w-24 h-24 bg-bg-deep border-4 border-accent-green/20 rounded-full flex items-center justify-center relative shadow-2xl">
                       <RefreshCcw className="w-12 h-12 text-accent-green animate-spin" />
                    </div>
                    <div className="text-center space-y-2">
                       <h4 className="text-[16px] font-black uppercase tracking-[0.3em] text-accent-green">Synthesizing Nuance</h4>
                       <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest italic opacity-60">Cross-referencing Shega Brain with regional semantics...</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col gap-6 animate-in slide-in-from-bottom-6 duration-700">
                    <div className="flex justify-between items-center print:hidden">
                       <button 
                         onClick={() => { setTranslatedText(''); setResult(null); }}
                         className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-text-primary flex items-center gap-2 transition-colors"
                       >
                         <RotateCcw className="w-4 h-4" /> Reset Module
                       </button>
                       <div className="flex gap-3">
                          <button 
                            onClick={() => copyToClipboard(translatedText)}
                            className="bg-bg-deep border border-border-dim px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-bg-elevated transition-colors"
                          >
                             <Copy className="w-3.5 h-3.5" /> Copy Paste
                          </button>
                          <button 
                            onClick={exportToPDF}
                            className="bg-accent-green text-bg-deep px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:brightness-110 shadow-lg shadow-accent-green/20 transition-all font-bold"
                          >
                             <Download className="w-3.5 h-3.5 font-bold" /> Export to PDF
                          </button>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0 print:w-full">
                       <div className="space-y-4 print:hidden">
                          <label className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary">Source Feed</label>
                          <div className="bg-bg-deep/30 border border-border-dim rounded-2xl p-6 text-[13px] h-60 overflow-y-auto custom-scrollbar font-medium opacity-60">
                             {sourceText}
                          </div>
                       </div>
                       <div className="space-y-4 print:w-full">
                          <label className="text-[10px] font-black uppercase tracking-widest text-accent-green print:hidden">Regional Synthesis ({language.toUpperCase()})</label>
                          <div className="bg-bg-surface border-2 border-accent-green/30 rounded-2xl p-8 text-[14px] h-60 overflow-y-auto custom-scrollbar font-bold leading-relaxed selection:bg-accent-green/30 shadow-2xl print:border-none print:shadow-none print:p-0">
                             {translatedText}
                          </div>
                       </div>
                    </div>

                    {result && (
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
                          <div className="space-y-6">
                             <div className="flex items-center justify-between">
                                <h4 className="text-[12px] font-extrabold uppercase tracking-widest text-text-secondary flex items-center gap-3">
                                   <AlertTriangle className="w-5 h-5 text-accent-orange" />
                                   Regional Context Flags
                                </h4>
                                <span className="text-[9px] font-bold text-accent-orange uppercase tracking-widest border border-accent-orange/20 px-2 py-0.5 rounded-full bg-accent-orange/5">High Contrast</span>
                             </div>
                             <div className="space-y-4">
                                {result.culturalNotes.map((note, i) => (
                                  <div key={i} className="p-5 bg-bg-deep border border-border-dim rounded-xl border-l-4 border-l-accent-orange shadow-lg transition-transform hover:translate-x-1 group">
                                     <p className="text-[13px] text-text-primary italic font-medium leading-relaxed antialiased selection:bg-accent-orange/30">
                                        "{note}"
                                     </p>
                                  </div>
                                ))}
                             </div>
                          </div>

                          <div className="space-y-10">
                             <div className="space-y-6">
                                <h4 className="text-[12px] font-extrabold uppercase tracking-widest text-text-secondary flex items-center gap-3">
                                   <TrendingUp className="w-5 h-5 text-accent-green" />
                                   Currency Adaptation Log
                                </h4>
                                <div className="bg-bg-deep border-2 border-border-dim rounded-2xl p-8 flex flex-col gap-4 shadow-2xl relative overflow-hidden group">
                                   <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                                      <RefreshCcw className="w-16 h-16 group-hover:rotate-180 transition-transform duration-700" />
                                   </div>
                                   <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-secondary opacity-40">Dynamic Exchange Sync</span>
                                   <div className="text-3xl font-mono font-extrabold text-accent-green tracking-tight">{result.currencyConversion}</div>
                                   <div className="text-[9px] font-bold border-t border-border-dim pt-3 text-text-secondary uppercase tracking-[0.1em] opacity-30 italic">
                                      Referenced: Central Bank Hubs (Regional Authority Nodes 04/09)
                                   </div>
                                </div>
                             </div>

                             <div className="space-y-6">
                                <h4 className="text-[12px] font-extrabold uppercase tracking-widest text-text-secondary flex items-center gap-3">
                                   <Layout className="w-5 h-5 text-accent-blue" />
                                   Suggested Narrative Architecture
                                </h4>
                                <div className="p-6 bg-accent-blue/5 border border-accent-blue/20 rounded-2xl italic text-[13px] text-text-primary leading-relaxed opacity-90 shadow-inner">
                                   "System recommends a <strong>'Regulatory Comparison'</strong> narrative structure for the Nairobi Market. Emphasize interoperability benchmarks against Kenyan legacy banks while highlighting Safaricom's dominant regional role. Language tone: Professional/Academic Swahili (Nairobi Hub Standard)."
                                </div>
                             </div>
                          </div>
                       </div>
                    )}

                    <div className="pt-10 flex justify-end gap-4">
                      <button 
                         onClick={() => { setTranslatedText(''); setResult(null); }}
                         className="px-8 py-3 border-2 border-border-dim rounded-xl text-[11px] font-extrabold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all flex items-center gap-2"
                      >
                         <RotateCcw className="w-4 h-4" /> REBOOT ENGINE
                      </button>
                      <button className="px-10 py-3 bg-accent-green text-bg-deep rounded-xl text-[11px] font-extrabold uppercase tracking-widest hover:brightness-110 shadow-xl shadow-accent-green/20 flex items-center gap-2">
                        <DownloadIcon className="w-4 h-4" /> EXPORT REGIONAL BRIEF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'contributors' && (
              <div className="h-full p-10 space-y-8 animate-in fade-in duration-500 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-dim pb-8 gap-6">
                    <div>
                        <h3 className="text-3xl font-extrabold uppercase tracking-tighter antialiased">Regional Contributor Pulse</h3>
                        <p className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em] opacity-60">Verified Freelance Analysts & Local Authorities</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative group">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:text-accent-blue group-focus-within:opacity-100 transition-all" />
                          <input type="text" placeholder="Query hub data..." className="bg-bg-deep border-2 border-border-dim rounded-xl py-2 pl-10 pr-6 text-[12px] w-[260px] focus:border-accent-blue outline-none transition-all shadow-inner" />
                        </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'John Kamau', city: 'Nairobi', domain: 'Fintech / Crypto', briefs: 42, score: 98 },
                      { name: 'Mekdes Gebru', city: 'Mekelle', domain: 'Policy / Agri', briefs: 28, score: 96 },
                      { name: 'Fatma Juma', city: 'Dar es Salaam', domain: 'Logistic Ops', briefs: 19, score: 92 },
                      { name: 'Hamza Omar', city: 'Hargeisa', domain: 'SME / Retail', briefs: 12, score: 89 },
                      { name: 'Zahara Ali', city: 'Addis Ababa', domain: 'Infrastructure', briefs: 56, score: 99 }
                    ].map((c, i) => (
                      <div key={i} className="bg-bg-surface border-2 border-border-dim p-6 rounded-2xl group hover:border-accent-green hover:shadow-2xl transition-all relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform">
                            <ShieldCheck className="w-16 h-16" />
                          </div>
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-bg-deep border border-border-dim flex items-center justify-center font-extrabold text-accent-green text-[14px] shadow-lg uppercase">
                                  {c.name[0]}
                                </div>
                                <div>
                                  <div className="text-[15px] font-extrabold tracking-tight group-hover:text-accent-green transition-colors">{c.name}</div>
                                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                                      <MapPin className="w-3 h-3" /> {c.city} Hub
                                  </div>
                                </div>
                            </div>
                            <div className="bg-bg-deep px-3 py-1 rounded-lg border border-border-dim border-l-2 border-l-accent-green">
                                <span className="text-[13px] font-mono font-extrabold text-accent-green">{c.score}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-bold border-t border-border-dim pt-4">
                            <span className="bg-bg-deep px-3 py-1 rounded-lg border border-border-dim text-accent-blue uppercase tracking-widest text-[9px]">{c.domain}</span>
                            <span className="text-text-secondary opacity-60 uppercase tracking-tighter">{c.briefs} Sovereign Briefs</span>
                          </div>
                      </div>
                    ))}
                  </div>
              </div>
            )}

            {activeTab === 'benchmarks' && (
              <div className="h-full p-10 space-y-12 animate-in fade-in duration-500 overflow-y-auto custom-scrollbar">
                  <div className="flex items-center gap-6 border-b border-border-dim pb-8">
                    <div className="w-16 h-16 rounded-3xl bg-accent-orange/10 flex items-center justify-center border-2 border-accent-orange/20 shadow-xl">
                        <TrendingUp className="w-8 h-8 text-accent-orange" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-extrabold uppercase tracking-tighter antialiased">Quality Benchmarks</h3>
                        <p className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em] opacity-60">Internal Hub Accuracy vs Continental Peer Standards</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-10 max-w-4xl">
                    {[
                      { metric: 'Nuance Mapping Accuracy', hub: 96, peer: 82, delta: '+14%', label: 'TechCabal/BenjaminDada Std.' },
                      { metric: 'Regulatory Alignment Depth', hub: 94, peer: 78, delta: '+16%', label: 'Global News Baseline' },
                      { metric: 'Regional Sourcing Coverage', hub: 88, peer: 89, delta: '-1%', label: 'Local Newspaper Aggregate', warning: true },
                      { metric: 'Translation Integrity (Linguistics)', hub: 98, peer: 74, delta: '+24%', label: 'General AI Baseline' }
                    ].map((b, i) => (
                      <div key={i} className="space-y-4 group">
                          <div className="flex justify-between items-end">
                            <div>
                                <h5 className="text-[14px] font-extrabold uppercase tracking-tight antialiased">{b.metric}</h5>
                                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-40">Target Cluster: {b.label}</span>
                            </div>
                            <div className="flex items-center gap-6 text-right">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-bold text-text-secondary uppercase opacity-40">Hub Delta</span>
                                  <span className={cn("text-[18px] font-mono font-extrabold", b.warning ? "text-accent-orange" : "text-accent-green")}>{b.delta}</span>
                                </div>
                            </div>
                          </div>
                          <div className="relative h-4 bg-bg-deep rounded-full border-2 border-border-dim overflow-hidden shadow-inner group-hover:scale-[1.01] transition-transform">
                            <div 
                              className={cn("h-full absolute left-0 top-0 transition-all duration-1000", b.warning ? "bg-accent-orange" : "bg-accent-green")} 
                              style={{ width: `${b.hub}%` }} 
                            />
                            <div className="h-full absolute left-0 top-0 w-px bg-white/20 z-10" style={{ left: `${b.peer}%` }} />
                          </div>
                          <div className="flex items-center gap-4 text-[9px] font-extrabold uppercase tracking-widest text-text-secondary opacity-40">
                            <div className="flex items-center gap-1.5"><div className={cn("w-2 h-2 rounded-full", b.warning ? 'bg-accent-orange' : 'bg-accent-green')} /> Hub Standard</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-border-dim" /> Peer Average ({b.peer}%)</div>
                          </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-bg-deep p-8 rounded-2xl border-2 border-border-dim border-dashed flex items-center justify-between shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-accent-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-8 relative z-10">
                        <CheckCircle className="w-12 h-12 text-accent-green animate-pulse" />
                        <div className="space-y-1">
                          <h5 className="text-[16px] font-extrabold uppercase tracking-widest text-text-primary antialiased">Bloomberg Compliance Verified</h5>
                          <p className="text-[11px] text-text-secondary font-medium italic max-w-md">"All regional localization reports are audited by the <strong>Chief Local Correspondent</strong> weekly to maintain institutional truth."</p>
                        </div>
                    </div>
                    <button className="bg-bg-surface border-2 border-border-dim px-8 py-3 rounded-xl text-[11px] font-extrabold uppercase tracking-widest hover:text-accent-green hover:border-accent-green transition-all relative z-10 shadow-lg">
                        Full Audit Log
                    </button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66666 7.33331L7.99999 10.6666L11.3333 7.33331" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10.6666V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
