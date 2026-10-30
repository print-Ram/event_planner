'use client';

import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Sliders,
  Image as ImageIcon,
  DollarSign
} from 'lucide-react';
import {
  ServiceDetail,
  ServiceGalleryImage,
  SERVICES_DATA,
  getServiceTheme,
  ServicePackageTier
} from '../lib/servicesData';
import {
  saveServiceToFirebase,
  subscribeToService,
  resetServiceToDefaults
} from '../lib/firebase';
import { useAdmin } from './AdminManager';
import ServiceNavbar from './ServiceNavbar';
import BookingModal from './BookingModal';
import Footer from './Footer';

interface ServiceDetailViewProps {
  service: ServiceDetail;
}

export default function ServiceDetailView({ service }: ServiceDetailViewProps) {
  // Live state syncing from Firebase Realtime Database
  const [currentService, setCurrentService] = useState<ServiceDetail>(service);
  const [isFirebaseSynced, setIsFirebaseSynced] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Admin Context
  const { isAdmin, isEditMode } = useAdmin();

  // Modals state
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<ServiceGalleryImage | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedPackage, setSelectedPackage] = useState(
    service.packageTiers.find((p) => p.popular)?.name || service.packageTiers[0]?.name || ''
  );

  // Gallery view mode & Carousel State
  const [galleryViewMode, setGalleryViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Admin Editing Modals
  const [editGeneralModalOpen, setEditGeneralModalOpen] = useState(false);
  const [addImageModalOpen, setAddImageModalOpen] = useState(false);
  const [editPackagesModalOpen, setEditPackagesModalOpen] = useState(false);

  // Form states for Admin Editing
  const [generalForm, setGeneralForm] = useState({
    name: service.name,
    teluguName: service.teluguName,
    teluguTag: service.teluguTag,
    tagline: service.tagline,
    heroSummary: service.heroSummary,
    baseBudgetGuide: service.baseBudgetGuide,
    culturalHeritageNote: service.culturalHeritageNote,
  });

  const [newImageForm, setNewImageForm] = useState({
    url: '',
    title: '',
    subtitle: '',
    tag: 'Gallery Photo',
  });

  const [packageTiersDraft, setPackageTiersDraft] = useState<ServicePackageTier[]>(
    service.packageTiers
  );

  // Distinct category theme colors
  const theme = getServiceTheme(currentService.id);

  // 1. Subscribe to Firebase Realtime Database for this service
  useEffect(() => {
    const unsubscribe = subscribeToService(service.id, (firebaseData) => {
      if (firebaseData) {
        setCurrentService((prev) => ({
          ...prev,
          ...firebaseData,
        }));
        setGeneralForm({
          name: firebaseData.name || service.name,
          teluguName: firebaseData.teluguName || service.teluguName,
          teluguTag: firebaseData.teluguTag || service.teluguTag,
          tagline: firebaseData.tagline || service.tagline,
          heroSummary: firebaseData.heroSummary || service.heroSummary,
          baseBudgetGuide: firebaseData.baseBudgetGuide || service.baseBudgetGuide,
          culturalHeritageNote: firebaseData.culturalHeritageNote || service.culturalHeritageNote,
        });
        if (firebaseData.packageTiers) {
          setPackageTiersDraft(firebaseData.packageTiers);
        }
        setIsFirebaseSynced(true);
      }
    });

    return () => unsubscribe();
  }, [service.id]);

  // Gallery navigation helpers
  const totalGalleryImages = currentService.galleryImages?.length || 0;

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % totalGalleryImages);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + totalGalleryImages) % totalGalleryImages);
  };

  // Admin Actions
  const handleSaveToCloud = async (updatedData: Partial<ServiceDetail>) => {
    const merged = { ...currentService, ...updatedData };
    setCurrentService(merged);
    try {
      await saveServiceToFirebase(currentService.id, merged);
      setSaveSuccessMsg('All edits published to Cloud! Changes reflect worldwide.');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to sync with Firebase:', err);
      alert('Network error saving to cloud. Please check connection.');
    }
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSaveToCloud(generalForm);
    setEditGeneralModalOpen(false);
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageForm.url) return;

    const updatedGallery = [...currentService.galleryImages, newImageForm];
    await handleSaveToCloud({ galleryImages: updatedGallery });
    setNewImageForm({ url: '', title: '', subtitle: '', tag: 'Gallery Photo' });
    setAddImageModalOpen(false);
    setCarouselIndex(updatedGallery.length - 1);
  };

  const handleDeleteImage = async (idxToDelete: number) => {
    if (confirm('Are you sure you want to delete this photograph from the gallery?')) {
      const updatedGallery = currentService.galleryImages.filter((_, idx) => idx !== idxToDelete);
      await handleSaveToCloud({ galleryImages: updatedGallery });
      setCarouselIndex((prev) => (prev >= updatedGallery.length ? Math.max(0, updatedGallery.length - 1) : prev));
    }
  };

  const handleSetAsMasterCover = async (imageUrl: string) => {
    await handleSaveToCloud({ masterBannerImage: imageUrl });
    alert('Cover image updated! This photo will now represent this category on the main homepage card.');
  };

  const handlePackagesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSaveToCloud({ packageTiers: packageTiersDraft });
    setEditPackagesModalOpen(false);
  };

  const handleResetDefaults = async () => {
    if (confirm('Reset this service to default code configuration? This clears custom cloud edits for this category.')) {
      await resetServiceToDefaults(currentService.id);
      setCurrentService(service);
      setGeneralForm({
        name: service.name,
        teluguName: service.teluguName,
        teluguTag: service.teluguTag,
        tagline: service.tagline,
        heroSummary: service.heroSummary,
        baseBudgetGuide: service.baseBudgetGuide,
        culturalHeritageNote: service.culturalHeritageNote,
      });
      setPackageTiersDraft(service.packageTiers);
      setSaveSuccessMsg('Service reset to original defaults.');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  const otherServices = SERVICES_DATA.filter((s) => s.id !== currentService.id);

  const whatsappText = encodeURIComponent(
    `Hi Sri Ram Events, I am interested in planning "${currentService.name}" (${selectedPackage}) in Madanapalle / Tirupati / AP. Please share availability and customized quotation.`
  );

  return (
    <div className="min-h-screen bg-wedding-bg text-wedding-text selection:bg-wedding-ruby selection:text-white relative">
      {/* Sticky Dedicated Navigation */}
      <ServiceNavbar onOpenBooking={() => setBookingOpen(true)} />

      {/* Main Container with Page Entrance Transition */}
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="pt-24 pb-20 overflow-hidden"
      >
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-wedding-muted">
            <Link href="/" className="hover:text-wedding-kumkum transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-wedding-kumkum transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className={theme.accentText}>{currentService.name}</span>
          </div>
        </div>

        {/* ─── DISTINCT CATEGORY THEME IDENTIFIER BANNER ─── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div
            className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r ${theme.bannerGradient} text-white shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-white/20 relative overflow-hidden`}
          >
            <div className="flex items-center gap-3 relative z-10">
              <span className="p-3 rounded-2xl bg-white/15 text-white backdrop-blur-md shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/40 text-amber-300 border border-amber-300/30">
                    Category Dedicated Suite
                  </span>
                  <span className="text-xs text-white/80 font-bold">{currentService.badge}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black mt-1 tracking-tight">
                  {currentService.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black border border-white/30 backdrop-blur-sm text-white">
                {currentService.teluguName}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/30 text-amber-200 text-xs font-extrabold border border-amber-400/20">
                {currentService.baseBudgetGuide}
              </span>
            </div>
          </div>
        </div>

        {/* ─── ADMIN INLINE EDIT BAR (Visible only in Admin Edit Mode) ─── */}
        {isAdmin && isEditMode && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="p-4 rounded-2xl bg-[#1C1917] text-white border-2 border-amber-400/70 shadow-2xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Edit className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-black text-amber-300">
                    Editing: {currentService.name} (Live Cloud Sync)
                  </h4>
                  <span className="text-[10px] text-white/60">
                    Edits automatically update in Firebase Realtime Database for all visitors
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setEditGeneralModalOpen(true)}
                  className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit Descriptions & Price</span>
                </button>

                <button
                  onClick={() => setAddImageModalOpen(true)}
                  className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Image</span>
                </button>

                <button
                  onClick={() => setEditPackagesModalOpen(true)}
                  className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Edit Package Rates</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="py-1.5 px-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1"
                  title="Revert to Defaults"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {saveSuccessMsg && (
              <div className="mt-2 p-3 rounded-xl bg-emerald-950 border border-emerald-500/60 text-emerald-300 text-xs font-bold animate-in fade-in flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* HERO SECTION */}
        <section className="relative pb-16">
          {/* Ambient Glow Orbs tailored to category theme */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className={`absolute -top-10 left-1/4 w-96 h-96 rounded-full ${theme.heroAura1} blur-3xl`} />
            <div className={`absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full ${theme.heroAura2} blur-3xl`} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Heading & Cultural Badges */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Regional Accent Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.badgeBg} text-xs font-black`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentService.badge}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wedding-marigold/15 border border-wedding-marigold/30 text-wedding-amber text-xs font-extrabold">
                    <MapPin className="w-3.5 h-3.5 text-wedding-amber" />
                    <span>Madanapalle • Tirupati • Punganur • AP</span>
                  </span>
                </div>

                {/* Cultural Telugu Tagline */}
                <div className={`text-sm font-extrabold ${theme.tagColor} tracking-wide`}>
                  {currentService.teluguTag}
                </div>

                {/* Main Category Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-wedding-text tracking-tight leading-[1.15]">
                  {currentService.name.split(' ')[0]}{' '}
                  <span className={theme.accentText}>
                    {currentService.name.split(' ').slice(1).join(' ')}
                  </span>
                </h1>

                {/* Telugu Sub-Heading */}
                <h2 className="text-lg sm:text-xl font-bold text-wedding-text/80">
                  {currentService.teluguName} — {currentService.tagline}
                </h2>

                {/* Summary Copy */}
                <p className="text-base sm:text-lg font-medium leading-relaxed text-wedding-muted max-w-2xl mx-auto lg:mx-0">
                  {currentService.heroSummary}
                </p>

                {/* Quick Highlights Pills */}
                <div className="pt-2 grid sm:grid-cols-2 gap-3 text-left">
                  {currentService.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 p-3 rounded-2xl ${theme.highlightBg} text-xs font-bold text-wedding-text border`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => setBookingOpen(true)}
                    className={`w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r ${theme.buttonGradient} text-white font-black text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5`}
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
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Town-Friendly Transparent Rates</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rose-600" />
                    <span>100% Punctual Setup Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Master Hero Visual Card */}
              <div className="lg:col-span-5">
                <div className="wedding-card rounded-3xl p-3 border-2 border-wedding-turmeric/60 shadow-2xl relative overflow-hidden group">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
                    <img
                      src={currentService.masterBannerImage}
                      alt={currentService.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Floating Zoom / Inspection Trigger */}
                    <button
                      onClick={() =>
                        setActiveImage(
                          currentService.galleryImages[0] || {
                            url: currentService.masterBannerImage,
                            title: currentService.name,
                            subtitle: currentService.tagline,
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
                        {currentService.galleryImages[0]?.title || currentService.name}
                      </h4>
                      <p className="text-[11px] text-white/80 line-clamp-2">
                        {currentService.galleryImages[0]?.subtitle || currentService.heroSummary}
                      </p>
                    </div>
                  </div>

                  {/* Micro Specs Bar */}
                  <div className="mt-3 p-3 rounded-xl bg-wedding-ivory border border-wedding-border flex items-center justify-between text-xs font-bold text-wedding-text">
                    <div>
                      <span className="text-wedding-muted block text-[10px] uppercase font-extrabold">
                        Starting Guide
                      </span>
                      <span className={`font-black text-sm ${theme.accentText}`}>
                        {currentService.baseBudgetGuide}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-wedding-muted block text-[10px] uppercase font-extrabold">
                        Typical Duration
                      </span>
                      <span>{currentService.typicalDuration}</span>
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
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} text-xs font-black`}>
              <Award className="w-4 h-4" />
              <span>మన సంప్రదాయ గౌరవం • Our Cultural Reverence</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-wedding-text">
              Preserving Authentic Andhra Traditions With Modern Elegance
            </h3>
            <p className="text-sm sm:text-base text-wedding-muted font-medium leading-relaxed max-w-3xl mx-auto">
              {currentService.culturalHeritageNote}
            </p>
          </div>
        </section>

        {/* ─── REALISTIC PHOTO GALLERY WITH AUTOMATIC CAROUSEL (Requirement 1) ─── */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
              <div className="text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-marigold/15 text-wedding-amber text-xs font-extrabold border border-wedding-marigold/30">
                  <Camera className="w-4 h-4 text-wedding-amber" />
                  <span>Visual Gallery & Sample Executions ({totalGalleryImages} Photos)</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-wedding-text tracking-tight">
                  Realistic <span className={theme.accentText}>Event Showcase</span>
                </h2>
              </div>

              {/* View Switcher & Admin + Add Image */}
              <div className="flex items-center gap-3">
                {totalGalleryImages > 1 && (
                  <div className="p-1 rounded-xl bg-wedding-ivory border border-wedding-border flex items-center gap-1 text-xs font-bold">
                    <button
                      onClick={() => setGalleryViewMode('carousel')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        galleryViewMode === 'carousel'
                          ? 'bg-wedding-kumkum text-white shadow'
                          : 'text-wedding-text hover:bg-white'
                      }`}
                    >
                      Carousel Mode
                    </button>
                    <button
                      onClick={() => setGalleryViewMode('grid')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        galleryViewMode === 'grid'
                          ? 'bg-wedding-kumkum text-white shadow'
                          : 'text-wedding-text hover:bg-white'
                      }`}
                    >
                      Grid Mode
                    </button>
                  </div>
                )}

                {isAdmin && isEditMode && (
                  <button
                    onClick={() => setAddImageModalOpen(true)}
                    className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Image</span>
                  </button>
                )}
              </div>
            </div>

            {/* AUTOMATIC CAROUSEL VIEW (Default when > 1 image exists) */}
            {totalGalleryImages > 1 && galleryViewMode === 'carousel' ? (
              <div className="space-y-4">
                {/* Main Carousel Display Card */}
                <div className="wedding-card rounded-3xl overflow-hidden border border-wedding-border relative shadow-2xl bg-black">
                  <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden flex items-center justify-center">
                    {currentService.galleryImages[carouselIndex] && (
                      <img
                        key={carouselIndex}
                        src={currentService.galleryImages[carouselIndex].url}
                        alt={currentService.galleryImages[carouselIndex].title}
                        className="w-full h-full object-cover animate-in fade-in duration-300"
                      />
                    )}

                    {/* Navigation Arrow Left */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 z-20"
                      aria-label="Previous Photo"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Navigation Arrow Right */}
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 z-20"
                      aria-label="Next Photo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Zoom / Lightbox Trigger */}
                    <button
                      onClick={() =>
                        setActiveImage(currentService.galleryImages[carouselIndex])
                      }
                      className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 text-xs font-bold z-20"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Full View</span>
                    </button>

                    {/* Admin Actions on Current Slide */}
                    {isAdmin && isEditMode && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                        <button
                          onClick={() =>
                            handleSetAsMasterCover(currentService.galleryImages[carouselIndex].url)
                          }
                          className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1 shadow-lg"
                          title="Use this photo as the main cover on the homepage card"
                        >
                          <Star className="w-3.5 h-3.5" />
                          <span>Set as Main Cover</span>
                        </button>

                        <button
                          onClick={() => handleDeleteImage(carouselIndex)}
                          className="py-1.5 px-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-lg"
                          title="Delete image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}

                    {/* Bottom Caption Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white space-y-1.5 z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-wedding-marigold text-black">
                          {currentService.galleryImages[carouselIndex]?.tag}
                        </span>
                        <span className="text-xs text-white/70 font-bold">
                          {carouselIndex + 1} of {totalGalleryImages}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-2xl font-black">
                        {currentService.galleryImages[carouselIndex]?.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-medium">
                        {currentService.galleryImages[carouselIndex]?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Navigation Strip */}
                <div className="flex items-center gap-3 overflow-x-auto py-2 px-1">
                  {currentService.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`relative w-28 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        carouselIndex === idx
                          ? 'border-wedding-kumkum shadow-lg scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 text-[9px] font-black px-1.5 py-0.2 rounded bg-black/70 text-white truncate max-w-[90%]">
                        {img.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* GRID VIEW */
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentService.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="wedding-card rounded-2xl overflow-hidden border border-wedding-border hover:border-wedding-turmeric transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    <div
                      onClick={() => setActiveImage(img)}
                      className="relative aspect-[4/3] overflow-hidden bg-wedding-ivory cursor-pointer"
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
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

                    {/* Admin Delete & Set Cover inside grid */}
                    {isAdmin && isEditMode && (
                      <div className="p-3 pt-0 flex items-center justify-between gap-2 border-t border-wedding-border/60">
                        <button
                          onClick={() => handleSetAsMasterCover(img.url)}
                          className="text-[10px] font-black text-amber-700 hover:underline flex items-center gap-1"
                        >
                          <Star className="w-3 h-3" />
                          <span>Set Cover</span>
                        </button>
                        <button
                          onClick={() => handleDeleteImage(idx)}
                          className="text-[10px] font-bold text-rose-600 hover:text-rose-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* DETAILED EXPLANATION & WHAT WE OFFER */}
        <section className="py-20 bg-wedding-ivory/50 border-t border-wedding-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Overview Story */}
            <div className="max-w-4xl mx-auto wedding-card rounded-3xl p-6 sm:p-10 border border-wedding-border shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${theme.badgeBg}`}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-wedding-text">
                    Comprehensive Celebration Management
                  </h3>
                  <p className="text-xs font-bold text-wedding-muted">
                    How Sri Ram Events executes your {currentService.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-wedding-muted font-medium leading-relaxed">
                {currentService.detailedOverview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Itemized Offerings Cards */}
            <div>
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className={`text-xs font-extrabold uppercase tracking-wider ${theme.tagColor}`}>
                  Detailed Inclusions
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-wedding-text">
                  What’s Included In Our <span className={theme.accentText}>{currentService.name}</span>
                </h3>
                <p className="text-sm text-wedding-muted">
                  Everything you need for a seamless, breathtaking experience without dealing with multiple fragmented vendors.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {currentService.offerings.map((offering, idx) => (
                  <div
                    key={idx}
                    className={`wedding-card rounded-3xl p-6 sm:p-8 space-y-4 border border-wedding-border ${theme.cardBorderHover} transition-all`}
                  >
                    <div className="space-y-1">
                      <span className={`text-xs font-black ${theme.tagColor} tracking-wide`}>
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
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
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
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${theme.badgeBg} text-xs font-black border`}>
                <Sparkles className="w-4 h-4" />
                <span>Transparent Town-Market Pricing</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-wedding-text tracking-tight">
                Package <span className={theme.accentText}>Options</span>
              </h2>
              <p className="text-base text-wedding-muted font-medium">
                Tailored for Madanapalle, Tirupati, Punganur & surrounding towns. Every package can be customized to your exact requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {currentService.packageTiers.map((tier, idx) => {
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
                      <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r ${theme.buttonGradient} text-white text-[11px] font-black uppercase tracking-wider shadow-md`}>
                        Most Popular Choice
                      </div>
                    )}

                    <div className="space-y-5">
                      <div>
                        <h4 className="text-2xl font-black text-wedding-text">{tier.name}</h4>
                        <p className="text-xs text-wedding-muted font-semibold mt-1">{tier.tagline}</p>
                      </div>

                      <div className="py-3 px-4 rounded-2xl bg-wedding-ivory border border-wedding-border">
                        <span className="text-[10px] uppercase font-black text-wedding-muted block">
                          Budget Guide
                        </span>
                        <span className={`text-2xl font-black ${theme.accentText}`}>
                          {tier.priceRange}
                        </span>
                      </div>

                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-black uppercase tracking-wider text-wedding-text block">
                          Included Features:
                        </span>
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs font-medium text-wedding-text">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                            ? `bg-gradient-to-r ${theme.buttonGradient} text-white hover:shadow-xl hover:scale-105`
                            : 'bg-wedding-ivory hover:bg-wedding-kumkum hover:text-white text-wedding-text border border-wedding-border'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Select {tier.name}</span>
                      </button>

                      <a
                        href={`https://wa.me/919502559333?text=${encodeURIComponent(
                          `Hi Sri Ram Events, I am interested in booking the "${tier.name}" (${tier.priceRange}) for "${currentService.name}". Please share complete brochure and availability.`
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
              <span className={`text-xs font-black uppercase tracking-wider ${theme.tagColor}`}>
                Help & Clarifications
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-wedding-text">
                Frequently Asked <span className={theme.accentText}>Questions</span>
              </h3>
              <p className="text-sm text-wedding-muted">
                Everything you need to know about booking Sri Ram Events for your celebration.
              </p>
            </div>

            <div className="space-y-4">
              {currentService.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="wedding-card rounded-2xl border border-wedding-border overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
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
              {otherServices.slice(0, 3).map((other) => {
                const otherTheme = getServiceTheme(other.id);
                return (
                  <Link
                    key={other.id}
                    href={`/services/${other.id}`}
                    className={`wedding-card rounded-2xl p-5 border border-wedding-border ${otherTheme.cardBorderHover} transition-all group flex flex-col justify-between`}
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-wedding-ivory">
                        <img
                          src={other.masterBannerImage}
                          alt={other.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full ${otherTheme.badgeBg} bg-white/95`}>
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
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM FINAL HIGH CONVERSION BANNER */}
        <section
          className={`py-20 bg-gradient-to-r ${theme.bannerGradient} text-white text-center relative overflow-hidden`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <span className="text-xs font-black tracking-wider uppercase px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-amber-300">
              మీ వేడుక... మా బాధ్యత
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">
              Ready to Plan Your <span className="text-amber-300">{currentService.name}?</span>
            </h2>
            <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto">
              Contact Sri Ram Events today. We will guide you with realistic budgeting, authentic decor ideas, and personalized care.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm shadow-xl hover:scale-105 transition-all"
              >
                <span>Request Custom Quote</span>
              </button>
              <a
                href="tel:+919502559333"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call +91 95025 59333</span>
              </a>
            </div>
          </div>
        </section>
      </motion.main>

      {/* FOOTER */}
      <Footer />

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#111] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeImage.url}
                  alt={activeImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

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

      {/* ─── ADMIN: EDIT GENERAL DETAILS MODAL ─── */}
      {editGeneralModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#1C1917] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-amber-300">Edit Category Details</h3>
              <button onClick={() => setEditGeneralModalOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGeneralSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-amber-200 mb-1">Service Display Name</label>
                <input
                  type="text"
                  required
                  value={generalForm.name}
                  onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">Telugu Title</label>
                <input
                  type="text"
                  required
                  value={generalForm.teluguName}
                  onChange={(e) => setGeneralForm({ ...generalForm, teluguName: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">Telugu Cultural Tagline</label>
                <input
                  type="text"
                  required
                  value={generalForm.teluguTag}
                  onChange={(e) => setGeneralForm({ ...generalForm, teluguTag: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">Starting Budget Guide</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹25,000 onwards"
                  value={generalForm.baseBudgetGuide}
                  onChange={(e) => setGeneralForm({ ...generalForm, baseBudgetGuide: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">Hero Summary</label>
                <textarea
                  rows={3}
                  required
                  value={generalForm.heroSummary}
                  onChange={(e) => setGeneralForm({ ...generalForm, heroSummary: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">Cultural Heritage Note</label>
                <textarea
                  rows={3}
                  required
                  value={generalForm.culturalHeritageNote}
                  onChange={(e) => setGeneralForm({ ...generalForm, culturalHeritageNote: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow"
                >
                  Save & Publish to Cloud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ADMIN: ADD GALLERY IMAGE MODAL ─── */}
      {addImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#1C1917] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-amber-300">Add Image to Gallery</h3>
              <button onClick={() => setAddImageModalOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddImage} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-amber-200 mb-1">Image URL or Local Path *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /events/real/my_new_stage.jpg or https://..."
                  value={newImageForm.url}
                  onChange={(e) => setNewImageForm({ ...newImageForm, url: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Lotus Theme Mandapam"
                  value={newImageForm.title}
                  onChange={(e) => setNewImageForm({ ...newImageForm, title: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">Subtitle / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Fresh marigold hanging with brass urlis"
                  value={newImageForm.subtitle}
                  onChange={(e) => setNewImageForm({ ...newImageForm, subtitle: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-200 mb-1">Tag / Category</label>
                <input
                  type="text"
                  placeholder="e.g. Stage Decor, Floral Entry, Mandapam"
                  value={newImageForm.tag}
                  onChange={(e) => setNewImageForm({ ...newImageForm, tag: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow"
                >
                  Upload & Add to Carousel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ADMIN: EDIT PACKAGE RATES MODAL ─── */}
      {editPackagesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#1C1917] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-amber-300">Edit Package Rates & Features</h3>
              <button onClick={() => setEditPackagesModalOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePackagesSubmit} className="space-y-4 text-xs">
              {packageTiersDraft.map((tier, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">Package {idx + 1}</span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px]">
                      <input
                        type="checkbox"
                        checked={tier.popular || false}
                        onChange={(e) => {
                          const updated = [...packageTiersDraft];
                          updated[idx].popular = e.target.checked;
                          setPackageTiersDraft(updated);
                        }}
                      />
                      <span>Mark as Most Popular</span>
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/70 mb-1">Package Name</label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => {
                          const updated = [...packageTiersDraft];
                          updated[idx].name = e.target.value;
                          setPackageTiersDraft(updated);
                        }}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-white/10 border border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">Price Range / Quotation</label>
                      <input
                        type="text"
                        value={tier.priceRange}
                        onChange={(e) => {
                          const updated = [...packageTiersDraft];
                          updated[idx].priceRange = e.target.value;
                          setPackageTiersDraft(updated);
                        }}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-white/10 border border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={tier.tagline}
                      onChange={(e) => {
                        const updated = [...packageTiersDraft];
                        updated[idx].tagline = e.target.value;
                        setPackageTiersDraft(updated);
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-white/10 border border-white/20 text-white"
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow"
              >
                Save Package Rates to Cloud
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BOOKING / GET QUOTE MODAL */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={currentService.name}
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
          className={`flex-1 py-2.5 rounded-xl bg-gradient-to-r ${theme.buttonGradient} text-white font-black text-xs flex items-center justify-center gap-1.5 shadow`}
        >
          <Calendar className="w-4 h-4" />
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  );
}
