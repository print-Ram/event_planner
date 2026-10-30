'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageSquare,
  Calendar,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  Award,
  ShieldCheck,
  Clock,
  Heart,
  MapPin,
  Users,
  Check,
  Star,
  Camera,
  ArrowRight
} from 'lucide-react';
import { ServiceDetail, ServiceGalleryImage, SERVICES_DATA } from '../lib/servicesData';
import ServiceNavbar from './ServiceNavbar';
import BookingModal from './BookingModal';
import Footer from './Footer';

interface ServiceDetailViewProps {
  service: ServiceDetail;
}

export default function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(
    service.packageTiers.find((p) => p.popular)?.name || service.packageTiers[0]?.name || ''
  );
  const [activeImage, setActiveImage] = useState<ServiceGalleryImage | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const whatsappText = encodeURIComponent(
    `Hi Sri Ram Events, I am interested in planning "${service.name}" (${selectedPackage}) in Madanapalle / Tirupati / AP. Please share availability and customized quotation.`
  );

  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id);

  return (
    <div className="min-h-screen bg-wedding-bg text-wedding-text selection:bg-wedding-ruby selection:text-white relative">
      {/* Sticky Dedicated Navigation */}
      <ServiceNavbar onOpenBooking={() => setBookingOpen(true)} />

      {/* Main Container */}
      <main className="pt-28 pb-20 overflow-hidden">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-wedding-muted">
            <Link href="/" className="hover:text-wedding-kumkum transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-wedding-kumkum transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-wedding-kumkum">{service.name}</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative pb-16">
          {/* Ambient Glow Orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 left-1/4 w-96 h-96 rounded-full bg-wedding-marigold/15 blur-3xl" />
            <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-wedding-kumkum/10 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading & Cultural Badges */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Telugu & Regional Accent Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wedding-kumkum/10 border border-wedding-kumkum/20 text-wedding-kumkum text-xs font-black">
                    <Sparkles className="w-3.5 h-3.5 text-wedding-ruby" />
                    <span>{service.badge}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wedding-marigold/15 border border-wedding-marigold/30 text-wedding-amber text-xs font-extrabold">
                    <MapPin className="w-3.5 h-3.5 text-wedding-amber" />
                    <span>Madanapalle • Tirupati • Punganur • AP</span>
                  </span>
                </div>

                {/* Cultural Telugu Tagline */}
                <div className="text-sm font-extrabold text-wedding-kumkum tracking-wide">
                  {service.teluguTag}
                </div>

                {/* Main Category Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-wedding-text tracking-tight leading-[1.15]">
                  {service.name.split(' ')[0]}{' '}
                  <span className="kumkum-text">
                    {service.name.split(' ').slice(1).join(' ')}
                  </span>
                </h1>

                {/* Telugu Sub-Heading */}
                <h2 className="text-lg sm:text-xl font-bold text-wedding-text/80">
                  {service.teluguName} — {service.tagline}
                </h2>

                {/* Summary Copy */}
                <p className="text-base sm:text-lg font-medium leading-relaxed text-wedding-muted max-w-2xl mx-auto lg:mx-0">
                  {service.heroSummary}
                </p>

                {/* Quick Highlights Pills */}
                <div className="pt-2 grid sm:grid-cols-2 gap-3 text-left">
                  {service.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-2xl bg-wedding-ivory/80 border border-wedding-border/70 text-xs font-bold text-wedding-text"
                    >
                      <CheckCircle2 className="w-4 h-4 text-wedding-leaf shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-wedding-kumkum via-wedding-ruby to-wedding-marigold text-white font-black text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Request Quotation</span>
                  </button>

                  <a
                    href={`https://wa.me/919502559333?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <a
                    href="#packages"
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white border border-wedding-border text-wedding-text hover:border-wedding-kumkum hover:text-wedding-kumkum font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Packages</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-bold text-wedding-muted">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-wedding-leaf" />
                    <span>Town-Friendly Transparent Rates</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-wedding-ruby" />
                    <span>100% Punctual Setup Guarantee</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Master Hero Visual Card */}
              <div className="lg:col-span-5">
                <div className="wedding-card rounded-3xl p-3 border-2 border-wedding-turmeric/60 shadow-2xl relative overflow-hidden group">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
                    <img
                      src={service.masterBannerImage}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Floating Zoom / Inspection Trigger */}
                    <button
                      onClick={() =>
                        setActiveImage(
                          service.galleryImages[0] || {
                            url: service.masterBannerImage,
                            title: service.name,
                            subtitle: service.tagline,
                            tag: 'Featured',
                          }
                        )
                      }
                      className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md flex items-center gap-1 text-xs font-bold"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Enlarge Photo</span>
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white space-y-1">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-wedding-marigold text-black">
                        Authentic Real Execution
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold drop-shadow">
                        {service.galleryImages[0]?.title || service.name}
                      </h4>
                      <p className="text-[11px] text-white/80 line-clamp-2">
                        {service.galleryImages[0]?.subtitle || service.heroSummary}
                      </p>
                    </div>
                  </div>

                  {/* Micro Specs Bar */}
                  <div className="mt-3 p-3 rounded-xl bg-wedding-ivory border border-wedding-border flex items-center justify-between text-xs font-bold text-wedding-text">
                    <div>
                      <span className="text-wedding-muted block text-[10px] uppercase font-extrabold">Starting Guide</span>
                      <span className="text-wedding-kumkum font-black text-sm">{service.baseBudgetGuide}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-wedding-muted block text-[10px] uppercase font-extrabold">Typical Duration</span>
                      <span>{service.typicalDuration}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CULTURAL HERITAGE HIGHLIGHT BOX */}
        <section className="py-10 bg-gradient-to-r from-wedding-ivory via-wedding-roseBg to-wedding-ivory border-y border-wedding-border/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wedding-kumkum/10 text-wedding-kumkum text-xs font-black">
              <Award className="w-4 h-4 text-wedding-ruby" />
              <span>మన సంప్రదాయ గౌరవం • Our Cultural Reverence</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-wedding-text">
              Preserving Authentic Andhra Traditions With Modern Elegance
            </h3>
            <p className="text-sm sm:text-base text-wedding-muted font-medium leading-relaxed max-w-3xl mx-auto">
              {service.culturalHeritageNote}
            </p>
          </div>
        </section>

        {/* INTERACTIVE REALISTIC PHOTO GALLERY */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wedding-marigold/15 text-wedding-amber text-xs font-extrabold border border-wedding-marigold/30">
                <Camera className="w-4 h-4 text-wedding-amber" />
                <span>Visual Gallery & Sample Executions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-wedding-text tracking-tight">
                Realistic <span className="kumkum-text">Event Showcase</span>
              </h2>
              <p className="text-sm sm:text-base text-wedding-muted font-medium">
                Click on any photograph to view high-resolution details, floral styling, and ceremonial staging.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className="wedding-card rounded-2xl overflow-hidden cursor-pointer group border border-wedding-border hover:border-wedding-turmeric transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-wedding-ivory">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-white/90 text-wedding-kumkum shadow-lg flex items-center gap-1.5 text-xs font-extrabold">
                        <Maximize2 className="w-4 h-4" />
                        <span>Enlarge</span>
                      </div>
                    </div>
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-wedding-kumkum border border-wedding-kumkum/20 shadow-sm">
                      {img.tag}
                    </span>
                  </div>

                  <div className="p-4 space-y-1">
                    <h4 className="text-sm font-extrabold text-wedding-text group-hover:text-wedding-kumkum transition-colors">
                      {img.title}
                    </h4>
                    <p className="text-xs text-wedding-muted font-medium line-clamp-2">
                      {img.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DETAILED EXPLANATION & WHAT WE OFFER */}
        <section className="py-20 bg-wedding-ivory/50 border-t border-wedding-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Overview Story */}
            <div className="max-w-4xl mx-auto wedding-card rounded-3xl p-6 sm:p-10 border border-wedding-border shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-wedding-kumkum/10 text-wedding-kumkum">
                  <Award className="w-6 h-6 text-wedding-ruby" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-wedding-text">
                    Comprehensive Celebration Management
                  </h3>
                  <p className="text-xs font-bold text-wedding-muted">
                    How Sri Ram Events executes your {service.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-wedding-muted font-medium leading-relaxed">
                {service.detailedOverview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Itemized Offerings Cards */}
            <div>
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-wedding-kumkum">
                  Detailed Inclusions
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-wedding-text">
                  What’s Included In Our <span className="kumkum-text">{service.name}</span>
                </h3>
                <p className="text-sm text-wedding-muted">
                  Everything you need for a seamless, breathtaking experience without dealing with multiple fragmented vendors.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {service.offerings.map((offering, idx) => (
                  <div
                    key={idx}
                    className="wedding-card rounded-3xl p-6 sm:p-8 space-y-4 border border-wedding-border hover:border-wedding-turmeric transition-all"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-black text-wedding-kumkum tracking-wide">
                        {offering.teluguTitle}
                      </span>
                      <h4 className="text-xl font-black text-wedding-text">
                        {offering.title}
                      </h4>
                    </div>

                    <p className="text-sm text-wedding-muted font-medium leading-relaxed">
                      {offering.description}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-wedding-border/60">
                      {offering.bulletPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs font-bold text-wedding-text">
                          <Check className="w-3.5 h-3.5 text-wedding-leaf shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* TRANSPARENT PACKAGE TIERS */}
        <section id="packages" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-kumkum/10 text-wedding-kumkum text-xs font-black border border-wedding-kumkum/20">
                <Sparkles className="w-4 h-4 text-wedding-ruby" />
                <span>Transparent Town-Market Pricing</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-wedding-text tracking-tight">
                Package <span className="kumkum-text">Options</span>
              </h2>
              <p className="text-base text-wedding-muted font-medium">
                Tailored for Madanapalle, Tirupati, Punganur & surrounding towns. Every package can be customized to your exact requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {service.packageTiers.map((tier, idx) => {
                const isSelected = selectedPackage === tier.name;
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                      tier.popular
                        ? 'wedding-panel border-2 border-wedding-turmeric shadow-xl scale-100 lg:-translate-y-2'
                        : 'wedding-card border border-wedding-border shadow-md'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-wedding-kumkum to-wedding-ruby text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                        Most Popular Choice
                      </div>
                    )}

                    <div className="space-y-5">
                      <div>
                        <h4 className="text-2xl font-black text-wedding-text">{tier.name}</h4>
                        <p className="text-xs text-wedding-muted font-semibold mt-1">{tier.tagline}</p>
                      </div>

                      <div className="py-3 px-4 rounded-2xl bg-wedding-ivory border border-wedding-border">
                        <span className="text-[10px] uppercase font-black text-wedding-muted block">Budget Guide</span>
                        <span className="text-2xl font-black text-wedding-kumkum">{tier.priceRange}</span>
                      </div>

                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-black uppercase tracking-wider text-wedding-text block">
                          Included Features:
                        </span>
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs font-medium text-wedding-text">
                            <CheckCircle2 className="w-4 h-4 text-wedding-leaf shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 space-y-2.5">
                      <button
                        onClick={() => {
                          setSelectedPackage(tier.name);
                          setBookingOpen(true);
                        }}
                        className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 shadow flex items-center justify-center gap-2 ${
                          tier.popular
                            ? 'bg-gradient-to-r from-wedding-kumkum to-wedding-ruby text-white hover:shadow-xl hover:scale-105'
                            : 'bg-wedding-ivory hover:bg-wedding-kumkum hover:text-white text-wedding-text border border-wedding-border'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Select {tier.name}</span>
                      </button>

                      <a
                        href={`https://wa.me/919502559333?text=${encodeURIComponent(
                          `Hi Sri Ram Events, I am interested in booking the "${tier.name}" (${tier.priceRange}) for "${service.name}". Please share complete brochure and availability.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp for this Package</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 bg-wedding-ivory/50 border-t border-wedding-border/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-wedding-kumkum">
                Help & Clarifications
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-wedding-text">
                Frequently Asked <span className="kumkum-text">Questions</span>
              </h3>
              <p className="text-sm text-wedding-muted">
                Everything you need to know about booking Sri Ram Events for your celebration.
              </p>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="wedding-card rounded-2xl border border-wedding-border overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-wedding-text hover:text-wedding-kumkum transition-colors"
                    >
                      <span>{faq.question}</span>
                      <div className="p-1 rounded-lg bg-wedding-ivory text-wedding-kumkum">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 text-sm text-wedding-muted font-medium leading-relaxed border-t border-wedding-border/50 pt-3"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPLORE OTHER CELEBRATION CATEGORIES */}
        <section className="py-20 bg-white border-t border-wedding-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-wedding-kumkum">
                  More Services
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-wedding-text">
                  Explore Other Celebrations We Plan
                </h3>
              </div>
              <Link
                href="/#services"
                className="text-xs font-black text-wedding-kumkum hover:underline flex items-center gap-1"
              >
                <span>View All 7 Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.slice(0, 3).map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.id}`}
                  className="wedding-card rounded-2xl p-5 border border-wedding-border hover:border-wedding-turmeric transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-wedding-ivory">
                      <img
                        src={other.masterBannerImage}
                        alt={other.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full bg-white/95 text-wedding-kumkum">
                        {other.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-wedding-text group-hover:text-wedding-kumkum transition-colors">
                      {other.name}
                    </h4>

                    <p className="text-xs text-wedding-muted line-clamp-2">
                      {other.heroSummary}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-wedding-kumkum border-t border-wedding-border/60 mt-4">
                    <span>Explore Details & Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM FINAL HIGH CONVERSION BANNER */}
        <section className="py-20 bg-gradient-to-r from-wedding-kumkum via-[#7A1521] to-[#8B1E29] text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <span className="text-xs font-black tracking-wider uppercase px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-wedding-warmGold">
              మీ వేడుక... మా బాధ్యత
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">
              Ready to Plan Your <span className="text-wedding-warmGold">{service.name}?</span>
            </h2>
            <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto">
              Contact Sri Ram Events today. We will guide you with realistic budgeting, authentic decor ideas, and personalized care.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-wedding-marigold hover:bg-amber-400 text-wedding-text font-black text-sm shadow-xl hover:scale-105 transition-all"
              >
                <span>Request Custom Quote</span>
              </button>
              <a
                href="tel:+919502559333"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-wedding-warmGold" />
                <span>Call +91 95025 59333</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#111] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeImage.url}
                  alt={activeImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Lightbox Caption Bar */}
              <div className="p-5 bg-black/95 text-white space-y-1.5 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-wedding-marigold text-black">
                    {activeImage.tag}
                  </span>
                  <span className="text-xs text-white/60 font-semibold">Sri Ram Events Decor Portfolio</span>
                </div>
                <h4 className="text-base sm:text-lg font-black">{activeImage.title}</h4>
                <p className="text-xs sm:text-sm text-white/80 font-medium">{activeImage.subtitle}</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={service.name}
      />

      {/* MOBILE STICKY ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-wedding-border p-2.5 shadow-2xl flex items-center gap-2">
        <a
          href={`https://wa.me/919502559333?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <a
          href="tel:+919502559333"
          className="flex-1 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-border text-wedding-text font-black text-xs flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Phone className="w-4 h-4 text-wedding-ruby" />
          <span>Call Us</span>
        </a>

        <button
          onClick={() => setBookingOpen(true)}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-wedding-kumkum to-wedding-ruby text-white font-black text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <Calendar className="w-4 h-4" />
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  );
}
