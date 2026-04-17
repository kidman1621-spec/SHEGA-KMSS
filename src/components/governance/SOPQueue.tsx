/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  History,
  Search,
  Filter,
  MoreVertical,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SOPQueue() {
  const [activeFilter, setActiveFilter] = useState<'Pending' | 'Review' | 'Approved'>('Pending');

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-accent-orange/10 flex items-center justify-center">
            <Bell className="w-4 h-4 text-accent-orange" />
          </div>
          <div>
            <h2 className="text-[14px] font-extrabold uppercase tracking-tight">SOP Approval Queue</h2>
            <p className="text-[10px] text-text-secondary">Reviewing institutional standards for quality and strategic alignment.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-1.5 bg-bg-elevated border border-border-dim rounded text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all">
             <History className="w-3.5 h-3.5" />
             Past Decisions
           </button>
        </div>
      </div>

      <div className="flex-1 high-density-panel flex flex-col">
        <div className="panel-header border-b border-border-dim">
           <div className="flex gap-4">
              {['Pending', 'Review', 'Approved'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as any)}
                  className={cn(
                    "relative pb-3 text-[11px] font-bold uppercase tracking-widest transition-all",
                    activeFilter === f ? "text-accent-orange" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {f}
                  {activeFilter === f && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-orange" />
                  )}
                </button>
              ))}
           </div>
           <div className="flex items-center gap-3">
              <div className="relative">
                 <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-30" />
                 <input type="text" placeholder="Search approvals..." className="bg-bg-deep border border-border-dim rounded py-1 pl-8 pr-4 text-[11px] w-[200px]" />
              </div>
              <button className="p-1.5 hover:bg-bg-elevated rounded border border-border-dim"><Filter className="w-3.5 h-3.5 text-text-secondary" /></button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
           <div className="space-y-3">
              {MOCK_QUEUE.filter(item => item.status === activeFilter).map((item) => (
                <div key={item.id} className="bg-bg-surface border border-border-dim rounded hover:border-accent-orange transition-all p-4 flex items-center justify-between group">
                   <div className="flex items-center gap-4 flex-1">
                      <div className={cn(
                        "w-10 h-10 rounded flex items-center justify-center shrink-0 border",
                        item.prio === 'High' ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-bg-elevated border-border-dim text-text-secondary"
                      )}>
                         <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                         <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-text-primary leading-tight">{item.title}</span>
                            <span className="text-[9px] font-mono text-text-secondary bg-bg-deep px-1.5 rounded">v{item.version}</span>
                         </div>
                         <div className="flex items-center gap-3 text-[10px] text-text-secondary">
                            <span>By: <span className="font-bold">{item.submitter}</span></span>
                            <span className="opacity-30">|</span>
                            <span>Dept: {item.dept}</span>
                            <span className="opacity-30">|</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time} ago</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right hidden md:block">
                         <div className="flex flex-col">
                            <span className={cn(
                              "text-[8px] font-bold uppercase tracking-widest px-1.5 rounded inline-block mb-1",
                              item.prio === 'High' ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-bg-elevated text-text-secondary border border-border-dim"
                            )}>
                               {item.prio} Priority
                            </span>
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <button className="p-2 hover:bg-bg-elevated rounded text-text-secondary hover:text-accent-green transition-colors">
                            <CheckCircle2 className="w-4 h-4" />
                         </button>
                         <button className="p-2 hover:bg-bg-elevated rounded text-text-secondary hover:text-red-400 transition-colors">
                            <AlertCircle className="w-4 h-4" />
                         </button>
                         <button className="px-3 py-1.5 bg-accent-orange/10 text-accent-orange rounded text-[10px] font-bold uppercase tracking-widest hover:bg-accent-orange hover:text-bg-deep transition-all">
                            Review Logic
                         </button>
                      </div>
                      <button className="p-1.5 hover:bg-bg-elevated rounded"><MoreVertical className="w-4 h-4 text-text-secondary opacity-40" /></button>
                   </div>
                </div>
              ))}
              {MOCK_QUEUE.filter(item => item.status === activeFilter).length === 0 && (
                <div className="h-[200px] flex flex-col items-center justify-center opacity-30 gap-3 border border-border-dim border-dashed rounded">
                   <Bell className="w-10 h-10" />
                   <div className="text-[10px] uppercase font-bold tracking-widest">No procedures in this stage</div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}

const MOCK_QUEUE = [
  { id: '1', title: 'Start-up Verification Protocol (Revised)', version: '3.2', submitter: 'Michael Kassa', dept: 'Data Research', time: '1h', status: 'Pending', prio: 'High' },
  { id: '2', title: 'NGO Outreach Framework', version: '1.0', submitter: 'Sara Ahmed', dept: 'Operations', time: '4h', status: 'Pending', prio: 'Medium' },
  { id: '3', title: 'Crisis Communication SOP', version: '2.1', submitter: 'Hana Belay', dept: 'Media', time: '1d', status: 'Pending', prio: 'High' },
  { id: '4', title: 'Internal Tooling Access Policy', version: '1.1', submitter: 'Daniel Kebede', dept: 'Engineering', time: '2d', status: 'Review', prio: 'Low' },
  { id: '5', title: 'Fact-Check: Digital ID Report', version: '4.0', submitter: 'Admin', dept: 'Research', time: '3d', status: 'Approved', prio: 'High' },
];
