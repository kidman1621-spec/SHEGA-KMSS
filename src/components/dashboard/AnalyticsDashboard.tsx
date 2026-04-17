/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { 
  Search, 
  Activity,
  Globe,
  Database,
  Cpu,
  Terminal,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { KnowledgeGap, Contributor, SystemHealth } from '../../types';

const MOCK_KNOWLEDGE_GAPS: KnowledgeGap[] = [
  { term: '"Ethiopian Fintech Sandbox"', volume: 58, time: '1m ago' },
  { term: '"Lagos Free Zone Logistics"', volume: 31, time: '15m ago' },
  { term: '"Safaricom 5G Roadmap"', volume: 28, time: '1h ago' },
  { term: '"AfCFTA Tariff Adjustments"', volume: 19, time: '3h ago' },
  { term: '"Regional Agtech Baseline"', volume: 14, time: '6h ago' },
];

const MOCK_CONTRIBUTORS: Contributor[] = [
  { name: 'Kofi Mensah', assets: 45, score: 98.2 },
  { name: 'Sara Ahmed', assets: 32, score: 94.1 },
  { name: 'Daniel Kebede', assets: 29, score: 89.5 },
  { name: 'Amara Diallo', assets: 18, score: 76.4 },
];

const MOCK_HEALTH: SystemHealth[] = [
  { timestamp: '08:00', botUsage: 400, manualSearch: 200 },
  { timestamp: '10:00', botUsage: 600, manualSearch: 350 },
  { timestamp: '12:00', botUsage: 800, manualSearch: 400 },
  { timestamp: '14:00', botUsage: 750, manualSearch: 380 },
  { timestamp: '16:00', botUsage: 900, manualSearch: 420 },
  { timestamp: '18:00', botUsage: 500, manualSearch: 250 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-4 pb-12 h-full flex flex-col">
      {/* Dynamic Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        {[
          { label: 'Intelligence Velocity', value: '4.2', sub: 'Inquiries / Sec', icon: Cpu, color: 'text-accent-blue' },
          { label: 'Knowledge Health', value: '82%', sub: 'Indexed Coverage', icon: Database, color: 'text-accent-green' },
          { label: 'Global Reach', value: '14', sub: 'Hub Nodes Online', icon: Globe, color: 'text-accent-orange' },
          { label: 'System Uptime', value: '99.98%', sub: 'Cluster Health: Nominal', icon: Activity, color: 'text-slate-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-bg-surface border border-border-dim p-4 rounded relative overflow-hidden group">
            <stat.icon className={cn("absolute -right-4 -bottom-4 w-16 h-16 opacity-5 group-hover:scale-110 transition-transform", stat.color)} />
            <div className="relative z-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                {stat.label}
              </div>
              <div className="text-2xl font-extrabold tracking-tighter mt-1">{stat.value}</div>
              <div className="text-[9px] font-bold text-text-secondary uppercase mt-0.5">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Knowledge Gaps (Admin Critical) */}
        <div className="lg:col-span-2 high-density-panel flex flex-col overflow-hidden">
          <div className="panel-header shrink-0">
            <h3 className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-accent-orange" />
              Strategic Knowledge Gaps (High Volume / Zero Result)
            </h3>
            <button className="bg-accent-orange text-bg-deep text-[10px] font-bold px-3 py-1 uppercase tracking-widest hover:brightness-110">
              Commission Research
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
            <table className="high-density-table">
              <thead className="sticky top-0 bg-bg-surface z-10 shadow-sm">
                <tr>
                  <th className="pl-4">Term Node</th>
                  <th>Query Volume</th>
                  <th className="text-right pr-4">Criticality Index</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_KNOWLEDGE_GAPS.map((row, i) => (
                  <tr key={i} className="hover:bg-bg-elevated/40 transition-colors border-b border-border-dim/50 last:border-0">
                    <td className="pl-4 font-mono text-accent-orange">{row.term}</td>
                    <td className="font-mono text-[11px]">{row.volume}</td>
                    <td className="text-right pr-4 font-mono">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-bold",
                        row.volume > 40 ? "bg-red-500/10 text-red-400" : "bg-bg-elevated text-text-secondary"
                      )}>
                        {row.volume > 40 ? 'CRITICAL' : 'MODERATE'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Node Diagnostics */}
        <div className="high-density-panel flex flex-col bg-bg-surface/30">
           <div className="panel-header shrink-0 border-b border-border-dim">
              <h3 className="flex items-center gap-2">
                 <Terminal className="w-3.5 h-3.5 text-accent-blue" />
                 Infrastructure Nodes
              </h3>
              <RefreshCw className="w-3 w-3 text-text-secondary animate-spin-slow" />
           </div>
           <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
              {[
                { name: 'ADDIS-CORE-01', load: '12%', status: 'Nominal' },
                { name: 'NRO-HUB-12', load: '89%', status: 'Peak' },
                { name: 'LAG-CDN-04', load: '45%', status: 'Nominal' },
                { name: 'DAR-INDEX-09', load: '22%', status: 'Idle' },
                { name: 'SHP-BRIDGE', load: '08%', status: 'Steady' },
              ].map(node => (
                <div key={node.name} className="flex flex-col gap-1.5 p-2 border border-border-dim bg-bg-deep rounded">
                   <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                      <span className="text-text-secondary">{node.name}</span>
                      <span className={cn(
                        node.status === 'Peak' ? "text-red-400" : "text-accent-green"
                      )}>{node.status}</span>
                   </div>
                   <div className="h-1 bg-bg-elevated rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full", node.status === 'Peak' ? "bg-red-500" : "bg-accent-blue")} 
                        style={{ width: node.load }} 
                      />
                   </div>
                   <div className="text-[9px] text-text-secondary uppercase opacity-50 font-mono">Usage: {node.load} / TLS 1.3 Active</div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Engagement Velocity Chart */}
      <div className="high-density-panel p-4 shrink-0 bg-bg-surface/50 border-t-2 border-t-accent-blue">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h3 className="text-[12px] font-extrabold uppercase tracking-widest leading-none">Intelligence Engagement Velocity</h3>
            <span className="text-[9px] text-text-secondary mt-1">Institutional Retrieval RAG Performance Analytics</span>
          </div>
          <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest text-text-secondary">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-orange shadow-[0_0_8px_#D29922]"></div>
              <span>AI Conversations (RAG)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              <span>Metadata Lookups</span>
            </div>
          </div>
        </div>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_HEALTH}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="timestamp" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F1115', 
                  border: '1px solid #30363D',
                  fontSize: '9px',
                  fontFamily: 'monospace'
                }}
              />
              <Area type="monotone" dataKey="botUsage" stroke="#D29922" strokeWidth={2} fill="#D29922" fillOpacity={0.08} />
              <Area type="monotone" dataKey="manualSearch" stroke="#848D97" fill="#848D97" fillOpacity={0.03} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
