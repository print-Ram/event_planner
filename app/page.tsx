'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesShowcase from '../components/ServicesShowcase';
import CostEstimator from '../components/CostEstimator';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedServiceForEstimate, setSelectedServiceForEstimate] = useState<string>('Grand Weddings');
  const [estimateTotal, setEstimateTotal] = useState<number | undefined>(undefined);

  const handleOpenBooking = (service?: string, total?: number) => {
    if (service) setSelectedServiceForEstimate(service);
    if (total) setEstimateTotal(total);
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-wedding-bg text-wedding-text selection:bg-wedding-ruby selection:text-white relative pb-16 md:pb-0">
      {/* Top Fixed Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Section */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Services Showcase (7 Event Categories with Custom Illustrations) */}
      <ServicesShowcase onSelectService={(serviceName) => handleOpenBooking(serviceName)} />

      {/* Cost Estimator Section (Struck-out estimate & custom quote CTA) */}
      <CostEstimator
        preselectedService={selectedServiceForEstimate}
        onOpenBookingWithEstimate={(s, g, total) => handleOpenBooking(s, total)}
      />

      {/* Why Choose Us & Trust Signals Section */}
      <Testimonials />

      {/* Call to Action & Contact Pathway Section */}
      <CTASection onOpenBooking={() => handleOpenBooking()} />

      {/* Footer */}
      <Footer />

      {/* Quote Request Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedServiceForEstimate}
        initialEstimate={estimateTotal}
      />

      {/* Mobile Sticky Action Bar for High Conversion */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-wedding-border p-2.5 shadow-2xl flex items-center gap-2">
        <a
          href="https://wa.me/919502559333?text=Hi%20Sri%20Ram%20Events%2C%20I%20want%20to%20plan%20an%20event."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <a
          href="tel:+919502559333"
          className="flex-1 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-border text-wedding-text font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Phone className="w-4 h-4 text-wedding-ruby" />
          <span>Call Us</span>
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-wedding-kumkum to-wedding-ruby text-white font-black text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <Calendar className="w-4 h-4" />
          <span>Get Quote</span>
        </button>
      </div>
    </main>
  );
}
