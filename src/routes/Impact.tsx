import React from 'react';
import { useImpact } from '@/contexts/ImpactContext.tsx';
import ImpactCounter from '@/components/ImpactCounter.tsx';

const Impact: React.FC = () => {
  const { metrics } = useImpact();

  const impactAreas = [
    {
      title: "Carbon Reduction",
      description: "Every eco-friendly purchase helps reduce CO₂ emissions and combat climate change.",
      icon: "🌱",
      color: "bg-green-100 text-green-800",
      value: metrics.co2SavedKg,
      unit: "kg CO₂",
      label: "Carbon Saved"
    },
    {
      title: "Reforestation",
      description: "Supporting products that contribute to tree planting initiatives worldwide.",
      icon: "🌳",
      color: "bg-emerald-100 text-emerald-800",
      value: metrics.treesPlanted,
      unit: "trees",
      label: "Trees Planted"
    },
    {
      title: "Plastic Reduction",
      description: "Choosing alternatives to single-use plastics for a cleaner ocean and planet.",
      icon: "♻️",
      color: "bg-blue-100 text-blue-800",
      value: metrics.plasticReducedKg,
      unit: "kg",
      label: "Plastic Reduced"
    },
    {
      title: "Water Conservation", 
      description: "Supporting water-efficient products and sustainable manufacturing processes.",
      icon: "💧",
      color: "bg-cyan-100 text-cyan-800",
      value: metrics.waterSavedLiters,
      unit: "liters",
      label: "Water Saved"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Collective Environmental Impact
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-emerald-100">
            Together, we're creating positive change for our planet. Every purchase contributes to a more sustainable future.
          </p>
        </div>
      </section>

      {/* Main Metrics */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {impactAreas.map((area) => (
              <div key={area.title} className="text-center">
                <div className="text-5xl mb-4">{area.icon}</div>
                <ImpactCounter 
                  value={area.value} 
                  label={area.label} 
                  unit={area.unit} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Impact Areas */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">How We Make a Difference</h2>
            <p className="mt-4 text-lg text-gray-600">
              Every product in our marketplace is carefully selected for its positive environmental impact
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {impactAreas.map((area) => (
              <div key={area.title} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{area.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{area.title}</h3>
                    <p className="text-gray-600 mb-4">{area.description}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${area.color}`}>
                      {area.value.toLocaleString()} {area.unit} saved
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">2025 Sustainability Goals</h2>
            <p className="mt-4 text-lg text-gray-600">
              Together, we're working towards ambitious environmental targets
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">50,000 kg CO₂</h3>
              <p className="text-gray-600">Carbon emissions saved through sustainable product choices</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((metrics.co2SavedKg / 50000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {((metrics.co2SavedKg / 50000) * 100).toFixed(1)}% Complete
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">10,000 Trees</h3>
              <p className="text-gray-600">Trees planted through our reforestation partnerships</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((metrics.treesPlanted / 10000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {((metrics.treesPlanted / 10000) * 100).toFixed(1)}% Complete
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2M Liters</h3>
              <p className="text-gray-600">Water conserved through sustainable manufacturing</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((metrics.waterSavedLiters / 2000000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {((metrics.waterSavedLiters / 2000000) * 100).toFixed(1)}% Complete
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to Increase Your Impact?
          </h2>
          <p className="mt-4 text-xl text-emerald-100">
            Every sustainable choice matters. Start shopping with purpose today.
          </p>
          <div className="mt-8">
            <a
              href="/products"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-medium text-emerald-600 shadow-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
            >
              Shop Sustainable Products
              <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
