import React from 'react';
import { useImpact } from '@/contexts/ImpactContext.tsx';
import ImpactCounter from '@/components/ImpactCounter.tsx';

const Impact: React.FC = () => {
  const { metrics } = useImpact();
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Impact Metrics</h1>
      <p className="mt-2 max-w-2xl text-gray-600">Track community sustainability achievements.</p>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        <ImpactCounter value={metrics.co2SavedKg} label="CO₂ Saved" unit="kg" />
        <ImpactCounter value={metrics.treesPlanted} label="Trees Planted" unit="" />
        <ImpactCounter value={metrics.plasticReducedKg} label="Plastic Reduced" unit="kg" />
        <ImpactCounter value={metrics.waterSavedLiters} label="Water Saved" unit="L" />
      </div>
    </div>
  );
};

export default Impact;
