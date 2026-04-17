/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Contact, 
  Search, 
  Filter, 
  UserPlus, 
  ShieldAlert, 
  Star, 
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  History,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { RolodexContact } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Rolodex() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', organization: '', expertiseTags: '', notes: '' });
  const [sources, setSources] = useState<RolodexContact[]>(() => {
    const saved = localStorage.getItem('sih_rolodex');
    return saved ? JSON.parse(saved) : MOCK_SOURCES;
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const contact: RolodexContact = {
      id: Math.random().toString(36).substr(2, 9),
      name: newContact.name,
      organization: newContact.organization,
      expertiseTags: newContact.expertiseTags.split(',').map(t => t.trim()).filter(Boolean),
      reliabilityScore: 85, // Default for new sync
      clearance: 'Standard',
      lastInteractionDate: new Date().toISOString().split('T')[0],
      relationshipManagerId: user?.id || 'anon',
      notes: newContact.notes,
      interactionLog: [
        { 
          id: 'init', 
          date: new Date().toISOString().split('T')[0], 
          staffId: user?.id || 'anon', 
          staffName: user?.name || 'Anonymous', 
          summary: 'Institutional node initialized.' 
        }
      ]
    };
    const updated = [contact, ...sources];
    setSources(updated);
    localStorage.setItem('sih_rolodex', JSON.stringify(updated));
    setIsModalOpen(false);
    setNewContact({ name: '', organization: '', expertiseTags: '', notes: '' });
  };

  const filteredSources = sources.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.expertiseTags.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const canSeePrivate = (user?.clearanceLevel || 1) >= 3;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-accent-blue font-black uppercase text-[10px] tracking-[0.3em]">
            <Contact className="w-4 h-4" />
            Authority Matrix
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-text-primary">Expert Contacts</h1>
          <p className="text-[11px] text-text-secondary uppercase font-bold tracking-widest opacity-60">Verified institutional relationships & source intelligence</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Query Name, Org, or Topic..."
              className="bg-bg-surface border border-border-dim border-l-4 border-l-accent-blue rounded-xl py-3 pl-12 pr-6 text-[13px] font-bold focus:outline-none focus:border-accent-blue transition-all"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-accent-blue text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:brightness-110 shadow-lg transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Register Authority
          </button>
        </div>
      </header>

      {/* Register Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-bg-surface border border-border-dim rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border-dim bg-bg-deep/50 flex justify-between items-center">
                <h3 className="text-[14px] font-black uppercase tracking-widest text-text-primary flex items-center gap-2">
                   <UserPlus className="w-4 h-4 text-accent-blue" /> Register New Authority Node
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-bg-elevated rounded">
                   <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <form onSubmit={handleRegister} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-1">Official Name</label>
                       <input 
                          required
                          className="w-full bg-bg-deep border border-border-dim rounded-xl px-4 py-3 text-[13px] focus:border-accent-blue transition-all"
                          value={newContact.name}
                          onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-1">Institution</label>
                       <input 
                          required
                          className="w-full bg-bg-deep border border-border-dim rounded-xl px-4 py-3 text-[13px] focus:border-accent-blue transition-all"
                          value={newContact.organization}
                          onChange={(e) => setNewContact({...newContact, organization: e.target.value})}
                       />
                    </div>
                 </div>
                 
                 <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-1">Expertise Vectors (Comma separated)</label>
                    <input 
                       className="w-full bg-bg-deep border border-border-dim rounded-xl px-4 py-3 text-[13px] focus:border-accent-blue transition-all"
                       placeholder="e.g. Fintech, Policy, Logistics"
                       value={newContact.expertiseTags}
                       onChange={(e) => setNewContact({...newContact, expertiseTags: e.target.value})}
                    />
                 </div>

                 <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-1">Private Intelligence Briefing</label>
                    <textarea 
                       rows={3}
                       className="w-full bg-bg-deep border border-border-dim rounded-xl px-4 py-3 text-[13px] focus:border-accent-blue transition-all resize-none"
                       value={newContact.notes}
                       onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                    />
                 </div>

                 <div className="flex gap-4 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 border-2 border-border-dim rounded-xl text-[11px] font-black uppercase tracking-widest text-text-secondary hover:bg-bg-elevated transition-all"
                    >
                      Abort
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 bg-accent-blue text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg transition-all"
                    >
                      Commit Node
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-bg-surface border border-border-dim rounded-[2rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-elevated/50 border-b border-border-dim">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Official Name</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Institution</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Reliability</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Last Sync</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Clearance</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredSources.map((contact) => (
              <React.Fragment key={contact.id}>
                <tr 
                  className={cn(
                    "border-b border-border-dim/50 hover:bg-bg-elevated/30 transition-colors cursor-pointer active:bg-bg-elevated/50",
                    expandedId === contact.id && "bg-bg-elevated/20"
                  )}
                  onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-bg-deep border border-border-dim flex items-center justify-center font-black text-xs text-accent-blue">
                        {contact.name[0]}
                      </div>
                      <span className="text-[14px] font-bold text-text-primary tracking-tight">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[12px] font-black uppercase tracking-widest text-text-secondary">{contact.organization}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px] h-1.5 bg-bg-deep rounded-full overflow-hidden border border-border-dim">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            contact.reliabilityScore > 90 ? "bg-accent-green" : contact.reliabilityScore > 80 ? "bg-accent-blue" : "bg-accent-orange"
                          )}
                          style={{ width: `${contact.reliabilityScore}%` }} 
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-text-primary">{contact.reliabilityScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-bold text-text-secondary">{contact.lastInteractionDate}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border",
                      contact.clearance === 'Elite' ? "bg-accent-orange/10 text-accent-orange border-accent-orange/20" : "bg-bg-elevated text-text-secondary border-border-dim"
                    )}>
                      {contact.clearance}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    {expandedId === contact.id ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
                  </td>
                </tr>
                {expandedId === contact.id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 bg-bg-deep/50 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" />
                            Private Intelligence Brief
                          </h4>
                          <div className={cn(
                            "p-5 rounded-2xl border-2 transition-all relative",
                            canSeePrivate ? "bg-bg-surface border-accent-blue/20" : "bg-bg-surface/50 border-border-dim grayscale opacity-50"
                          )}>
                             {!canSeePrivate && (
                               <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
                                  <div className="space-y-2">
                                    <ShieldAlert className="w-6 h-6 mx-auto text-accent-orange" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">L3 Clearance Threshold Required</p>
                                  </div>
                               </div>
                             )}
                             <p className={cn(
                               "text-[13px] font-medium leading-relaxed italic font-serif",
                               !canSeePrivate && "blur-[4px]"
                             )}>
                               {contact.notes || "No restricted memos recorded for this node."}
                             </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue flex items-center gap-2">
                             <History className="w-3.5 h-3.5" />
                             Interaction Timeline
                          </h4>
                          <div className="space-y-3">
                            {contact.interactionLog.map((entry, idx) => (
                              <div key={idx} className="bg-bg-surface p-4 rounded-xl border border-border-dim">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-[11px] font-black text-text-primary uppercase tracking-tight">{entry.staffName}</span>
                                  <span className="text-[9px] font-mono text-text-secondary">{entry.date}</span>
                                </div>
                                <p className="text-[12px] text-text-secondary italic">"{entry.summary}"</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue flex items-center gap-2">
                             <Star className="w-3.5 h-3.5" />
                             Expertise Vectors
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {contact.expertiseTags.map(tag => (
                              <span key={tag} className="bg-bg-elevated border border-border-dim px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-text-primary">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="pt-6">
                            <button className="w-full bg-accent-blue text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 shadow-lg">
                               <MessageSquare className="w-4 h-4" />
                               Initiate Comms
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const MOCK_SOURCES: RolodexContact[] = [
  {
    id: '1',
    name: 'Dr. Abiy Melaku',
    organization: 'Ministry of Innovation & Technology',
    expertiseTags: ['Digital ID', 'e-Governance', 'Blockchain Policy'],
    reliabilityScore: 98,
    clearance: 'Elite',
    lastInteractionDate: '2026-03-12',
    relationshipManagerId: 'admin-01',
    notes: 'Dr. Melaku prefers Signal briefings. Hard-line stance on data sovereignty; align briefings with "Institutional Memory" rather than "Market Disruption."',
    interactionLog: [
      { id: 'e1', date: '2026-03-12', staffId: 'admin-01', staffName: 'Kidman Shega', summary: 'Briefed on Sandbox regulation shifts. Extremely bullish on sovereign datasets.' },
      { id: 'e2', date: '2025-11-05', staffId: 'ed-02', staffName: 'Sara Ahmed', summary: 'Interviewed for 2025 Fintech report. Clarified licensing tiers.' }
    ]
  },
  {
    id: '2',
    name: 'Elsa Tesfaye',
    organization: 'Kifiya Financial Services',
    expertiseTags: ['Fintech', 'Credit Scoring', 'Alternative Data'],
    reliabilityScore: 84,
    clearance: 'Standard',
    lastInteractionDate: '2026-04-02',
    relationshipManagerId: 'ed-02',
    notes: 'Open to joining the Brown Bag session next month. Strong interest in regional credit interoperability.',
    interactionLog: [
      { id: 'e3', date: '2026-04-02', staffId: 'v-03', staffName: 'Michael Kassa', summary: 'Discussed alternative credit datasets for rural Ethiopian lending.' }
    ]
  },
  {
    id: '3',
    name: 'Biniam Gebre',
    organization: 'Safaricom Ethiopia',
    expertiseTags: ['Infrastructure', 'Logistics', 'Mobile Ops'],
    reliabilityScore: 92,
    clearance: 'Elite',
    lastInteractionDate: '2026-01-20',
    relationshipManagerId: 'admin-01',
    notes: 'Direct line to Board. Sensitive to branding discussions; quote using "Safaricom Spokesperson" unless explicit permission given.',
    interactionLog: [
      { id: 'e4', date: '2026-01-20', staffId: 'ed-04', staffName: 'Hana Belay', summary: 'Consulted on regional coverage maps for Northern Ethiopia expansion.' }
    ]
  }
];
