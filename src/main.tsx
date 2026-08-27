import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  NavigationProvider,
  PerformanceProvider,
  LanguageProvider,
  PlayerProvider,
} from './system';
import { ThemeProvider } from './themes';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PerformanceProvider>
      <LanguageProvider>
        <PlayerProvider>
          <ThemeProvider>
            <NavigationProvider>
              <App />
            </NavigationProvider>
          </ThemeProvider>
        </PlayerProvider>
      </LanguageProvider>
    </PerformanceProvider>
  </StrictMode>
);
