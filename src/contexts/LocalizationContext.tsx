/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LanguageCode } from '../types';

interface LocalizationContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.analytics': 'Analytics',
    'nav.users': 'User Hub',
    'nav.userHub': 'User Hub',
    'nav.knowledge': 'Knowledge Base',
    'nav.knowledgeBase': 'Knowledge Base',
    'nav.intelligence': 'Shega Brain',
    'nav.shegaBrain': 'Shega Brain',
    'nav.evaluator': 'News Evaluator',
    'nav.newsEvaluator': 'News Evaluator',
    'nav.mentorship': 'Mentorship',
    'nav.sops': 'SOP Library',
    'nav.sopLibrary': 'SOP Library',
    'nav.sopQueue': 'SOP Queue',
    'nav.rolodex': 'Expert Contacts',
    'nav.expertContacts': 'Expert Contacts',
    'nav.expertRolodex': 'Expert Contacts',
    'nav.harvest': 'Harvest Unit',
    'nav.harvestUnit': 'Harvest Unit',
    'nav.localization': 'Localization',
    'nav.settings': 'Settings',
    'nav.search': 'Super Search',
    'nav.innovationHub': 'Innovation Hub',
    'nav.eventCalendar': 'Event Calendar',
    'nav.communicationWire': 'Communication Wire',
  },
  am: {
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.analytics': 'ትንታኔ',
    'nav.users': 'የተጠቃሚዎች ማዕከል',
    'nav.userHub': 'የተጠቃሚዎች ማዕከል',
    'nav.knowledge': 'የእውቀት ቋት',
    'nav.knowledgeBase': 'የእውቀት ቋት',
    'nav.intelligence': 'የሸጋ አእምሮ',
    'nav.shegaBrain': 'የሸጋ አእምሮ',
    'nav.evaluator': 'የዜና ገምጋሚ',
    'nav.newsEvaluator': 'የዜና ገምጋሚ',
    'nav.mentorship': 'የአማካሪነት መድረክ',
    'nav.sops': 'መመሪያዎች (SOP)',
    'nav.sopLibrary': 'መመሪያዎች (SOP)',
    'nav.sopQueue': 'የመመሪያዎች ወረፋ',
    'nav.rolodex': 'የባለሙያዎች ዝርዝር',
    'nav.expertContacts': 'የባለሙያዎች ዝርዝር',
    'nav.expertRolodex': 'የባለሙያዎች ዝርዝር',
    'nav.harvest': 'የእውቀት መሰብሰቢያ',
    'nav.harvestUnit': 'የእውቀት መሰብሰቢያ',
    'nav.localization': 'አካባቢያዊነት',
    'nav.settings': 'ቅንብሮች',
    'nav.search': 'ልዩ ፍለጋ',
    'nav.innovationHub': 'የፈጠራ ማዕከል',
    'nav.eventCalendar': 'የክስተት የቀን መቁጠሪያ',
    'nav.communicationWire': 'የመገናኛ መስመር',
  },
  sw: {
    'nav.dashboard': 'Dashibodi',
    'nav.analytics': 'Uchambuzi',
    'nav.users': 'Kitovu cha Watumiaji',
    'nav.knowledge': 'Hifadhidata ya Maarifa',
    'nav.intelligence': 'Ubongo wa Shega',
    'nav.evaluator': 'Tathmini ya Habari',
    'nav.mentorship': 'Ushauri',
    'nav.sops': 'Maktaba ya SOP',
    'nav.rolodex': 'Orodha ya Wataalam',
    'nav.harvest': 'Kitengo cha Mavuno',
    'nav.localization': 'Ujanibishaji',
    'nav.settings': 'Mipangilio',
    'nav.search': 'Utafutaji Mkuu',
  },
  om: {
    'nav.dashboard': 'Dasiboordii',
    'nav.analytics': 'Xiinxala',
    'nav.users': 'Giddu-gala Fayyadamootaa',
    'nav.knowledge': 'Kuusaa Beekumsaa',
    'nav.intelligence': 'Sammuu Shegaa',
    'nav.evaluator': 'Madaallii Oduu',
    'nav.mentorship': 'Leenjii',
    'nav.sops': 'Mana Kitaabaa SOP',
    'nav.rolodex': 'Tarree Ogeeyyii',
    'nav.harvest': 'Kuta Sassaabbi Beekumsa',
    'nav.localization': 'Naannawaa',
    'nav.settings': 'Sajoo',
    'nav.search': 'Barbaacha Ol-aanaa',
  }
};

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = (key: string) => {
    return TRANSLATIONS[language][key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}
