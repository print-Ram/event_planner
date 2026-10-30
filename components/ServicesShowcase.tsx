'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Heart,
  Gift,
  Utensils,
  Home,
  PartyPopper,
  GraduationCap,
  Images,
  Calendar,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { getServiceTheme } from '../lib/servicesData';
import WeddingIllustration from './illustrations/WeddingIllustration';
import BirthdayIllustration from './illustrations/BirthdayIllustration';
import PrivateEventIllustration from './illustrations/PrivateEventIllustration';
import HouseWarmingIllustration from './illustrations/HouseWarmingIllustration';
import CateringIllustration from './illustrations/CateringIllustration';
import SchoolEventIllustration from './illustrations/SchoolEventIllustration';
import ThemePartyIllustration from './illustrations/ThemePartyIllustration';

interface ServicesShowcaseProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesShowcase({ onSelectService }: ServicesShowcaseProps) {
  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  const eventCategories = [
    {
      id: 'weddings',
      name: 'Grand Telugu Weddings',
      teluguTag: 'ప్రతి వేడుక ఒక మధుర జ్ఞాపకం',
      icon: Heart,
      badge: 'Signature Flagship',
      realPreviewImg: '/events/real/wedding_mandapam.jpg',
      previewLabel: 'Mandapam & Haldi Gallery',
      description: 'Authentic Telugu wedding mandapams, pelli kuthuru & koduku setups, banana leaf feasts, floral arches, and seamless ceremonial management.',
      highlights: [
        'Traditional Floral Pelli Mandapam',
        'Bridal & Groom Setup Styling',
        'Sangeet & Mehendi Themes',
        'Ceremonial Ritual Assistance',
      ],
      illustration: <WeddingIllustration className="h-64" />,
    },
    {
      id: 'birthdays',
      name: 'Joyous Birthdays',
      teluguTag: 'సంతోషాన్ని అందంగా జరుపుకుందాం',
      icon: Gift,
      badge: 'Festive Violet Theme',
      realPreviewImg: '/events/real/birthday_stage.jpg',
      previewLabel: 'Balloon & Neon Stages',
      description: 'Themed birthday party setups complete with cute balloon arches, customized backdrops, entertainer coordination, and birthday cake stages.',
      highlights: [
        'Custom Character & Backdrop Themes',
        'Balloon & Lighting Sculpture',
        'Magic & Entertainment Shows',
        'Return Gift & Snack Counters',
      ],
      illustration: <BirthdayIllustration className="h-64" />,
    },
    {
      id: 'house-warming',
      name: 'House Warming (Gruhapravesam)',
      teluguTag: 'మన సంస్కృతి... మన వేడుకల్లో',
      icon: Home,
      badge: 'Auspicious Emerald Theme',
      realPreviewImg: '/events/real/housewarming_entrance.jpg',
      previewLabel: 'Mango Toran & Kalasham',
      description: 'Traditional home entrance decorations with fresh mango leaf toranalu, marigold garlands, brass kalash arrangements, and auspicious pooja setups.',
      highlights: [
        'Maamidi Aakulu & Marigold Torans',
        'Brass Kalash & Diya Illuminations',
        'Pooja Mandapam Arrangement',
        'Guest Hospitality & Refreshments',
      ],
      illustration: <HouseWarmingIllustration className="h-64" />,
    },
    {
      id: 'catering',
      name: 'Authentic Catering',
      teluguTag: 'రుచికరమైన విందు... మరువలేని ఆతిథ్యం',
      icon: Utensils,
      badge: 'Plantain Leaf Feast',
      realPreviewImg: '/events/real/catering_feast.jpg',
      previewLabel: 'Ariti Aaku Bhojanam',
      description: 'Traditional South Indian banana-leaf feasts (Ariti Aaku Bhojanam), live counter setups, multi-cuisine buffets, and courteous serving staff.',
      highlights: [
        'Traditional Banana Leaf Feasts',
        'Live Dosa, Chat & Dessert Counters',
        'Hygienic Culinary Preparation',
        'Uniformed Hospitality Crew',
      ],
      illustration: <CateringIllustration className="h-64" />,
    },
    {
      id: 'private-events',
      name: 'Private Celebrations',
      teluguTag: 'మీ కలల వేడుకకు మా సృజనాత్మకత తోడు',
      icon: PartyPopper,
      badge: 'Sunset Saffron Theme',
      realPreviewImg: '/events/real/reception_stage.jpg',
      previewLabel: 'Reception & Cradle Decor',
      description: 'Intimate family get-togethers, anniversary galas, cradle ceremonies (Namakaranam), and milestone celebrations planned with warmth.',
      highlights: [
        'Intimate Dining & Table Aesthetics',
        'Acoustic Music & Lighting Rig',
        'Personalized Keepsake Decor',
        'Flexible Guest Management',
      ],
      illustration: <PrivateEventIllustration className="h-64" />,
    },
    {
      id: 'school-events',
      name: 'School & College Fests',
      teluguTag: 'ప్రతిభకు వేదిక... ఉత్సాహభరిత వేడుక',
      icon: GraduationCap,
      badge: 'Electric Sapphire Theme',
      realPreviewImg: '/events/real/college_fest_stage.jpg',
      previewLabel: 'Concert Stage & LED Wall',
      description: 'High-energy Annual Day setups, Sports Meets, Freshers Celebrations, and Stage Audio-Visual production for educational institutes.',
      highlights: [
        'Stage Backdrop & AV Sound Systems',
        'Trophy & Certification Counters',
        'Seating & Enclosure Rigs',
        'Event Schedule Management',
      ],
      illustration: <SchoolEventIllustration className="h-64" />,
    },
    {
      id: 'theme-parties',
      name: 'Creative Theme Parties',
      teluguTag: 'సృజనాత్మకత నిండిన పండుగ',
      icon: Sparkles,
      badge: 'Neon Fuchsia Theme',
      realPreviewImg: '/events/real/theme_party_stage.jpg',
      previewLabel: 'Neon & Retro Tollywood',
      description: 'Imaginative themed environments from Retro Telugu cinema nights to Neon glow parties, customized to make your event unforgettable.',
      highlights: [
        'Prop & Photobooth Installations',
        'Thematic Stage & Lighting Rigs',
        'DJ & Sound Track Integration',
        'Interactive Guest Activities',
      ],
      illustration: <ThemePartyIllustration className="h-64" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#FFFDF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-kumkum/10 text-wedding-kumkum text-xs font-extrabold border border-wedding-kumkum/20">
            <Sparkles className="w-4 h-4 text-wedding-ruby" />
            <span>Celebrations We Specialize In</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-wedding-text tracking-tight">
            Events We <span className="kumkum-text">Celebrate</span>
          </h2>

          <p className="text-base text-wedding-muted font-medium">
            Each category features its own dedicated color ambiance, customized packages, and real photography. Click any card to enter the dedicated suite.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventCategories.map((category) => {
            const IconComponent = category.icon;
            const theme = getServiceTheme(category.id);
            const isNavigating = navigatingId === category.id;

            return (
              <div
                key={category.id}
                className={`wedding-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-wedding-border ${theme.cardBorderHover} transition-all duration-300 shadow-md hover:shadow-2xl relative`}
              >
                {/* Active Transition Overlay if clicked */}
                {isNavigating && (
                  <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4 animate-in fade-in">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-300 mb-2" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                      Redirecting To
                    </span>
                    <h4 className="text-sm font-black text-white text-center mt-0.5">
                      {category.name} Suite
                    </h4>
                  </div>
                )}

                {/* Clickable Header & Illustration leading to dedicated page */}
                <div>
                  <Link
                    href={`/services/${category.id}`}
                    onClick={() => setNavigatingId(category.id)}
                    className="block p-3 bg-wedding-ivory/60 border-b border-wedding-border/60 relative overflow-hidden group-hover:bg-wedding-cream transition-colors"
                  >
                    {/* Category-Themed Badge */}
                    <span
                      className={`absolute top-5 right-5 z-20 text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full ${theme.badgeBg} shadow-sm backdrop-blur-md bg-white/90`}
                    >
                      {category.badge}
                    </span>

                    {/* Dedicated Page Prompt Hover Pill */}
                    <div className="absolute top-5 left-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r ${theme.buttonGradient} text-white shadow-md`}>
                        <Images className="w-3 h-3" />
                        <span>Explore Dedicated Page</span>
                      </span>
                    </div>

                    {/* Illustration with subtle hover zoom */}
                    <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                      {category.illustration}
                    </div>

                    {/* Real preview photo mini banner (Single cover image by default) */}
                    <div className="mt-2 flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/90 border border-wedding-border/70 text-[11px] font-bold text-wedding-text">
                      <span className="flex items-center gap-1.5 text-wedding-ruby">
                        <Images className="w-3.5 h-3.5" />
                        <span>{category.previewLabel}</span>
                      </span>
                      <span className={`font-black flex items-center gap-1 group-hover:underline ${theme.accentText}`}>
                        <span>Enter Suite</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div className={`flex items-center gap-2 text-xs font-bold ${theme.tagColor}`}>
                      <IconComponent className="w-4 h-4 text-wedding-ruby" />
                      <span>{category.teluguTag}</span>
                    </div>

                    <Link
                      href={`/services/${category.id}`}
                      onClick={() => setNavigatingId(category.id)}
                      className="block group/title"
                    >
                      <h3 className={`text-2xl font-black text-wedding-text group-hover/title:${theme.accentText} transition-colors flex items-center justify-between`}>
                        <span>{category.name}</span>
                        <ArrowRight className="w-5 h-5 text-wedding-kumkum opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all" />
                      </h3>
                    </Link>

                    <p className="text-sm font-medium text-wedding-muted leading-relaxed">
                      {category.description}
                    </p>

                    <div className="pt-2 space-y-2">
                      {category.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-wedding-text">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Dual Clickable Options */}
                <div className="p-6 pt-0 space-y-2.5">
                  {/* Primary Option: Dedicated Page Redirect with Category Theme Gradient */}
                  <Link
                    href={`/services/${category.id}`}
                    onClick={() => setNavigatingId(category.id)}
                    className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${theme.buttonGradient} text-white font-extrabold text-sm shadow hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <Images className="w-4 h-4" />
                    <span>View Gallery & Packages</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Secondary Option: Quick Plan / Booking Trigger */}
                  <button
                    onClick={() => onSelectService(category.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-wedding-ivory hover:bg-wedding-cream border border-wedding-border text-wedding-text font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-wedding-kumkum" />
                    <span>Quick Estimate & Booking</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
