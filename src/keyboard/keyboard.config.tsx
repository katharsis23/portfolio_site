import { type ShortcutDefinition } from './keyboard.types';

export const KEYMAP: Record<string, ShortcutDefinition> = {
  // --- Navigation ---
  NAV_ABOUT: {
    id: 'NAV_ABOUT',
    keys: ['1'],
    description: 'Navigate to About',
  },
  NAV_EXPERIENCE: {
    id: 'NAV_EXPERIENCE',
    keys: ['2'],
    description: 'Navigate to Experience',
  },
  NAV_SKILLS: {
    id: 'NAV_SKILLS',
    keys: ['3'],
    description: 'Navigate to Skills',
  },
  NAV_EDUCATION: {
    id: 'NAV_EDUCATION',
    keys: ['5'],
    description: 'Navigate to Education',
  },
  NAV_PROJECTS: {
    id: 'NAV_PROJECTS',
    keys: ['4'],
    description: 'Navigate to Projects',
  },
  NAV_CONTACT: {
    id: 'NAV_CONTACT',
    keys: ['6'],
    description: 'Navigate to Contact',
  },
  NAV_NEXT: {
    id: 'NAV_NEXT',
    keys: ['ArrowRight'],
    description: 'Next Workspace',
  },
  NAV_PREV: {
    id: 'NAV_PREV',
    keys: ['ArrowLeft'],
    description: 'Previous Workspace',
  },

  // --- Utillities ---
  TOGGLE_TERMINAL: {
    id: 'TOGGLE_TERMINAL',
    keys: ['t'],
    alt: true, // Alt + t
    description: 'Toggles Terminal',
  },

  TOGGLE_HELP: {
    id: 'TOGGLE_HELP',
    keys: ['/'],
    alt: true, // Alt + h
    description: 'Shortcut Help',
  },
  CLOSE_ALL: {
    id: 'CLOSE_ALL',
    keys: ['Escape'],
    description: 'Closes all active modals',
  },
};
