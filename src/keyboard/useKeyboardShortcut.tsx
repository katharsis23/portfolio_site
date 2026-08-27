import { useEffect } from 'react';
import { KEYMAP } from './keyboard.config';
import { usePerformance } from '../system/performance';

// Binding KEYMAP to handlers
export type ActionHandlers = Partial<Record<keyof typeof KEYMAP, () => void>>;

export const useKeyboardShortcut = (handlers: ActionHandlers) => {
  const { isAnimationOn } = usePerformance();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // We DO NOT track inside fields wehere user is typing,
      //  like input, textarea, or contenteditable elements
      const target = event.target as HTMLElement;
      const isInputField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Escape is an exception since we need to leave the windows ;)
      if (isInputField && event.key !== 'Escape') {
        return;
      }

      // Searching for MAPS
      Object.entries(KEYMAP).forEach(([actionKey, config]) => {
        const matchesKey = config.keys.some(
          (k) => event.key.toLowerCase() === k.toLowerCase()
        );

        const matchesAlt = config.alt ? event.altKey : !event.altKey;

        if (matchesKey && matchesAlt) {
          const handler = handlers[actionKey as keyof typeof KEYMAP];
          if (handler) {
            event.preventDefault();
            handler();
          }
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
};
