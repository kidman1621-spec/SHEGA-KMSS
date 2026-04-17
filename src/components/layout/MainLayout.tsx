/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Shield, Bell, X, Check } from 'lucide-react';
import UserProfileModal from '../profile/UserProfileModal';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-bg-deep select-none">
      <UserProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
      {/* High Density Header */}
      <header className="h-12 border-b border-border-dim bg-bg-surface flex items-center px-4 justify-between flex-shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-[18px] h-[18px] bg-accent-orange rounded-[2px] flex items-center justify-center">
            <Shield className="w-3 h-3 text-bg-deep fill-current" />
          </div>
          <span className="text-sm font-extrabold tracking-tighter text-text-primary uppercase">
            Shega Intelligence Hub
          </span>
        </div>

        <div className="flex items-center gap-6 text-[11px] text-text-secondary font-medium">
          <div className="hidden lg:flex items-center gap-4">
            <span>SYS_HEALTH: <span className="text-accent-green font-bold">OPTIMAL</span></span>
            <div className="w-[1px] h-3 bg-border-dim"></div>
            <span>RAG_INDEX: <span className="text-text-primary font-bold">4.2M TOKENS</span></span>
            <div className="w-[1px] h-3 bg-border-dim"></div>
            <span>NETWORK: <span className="text-text-primary font-bold">PAN-AFRICAN MESH</span></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 hover:bg-bg-elevated rounded-lg transition-all relative group"
            >
              <Bell className={cn("w-5 h-5 transition-transform group-hover:rotate-12", isNotificationsOpen ? "text-accent-blue" : "text-text-secondary")} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent-orange text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-bg-surface scale-110">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-[320px] bg-bg-surface border border-border-dim rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-border-dim flex items-center justify-between bg-bg-elevated/30">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-text-primary">System Signals</h4>
                      <button 
                        onClick={clearAll}
                        className="text-[9px] font-black uppercase tracking-tighter text-text-secondary hover:text-accent-blue transition-colors"
                      >
                         Clear All
                      </button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-12 text-center space-y-2 opacity-50">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-border-dim" />
                          <p className="text-[10px] font-bold uppercase tracking-widest">No New Signals</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-border-dim/50">
                          {notifications.map((n) => (
                            <div 
                              key={n.id} 
                              onClick={() => markAsRead(n.id)}
                              className={cn(
                                "p-4 hover:bg-bg-elevated/50 transition-colors cursor-pointer group relative",
                                !n.read && "bg-accent-blue/5"
                              )}
                            >
                              {!n.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-blue" />}
                              <div className="flex justify-between items-start mb-1">
                                <span className={cn(
                                  "text-[10px] font-black uppercase tracking-tight",
                                  n.type === 'alert' ? 'text-accent-orange' : 'text-accent-blue'
                                )}>
                                  {n.title}
                                </span>
                                <span className="text-[8px] font-mono text-text-secondary opacity-50">
                                  {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed font-medium">
                                {n.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-4 bg-border-dim"></div>

          <button 
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-2 bg-bg-elevated px-2 py-0.5 rounded-full border border-border-dim hover:brightness-110 transition-all cursor-pointer group"
          >
            <img 
              src={user?.avatarUrl} 
              alt="" 
              className="w-6 h-6 rounded-full border border-border-dim group-hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green"></div>
            <span className="text-[10px] font-extrabold uppercase tracking-tight pr-2">
              {user?.name.split(' ')[0]} S. ({user?.role})
            </span>
          </button>
        </div>
      </header>
      
      {/* 3-Column Content Layout */}
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        
        <main className="flex-1 flex flex-col min-w-0 bg-bg-deep overflow-y-auto custom-scrollbar">
          <div className="p-6 flex-1">
            {children}
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
