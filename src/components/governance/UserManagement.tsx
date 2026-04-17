/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ShieldCheck, 
  PenTool, 
  User as UserIcon,
  MoreVertical,
  CheckCircle2,
  Lock,
  Target,
  GraduationCap
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { User, Role } from '../../types';

const MOCK_USERS: User[] = [
  {
    id: 'Sarah Ahmed',
    name: 'Sarah Ahmed',
    email: 'sarah@shega.org',
    role: 'Editor',
    expertise: ['Fintech', 'Digital Economy', 'Policy'],
    learningPath: ['Data Science'],
    mentorshipRole: 'Mentor',
    clearanceLevel: 2,
    avatarUrl: 'https://picsum.photos/seed/sarah/100',
    badges: ['Quality Guard', 'Fact-Checker'],
    knowledgeDomains: ['Fintech', 'Policy']
  },
  {
    id: 'Michael Kassa',
    name: 'Michael Kassa',
    email: 'michael@shega.org',
    role: 'Editor',
    expertise: ['Deep Tech', 'IoT'],
    learningPath: ['Regional Policy', 'Fintech'],
    mentorshipRole: 'Mentee',
    clearanceLevel: 1,
    avatarUrl: 'https://picsum.photos/seed/michael/100',
    badges: ['System Auditor'],
    knowledgeDomains: ['Deep Tech']
  },
  {
    id: 'Kidman Shega',
    name: 'Kidman Shega',
    email: 'kidman1621@gmail.com',
    role: 'Admin',
    expertise: ['Operations', 'Institutional Memory', 'Governance'],
    learningPath: [],
    mentorshipRole: 'Mentor',
    clearanceLevel: 3,
    avatarUrl: 'https://picsum.photos/seed/kidman/100',
    badges: ['Architect'],
    knowledgeDomains: ['Operations', 'Governance']
  },
];

