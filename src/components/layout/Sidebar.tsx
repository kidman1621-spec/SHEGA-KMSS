/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart3, 
  Bell, 
  Settings,
  BrainCircuit,
  LogOut,
  ChevronRight,
  Search,
  Globe,
  Leaf,
  Moon,
  Sun,
  Lightbulb,
  Calendar,
  MessageCircle,
  LucideIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocalization();
  const { unreadCount } = useNotifications();

  const navGroups = [
    {
      label: 'Governance',
      items: [
        { icon: LayoutDashboard, label: t('nav.analytics'), path: '/analytics', rbac: 'ADMIN' },
        { icon: Settings, label: t('nav.sopLibrary'), path: '/sops' },
        { icon: Bell, label: t('nav.sopQueue'), path: '/notifications', badge: unreadCount, rbac: 'ADMIN' },
        { icon: Users, label: t('nav.userHub'), path: '/users', rbac: 'ADMIN' },
      ]
    },
    {
      label: 'Intelligence',
      items: [
        { icon: BrainCircuit, label: t('nav.shegaBrain'), path: '/intelligence' },
        { icon: MessageCircle, label: t('nav.communicationWire'), path: '/wire' },
        { icon: Lightbulb, label: t('nav.innovationHub'), path: '/innovation' },
        { icon: Calendar, label: t('nav.eventCalendar'), path: '/calendar' },
      ]
    },
    {
      label: 'Repository',
      items: [
        { icon: BookOpen, label: t('nav.knowledgeBase'), path: '/knowledge' },
        { icon: Users, label: t('nav.expertContacts'), path: '/rolodex' },
        { icon: Globe, label: t('nav.localization'), path: '/localization' },
      ]
    },
    {
      label: 'Advanced',
      items: [
        { icon: BarChart3, label: t('nav.newsEvaluator'), path: '/evaluator' },
        { icon: Leaf, label: t('nav.harvestUnit'), path: '/harvest' },
        { icon: Users, label: t('nav.mentorship'), path: '/mentorship' },
        { icon: Settings, label: t('nav.settings'), path: '/settings', rbac: 'ADMIN' },
      ]
    }
  ];

  const { user } = useAuth();
  const isAdmin = user?.role === 'Governance Admin' || user?.role === 'Admin';

  return (
    <aside className="w-[200px] border-r border-border-dim bg-bg-surface p-4 flex flex-col gap-6 flex-shrink-0 relative z-40">
      <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 flex-1">
        {navGroups.map((group, i) => {
          const visibleItems = group.items.filter(item => {
            if (item.rbac === 'ADMIN') return isAdmin;
            return true;
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={i} className="flex flex-col gap-2">
              <h4 className="text-[10px] uppercase tracking-widest text-text-secondary font-extrabold px-1">
                {group.label}
              </h4>
              <div className="flex flex-col gap-0.5">
                {visibleItems.map((item, j) => (
                  <NavLink 
                    key={j}
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all group",
                      isActive 
                        ? "bg-accent-blue/10 text-accent-blue" 
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110")} />
                    <span className="flex-1 truncate tracking-tight">{item.label}</span>
                    {item.rbac && (
                      <span className={cn(
                        "text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-widest",
                        item.rbac === 'ADMIN' ? "text-accent-orange bg-accent-orange/10" : "text-accent-blue bg-accent-blue/10"
                      )}>
                        {item.rbac}
                      </span>
                    )}
                    {item.badge && !item.rbac && (
                      <span className="text-[9px] bg-accent-blue text-white px-1.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border-dim pt-4 space-y-1">
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2 text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-all group"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 transition-transform group-hover:rotate-12" /> : <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12" />}
          <span className="flex-1 text-left">{theme === 'dark' ? 'Light Mode' : 'Night Mode'}</span>
        </button>
        <button 
          onClick={() => logout()}
          className="flex items-center gap-3 w-full px-3 py-2 text-[13px] font-medium text-text-secondary hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all group"
        >
          <LogOut className="w-4 h-4" />
          <span className="flex-1 text-left font-bold uppercase tracking-widest text-[10px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
