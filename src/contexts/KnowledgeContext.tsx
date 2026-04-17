/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { KnowledgeAsset, KnowledgeCategory } from '../types';

interface KnowledgeContextType {
  assets: KnowledgeAsset[];
  addAsset: (asset: Omit<KnowledgeAsset, 'id' | 'createdAt'>) => void;
  deleteAsset: (id: string) => void;
  getAssetsByCategory: (category: KnowledgeCategory) => KnowledgeAsset[];
}

const KnowledgeContext = createContext<KnowledgeContextType | undefined>(undefined);

export const KnowledgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<KnowledgeAsset[]>(() => {
    const saved = localStorage.getItem('shih_knowledge_assets');
    return saved ? JSON.parse(saved) : DEFAULT_ASSETS;
  });

  useEffect(() => {
    localStorage.setItem('shih_knowledge_assets', JSON.stringify(assets));
  }, [assets]);

  const addAsset = (newAsset: Omit<KnowledgeAsset, 'id' | 'createdAt'>) => {
    const asset: KnowledgeAsset = {
      ...newAsset,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setAssets(prev => [asset, ...prev]);
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const getAssetsByCategory = (category: KnowledgeCategory) => {
    return assets.filter(a => a.category === category);
  };

  return (
    <KnowledgeContext.Provider value={{ assets, addAsset, deleteAsset, getAssetsByCategory }}>
      {children}
    </KnowledgeContext.Provider>
  );
};

export const useKnowledge = () => {
  const context = useContext(KnowledgeContext);
  if (!context) throw new Error('useKnowledge must be used within KnowledgeProvider');
  return context;
};

const DEFAULT_ASSETS: KnowledgeAsset[] = [
  {
    id: 'sih-jica-001',
    title: 'JICA Startup Ecosystem Mapping Report - Ethiopia',
    type: 'File',
    category: 'Research',
    fileName: 'jica_mapping_ethiopia_2024.pdf',
    uploaderId: 'admin-1',
    uploaderName: 'Kidman Shega',
    createdAt: '2025-11-15T10:00:00Z',
    tags: ['JICA', 'Ecosystem', 'Startups', 'Ethiopia'],
    clearanceLevel: 2,
    content: `Comprehensive mapping of Ethiopia's tech ecosystem. Identified 450+ active startups. Key hubs: Addis Ababa, Dire Dawa. 
Top sectors: Fintech (18%), Agritech (14%), E-commerce (12%). 
Maturity level: 65% are in Seed stage. 
Key challenges: Access to FX, regulatory silos, and internet connectivity. 
Recommendations: Implement Startup Act 2.0 and establish sectoral sandboxes.`
  },
  {
    id: 'sih-gates-002',
    title: 'Gates Foundation DFS Project Overview',
    type: 'SharePoint',
    category: 'Research',
    sourceUrl: 'https://shegamedia.sharepoint.com/sites/Gates-DFS',
    uploaderId: 'admin-1',
    uploaderName: 'Kidman Shega',
    createdAt: '2026-01-10T14:30:00Z',
    tags: ['DFS', 'Financial Inclusion', 'Gates Foundation'],
    clearanceLevel: 3,
    department: 'Strategic Projects',
    project: 'DFS Acceleration',
    content: `Strategic initiative funded by the Gates Foundation to accelerate Digital Financial Services (DFS) in Ethiopia. 
Goal: Increase account ownership from 45% to 75% by 2030. 
Focus areas: G2P payments digitization, merchant acquisition, and agent network expansion. 
Current status: Phase 1 completed. Interoperability between major banks and mobile money (Telebirr/CBE Birr) reached 90% technical ready state.`
  },
  {
    id: 'sih-fintech-003',
    title: 'Ethiopian Fintech Regulations - NBE 2026',
    type: 'Nugget',
    category: 'Data & Intelligence',
    content: `New directive from the National Bank of Ethiopia (NBE) regarding Payment Instrument Issuers. 
Key updates: 
1. Minimum capital requirement for local fintechs set at 50M ETB. 
2. Foreign participation capped at 49% unless explicitly waived for Strategic Interest sectors. 
3. Sandbox participation mandatory for all crypto-adjacent or unconventional payment services. 
4. Cloud data sovereignty: All transaction logs MUST reside on servers physically located within Ethiopian borders.`,
    uploaderId: 'editor-1',
    uploaderName: 'Expert Analyst',
    createdAt: '2026-04-10T09:15:00Z',
    tags: ['Ethiopia', 'Fintech', 'NBE', 'Regulation'],
    clearanceLevel: 1,
  }
];
