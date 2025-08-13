import React from 'react';
import { mockTestimonials } from '@/lib/mockData';
import { Testimonial } from '@/types/index.d';

interface TestimonialsProps {
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            What Our Community Says
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real stories from customers making a positive environmental impact
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {mockTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-16 rounded-2xl bg-emerald-50 p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">10,000+</div>
              <div className="mt-2 text-sm font-medium text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">4.9/5</div>
              <div className="mt-2 text-sm font-medium text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">50,000+</div>
              <div className="mt-2 text-sm font-medium text-gray-600">kg CO₂ Saved Together</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      {/* Rating Stars */}
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Content */}
      <blockquote className="mt-4">
        <p className="text-gray-700 italic">"{testimonial.content}"</p>
      </blockquote>

      {/* Customer Info */}
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-sm font-medium text-emerald-600">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-500">{testimonial.location}</div>
        </div>
      </div>

      {/* Impact Stats */}
      {testimonial.impactStats && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-3">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-emerald-600">
                {testimonial.impactStats.co2Saved}kg
              </div>
              <div className="text-xs text-gray-600">CO₂ Saved</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-emerald-600">
                {testimonial.impactStats.ordersPlaced}
              </div>
              <div className="text-xs text-gray-600">Orders</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
