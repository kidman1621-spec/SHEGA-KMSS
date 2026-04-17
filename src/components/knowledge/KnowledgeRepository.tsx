/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useKnowledge } from '../../contexts/KnowledgeContext';
import { useAuth } from '../../contexts/AuthContext';
import { AssetType, KnowledgeCategory, KnowledgeAsset } from '../../types';
import { Plus, Link, FileUp, PenTool, ExternalLink, Trash2, Info, Lock, Eye, Sparkles, X, ChevronRight, Download, Share2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function KnowledgeRepository() {
  const { assets, addAsset, deleteAsset } = useKnowledge();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<KnowledgeCategory | 'All'>('All');
  const [viewingAsset, setViewingAsset] = useState<KnowledgeAsset | null>(null);

  const filteredAssets = activeFilter === 'All' 
    ? assets 
    : assets.filter(a => a.category === activeFilter);

  const stats = [
    { label: 'Total Assets', value: assets.length },
    { label: 'Bridge Links', value: assets.filter(a => a.type === 'Notion' || a.type === 'SharePoint').length },
    { label: 'AI Assisted', value: assets.filter(a => a.isAiGenerated).length },
  ];

  return (
    <div className="space-y-4 pb-10 h-full flex flex-col">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row gap-4 shrink-0">
        <div className="flex-1 bg-bg-surface border border-border-dim p-4 rounded flex flex-col justify-between relative overflow-hidden group">
          <Info className="absolute -right-2 -top-2 w-12 h-12 opacity-5 text-accent-blue" />
          <div className="relative z-10">
            <h2 className="text-[14px] font-extrabold uppercase tracking-tight flex items-center gap-2">
              Institutional Memory Bridge <Sparkles className="w-3.5 h-3.5 text-accent-blue animate-pulse" />
            </h2>
            <p className="text-[10px] text-text-secondary mt-1">Sovereign indexing of SharePoint, Notion, and internal tribal knowledge.</p>
          </div>
          <div className="flex gap-10 mt-4 relative z-10">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-[9px] uppercase tracking-widest text-text-secondary font-bold mb-1">{s.label}</div>
                <div className="text-[20px] font-mono text-accent-orange font-bold leading-none">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bg-surface border border-border-dim p-4 rounded flex flex-col gap-2 min-w-[240px] shrink-0">
          <h4 className="text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1">Knowledge Ingestion</h4>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded text-[11px] font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(45,164,255,0.2)]"
          >
            <Plus className="w-4 h-4" />
            Establish Source Bridge
          </button>
          <div className="flex items-center gap-2 text-[9px] text-text-secondary italic text-center leading-tight bg-bg-deep/50 p-1.5 rounded border border-border-dim/50 mt-1">
            <Lock className="w-2.5 h-2.5 shrink-0" />
            Auto-applying Clearance Level {user?.clearanceLevel || 1}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 high-density-panel flex flex-col overflow-hidden">
        <div className="panel-header border-b border-border-dim shrink-0">
          <div className="flex gap-2 p-1 overflow-x-auto custom-scrollbar">
            {['All', 'Research', 'Operations', 'Data & Intelligence', 'Media'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat as any)}
                className={cn(
                  "px-3 py-1 bg-bg-deep rounded border text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  activeFilter === cat 
                    ? "border-accent-orange text-accent-orange shadow-sm bg-accent-orange/5" 
                    : "border-border-dim text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 px-2">
             <div className="flex items-center gap-1.5 text-[10px] text-text-secondary uppercase tracking-widest font-bold">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                Index Sync: Nominal
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="high-density-table">
            <thead className="sticky top-0 bg-bg-surface z-10 shadow-sm">
              <tr>
                <th className="pl-6 py-3">Resource Vector</th>
                <th>Type</th>
                <th>Security Clearance</th>
                <th>Institutional Source</th>
                <th className="text-right pr-6">Management</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr 
                  key={asset.id} 
                  onClick={() => setViewingAsset(asset)}
                  className="hover:bg-bg-elevated/40 transition-colors group cursor-pointer"
                >
                  <td className="pl-6 py-3">
                    <div className="flex items-center gap-3">
                       <div className={cn(
                         "w-8 h-8 rounded bg-bg-deep flex items-center justify-center border border-border-dim transition-all group-hover:border-accent-blue/40",
                         asset.type === 'Nugget' && "bg-accent-orange/5"
                       )}>
                          {asset.type === 'SharePoint' && <Link className="w-3.5 h-3.5 text-blue-400" />}
                          {asset.type === 'Notion' && <ExternalLink className="w-3.5 h-3.5 text-slate-400" />}
                          {asset.type === 'File' && <FileUp className="w-3.5 h-3.5 text-accent-green" />}
                          {asset.type === 'Nugget' && <PenTool className="w-3.5 h-3.5 text-accent-orange" />}
                       </div>
                       <div className="flex flex-col min-w-0">
                         <div className="flex items-center gap-2">
                           <span className="font-bold text-[12px] truncate group-hover:text-accent-blue transition-colors">
                            {asset.title}
                           </span>
                           {asset.isAiGenerated && (
                             <span className="flex items-center gap-0.5 px-1 py-0.5 bg-accent-blue/10 text-accent-blue text-[8px] rounded font-bold uppercase tracking-tight border border-accent-blue/20">
                               <Sparkles className="w-2 h-2" /> AI Assisted
                             </span>
                           )}
                         </div>
                         <span className="text-[10px] text-text-secondary truncate font-mono opacity-50">
                           {asset.id} / {asset.category.toUpperCase()}
                         </span>
                       </div>
                    </div>
                  </td>
                  <td>
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border border-border-dim/50 bg-bg-deep transition-all",
                      asset.type === 'Nugget' && "text-accent-orange border-accent-orange/30",
                      asset.type === 'SharePoint' && "text-blue-400 border-blue-400/30"
                    )}>
                      {asset.type}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                       {[1, 2, 3].map(lvl => (
                         <div 
                           key={lvl} 
                           className={cn(
                             "w-4 h-1 rounded-full transition-all",
                             asset.clearanceLevel >= lvl ? "bg-accent-orange" : "bg-bg-elevated"
                           )}
                         />
                       ))}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium">{asset.uploaderName}</span>
                      <span className="text-[9px] text-text-secondary uppercase font-mono">{new Date(asset.createdAt).toISOString().split('T')[0]}</span>
                    </div>
                  </td>
                  <td className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setViewingAsset(asset)}
                        className="p-2 hover:bg-bg-elevated rounded border border-border-dim/30 text-text-secondary hover:text-accent-blue transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteAsset(asset.id)}
                        className="p-2 hover:bg-bg-elevated rounded border border-border-dim/30 text-text-secondary hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <IngestionModal onClose={() => setIsModalOpen(false)} onAdd={addAsset} user={user} />
      )}

      <AnimatePresence>
        {viewingAsset && (
          <DocumentViewer asset={viewingAsset} onClose={() => setViewingAsset(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function DocumentViewer({ asset, onClose }: { asset: KnowledgeAsset; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-end bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-4xl h-full bg-bg-deep border-l border-border-dim flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-border-dim bg-bg-surface flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-bg-elevated rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight uppercase">{asset.title}</h2>
                {asset.isAiGenerated && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-accent-blue/10 text-accent-blue text-[10px] rounded-full font-bold uppercase tracking-wider border border-accent-blue/20">
                    <Sparkles className="w-3 h-3" /> AI Assisted Context
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest">{asset.category}</span>
                <div className="w-1 h-1 rounded-full bg-border-dim"></div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest">ID: {asset.id}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border-dim rounded text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all">
              <Download className="w-4 h-4" /> Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all">
              <Share2 className="w-4 h-4" /> Secure Share
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 bg-bg-deep">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="grid grid-cols-4 gap-6 p-6 bg-bg-surface border border-border-dim rounded-xl">
              {[
                { label: 'Uploader', val: asset.uploaderName },
                { label: 'Created', val: new Date(asset.createdAt).toLocaleDateString() },
                { label: 'Type', val: asset.type },
                { label: 'Clearance', val: `Level ${asset.clearanceLevel}` }
              ].map((m, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-[9px] uppercase tracking-widest text-text-secondary font-bold">{m.label}</div>
                  <div className="text-[11px] font-bold text-text-primary uppercase">{m.val}</div>
                </div>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="bg-bg-surface/50 p-8 rounded-2xl border border-border-dim/50 shadow-inner">
                {asset.type === 'File' && <div className="text-[11px] font-mono text-accent-green mb-4 border-b border-accent-green/20 pb-2">BINARY_VECTOR: PDF_DECODED_STREAM_V2</div>}
                <div className="text-lg leading-relaxed text-text-primary whitespace-pre-wrap font-serif">
                  {asset.content || "Institutional metadata bridge active. Full content currently resides in sovereign source repository. Redirecting to source vector recommended for deep research."}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary border-b border-border-dim pb-2">Associated Taxonomy</h4>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-bg-elevated border border-border-dim rounded text-[10px] font-bold text-text-secondary">#{tag}</span>
                ))}
              </div>
            </div>

            {asset.sourceUrl && (
              <div className="bg-accent-blue/5 border border-accent-blue/20 p-6 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-blue/10 rounded-lg">
                    <ExternalLink className="w-6 h-6 text-accent-blue" />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold uppercase tracking-tight">Access Institutional Source</h5>
                    <p className="text-[10px] text-text-secondary">{asset.sourceUrl}</p>
                  </div>
                </div>
                <a 
                  href={asset.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-accent-blue text-white rounded text-[11px] font-bold uppercase tracking-[0.2em] hover:brightness-110 flex items-center gap-2"
                >
                  Bridge In <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IngestionModal({ onClose, onAdd, user }: { 
  onClose: () => void; 
  onAdd: (a: any) => void; 
  user: any 
}) {
  const [type, setType] = useState<AssetType>('SharePoint');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Research' as KnowledgeCategory,
    sourceUrl: '',
    content: '',
    department: '',
    project: '',
    tags: '',
    isAiGenerated: false
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      type,
      uploaderId: user?.id || 'anon',
      uploaderName: user?.name || 'Anonymous',
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      clearanceLevel: user?.clearanceLevel || 1,
      sourceUrl: type === 'SharePoint' || type === 'Notion' ? formData.sourceUrl : undefined,
      department: type === 'SharePoint' ? formData.department : undefined,
      project: type === 'SharePoint' ? formData.project : undefined,
    });
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setFormData({
          ...formData,
          title: file.name.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' '),
          fileName: file.name,
          content: `VIRTUAL_INGESTION_COMPLETE: ${file.name}\n\n[OCR_SYNTHESIS_REPORT]\nVector Type: ${file.type || 'Institutional Document'}\nPayload Size: ${(file.size / 1024).toFixed(2)} KB\nIntegrity Hash: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nInstitutional content has been mapped to the SIH sovereign brain. Direct vector retrieval enabled for analytical personnel.`
        });
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-bg-surface border border-border-dim w-full max-w-2xl rounded-xl shadow-[0_32px_128px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="panel-header border-b border-border-dim px-6 py-4 flex justify-between items-center bg-bg-elevated/40">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-accent-blue/10 rounded border border-accent-blue/20">
                <Plus className="w-4 h-4 text-accent-blue" />
             </div>
             <div>
                <h3 className="text-[13px] font-extrabold uppercase tracking-widest">Establish Knowledge Bridge</h3>
                <p className="text-[10px] text-text-secondary uppercase font-bold tracking-tighter opacity-60">Unified Source Ingestion / Institutional Mapping</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-elevated rounded-full transition-all"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="bg-bg-deep p-1.5 rounded-xl border border-border-dim flex gap-1">
            {[
              { id: 'SharePoint', icon: Link, label: 'SPO' },
              { id: 'Notion', icon: ExternalLink, label: 'Notion' },
              { id: 'File', icon: FileUp, label: 'File' },
              { id: 'Nugget', icon: PenTool, label: 'Nugget' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id as any)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border",
                  type === t.id 
                    ? "bg-bg-elevated text-text-primary border-border-dim shadow-lg" 
                    : "text-text-secondary hover:text-text-primary border-transparent opacity-40 hover:opacity-100"
                )}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">Asset Vector Title</label>
              <input 
                required
                className="w-full bg-bg-deep border border-border-dim rounded-lg px-4 py-3 text-[12px] font-bold focus:border-accent-blue transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Institutional Title..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">Target Category</label>
              <select 
                className="w-full bg-bg-deep border border-border-dim rounded-lg px-4 py-2.5 text-[12px] font-bold focus:border-accent-blue transition-all h-[44px]"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
              >
                <option>Research</option>
                <option>Operations</option>
                <option>Data & Intelligence</option>
                <option>Media</option>
              </select>
            </div>
          </div>

          {(type === 'SharePoint' || type === 'Notion') && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">
                {type === 'SharePoint' ? 'SPO Root Site URL' : 'Notion Workspace Page ID'}
              </label>
              <input 
                required
                placeholder={type === 'SharePoint' ? "https://shegamedia.sharepoint.com/..." : "3f2e1a..."}
                className="w-full bg-bg-deep border border-border-dim rounded-lg px-4 py-3 text-[12px] focus:border-accent-blue font-mono text-accent-blue"
                value={formData.sourceUrl}
                onChange={(e) => setFormData({...formData, sourceUrl: e.target.value})}
              />
            </div>
          )}

          {type === 'Nugget' && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">Direct Write Editor</label>
              <textarea 
                required
                rows={4}
                placeholder="Capture tacit insights..."
                className="w-full bg-bg-deep border border-border-dim rounded-lg px-4 py-3 text-[12px] font-mono leading-relaxed focus:border-accent-orange outline-none resize-none"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>
          )}

          {type === 'File' && (
            <div className="relative border-2 border-dashed border-border-dim rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-bg-deep hover:bg-bg-elevated/40 transition-all cursor-pointer group">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileUpload}
              />
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin"></div>
                  <span className="text-[10px] uppercase tracking-widest font-extrabold animate-pulse">Ingesting Vector...</span>
                </div>
              ) : (
                <>
                  <FileUp className="w-8 h-8 text-accent-blue opacity-40 group-hover:scale-110 transition-transform" />
                  <div className="text-[11px] font-extrabold text-text-primary uppercase tracking-widest">{formData.fileName || 'Drop SIH Asset'}</div>
                  <div className="text-[9px] text-text-secondary uppercase opacity-60">Institutional OCR Ready</div>
                </>
              )}
            </div>
          )}

          <div className="flex items-center gap-6 p-4 bg-bg-deep rounded-xl border border-border-dim">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="ai-assisted"
                checked={formData.isAiGenerated}
                onChange={(e) => setFormData({...formData, isAiGenerated: e.target.checked})}
                className="w-4 h-4 rounded border-border-dim bg-bg-surface text-accent-blue focus:ring-accent-blue"
              />
              <label htmlFor="ai-assisted" className="text-[11px] font-bold uppercase tracking-wide text-text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-blue" /> Tag as AI-Generated
              </label>
            </div>
            <div className="w-[1px] h-6 bg-border-dim"></div>
            <div className="flex-1 space-y-1">
              <label className="text-[9px] font-extrabold uppercase tracking-widest text-text-secondary">SOP Alignment Tags</label>
              <input 
                placeholder="Market_Research, JICA_2025..."
                className="w-full bg-transparent border-none p-0 text-[11px] focus:ring-0 text-accent-orange font-bold uppercase"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
             <button 
               type="button"
               onClick={onClose}
               className="flex-1 py-3 border border-border-dim rounded-lg text-[11px] font-bold uppercase tracking-widest text-text-secondary hover:bg-bg-elevated transition-all"
             >
               Discard
             </button>
             <button 
               type="submit"
               className="flex-[2] py-3 bg-accent-orange text-bg-deep rounded-lg text-[11px] font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-2"
             >
               Commit to Brain Index <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
