import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  portfolioEng,
  portfolioUkr,
  type PortfolioContent,
} from '../content/portfolio';
import { UI_STRINGS } from "../content/uiStrings";

export type LanguageId = 'en' | 'uk';

interface LanguageContextType {
  /** Current language id. */
  lang: LanguageId;
  /** Set the active language (persisted to localStorage). */
  setLang: (lang: LanguageId) => void;
  /** Toggle between English and Ukrainian. */
  toggleLang: () => void;
  /** Ready-to-render portfolio content for the active language. */
  content: PortfolioContent;
  /** Localised UI chrome strings (settings, waybar, hero actions, …). */
  t: (key: string) => string;
  /** Localised workspace label for a canonical workspace id. */
  tWorkspace: (id: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<LanguageId>(() => {
    const saved = localStorage.getItem('portfolio_language');
    return saved === 'uk' ? 'uk' : 'en';
  });

  const changeLang = useCallback((next: LanguageId) => {
    setLang(next);
    localStorage.setItem('portfolio_language', next);
    document.documentElement.setAttribute('lang', next);
  }, []);

  const toggleLang = useCallback(() => {
    changeLang(lang === 'en' ? 'uk' : 'en');
  }, [lang, changeLang]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const content = lang === 'uk' ? portfolioUkr : portfolioEng;

  const wsKey = (id: string): keyof typeof UI_STRINGS.en | null => {
    switch (id) {
      case 'about':
        return 'wsAbout';
      case 'experience':
        return 'wsExperience';
      case 'skills':
        return 'wsSkills';
      case 'projects':
        return 'wsProjects';
      case 'education':
        return 'wsEducation';
      case 'contact':
        return 'wsContact';
      default:
        return null;
    }
  };

  const value: LanguageContextType = {
    lang,
    setLang: changeLang,
    toggleLang,
    content,
    t: (key) => (UI_STRINGS[lang] as Record<string, string>)[key] ?? key,
    tWorkspace: (id) => {
      const k = wsKey(id);
      return k ? UI_STRINGS[lang][k] : id;
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

