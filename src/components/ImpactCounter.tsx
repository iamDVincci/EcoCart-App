import React from 'react';

interface ImpactCounterProps {
  value: number;
  label: string;
  unit: string;
}

const ImpactCounter: React.FC<ImpactCounterProps> = ({ value, label, unit }): JSX.Element => {
  // Basic counter, animation can be added later
  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-emerald-600">{value.toLocaleString()}</p>
      <p className="mt-1 text-sm font-medium text-gray-600">{label} ({unit})</p>
    </div>
  );
};

export default ImpactCounter;
