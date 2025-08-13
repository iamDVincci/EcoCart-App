import React, { useState } from 'react';
import { NewsletterSignup } from '@/types/index.d';

interface NewsletterProps {
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    weekly: true,
    newProducts: true,
    sustainability: true,
    deals: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const signupData: NewsletterSignup = {
      email: email.trim(),
      preferences,
    };
    
    console.log('Newsletter signup:', signupData);
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section className={`bg-emerald-600 py-16 ${className}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
              Welcome to the Community!
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              You'll receive your first sustainability update soon. Thank you for joining our mission!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-emerald-600 py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Stay Updated on Sustainability
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            Get the latest eco-friendly products, impact updates, and sustainability tips delivered to your inbox
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            {/* Email Input */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
                  placeholder="Enter your email address"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-shrink-0 rounded-lg bg-emerald-800 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {/* Preferences */}
            <div className="mt-6 text-left">
              <p className="mb-3 text-sm font-medium text-emerald-100">
                What would you like to receive?
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.weekly}
                    onChange={(e) => setPreferences(prev => ({ ...prev, weekly: e.target.checked }))}
                    className="h-4 w-4 rounded border-emerald-300 bg-emerald-100 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-emerald-600"
                  />
                  <span className="ml-2 text-sm text-emerald-100">Weekly sustainability tips</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.newProducts}
                    onChange={(e) => setPreferences(prev => ({ ...prev, newProducts: e.target.checked }))}
                    className="h-4 w-4 rounded border-emerald-300 bg-emerald-100 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-emerald-600"
                  />
                  <span className="ml-2 text-sm text-emerald-100">New product announcements</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.sustainability}
                    onChange={(e) => setPreferences(prev => ({ ...prev, sustainability: e.target.checked }))}
                    className="h-4 w-4 rounded border-emerald-300 bg-emerald-100 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-emerald-600"
                  />
                  <span className="ml-2 text-sm text-emerald-100">Personal impact reports</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.deals}
                    onChange={(e) => setPreferences(prev => ({ ...prev, deals: e.target.checked }))}
                    className="h-4 w-4 rounded border-emerald-300 bg-emerald-100 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-emerald-600"
                  />
                  <span className="ml-2 text-sm text-emerald-100">Exclusive eco-friendly deals</span>
                </label>
              </div>
            </div>

            {/* Privacy Notice */}
            <p className="mt-4 text-xs text-emerald-200">
              We respect your privacy. Unsubscribe at any time. By subscribing, you agree to our{' '}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
              .
            </p>
          </form>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Early Access</h3>
              <p className="mt-2 text-sm text-emerald-100">
                Be the first to discover new sustainable products and brands
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Impact Tracking</h3>
              <p className="mt-2 text-sm text-emerald-100">
                Monthly reports on your personal environmental impact
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Expert Tips</h3>
              <p className="mt-2 text-sm text-emerald-100">
                Practical advice for living more sustainably every day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
