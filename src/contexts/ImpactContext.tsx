import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ImpactMetrics } from '@/types/index.d';

interface ImpactContextType {
  metrics: ImpactMetrics;
  updateMetrics: (newMetrics: Partial<ImpactMetrics>) => void;
}

const ImpactContext = createContext<ImpactContextType | undefined>(undefined);

const initialMetrics: ImpactMetrics = {
  co2SavedKg: 12450,
  treesPlanted: 3210,
  plasticReducedKg: 860,
  waterSavedLiters: 1200000,
};

export const ImpactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<ImpactMetrics>(initialMetrics);

  const updateMetrics = (newMetrics: Partial<ImpactMetrics>) => {
    setMetrics(prev => ({ ...prev, ...newMetrics }));
  };

  return (
    <ImpactContext.Provider value={{ metrics, updateMetrics }}>
      {children}
    </ImpactContext.Provider>
  );
};

export const useImpact = (): ImpactContextType => {
  const context = useContext(ImpactContext);
  if (!context) {
    throw new Error('useImpact must be used within an ImpactProvider');
  }
  return context;
};
