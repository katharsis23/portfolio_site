import React, { useState, useEffect, createContext, useContext} from 'react';


interface PerformanceContextType {
    // Defines the animation mode: true for "on", false for "off"
    // Still, we should consider adding more modes in the future,
    // via an enum as a custom PerformaceModeType
    mode: boolean; 
    setMode: (mode: boolean) => void;
    // Getters
    isAnimationOn: () => boolean;
    isHeavyVisualsOn: () => boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

interface PerformanceProviderProps {
    children: React.ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<boolean>(()=>{
        const savedMode = localStorage.getItem('performanceMode');
        if (savedMode !== null) {
            return JSON.parse(savedMode);
        }
        return false; // Default to "off"
    });
    const setPerformanceMode = (newMode: boolean) => {
        setMode(newMode);
        localStorage.setItem('performanceMode', JSON.stringify(newMode));
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-performance-mode', mode ? 'on' : 'off');
    }, [mode]);

    const value = {
        mode,
        setMode,
        isAnimationOn: () => mode,
        isHeavyVisualsOn: () => mode, 
    }

    return (
        //We should wrap our main App component with this provider in index.tsx,
        //so that we can use the context anywhere in the app
        <PerformanceContext.Provider value={value}>
        {children}
        </PerformanceContext.Provider>
  );
}

export const usePerformance = (): PerformanceContextType => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

