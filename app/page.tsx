'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RangoliCanvas from '../components/RangoliCanvas';
import BommalaKoluvu from '../components/BommalaKoluvu';
import ServicesShowcase from '../components/ServicesShowcase';
import CostEstimator from '../components/CostEstimator';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedServiceForEstimate, setSelectedServiceForEstimate] = useState<string>('Weddings');
  const [estimateTotal, setEstimateTotal] = useState<number | undefined>(undefined);

  const handleOpenBooking = (service?: string, total?: number) => {
    if (service) setSelectedServiceForEstimate(service);
    if (total) setEstimateTotal(total);
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-wedding-bg text-wedding-text selection:bg-wedding-marigold selection:text-white">
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      <Hero onOpenBooking={() => handleOpenBooking()} />
      <RangoliCanvas />
      <BommalaKoluvu />
      <ServicesShowcase onSelectService={(serviceName) => handleOpenBooking(serviceName)} />
      <CostEstimator
        preselectedService={selectedServiceForEstimate}
        onOpenBookingWithEstimate={(s, g, total) => handleOpenBooking(s, total)}
      />
      <Testimonials />
      <Footer />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedServiceForEstimate}
        initialEstimate={estimateTotal}
      />
    </main>
  );
}
