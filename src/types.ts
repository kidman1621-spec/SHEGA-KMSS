/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'Admin' | 'Editor';
export type Page = 'Dashboard' | 'Intelligence' | 'Knowledge' | 'Users' | 'Analytics' | 'Settings' | 'Notifications' | 'Evaluator' | 'Mentorship' | 'SOPs' | 'Rolodex' | 'Harvest' | 'Localization' | 'Search';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: Role;
  expertise: string[];
  department?: string;
  learningPath: string[]; // For mentorship pairing
  mentorshipRole: 'Mentor' | 'Mentee' | 'Hybrid';
  clearanceLevel: 1 | 2 | 3;
  badges: string[];
  knowledgeDomains: string[];
}

export type AssetType = 'SharePoint' | 'Notion' | 'File' | 'Nugget';
export type KnowledgeCategory = 'Research' | 'Operations' | 'Data & Intelligence' | 'Media' | 'Legacy';

export interface KnowledgeAsset {
  id: string;
  title: string;
  type: AssetType;
  category: KnowledgeCategory;
  uploaderId: string;
  uploaderName: string;
  createdAt: string;
  tags: string[];
  clearanceLevel: 1 | 2 | 3;
  isAiGenerated?: boolean;
  // Metadata pointers
  sourceUrl?: string;
  notionPageId?: string;
  department?: string;
  project?: string;
  // For Nugget/Direct Write
  content?: string;
  // For File Uploads
  fileName?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; id: string }[];
}

export interface RolodexContact {
  id: string;
  name: string;
  organization: string;
  expertiseTags: string[];
  reliabilityScore: number; // 0-100
  lastInteractionDate: string;
  clearance: 'Standard' | 'Elite';
  relationshipManagerId: string;
  notes?: string; // Private context
  interactionLog: InteractionLogEntry[];
}

export interface InteractionLogEntry {
  id: string;
  date: string;
  staffId: string;
  staffName: string;
  reportId?: string; // Reference to KnowledgeAsset
  summary: string;
}

export interface SOP {
  id: string;
  title: string;
  pillar: 'Journalism' | 'Research' | 'Operations';
  version: string;
  lastUpdated: string;
  approvedBy: string;
  content: {
    objective: string;
    roles: string[];
    steps: string[];
    checklist: string[];
  };
}

export interface NewsEvaluation {
  id: string;
  title: string;
  draft: string;
  timestamp: string;
  authorId: string;
  score: number; // 1-10
  feedback: {
    style: { status: 'Pass' | 'Fail' | 'Warning'; notes: string };
    factCheck: { status: 'Pass' | 'Fail' | 'Warning'; notes: string };
    localization: { status: 'Pass' | 'Fail' | 'Warning'; notes: string };
  };
}

export interface TrainingModule {
  id: string;
  sopId: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface MentorshipMatch {
  id: string;
  mentorId: string;
  menteeId: string;
  topic: string;
  status: 'Active' | 'Completed' | 'Pending';
  startDate: string;
  progress: number;
}

export type LanguageCode = 'en' | 'sw' | 'am' | 'om';

export interface LocalizationBrief {
  sourceAssetId: string;
  targetLanguage: LanguageCode;
  market: string;
  culturalNotes: string[];
  currencyConversion: string; // e.g., "1 ETB = 2.41 KES"
  readinessScore: number;
}

export interface LegacyInterview {
  question: string;
  answer: string;
}

export interface OffboardingReport {
  id: string;
  departingUserId: string;
  departureDate: string;
  contactsHandedOver: string[]; // Rolodex IDs
  tacitInsights: LegacyInterview[];
  assetAuditComplete: boolean;
}

export type KnowledgeGap = { term: string; volume: number; time: string };
export type Contributor = { name: string; assets: number; score: number };
export type SystemHealth = { timestamp: string; botUsage: number; manualSearch: number };

export interface NewsBriefing {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
  category: 'Internal' | 'Client Win' | 'System';
}

export interface KnowledgeHarvestSession {
  id: string;
  userId: string;
  status: 'In-Progress' | 'Completed' | 'Archived';
  steps: {
    contactTransfer: { status: 'Pending' | 'Completed'; entries: number };
    tacitInterview: { 
      status: 'Pending' | 'In-Progress' | 'Completed'; 
      transcript: { question: string; answer: string }[];
    };
    assetAudit: { status: 'Pending' | 'Completed'; links: string[] };
  };
  startedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'Pitch' | 'Sync' | 'Workshop' | 'Social';
  date: string; // ISO String
  startTime: string;
  endTime: string;
  attendees: string[];
  meetingLink: string;
  description: string;
}

export interface InnovationIdea {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  votes: number;
  comments: Comment[];
  createdAt: string;
  tags: string[];
}

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'Idea' | 'System' | 'SOP' | 'Message';
  isRead: boolean;
  createdAt: string;
  link?: string;
}
