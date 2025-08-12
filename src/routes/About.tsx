import React from 'react';
import { useImpact } from '@/contexts/ImpactContext.tsx';
import ImpactCounter from '@/components/ImpactCounter.tsx';

const About: React.FC = () => {
  const { metrics } = useImpact();

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      bio: "Environmental engineer passionate about sustainable commerce and climate action.",
      image: "/mock-images/team-sarah.jpg"
    },
    {
      name: "Marcus Johnson",
      role: "CTO",
      bio: "Full-stack developer focused on building scalable platforms for positive impact.",
      image: "/mock-images/team-marcus.jpg"
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Sustainability",
      bio: "Climate scientist ensuring our impact metrics are accurate and meaningful.",
      image: "/mock-images/team-elena.jpg"
    },
    {
      name: "David Kim",
      role: "Product Manager",
      bio: "UX advocate making sustainable shopping accessible and enjoyable for everyone.",
      image: "/mock-images/team-david.jpg"
    }
  ];

  const values = [
    {
      icon: "🌱",
      title: "Environmental First",
      description: "Every product decision is made with environmental impact as the primary consideration."
    },
    {
      icon: "📊",
      title: "Transparency",
      description: "We provide clear, accurate data about the environmental impact of every purchase."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building a community of conscious consumers who care about our planet's future."
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "Continuously improving our platform and expanding sustainable product options."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "EcoCart Founded",
      description: "Started with a mission to make sustainable shopping mainstream"
    },
    {
      year: "2024",
      title: "1000+ Products",
      description: "Reached our first milestone of curated sustainable products"
    },
    {
      year: "2024",
      title: "Carbon Neutral Shipping",
      description: "Implemented 100% carbon-neutral shipping for all orders"
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanding to serve customers across North America and Europe"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-emerald-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About EcoCart
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
            We're on a mission to make sustainable shopping accessible, transparent, and impactful. 
            Every purchase you make contributes to a healthier planet.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-600">
                EcoCart exists to accelerate the transition to sustainable commerce by making eco-friendly 
                products easily discoverable and their environmental impact clearly measurable.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                We believe that when consumers have access to transparent environmental data and sustainable 
                alternatives, they naturally make choices that benefit our planet. Our platform eliminates 
                the guesswork from sustainable shopping.
              </p>
              <div className="mt-8">
                <a
                  href="/products"
                  className="inline-flex items-center rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Start Shopping Sustainably
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg bg-emerald-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-2xl font-bold text-emerald-800">One Planet</h3>
                  <p className="text-emerald-700">Infinite Possibilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Collective Impact</h2>
            <p className="mt-4 text-lg text-gray-600">
              Together with our community, we're creating meaningful environmental change
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <ImpactCounter 
              value={metrics.co2SavedKg} 
              label="CO₂ Saved" 
              unit="kg" 
            />
            <ImpactCounter 
              value={metrics.treesPlanted} 
              label="Trees Planted" 
              unit="trees" 
            />
            <ImpactCounter 
              value={metrics.plasticReducedKg} 
              label="Plastic Reduced" 
              unit="kg" 
            />
            <ImpactCounter 
              value={metrics.waterSavedLiters} 
              label="Water Saved" 
              unit="liters" 
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Journey</h2>
            <p className="mt-4 text-lg text-gray-600">
              Key milestones in our mission to revolutionize sustainable commerce
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold text-emerald-600">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0">
                  <div className="h-4 w-4 rounded-full bg-emerald-600"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              Passionate individuals working to create a more sustainable future
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square w-full rounded-lg bg-gray-200 mb-4 flex items-center justify-center">
                  <div className="text-4xl">👨‍💼</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-emerald-600 font-medium">{member.role}</p>
                <p className="mt-2 text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Commitments */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">Our Commitments</h2>
            <p className="mt-4 text-xl text-emerald-100">
              We hold ourselves accountable to the highest environmental standards
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-lg font-semibold text-white">Carbon Negative by 2026</h3>
                <p className="text-emerald-100">Removing more carbon than we emit through reforestation and clean energy</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="text-lg font-semibold text-white">Zero Waste Packaging</h3>
                <p className="text-emerald-100">100% recyclable or compostable packaging materials</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold text-white">Fair Trade Partners</h3>
                <p className="text-emerald-100">Working only with suppliers who prioritize fair labor and environmental practices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Join Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600">
            Every sustainable choice matters. Start making a positive impact today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/products"
              className="inline-flex items-center rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Shop Sustainable Products
            </a>
            <a
              href="/impact"
              className="inline-flex items-center rounded-md border border-emerald-600 px-6 py-3 text-base font-medium text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              View Our Impact
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
