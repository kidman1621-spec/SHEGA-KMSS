/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: Role) => void;
  updateProfile: (updates: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for profiles
const MOCK_ADMIN: User = {
  id: 'ad-01',
  name: 'Kidman Shega',
  email: 'kidman1621@gmail.com',
  role: 'Admin',
  department: 'Leadership',
  expertise: ['Fintech', 'Digital Economy', 'Policy'],
  learningPath: ['Leadership', 'Regional Governance'],
  mentorshipRole: 'Mentor',
  clearanceLevel: 3,
  badges: ['Founder', 'Expert Analyst'],
  knowledgeDomains: ['Fintech', 'Digital Economy', 'Policy'],
  avatarUrl: 'https://picsum.photos/seed/kidman/100',
};

const MOCK_EDITOR: User = {
  id: 'ed-01',
  name: 'Editor Shega',
  email: 'editor@shega.org',
  role: 'Editor',
  department: 'Journalism',
  expertise: ['Writing', 'Local Markets'],
  learningPath: ['Data Analytics'],
  mentorshipRole: 'Mentee',
  clearanceLevel: 2,
  badges: ['Verified'],
  knowledgeDomains: ['Media'],
  avatarUrl: 'https://picsum.photos/seed/editor/100',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sih_session');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, role: Role = 'Editor') => {
    // Simulated login logic
    const template = role === 'Admin' ? MOCK_ADMIN : MOCK_EDITOR;
    const newUser = {
      ...template,
      email,
    };
    setUser(newUser);
    localStorage.setItem('sih_session', JSON.stringify(newUser));
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem('sih_session', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sih_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
