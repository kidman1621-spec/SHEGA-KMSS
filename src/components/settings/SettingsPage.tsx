/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Database, 
  Cloud, 
  Key, 
  User, 
  Bell, 
  Moon, 
  Sun,
  Monitor,
  CheckCircle2,
  RefreshCcw,
  Globe,
  Lock,
  Terminal
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'General' | 'Security' | 'Integration' | 'Infrastructure'>('General');

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className="bg-bg-surface border border-border-dim p-4 rounded flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-bg-elevated flex items-center justify-center">
            <Settings className="w-4 h-4 text-text-secondary" />
          </div>
          <div>
            <h2 className="text-[14px] font-extrabold uppercase tracking-tight">System Settings & Governance</h2>
            <p className="text-[10px] text-text-secondary">Global configurations, infrastructure nodes, and security policy management.</p>
          </div>
        </div>
        <div>
           <button className="px-4 py-1.5 bg-accent-blue text-white rounded text-[11px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">
             Apply Changes
           </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
         {/* Settings Navigation */}
         <div className="w-[200px] flex flex-col gap-2 shrink-0">
            {[
              { id: 'General', icon: Monitor, label: 'Global UI' },
              { id: 'Security', icon: Shield, label: 'Access Control' },
              { id: 'Integration', icon: Cloud, label: 'Bridge API' },
              { id: 'Infrastructure', icon: Terminal, label: 'System Nodes' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded text-[12px] font-bold uppercase tracking-widest transition-all text-left",
                  activeSection === section.id 
                    ? "bg-bg-elevated text-accent-orange border border-border-dim shadow-sm" 
                    : "text-text-secondary hover:text-text-primary border border-transparent"
                )}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="flex-1 high-density-panel flex flex-col p-6 overflow-y-auto custom-scrollbar bg-bg-surface/50">
            <div className="max-w-3xl space-y-8">
               {activeSection === 'General' && (
                 <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-[14px] font-extrabold uppercase tracking-widest border-b border-border-dim pb-2">Global Interface</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">App Intelligence Level</label>
                          <select className="w-full bg-bg-deep border border-border-dim rounded p-2 text-[12px] font-bold">
                             <option>Full Hybrid (Local + LLM)</option>
                             <option>Strict Internal Data Only</option>
                             <option>Research Mode (Experimental)</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">UI Aesthetics</label>
                          <div className="flex gap-2">
                             <button onClick={toggleTheme} className="flex-1 py-2 flex items-center justify-center gap-2 rounded border border-border-dim bg-bg-deep text-[11px] font-bold uppercase hover:border-accent-orange transition-all">
                                {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                                {theme === 'dark' ? 'Night Mode' : 'Light Mode'}
                             </button>
                             <button className="flex-1 py-2 flex items-center justify-center gap-2 rounded border border-border-dim bg-bg-deep text-[11px] font-bold uppercase hover:border-accent-orange transition-all">
                                <Monitor className="w-3.5 h-3.5" /> High Density
                             </button>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 bg-bg-deep rounded border border-border-dim">
                          <div>
                             <div className="text-[12px] font-bold">Automatic Synchronization</div>
                             <p className="text-[10px] text-text-secondary mt-1">Keep SharePoint and Notion indexes updated every hour.</p>
                          </div>
                          <div className="w-10 h-5 bg-accent-green rounded-full flex items-center justify-end px-1 border border-border-dim"><div className="w-3.5 h-3.5 rounded-full bg-bg-deep"></div></div>
                       </div>
                    </div>
                 </div>
               )}

               {activeSection === 'Security' && (
                 <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-[14px] font-extrabold uppercase tracking-widest border-b border-border-dim pb-2 flex items-center gap-2">
                       <Shield className="w-4 h-4 text-accent-orange" /> Authentication & Key Matrix
                    </h3>
                    <div className="bg-bg-deep p-4 rounded border border-border-dim border-l-2 border-l-accent-orange">
                       <div className="flex items-start gap-4">
                          <Lock className="w-6 h-6 text-accent-orange" />
                          <div className="flex-1">
                             <div className="text-[12px] font-bold">Institutional Key Rotation</div>
                             <p className="text-[10px] text-text-secondary mt-1">Sovereign Rolodex keys were last rotated 12 days ago. System health check recommended.</p>
                             <button className="text-[10px] font-extrabold text-accent-orange uppercase hover:underline mt-2">Force Global Rotation</button>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button className="p-4 bg-bg-deep rounded border border-border-dim hover:border-accent-blue transition-all text-left group">
                             <Key className="w-5 h-5 text-accent-blue mb-2 group-hover:scale-110 transition-transform" />
                             <div className="text-[12px] font-bold">API Gateway Access</div>
                             <p className="text-[10px] text-text-secondary mt-1">Manage bearer tokens for external integrations.</p>
                          </button>
                          <button className="p-4 bg-bg-deep rounded border border-border-dim hover:border-accent-blue transition-all text-left group">
                             <Globe className="w-5 h-5 text-accent-blue mb-2 group-hover:scale-110 transition-transform" />
                             <div className="text-[12px] font-bold">Regional Access Hub</div>
                             <p className="text-[10px] text-text-secondary mt-1">Configure MFA requirements for Pan-African hubs.</p>
                          </button>
                       </div>
                    </div>
                 </div>
               )}

               {activeSection === 'Infrastructure' && (
                 <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-[14px] font-extrabold uppercase tracking-widest border-b border-border-dim pb-2">Cluster Diagnostics</h3>
                    <div className="space-y-3">
                       {[
                         { node: 'ETH-AD-01', status: 'Online', load: '12%', ping: '4ms' },
                         { node: 'NBO-HUB-02', status: 'Online', load: '45%', ping: '42ms' },
                         { node: 'DAR-HUB-03', status: 'Idle', load: '2%', ping: '48ms' },
                         { node: 'LAG-SYNC-04', status: 'Syncing', load: '89%', ping: '98ms' },
                       ].map((node) => (
                         <div key={node.node} className="flex items-center justify-between p-3 bg-bg-deep rounded border border-border-dim">
                            <div className="flex items-center gap-4">
                               <div className="flex flex-col">
                                  <span className="text-[12px] font-bold font-mono">{node.node}</span>
                                  <span className="text-[9px] text-text-secondary uppercase">Node Location: Regional Cluster</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-8">
                               <div className="text-right">
                                  <div className="text-[9px] text-text-secondary uppercase">Resource Load</div>
                                  <div className="text-[11px] font-bold font-mono">{node.load}</div>
                               </div>
                               <div className="text-right">
                                  <div className="text-[9px] text-text-secondary uppercase">Latency</div>
                                  <div className="text-[11px] font-bold font-mono">{node.ping}</div>
                               </div>
                               <div className={cn(
                                 "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                 node.status === 'Online' ? "bg-accent-green/10 text-accent-green" :
                                 node.status === 'Syncing' ? "bg-accent-blue/10 text-accent-blue animate-pulse" :
                                 "bg-bg-elevated text-text-secondary"
                               )}>
                                 {node.status}
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                       <button className="flex items-center gap-2 px-6 py-2 bg-bg-elevated border border-border-dim rounded text-[11px] font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all">
                          <RefreshCcw className="w-4 h-4" /> Global Re-Indexing Cluster
                       </button>
                    </div>
                 </div>
               )}

               {activeSection === 'Integration' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="bg-bg-deep p-6 rounded-xl border border-border-dim border-t-4 border-t-accent-blue relative overflow-hidden">
                       <Database className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 pointer-events-none" />
                       <h4 className="text-[14px] font-extrabold uppercase tracking-tight mb-4 flex items-center gap-2">
                          <Cloud className="w-4 h-4 text-accent-blue" /> Unified Knowledge Bridges
                       </h4>
                       <div className="space-y-4">
                          {[
                            { name: 'Microsoft SharePoint', status: 'Connected', lastSync: '12m ago' },
                            { name: 'Notion Workspace', status: 'Sync Error', lastSync: '2h ago' },
                            { name: 'JICA External Baseline', status: 'Connected', lastSync: '1h ago' },
                          ].map((bridge) => (
                            <div key={bridge.name} className="flex items-center justify-between bg-bg-surface p-4 rounded border border-border-dim">
                               <div className="flex items-center gap-3">
                                  <div className="p-2 bg-bg-elevated rounded">
                                     <Monitor className="w-4 h-4 text-text-secondary" />
                                  </div>
                                  <div>
                                     <div className="text-[12px] font-bold">{bridge.name}</div>
                                     <div className="text-[10px] text-text-secondary">Last handshake: {bridge.lastSync}</div>
                                  </div>
                               </div>
                               <div className="flex items-center gap-3">
                                  <span className={cn(
                                    "text-[10px] font-bold uppercase",
                                    bridge.status === 'Connected' ? "text-accent-green" : "text-red-400"
                                  )}>{bridge.status}</span>
                                  <button className="p-1.5 hover:bg-bg-elevated rounded border border-border-dim text-[10px] font-bold uppercase text-text-secondary">Configure</button>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
