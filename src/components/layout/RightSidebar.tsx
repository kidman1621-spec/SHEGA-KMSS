/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Edit2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function RightSidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-[280px] border-l border-border-dim bg-bg-surface p-4 flex flex-col gap-6 overflow-y-auto">
      {/* Profile Card */}
      <div className="bg-bg-elevated border border-border-dim rounded-lg p-4">
        <div className="flex gap-3 items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-accent-orange flex items-center justify-center font-bold text-text-primary">
            {user?.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-[13px] font-semibold">{user?.name}</div>
            <div className="text-[11px] text-text-secondary">Senior Analyst</div>
          </div>
        </div>
        
        <div className="text-[11px]">
          <div className="mb-2 font-bold">Expertise Domains:</div>
          <div className="flex flex-wrap gap-1">
            {user?.knowledgeDomains.map((domain, i) => (
              <span key={i} className="bg-border-dim px-2 py-0.5 rounded text-[10px]">
                {domain}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-dim flex justify-between items-center text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent-green"></div>
            <span>Status: <span className="text-accent-green">Active Mentor</span></span>
          </div>
          <button className="text-accent-blue hover:underline flex items-center gap-1">
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">System Notifications</h4>
          <span className="text-[9px] bg-accent-blue/10 text-accent-blue px-1.5 rounded">3 NEW</span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { msg: 'New SOP published for Fintech Reporting in Nigeria.', time: '12 mins ago', accent: 'blue' },
            { msg: 'Mentorship session scheduled with Kofi Mensah.', time: '2 hours ago', accent: 'blue' },
            { msg: 'System Update: Knowledge Indexing completed successfully.', time: '5 hours ago', accent: 'orange' },
          ].map((notif, i) => (
            <div 
              key={i} 
              className={cn(
                "p-3 rounded border-l-2 text-[11px] bg-bg-deep/40",
                notif.accent === 'blue' ? "border-accent-blue bg-accent-blue/5" : "border-accent-orange bg-accent-orange/5"
              )}
            >
              <div className="leading-normal">{notif.msg}</div>
              <span className="text-[9px] text-text-secondary mt-1 block italic">{notif.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-auto text-[10px] text-text-secondary leading-relaxed opacity-50">
        SHEGA INTELLIGENCE HUB V2.4.0-STABLE<br />
        LEARNING ORGANIZATION ENGINE ACTIVE
      </div>
    </aside>
  );
}
