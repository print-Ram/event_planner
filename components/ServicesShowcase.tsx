'use client';

import React, { useState } from 'react';
import { Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import SingleLineRangoli from './SingleLineRangoli';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'weddings' | 'parties' | 'corporate' | 'decor';
  icon: string;
  description: string;
  features: string[];
  andhraTouch: string;
  popular?: boolean;
}

interface ServicesShowcaseProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesShowcase({ onSelectService }: ServicesShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'weddings',
      name: 'Weddings',
      category: 'weddings',
      icon: '💍',
      description: 'Grand Telugu wedding mandapam decor, authentic Pelli Pandiri floral setups, glowing lotus stage backdrops, and complete ritual management.',
      features: ['Grand Mandapam Design', 'Nadaswaram & Ritual Coordination', 'Pelli Pandiri Fresh Floral Arches', 'Bridal & Groom Entrance'],
      andhraTouch: 'Authentic Marigold & Jasmine floral garlands, traditional brass Deepam lamps, and Kondapalli wedding doll displays.',
      popular: true,
    },
    {
      id: 'wedding-engagement',
      name: 'Wedding and Engagement',
      category: 'weddings',
      icon: '💖',
      description: 'Seamless end-to-end planning from Nishchitartham (Engagement) ring exchanges to muhurtham wedding rituals with hand-drawn line Muggu decor.',
      features: ['Nishchitartham Stage Setup', 'Custom Photo Booths', 'Ring Exchange Illumination', 'Guest Hospitality'],
      andhraTouch: 'Customized auspicious Muggu designs with coconut and mango leaves (Toranalu) for divine blessings.',
      popular: true,
    },
    {
      id: 'event-decor-design',
      name: 'Event Decor Design',
      category: 'decor',
      icon: '🎨',
      description: 'Traditional village event styling combining fresh marigold garlands, hand-drawn Rangoli floor paths, and velvet mandapam backdrops.',
      features: ['Venue Styling Visualization', 'Hand-Drawn Line Rangoli Floor', 'Thematic Lighting Rig', 'Parchment Backdrop Panels'],
      andhraTouch: 'Traditional floor Muggu patterns mapped in hand-drawn chalk lines.',
      popular: true,
    },
    {
      id: 'decorations',
      name: 'Decorations',
      category: 'decor',
      icon: '🌸',
      description: 'Bespoke floral, fabric, balloon, and lighting decorations customized for indoor halls, open-air gardens, and traditional mandapams.',
      features: ['Fresh Flower Installations', 'Silk & Satin Draping', 'Warm Lantern Lighting', 'Entrance Arch Design'],
      andhraTouch: 'Fresh Jasmine (Mallepoolu) and Marigold (Banthipoolu) aromatic arrangements.',
    },
    {
      id: 'catering',
      name: 'Catering',
      category: 'parties',
      icon: '🍛',
      description: 'Authentic Andhra Vindu Bhojanam (Feast) served traditionally on banana leaves, along with multi-cuisine live counters and dessert bars.',
      features: ['Traditional Banana Leaf Feast', 'Pappu Charu & Avakaya Specials', 'Sweet & Savory Counter', 'Hygenic Food Stalls'],
      andhraTouch: 'Traditional Rayalaseema, Coastal Andhra & Telangana festive delicacies with authentic Naivedyam.',
      popular: true,
    },
    {
      id: 'birthday-party-planning',
      name: 'Birthday Party Planning',
      category: 'parties',
      icon: '🎂',
      description: 'Vibrant theme birthday celebrations with 3D cartoon setups, live entertainment, sound systems, games, and customized cakes.',
      features: ['Theme Backdrop & Balloons', 'Emcee & Game Host', 'Magician & Mascot Performers', 'Custom Dessert Table'],
      andhraTouch: 'Incorporating traditional Kondapalli wooden toy favors as eco-friendly return gifts for kids.',
    },
    {
      id: 'childrens-party-planning',
      name: "Children's Party Planning",
      category: 'parties',
      icon: '🎈',
      description: 'Interactive, high-energy children’s parties with bouncy castles, face painting, puppet shows, and playful themed decorations.',
      features: ['Kid-Safe Play Zones', 'Interactive Puppet Show', 'Custom Goodie Bags', 'Theme Snack Counters'],
      andhraTouch: 'Live Tholu Bommalata (leather shadow puppetry) story telling for children.',
    },
    {
      id: 'baby-shower-planning',
      name: 'Baby Shower Planning',
      category: 'parties',
      icon: '👶',
      description: 'Traditional Sreemantham & modern baby shower ceremonies decorated with pastel floral swings, Cradle setups (Uyyala), and blessings.',
      features: ['Sreemantham Floral Swing', 'Curated Photo Backdrops', 'Traditional Blessing Ceremony', 'Custom Return Gifts'],
      andhraTouch: 'Decorated Uyyala (cradle) garnished with lotus flowers and traditional turmeric-vermilion (Pasupu-Kumkuma) favors.',
    },
    {
      id: 'anniversary-party-planning',
      name: 'Anniversary Party Planning',
      category: 'parties',
      icon: '🥂',
      description: 'Milestone marriage anniversary celebrations, vow renewals, romantic candle-lit dining setups, and live musical orchestra.',
      features: ['Golden & Silver Jubilee Themes', 'Live String Quartet / Music', 'Memory Lane Photo Wall', 'Champagne / Mocktail Bar'],
      andhraTouch: 'Special Shashti Poorthi (60th Birthday) traditional ritual setups with Veda Chanting.',
    },
    {
      id: 'corporate-and-conference',
      name: 'Corporate and Conference',
      category: 'corporate',
      icon: '💼',
      description: 'Professional corporate galas, product launches, annual conventions, tech summits, and stage audio-visual engineering.',
      features: ['High-Res LED Video Walls', 'Acoustic Sound & Lighting', 'Executive Stage & Podiums', 'Delegate Registration Desks'],
      andhraTouch: 'Welcome reception with traditional Andhra Shehnai & Nadaswaram brass ensemble.',
      popular: true,
    },
    {
      id: 'school-event',
      name: 'School Event',
      category: 'corporate',
      icon: '🏫',
      description: 'Annual day functions, sports meets, graduation ceremonies, and cultural festivals for schools and colleges with grand stage setups.',
      features: ['Grand Stage & Canopy', 'Audio System & Microphones', 'Seating & Security Fencing', 'Trophy & Award Display'],
      andhraTouch: 'Kuchipudi & Folk dance stage lighting setups with traditional rangoli entryways.',
    },
    {
      id: 'theme-parties',
      name: 'Theme Parties',
      category: 'parties',
      icon: '🎭',
      description: 'Immersive themed parties ranging from Cyber-Traditional Telugu Village, Royal Forts, Retro Glamour, to Festive Galas.',
      features: ['Custom Concept Props', 'Themed Costume Photobooths', 'Dazzling Light Shows', 'Specialized DJ Setup'],
      andhraTouch: 'Village Gudem theme with authentic thatched huts, bullock carts, and Kondapalli doll exhibits.',
    },
    {
      id: 'party-planning',
      name: 'Party Planning',
      category: 'parties',
      icon: '🎉',
      description: 'Hassle-free end-to-end planning for housewarmings (Gruhapravesam), sangeet nights, cocktail parties, and festive gatherings.',
      features: ['Venue Selection & Booking', 'Sound, Light & DJ', 'Vendor Management', 'On-site Event Director'],
      andhraTouch: 'Gruhapravesam traditional milk boiling (Paalu Ponginchadam) Mandapam decor.',
    },
    {
      id: 'private-event-planning',
      name: 'Private Event Planning',
      category: 'corporate',
      icon: '🔐',
      description: 'Exclusive VIP private dinners, luxury family reunions, and high-security private celebrations tailored to complete discretion.',
      features: ['Bespoke Luxury Styling', 'Private Security & Concierge', 'Gourmet Personal Chef', 'Customized Keepsakes'],
      andhraTouch: 'Royal Nawabi & Kakatiya dynasty inspired dining layouts with silver tableware.',
    },
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-wedding-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-marigold/15 border border-wedding-marigold/40 text-wedding-kumkum text-xs font-bold mb-4">
            <Sparkles className="w-4 h-4 text-wedding-kumkum" />
            <span>Sri Ram Events Signature Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-wedding-text">
            Our Service <span className="kumkum-text">Portfolio</span>
          </h2>
          <p className="mt-4 text-wedding-muted text-sm sm:text-base font-medium">
            From majestic Andhra weddings and corporate summits to intimate family celebrations—crafted with authentic Telugu cultural aesthetics.
          </p>
          <SingleLineRangoli variant="divider" color="#B80D22" className="my-2" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {[
            { id: 'all', label: 'All Services (14)' },
            { id: 'weddings', label: 'Weddings & Engagements' },
            { id: 'parties', label: 'Parties & Celebrations' },
            { id: 'corporate', label: 'Corporate & School' },
            { id: 'decor', label: 'Decor & Design' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-wedding-kumkum text-white border-wedding-kumkum shadow-md scale-105'
                  : 'bg-white text-wedding-text border-wedding-border hover:border-wedding-kumkum'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group wedding-card p-6 sm:p-8 rounded-3xl border border-wedding-border hover:border-wedding-kumkum transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-wedding-marigold text-white shadow-sm">
                  ★ Popular
                </div>
              )}

              <div>
                <div className="w-14 h-14 rounded-2xl bg-wedding-cream border border-wedding-border flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                <h3 className="text-xl font-extrabold text-wedding-text group-hover:text-wedding-kumkum transition-colors">
                  {service.name}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-wedding-muted leading-relaxed font-medium">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-wedding-muted font-medium">
                      <CheckCircle2 className="w-4 h-4 text-wedding-kumkum shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-wedding-border flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-wedding-kumkum flex items-center gap-1 transition-colors"
                >
                  <span>Explore Touch</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectService(service.name)}
                  className="px-4 py-2 rounded-xl bg-wedding-kumkum text-white font-bold text-xs hover:bg-red-700 transition-all shadow-sm"
                >
                  Book This
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl border border-wedding-border max-w-lg w-full relative shadow-2xl">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold"
              >
                ✕
              </button>

              <div className="text-5xl mb-4">{selectedService.icon}</div>
              <h3 className="text-2xl font-black text-wedding-text">{selectedService.name}</h3>
              <p className="mt-2 text-xs text-wedding-muted leading-relaxed font-medium">{selectedService.description}</p>

              <div className="mt-6 p-4 rounded-2xl bg-wedding-cream border border-wedding-border">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-wedding-kumkum flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" />
                  Authentic Andhra Village Touch
                </h4>
                <p className="text-xs text-wedding-text leading-relaxed font-medium">
                  {selectedService.andhraTouch}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    const sName = selectedService.name;
                    setSelectedService(null);
                    onSelectService(sName);
                  }}
                  className="flex-1 py-3 rounded-xl bg-wedding-kumkum text-white font-bold text-sm shadow-md hover:bg-red-700 transition-all"
                >
                  Get Instant Estimate
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="py-3 px-5 rounded-xl bg-wedding-cream text-wedding-text font-bold text-sm border border-wedding-border hover:bg-wedding-ivory transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
