import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { NavigationProvider, PerformanceProvider } from './system';
import { ThemeProvider } from './themes';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PerformanceProvider>
      <ThemeProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </ThemeProvider>
    </PerformanceProvider>
  </StrictMode>
);
