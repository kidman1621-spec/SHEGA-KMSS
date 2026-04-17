/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useKnowledge } from '../../contexts/KnowledgeContext';
import { 
  Search as SearchIcon, 
  Filter, 
  X, 
  ChevronRight, 
  FileText, 
  ExternalLink, 
  Globe, 
  MessageCircle,
  Clock,
  Star as StarIcon,
  Zap,
  Activity,
  Layers,
  Database,
  Hash,
  Send
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { KnowledgeAsset } from '../../types';

export default function SearchHub() {
  const { assets } = useKnowledge();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [latency, setLatency] = useState(0);
  const [results, setResults] = useState<KnowledgeAsset[]>([]);
  
  const [activeFilter, setActiveFilter] = useState('All Nodes');
  
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    const start = performance.now();
    
    // Simulate multi-source multiplexing
    setTimeout(() => {
      const q = query.toLowerCase();
      let hits = assets.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        (a.content && a.content.toLowerCase().includes(q))
      );

      // Apply Filter Logic
      if (activeFilter !== 'All Nodes') {
        if (activeFilter === 'SPO Archive') hits = hits.filter(a => a.type === 'SharePoint');
        if (activeFilter === 'Notion Sync') hits = hits.filter(a => a.type === 'Notion');
        if (activeFilter === 'Tacit Nuggets') hits = hits.filter(a => a.type === 'Nugget');
        if (activeFilter === 'Expert Rolodex') hits = hits.filter(a => a.category === 'Research'); // Simulation
      }

      setResults(hits);
      setIsSearching(false);
      setLatency(Math.round(performance.now() - start));
    }, 400);
  };

  // Trigger search on filter change if query exists
  useEffect(() => {
    if (query) handleSearch();
  }, [activeFilter]);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4 overflow-hidden">
      {/* Super Search Header */}
      <div className="bg-bg-surface border border-border-dim p-6 rounded-lg shadow-2xl shrink-0 relative overflow-hidden">
        {/* Dynamic Scanline Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 to-transparent pointer-events-none" />
        
        <form onSubmit={handleSearch} className="relative group max-w-5xl mx-auto z-10">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <SearchIcon className="w-5 h-5 text-accent-blue opacity-40 group-focus-within:opacity-100 transition-all" />
             <div className="w-px h-4 bg-border-dim" />
          </div>
          <input 
            type="text" 
            placeholder="Query Institutional Memory: Bridge Links, SPO Clusters, Notion Nodes & Tacit Nuggets..." 
            className="w-full bg-bg-deep border-2 border-border-dim rounded-2xl py-5 pl-16 pr-36 text-[15px] font-extrabold uppercase tracking-tight focus:outline-none focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10 transition-all placeholder:opacity-30 antialiased shadow-inner"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {query && (
              <button 
                type="button" 
                onClick={() => setQuery('')} 
                className="p-2 hover:bg-bg-elevated rounded-lg text-text-secondary transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button 
              type="submit" 
              className="bg-accent-blue text-white px-8 py-3 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-blue/20 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              QUERY
            </button>
          </div>
        </form>
        
        {/* Advanced Cluster Filters */}
        <div className="flex flex-wrap items-center justify-between mt-6 max-w-5xl mx-auto z-10">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-text-secondary">
                 <Filter className="w-3.5 h-3.5" />
                 Index Clusters:
              </div>
            <div className="flex gap-2">
              {['All Nodes', 'SPO Archive', 'Notion Sync', 'Tacit Nuggets', 'Expert Rolodex'].map((filter) => (
                <button 
                  key={filter} 
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border text-[9px] font-extrabold uppercase tracking-widest transition-all",
                    activeFilter === filter ? "bg-bg-elevated border-accent-blue text-accent-blue shadow-md" : "bg-bg-deep border-border-dim text-text-secondary hover:text-text-primary"
                  )}
                >
                   {filter}
                </button>
              ))}
            </div>
           </div>
           {latency > 0 && !isSearching && (
             <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-accent-green bg-bg-deep px-3 py-1 rounded-full border border-border-dim">
                <Activity className="w-3 h-3" />
                INDEX_HITS_VERIFIED: {results.length} Nodes in {latency}ms
             </div>
           )}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
         {/* Results Space */}
         <div className="flex-1 high-density-panel flex flex-col min-w-0 bg-bg-surface/50 border-2 border-border-dim/50 shadow-2xl relative overflow-hidden">
            <div className="panel-header border-b border-border-dim px-6 py-4 shrink-0 flex items-center justify-between bg-bg-surface/50">
               <h3 className="flex items-center gap-2 uppercase tracking-widest text-[12px] font-extrabold">
                  <Layers className="w-4 h-4 text-accent-blue" />
                  Institutional Hit Map
               </h3>
               <div className="flex items-center gap-4 text-[10px] font-bold text-text-secondary">
                  <span className="uppercase opacity-40 font-mono tracking-tighter">Sovereign Index Status: Nominal</span>
                  <div className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
              {isSearching ? (
                <div className="h-full flex flex-col items-center justify-center gap-6">
                   <div className="relative">
                      <div className="absolute inset-0 bg-accent-blue/20 blur-2xl animate-pulse rounded-full" />
                      <div className="w-20 h-20 border-t-2 border-accent-blue rounded-full animate-spin relative z-10" />
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                         <Database className="w-8 h-8 text-accent-blue animate-pulse" />
                      </div>
                   </div>
                   <div className="text-center space-y-2">
                      <div className="text-[14px] font-extrabold uppercase tracking-[0.4em] text-accent-blue antialiased">Multiplexing Distributed Indexes</div>
                      <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-40">Polling SharePoint API + Notion Matrix + Internal SPO Clusters...</p>
                   </div>
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {results.map((asset) => (
                    <div key={asset.id} className="bg-bg-deep border-2 border-border-dim group hover:border-accent-blue rounded-2xl transition-all overflow-hidden flex flex-col md:flex-row shadow-lg hover:shadow-2xl relative">
                       {/* Edge Tag */}
                       <div className={cn(
                         "w-1.5 transition-all group-hover:w-3",
                         asset.type === 'SharePoint' ? "bg-blue-600" :
                         asset.type === 'Notion' ? "bg-slate-500" :
                         asset.type === 'Nugget' ? "bg-accent-orange" : "bg-accent-green"
                       )}></div>
                       
                       <div className="flex-1 p-6 space-y-4">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-bg-surface border border-border-dim rounded-lg shadow-inner">
                                   {asset.type === 'SharePoint' ? <ExternalLink className="w-4 h-4 text-blue-500" /> :
                                    asset.type === 'Notion' ? <Globe className="w-4 h-4 text-slate-500" /> :
                                    asset.type === 'Nugget' ? <MessageCircle className="w-4 h-4 text-accent-orange" /> :
                                    <FileText className="w-4 h-4 text-accent-green" />}
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-secondary opacity-60">{asset.type} // {asset.category}</span>
                                   <span className="text-[8px] font-mono opacity-40">CID: {asset.id.toUpperCase()}</span>
                                </div>
                             </div>
                             <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                   <span className="text-[9px] font-bold text-text-secondary uppercase opacity-40">Source Date</span>
                                   <span className="text-[11px] font-mono font-bold text-text-primary">{new Date(asset.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="h-8 w-px bg-border-dim" />
                                <div className="flex flex-col items-end">
                                   <span className="text-[9px] font-bold text-accent-green uppercase opacity-60">Reliability</span>
                                   <div className="flex items-center gap-1.5 text-[14px] font-mono font-extrabold text-accent-green">
                                      <StarIcon className="w-3.5 h-3.5 fill-current" />
                                      94.2
                                   </div>
                                </div>
                             </div>
                          </div>
                          
                          <div className="space-y-2">
                             <h4 className="text-[18px] font-extrabold text-text-primary group-hover:text-accent-blue transition-colors tracking-tighter uppercase leading-none">
                                {asset.title}
                             </h4>
                             <p className="text-[12px] text-text-secondary line-clamp-2 leading-relaxed italic opacity-80 font-medium font-serif antialiased">
                                "{asset.content || "Institutional brief metadata indexed. Sovereign report summary verified across multiple analytical nodes."}"
                             </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-2">
                             {asset.tags.map(tag => (
                               <span key={tag} className="px-3 py-1 bg-bg-surface border border-border-dim rounded-lg text-[9px] font-extrabold text-text-secondary uppercase tracking-widest hover:text-accent-blue hover:border-accent-blue transition-all cursor-pointer">
                                  #{tag.toLowerCase()}
                               </span>
                             ))}
                          </div>
                       </div>
                       
                       <div className="md:w-40 bg-bg-deep/30 border-l-2 border-border-dim flex items-center justify-center group-hover:bg-accent-blue/10 transition-all cursor-pointer relative overflow-hidden">
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all font-mono">
                             <ChevronRight className="w-8 h-8 text-accent-blue animate-pulse" />
                             <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-accent-blue">Launch Asset</span>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-8 text-center grayscale opacity-30 select-none">
                   <div className="relative group">
                      <div className="absolute inset-[-20%] bg-accent-blue/5 blur-3xl rounded-full" />
                      <SearchIcon className="w-24 h-24 mb-4 text-accent-blue group-hover:rotate-12 transition-transform duration-700" />
                   </div>
                   <div className="space-y-3">
                      <div className="text-2xl font-extrabold uppercase tracking-[0.5em] text-text-primary">{query ? 'Zero Institutional Hits' : 'Shega Index Ready'}</div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] max-w-[400px] leading-relaxed mx-auto italic">
                        {query ? 'The institutional memory contains no nodes matching this cluster query. Verify clearance level or try secondary keywords.' : 'Initialize global intelligence query to multiplex distributed indexes across the sovereign network.'}
                      </p>
                   </div>
                   {!query && (
                     <div className="grid grid-cols-2 gap-3 mt-4 max-w-sm">
                        {['JICA Fintech Strategy', 'M-Pesa Regional Ops', 'Dr. Abiy Policy Shifts', 'SOP Validation Protocols'].map(tag => (
                          <button key={tag} onClick={() => setQuery(tag)} className="px-4 py-2 rounded-xl bg-bg-deep border border-border-dim text-[10px] font-extrabold text-text-secondary hover:text-accent-blue hover:border-accent-blue transition-all uppercase tracking-widest text-left truncate">
                             &gt; {tag}
                          </button>
                        ))}
                     </div>
                   )}
                </div>
              )}
            </div>
         </div>

         {/* Collaboration & Threading Sidebar */}
         <div className="w-[420px] flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar">
            {/* Real-time Collaboration Wire */}
            <div className="high-density-panel flex flex-col p-6 bg-bg-surface/50 border-l-4 border-l-accent-blue shadow-xl">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <MessageCircle className="w-5 h-5 text-accent-blue" />
                     <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-text-primary">Collaboration Wire</h3>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                     <span className="text-[9px] font-mono text-accent-green font-bold">14 ACTIVE</span>
                  </div>
               </div>
               
               <div className="flex-1 min-h-[400px] overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                  {[
                    { user: 'Sarah Ahmed', role: 'Editor', msg: "Has anyone verified the 2026 MINT policy shifts for regional sandboxes?", time: '2m', color: 'bg-red-500' },
                    { user: 'Elsa Tesfaye', role: 'Data Lead', msg: "@Sarah checking regional data now. Dr. Abiy indicated a pivot on data sovereignty during the last sync.", time: '8m', color: 'bg-accent-green' },
                    { user: 'Michael Kassa', role: 'Researcher', msg: "Syncing Hawassa Hub logs. Early indicators show 14% adoption increase.", time: '14m', color: 'bg-accent-orange' },
                    { user: 'Hana Belay', role: 'Editor', msg: "Added a thread to KB-SH-042 for localization check. @Localization Unit please verify.", time: '1h', color: 'bg-accent-blue' },
                  ].map((chat, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                       <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white text-[11px] shrink-0 border-2 border-bg-surface shadow-lg transition-transform group-hover:scale-110",
                        chat.color
                       )}>{chat.user.split(' ').map(n => n[0]).join('')}</div>
                       <div className="flex flex-col gap-2 flex-1">
                          <div className="flex justify-between items-center bg-bg-deep/50 px-3 py-1 rounded-lg border border-border-dim/50">
                             <div className="flex items-center gap-2">
                                <span className="text-[11px] font-extrabold text-text-primary uppercase tracking-tight antialiased">{chat.user}</span>
                                <span className="opacity-20">/</span>
                                <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest opacity-60">{chat.role}</span>
                             </div>
                             <span className="text-[9px] font-mono font-bold text-text-secondary">{chat.time}</span>
                          </div>
                          <p className="text-[12px] leading-relaxed text-text-secondary font-medium italic pl-1 antialiased selection:bg-accent-blue/30 group-hover:text-text-primary transition-colors">
                            {chat.msg}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="mt-6 pt-6 border-t-2 border-border-dim relative">
                  <div className="flex items-center gap-3">
                     <div className="relative flex-1">
                        <input type="text" placeholder="Broadcast to institutional wire..." className="w-full bg-bg-deep border-2 border-border-dim rounded-xl py-3 pl-10 pr-4 text-[12px] font-bold focus:outline-none focus:border-accent-blue transition-all shadow-inner" />
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary opacity-40" />
                     </div>
                     <button className="w-11 h-11 bg-accent-blue text-white rounded-xl flex items-center justify-center shadow-lg hover:brightness-110 active:scale-95 transition-all">
                        <Send className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>

            {/* High-Impact Alerts */}
            <div className="high-density-panel p-6 bg-bg-surface/50 border-l-4 border-l-accent-orange flex flex-col gap-4">
               <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-text-secondary flex items-center gap-3">
                  <Activity className="w-4 h-4 text-accent-orange" />
                  Priority Flash Alerts
               </h4>
               <div className="space-y-3">
                  {[
                    { title: 'Critical Rolodex Shift', detail: 'Dr. Abiy Melaku updated protocol preference.', alert: 'SECURITY' },
                    { title: 'New Competitive Benchmark', detail: 'TechCabal outperformed on Fintech coverage delta.', alert: 'STRATEGIC' },
                  ].map((alert, i) => (
                    <div key={i} className="flex gap-4 bg-bg-deep p-4 rounded-xl border border-border-dim border-l-4 border-l-accent-orange animate-in slide-in-from-right-4 duration-300 group cursor-pointer hover:shadow-xl transition-all">
                       <div className="flex flex-col flex-1 gap-1">
                          <div className="flex justify-between items-center">
                             <span className="text-[11px] font-extrabold text-text-primary uppercase tracking-tight antialiased group-hover:text-accent-orange transition-colors">{alert.title}</span>
                             <span className="text-[8px] font-mono font-bold text-accent-orange px-1.5 py-0.5 border border-accent-orange/30 rounded">{alert.alert}</span>
                          </div>
                          <div className="text-[10px] text-text-secondary font-medium tracking-tight opacity-70 italic">"{alert.detail}"</div>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-2 py-2 border-t border-border-dim text-[9px] font-extrabold uppercase tracking-[0.3em] text-text-secondary hover:text-accent-orange transition-all">
                  Synchronize Fleet Alerts &rarr;
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
