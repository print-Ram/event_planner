'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Heart, Gift, Utensils, Home, PartyPopper, GraduationCap } from 'lucide-react';
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
  const eventCategories = [
    {
      id: 'weddings',
      name: 'Grand Weddings',
      teluguTag: 'ప్రతి వేడుక ఒక మధుర జ్ఞాపకం',
      icon: Heart,
      badge: 'Featured Specialty',
      description: 'Authentic Telugu wedding mandapams, pelli kuthuru & koduku setups, banana leaf feasts, floral arches, and seamless ceremonial management.',
      highlights: [
        'Traditional Floral Pelli Mandapam',
        'Bridal & Groom Setup Styling',
        'Sangeet & Mehendi Themes',
        'Ceremonial Ritual Assistance'
      ],
      illustration: <WeddingIllustration className="h-64" />,
    },
    {
      id: 'birthdays',
      name: 'Joyous Birthdays',
      teluguTag: 'సంతోషాన్ని అందంగా జరుపుకుందాం',
      icon: Gift,
      badge: 'Kids & Adults',
      description: 'Themed birthday party setups complete with cute balloon arches, customized backdrops, entertainer coordination, and birthday cake stages.',
      highlights: [
        'Custom Character & Backdrop Themes',
        'Balloon & Lighting Sculpture',
        'Magic & Entertainment Shows',
        'Return Gift & Snack Counters'
      ],
      illustration: <BirthdayIllustration className="h-64" />,
    },
    {
      id: 'private-events',
      name: 'Private Celebrations',
      teluguTag: 'మీ కలల వేడుకకు మా సృజనాత్మకత తోడు',
      icon: PartyPopper,
      badge: 'Bespoke Experience',
      description: 'Intimate family get-togethers, anniversary galas, cradle ceremonies (Namakaranam), and milestone celebrations planned with warmth.',
      highlights: [
        'Intimate Dining & Table Aesthetics',
        'Acoustic Music & Lighting Rig',
        'Personalized Keepsake Decor',
        'Flexible Guest Management'
      ],
      illustration: <PrivateEventIllustration className="h-64" />,
    },
    {
      id: 'house-warming',
      name: 'House Warming (Gruhapravesam)',
      teluguTag: 'మన సంస్కృతి... మన వేడుకల్లో',
      icon: Home,
      badge: 'Auspicious Rituals',
      description: 'Traditional home entrance decorations with fresh mango leaf toranalu, marigold garlands, brass kalash arrangements, and auspicious pooja setups.',
      highlights: [
        'Maamidi Aakulu & Marigold Torans',
        'Brass Kalash & Diya Illuminations',
        'Pooja Mandapam Arrangement',
        'Guest Hospitality & Refreshments'
      ],
      illustration: <HouseWarmingIllustration className="h-64" />,
    },
    {
      id: 'catering',
      name: 'Authentic Catering',
      teluguTag: 'రుచికరమైన విందు... మరువలేని ఆతిథ్యం',
      icon: Utensils,
      badge: 'Gourmet Feast',
      description: 'Traditional South Indian banana-leaf feasts (Ariti Aaku Bhojanam), live counter setups, multi-cuisine buffets, and courteous serving staff.',
      highlights: [
        'Traditional Banana Leaf Feasts',
        'Live Dosa, Chat & Dessert Counters',
        'Hygienic Culinary Preparation',
        'Uniformed Hospitality Crew'
      ],
      illustration: <CateringIllustration className="h-64" />,
    },
    {
      id: 'school-events',
      name: 'School & College Fests',
      teluguTag: 'ప్రతిభకు వేదిక... ఉత్సాహభరిత వేడుక',
      icon: GraduationCap,
      badge: 'Institutional Fests',
      description: 'High-energy Annual Day setups, Sports Meets, Freshers Celebrations, and Stage Audio-Visual production for educational institutes.',
      highlights: [
        'Stage Backdrop & AV Sound Systems',
        'Trophy & Certification Counters',
        'Seating & Enclosure Rigs',
        'Event Schedule Management'
      ],
      illustration: <SchoolEventIllustration className="h-64" />,
    },
    {
      id: 'theme-parties',
      name: 'Creative Theme Parties',
      teluguTag: 'సృజనాత్మకత నిండిన పండుగ',
      icon: Sparkles,
      badge: 'Custom Themes',
      description: 'Imaginative themed environments from Retro Telugu cinema nights to Neon glow parties, customized to make your event unforgettable.',
      highlights: [
        'Prop & Photobooth Installations',
        'Thematic Stage & Lighting Rigs',
        'DJ & Sound Track Integration',
        'Interactive Guest Activities'
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
            From royal weddings to intimate home ceremonies, we turn your cherished moments into extraordinary, stress-free experiences.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="wedding-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-wedding-border hover:border-wedding-turmeric transition-all duration-300"
              >
                {/* Card Header & Illustration */}
                <div>
                  <div className="p-3 bg-wedding-ivory/60 border-b border-wedding-border/60 relative">
                    <span className="absolute top-5 right-5 z-20 text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-wedding-kumkum border border-wedding-kumkum/20 shadow-sm">
                      {category.badge}
                    </span>
                    <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                      {category.illustration}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-wedding-kumkum">
                      <IconComponent className="w-4 h-4 text-wedding-ruby" />
                      <span>{category.teluguTag}</span>
                    </div>

                    <h3 className="text-2xl font-black text-wedding-text group-hover:text-wedding-kumkum transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-sm font-medium text-wedding-muted leading-relaxed">
                      {category.description}
                    </p>

                    <div className="pt-2 space-y-2">
                      {category.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-wedding-text">
                          <CheckCircle2 className="w-3.5 h-3.5 text-wedding-leaf shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectService(category.name)}
                    className="w-full py-3 px-4 rounded-xl bg-wedding-ivory hover:bg-gradient-to-r hover:from-wedding-kumkum hover:to-wedding-ruby hover:text-white border border-wedding-border text-wedding-text font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <span>Plan {category.name}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