const ROLE_BADGE: Record<Role, { label: string, icon: any, color: string }> = {
  Admin: { label: 'Admin', icon: ShieldCheck, color: 'text-purple-500 bg-purple-500/10' },
  Editor: { label: 'Editor', icon: PenTool, color: 'text-accent-blue bg-accent-blue/10' },
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.expertise.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex gap-4 h-full">
      {/* User List Panel */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex justify-between items-center bg-bg-surface border border-border-dim p-4 rounded shrink-0">
          <div>
            <h2 className="text-[14px] font-extrabold uppercase tracking-tight">Institutional User Governance</h2>
            <p className="text-[10px] text-text-secondary">Global RBAC controls & expertise mapping across the Shega Brain.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-accent-blue text-white rounded text-[11px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">
            <Plus className="w-4 h-4" /> Provision Personnel
          </button>
        </div>

        <div className="flex gap-4 p-3 bg-bg-surface border border-border-dim rounded shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
            <input 
              type="text" 
              placeholder="Query personnel by name, email or institutional expertise..." 
              className="w-full bg-bg-deep border border-border-dim rounded py-1.5 pl-10 pr-4 text-[11px] focus:outline-none focus:border-accent-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-bg-elevated border border-border-dim rounded text-[11px] font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary">
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="high-density-panel flex-1 overflow-hidden flex flex-col">
          <div className="overflow-y-auto custom-scrollbar flex-1">
            <table className="high-density-table">
              <thead className="sticky top-0 bg-bg-surface z-10">
                <tr>
                  <th>Identity</th>
                  <th>Governance Role</th>
                  <th>Clearance</th>
                  <th className="text-center">KM Impact</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const Badge = ROLE_BADGE[user.role];
                  return (
                    <tr 
                      key={user.id} 
                      onClick={() => setSelectedUser(user)}
                      className={cn(
                        "hover:bg-bg-elevated/40 transition-colors cursor-pointer border-b border-border-dim last:border-0",
                        selectedUser?.id === user.id && "bg-bg-elevated/60"
                      )}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.avatarUrl} 
                            alt={user.name} 
                            className="w-8 h-8 rounded border border-border-dim shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-[12px] truncate">{user.name}</div>
                            <div className="text-[10px] text-text-secondary truncate">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest", Badge.color)}>
                          <Badge.icon className="w-2.5 h-2.5" /> {Badge.label}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map(lvl => (
                            <div 
                              key={lvl} 
                              className={cn(
                                "w-3 h-1 rounded-full",
                                user.clearanceLevel >= lvl ? "bg-accent-orange" : "bg-bg-elevated"
                              )}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-[11px] font-mono text-accent-green">9.2</span>
                          <span className="text-[8px] uppercase tracking-widest opacity-40">Z-Score</span>
                        </div>
                      </td>
                      <td className="text-right">
                        <button className="p-1.5 hover:bg-bg-elevated rounded">
                          <MoreVertical className="w-3.5 h-3.5 text-text-secondary" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Profile Detail Sidebar (Bloomberg Style) */}
      <div className="w-[340px] flex flex-col gap-4 shrink-0 transition-all">
        {selectedUser ? (
          <div className="flex-1 high-density-panel flex flex-col border-l-2 border-l-accent-orange animate-in slide-in-from-right-4 duration-300">
             <div className="p-6 border-b border-border-dim bg-bg-surface/50">
               <div className="relative w-20 h-20 mx-auto mb-4">
                  <img 
                    src={selectedUser.avatarUrl} 
                    alt="" 
                    className="w-full h-full rounded-2xl border-2 border-border-dim object-cover shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-accent-green w-4 h-4 rounded-full border-4 border-bg-surface"></div>
               </div>
               <div className="text-center space-y-1">
                  <h3 className="text-lg font-extrabold uppercase tracking-tighter">{selectedUser.name}</h3>
                  <p className="text-[10px] text-accent-orange font-bold uppercase tracking-[0.2em]">{selectedUser.role} / Level {selectedUser.clearanceLevel} Clearance</p>
               </div>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* Expertise Gaps & Tags */}
                <section className="space-y-3">
                   <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Expertise Vector</h4>
                      <Target className="w-3.5 h-3.5 text-text-secondary opacity-40" />
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {selectedUser.expertise.map(tag => (
                        <div key={tag} className="px-2 py-1 bg-bg-deep border border-border-dim rounded text-[10px] font-bold text-text-primary flex items-center gap-1.5">
                           <div className="w-1 h-1 rounded-full bg-accent-orange" />
                           {tag}
                        </div>
                      ))}
                   </div>
                </section>

                {/* Mentorship Alignment */}
                <section className="space-y-3">
                   <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Mentorship Intelligence</h4>
                      <GraduationCap className="w-3.5 h-3.5 text-text-secondary opacity-40" />
                   </div>
                   <div className="bg-bg-deep p-4 rounded border border-border-dim space-y-4">
                      <div className="flex justify-between items-baseline">
                         <span className="text-[11px] font-bold">Role Alignment</span>
                         <span className="text-[10px] font-bold text-accent-orange uppercase">{selectedUser.mentorshipRole}</span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-widest text-text-secondary">Learning Path</span>
                        <div className="flex flex-wrap gap-1">
                           {selectedUser.learningPath.map(p => (
                             <span key={p} className="text-[10px] bg-bg-surface px-1.5 py-0.5 rounded italic opacity-70">#{p.toLowerCase()}</span>
                           ))}
                           {selectedUser.learningPath.length === 0 && <span className="text-[10px] italic opacity-30">None active</span>}
                        </div>
                      </div>
                      <button className="w-full py-2 border border-border-dim rounded text-[10px] font-bold uppercase tracking-widest hover:bg-accent-orange hover:text-bg-deep transition-all">
                        Search Matches
                      </button>
                   </div>
                </section>

                {/* System Permissions */}
                <section className="space-y-3">
                   <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Infrastructure Privileges</h4>
                      <Lock className="w-3.5 h-3.5 text-text-secondary opacity-40" />
                   </div>
                   <div className="space-y-2">
                      {[
                        { label: 'Rolodex (Off-the-record)', access: selectedUser.clearanceLevel >= 3 },
                        { label: 'SOP Governance', access: selectedUser.role === 'Admin' || selectedUser.role === 'Editor' },
                        { label: 'Asset Ingestion', access: true },
                        { label: 'Admin Metrics', access: selectedUser.role === 'Admin' },
                      ].map((perm, i) => (
                        <div key={i} className="flex justify-between items-center text-[11px]">
                           <span className={cn(perm.access ? "text-text-primary" : "text-text-secondary opacity-40")}>{perm.label}</span>
                           <div className={cn(
                             "w-2 h-2 rounded-full",
                             perm.access ? "bg-accent-green" : "bg-red-500/20"
                           )} />
                        </div>
                      ))}
                   </div>
                </section>
             </div>
          </div>
        ) : (
          <div className="flex-1 high-density-panel flex flex-col items-center justify-center p-8 opacity-20 text-center gap-4">
             <UserIcon className="w-16 h-16" />
             <div className="text-[11px] font-bold uppercase tracking-[0.4em]">Select Personnel Node</div>
          </div>
        )}
      </div>
    </div>
  );
}
