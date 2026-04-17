/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { KnowledgeProvider } from './contexts/KnowledgeContext';
import { LocalizationProvider } from './contexts/LocalizationContext';
import { NotificationProvider } from './contexts/NotificationContext';
import MainLayout from './components/layout/MainLayout';
import AnalyticsDashboard from './components/dashboard/AnalyticsDashboard';
import UserManagement from './components/governance/UserManagement';
import KnowledgeRepository from './components/knowledge/KnowledgeRepository';
import ShegaBrain from './components/intelligence/ShegaBrain';
import NewsEvaluator from './components/intelligence/NewsEvaluator';
import MentorshipPortal from './components/growth/MentorshipPortal';
import SOPLibrary from './components/knowledge/SOPLibrary';
import Rolodex from './components/intelligence/Rolodex';
import InnovationHub from './components/intelligence/InnovationHub';
import EventCalendar from './components/growth/EventCalendar';
import CommunicationWire from './components/intelligence/WireChat';
import HarvestModule from './components/growth/HarvestModule';
import LocalizationSuite from './components/growth/LocalizationSuite';
import SearchHub from './components/search/SearchHub';
import SOPQueue from './components/governance/SOPQueue';
import SettingsPage from './components/settings/SettingsPage';
import LoginPage from './components/auth/LoginPage';
import { AnimatePresence, motion } from 'motion/react';

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function ProtectedRoute({ children, isAdminOnly }: { children: React.ReactNode, isAdminOnly?: boolean }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  
  const isAdmin = user.role === 'Governance Admin' || user.role === 'Admin';
  if (isAdminOnly && !isAdmin) return <Navigate to="/" replace />;

  return <MainLayout>{children}</MainLayout>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <LocalizationProvider>
            <KnowledgeProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <PageWrapper>
                        <DashboardRedirect />
                      </PageWrapper>
                    </ProtectedRoute>
                  } />
                  <Route path="/analytics" element={<ProtectedRoute isAdminOnly><PageWrapper><AnalyticsDashboard /></PageWrapper></ProtectedRoute>} />
                  <Route path="/users" element={<ProtectedRoute isAdminOnly><PageWrapper><UserManagement /></PageWrapper></ProtectedRoute>} />
                  <Route path="/knowledge" element={<ProtectedRoute><PageWrapper><KnowledgeRepository /></PageWrapper></ProtectedRoute>} />
                  <Route path="/intelligence" element={<ProtectedRoute><PageWrapper><ShegaBrain /></PageWrapper></ProtectedRoute>} />
                  <Route path="/wire" element={<ProtectedRoute><PageWrapper><CommunicationWire /></PageWrapper></ProtectedRoute>} />
                  <Route path="/innovation" element={<ProtectedRoute><PageWrapper><InnovationHub /></PageWrapper></ProtectedRoute>} />
                  <Route path="/calendar" element={<ProtectedRoute><PageWrapper><EventCalendar /></PageWrapper></ProtectedRoute>} />
                  <Route path="/evaluator" element={<ProtectedRoute><PageWrapper><NewsEvaluator /></PageWrapper></ProtectedRoute>} />
                  <Route path="/mentorship" element={<ProtectedRoute><PageWrapper><MentorshipPortal /></PageWrapper></ProtectedRoute>} />
                  <Route path="/sops" element={<ProtectedRoute><PageWrapper><SOPLibrary /></PageWrapper></ProtectedRoute>} />
                  <Route path="/rolodex" element={<ProtectedRoute><PageWrapper><Rolodex /></PageWrapper></ProtectedRoute>} />
                  <Route path="/harvest" element={<ProtectedRoute><PageWrapper><HarvestModule /></PageWrapper></ProtectedRoute>} />
                  <Route path="/localization" element={<ProtectedRoute><PageWrapper><LocalizationSuite /></PageWrapper></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><PageWrapper><SOPQueue /></PageWrapper></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><PageWrapper><SettingsPage /></PageWrapper></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </KnowledgeProvider>
          </LocalizationProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function DashboardRedirect() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Governance Admin' || user?.role === 'Admin';
  
  if (isAdmin) {
    return <AnalyticsDashboard />;
  }
  
  return <KnowledgeRepository />;
}

