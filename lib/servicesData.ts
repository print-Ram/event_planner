export interface ServiceGalleryImage {
  url: string;
  title: string;
  subtitle: string;
  tag: string;
}

export interface ServicePackageTier {
  name: string;
  tagline: string;
  priceRange: string;
  popular?: boolean;
  features: string[];
}

export interface ServiceOfferingItem {
  title: string;
  teluguTitle: string;
  description: string;
  bulletPoints: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  teluguName: string;
  teluguTag: string;
  badge: string;
  tagline: string;
  heroSummary: string;
  primaryIllustrationImage: string;
  masterBannerImage: string;
  galleryImages: ServiceGalleryImage[];
  highlights: string[];
  culturalHeritageNote: string;
  detailedOverview: string[];
  offerings: ServiceOfferingItem[];
  packageTiers: ServicePackageTier[];
  faqs: ServiceFAQ[];
  baseBudgetGuide: string;
  typicalDuration: string;
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'weddings',
    name: 'Grand Telugu Weddings',
    teluguName: 'వైభవోపేత తెలుగు పెళ్లిళ్లు',
    teluguTag: 'ప్రతి వేడుక ఒక మధుర జ్ఞాపకం • Every Celebration a Cherished Memory',
    badge: 'Signature Flagship',
    tagline: 'Authentic Telugu Tradition Meets Royal Floral Grandeur',
    heroSummary:
      'From traditional Pelli Kuthuru & Pelli Koduku ceremonial setups to breathtaking floral Kalyana Mandapams and grand evening receptions, Sri Ram Events brings Andhra Pradesh’s rich Vedic wedding traditions to life with unmatched warmth and punctuality.',
    primaryIllustrationImage: '/events/wedding.jpg',
    masterBannerImage: '/events/real/wedding_mandapam.jpg',
    galleryImages: [
      {
        url: '/events/real/wedding_mandapam.jpg',
        title: 'Traditional Floral Kalyana Mandapam',
        subtitle: 'Authentic wood-pillar mandapam with fragrant fresh marigold & jasmine garlands, banana stems, and sacred brass samai lamps.',
        tag: 'Mandapam Decor',
      },
      {
        url: '/events/real/haldi_mehendi.jpg',
        title: 'Vibrant Haldi & Mangala Snanam Setup',
        subtitle: 'Golden marigold curtains, brass floating urli, custom traditional divan, and auspicious Shubh Vivah backdrop.',
        tag: 'Pre-Wedding Rituals',
      },
      {
        url: '/events/real/reception_stage.jpg',
        title: 'Grand Reception Stage & Crystal Chandeliers',
        subtitle: 'Contemporary royal stage with cascading blush rose arch, fairy light curtain, and polished reflective stage.',
        tag: 'Reception & Lights',
      },
      {
        url: '/events/real/catering_feast.jpg',
        title: 'Authentic Ariti Aaku Wedding Feast',
        subtitle: 'Traditional Telugu banana leaf feast with ghee paruppu, curries, appalam, vadalu, and hot payasam.',
        tag: 'Kalyana Bhojanam',
      },
    ],
    highlights: [
      'Authentic Vedic Pelli Mandapam setups with fresh flora',
      'Dedicated styling for Haldi, Mehendi, Sangeet & Reception',
      'Sacred Muhurtham alignment & priest ritual stage assistance',
      'Full hall lighting, welcome arch, and red-carpet entryway',
    ],
    culturalHeritageNote:
      'In Telugu traditions, a wedding is not just an event; it is a sacred union sanctified through the Saptapadi, Jeelakarra Bellam, and Kanyadaanam. Our decor reveres these timeless customs with organic banana trunks, fresh mango leaves (maamidi aakulu), golden marigolds, and brass heritage elements.',
    detailedOverview: [
      'Sri Ram Events is the premier wedding planner in Madanapalle, serving Tirupati, Punganur, Kothakota, and towns across Andhra Pradesh. We understand the emotional significance and family pride attached to each wedding celebration.',
      'We work closely with both families from initial date finalization down to the farewell Bidai. Every detail—from the welcome entryway torans and bridal seating to the photo backdrops and dining hall coordination—is curated with perfection.',
      'Whether you are planning an intimate temple-side celebration or a 2,000-guest royal convention hall wedding, our team ensures 100% on-time completion hours before your sacred muhurtham time.',
    ],
    offerings: [
      {
        title: 'Traditional Kalyana Mandapam Decor',
        teluguTitle: 'సాంప్రదాయ కళ్యాణ మండపం',
        description:
          'Handcrafted mandapams designed with fragrant Bangalore roses, local yellow/orange marigolds, white jasmine, and banana stems, framed by brass deepams.',
        bulletPoints: [
          'Hand-tied fresh flower jhumkas and hanging floral tassels',
          'Pooja peethalu, homam stage insulation, and brass deepa sthambhas',
          'Groom & Bride ceremonial seating with auspicious silks',
          'Rear backdrop drapery with backlighting and flower wall crests',
        ],
      },
      {
        title: 'Haldi, Mehendi & Pelli Kuthuru Styling',
        teluguTitle: 'పసుపు దంచే వేడుక & మెహందీ అలంకరణ',
        description:
          'Bright, joyful setups tailored for cheerful pre-wedding photographs and family fun before the big day.',
        bulletPoints: [
          'Carved brass urlis for floral bath (Mangala Snanam)',
          'Vibrant yellow and orange marigold backdrop canopies',
          'Comfortable low seating with Rajasthani & Telugu bolsters',
          'Selfie booths with props, umbrellas, and custom signboards',
        ],
      },
      {
        title: 'Grand Reception Stage & Lighting Rig',
        teluguTitle: 'రాయల్ రిసెప్షన్ స్టేజ్ & లైటింగ్',
        description:
          'Stunning evening reception stages combining royal aesthetic backdrops, crystal chandeliers, floral arches, and warm mood lighting.',
        bulletPoints: [
          'High-contrast floral arch with exotic carnations and orchids',
          'DMX-controlled ambient LED warm par cans and spotlights',
          'Designer velvet couple couch and tiered floral side pillars',
          'Cold pyro fireworks and dry-ice fog entry for couple entrance',
        ],
      },
      {
        title: 'Guest Hospitality & Reception Logistics',
        teluguTitle: 'అతిథి మర్యాదలు & నిర్వహణ',
        description:
          'Full-service ground coordination ensuring guests feel pampered with traditional warmth from the moment they arrive.',
        bulletPoints: [
          'Uniformed welcome team greeting with chandan, rose water & kalkand',
          'Dining hall queue management and banana leaf feast timing',
          'Bridal entry umbrellas (Poola Chathri) and flower shower crew',
          'Dedicated on-site floor manager throughout the ceremonies',
        ],
      },
    ],
    packageTiers: [
      {
        name: 'Silver Heritage',
        tagline: 'Ideal for intimate halls & community center weddings (200-400 guests)',
        priceRange: '₹45,000 - ₹85,000',
        features: [
          'Traditional 4-Pillar Floral Mandapam with local marigold & jasmines',
          'Entrance gate welcome arch with floral bunches',
          'Bridal seating setup with auspicious brass deepams',
          'Stage floodlights & basic ambient hall illumination',
          'Coordination support on the wedding day',
        ],
      },
      {
        name: 'Gold Grandeur',
        tagline: 'Our most popular choice for grand convention hall weddings (500-1,200 guests)',
        priceRange: '₹1,20,000 - ₹2,40,000',
        popular: true,
        features: [
          'Royal Carved Mandapam or Crystal Canopy with fresh exotic flowers',
          'Pre-wedding Haldi/Mehendi setup with traditional urli & yellow canopy',
          'Grand evening Reception stage with crystal chandeliers & floral arch',
          'Grand entrance pathway with 6 floral pillars & red carpet walkway',
          'Dry ice fog & cold pyro entry for bride & groom entry',
          'Complete venue warm mood lighting & spotlighting package',
          'Dedicated on-site event commander & floor assistants',
        ],
      },
      {
        name: 'Royal Platinum Bespoke',
        tagline: 'Tailored luxury for landmark multi-day destination weddings (1,000+ guests)',
        priceRange: '₹3,00,000+',
        features: [
          'Custom 3D-modeled Mandapam architecture with unlimited fresh flowers',
          'Complete multi-event coverage: Pelli Kuthuru, Haldi, Sangeet & Reception',
          'Full venue thematic transformation (Hall, Dining, Exterior, Lawn)',
          'High-end intelligent moving-head concert lighting & truss rig',
          'Bespoke bridal entry concepts (Doli, Poola Chathri, cold sparklers)',
          'End-to-end guest hospitality desk & VIP management',
        ],
      },
    ],
    faqs: [
      {
        question: 'How far in advance should we book Sri Ram Events for our wedding?',
        answer:
          'Because auspicious Telugu wedding muhurtham dates (Subhamuhurthalu) are high-demand, we recommend reserving your date 2 to 4 months in advance. However, we also accommodate short-notice weddings subject to slot availability.',
      },
      {
        question: 'Do you provide services outside Madanapalle?',
        answer:
          'Yes! Madanapalle is our headquarters, and we regularly execute weddings across Tirupati, Punganur, Kothakota, Chittoor, Kadapa, and neighboring border towns in Karnataka.',
      },
      {
        question: 'Can we customize the flowers and colors of the Mandapam?',
        answer:
          'Absolutely. Every couple has a unique vision. We can match your wedding saree/attire color palettes, integrate specific sacred flowers like lotus, tuberoses, orchids, or lilies, and customize every dimension.',
      },
    ],
    baseBudgetGuide: '₹45,000 onwards',
    typicalDuration: '1 to 3 Days',
  },
  {
    id: 'birthdays',
    name: 'Joyous Birthdays & Milestones',
    teluguName: 'పుట్టినరోజు & మైల్‌స్టోన్ వేడుకలు',
    teluguTag: 'సంతోషాన్ని అందంగా జరుపుకుందాం • Celebrating Happiness Beautifully',
    badge: 'Kids & Milestone',
    tagline: 'Magical Balloon Castles, Custom Themed Stages & Joyful Fun',
    heroSummary:
      'Transform your child’s dream or a 50th/60th/80th golden milestone into a fairy-tale reality with creative balloon arches, LED neon boards, themed dessert stages, magic shows, and delightful party hospitality.',
    primaryIllustrationImage: '/events/birthdays.jpg',
    masterBannerImage: '/events/real/birthday_stage.jpg',
    galleryImages: [
      {
        url: '/events/real/birthday_stage.jpg',
        title: 'Pastel Luxury Birthday Stage & Neon Sign',
        subtitle: 'Organic balloon garland in champagne gold, blush & cream, illuminated Happy Birthday LED neon, and floral plinths.',
        tag: 'Stage & Cake Table',
      },
      {
        url: '/events/real/theme_party_stage.jpg',
        title: 'Vibrant Kids Glow & Disco Dance Setup',
        subtitle: 'Playful neon frames, photobooth props, dynamic laser lighting, and celebratory confetti shower.',
        tag: 'Fun & Entertainment',
      },
      {
        url: '/events/birthdays.jpg',
        title: 'Cute Cartoon & Fantasy Themed Decor',
        subtitle: 'Bespoke character cutouts, balloon arches, and customized candy plinths designed for little stars.',
        tag: 'Thematic Art',
      },
      {
        url: '/events/real/catering_feast.jpg',
        title: 'Party Snacks, Cake & Live Counters',
        subtitle: 'Fresh live counters, cotton candy, popcorn, and mouth-watering Andhra festive feasts for family and guests.',
        tag: 'Party Treats',
      },
    ],
    highlights: [
      'Custom theme designs: Jungle Safari, Boss Baby, Princess, Space & Superhero',
      'Organic balloon garland sculpting with zero-burst premium latex',
      'Illuminated LED numerical marquee numbers & personalized name signs',
      'Entertainer coordination: Magicians, Tattoo artists, Game hosts & Mascots',
    ],
    culturalHeritageNote:
      'From 1st Birthday Ayushya Homam and cradle milestones (Uyyala pandaga) to 60th Shashti Poorthi and 80th Sathabhishekam, we honor traditional Telugu longevity rituals alongside fun modern party styling.',
    detailedOverview: [
      'Every birthday represents a treasured milestone in a family’s journey. At Sri Ram Events, we believe birthday celebrations should be completely stress-free for parents while delivering boundless wonder for children and guests.',
      'From selecting the perfect color scheme to coordinating customized backdrops, cake plinths, and lighting, our team handles the entire setup with finesse and high safety standards.',
      'We also organize age-appropriate entertainers including professional magicians, caricature artists, game anchors, and mascot characters that keep all children happily engaged throughout the party.',
    ],
    offerings: [
      {
        title: 'Custom Thematic Cake Backdrop & Stage',
        teluguTitle: 'బర్త్‌డే కేక్ స్టేజ్ & బ్యాక్‌డ్రాప్',
        description:
          'Designer circular or arch backdrops customized with your child’s name, photos, and chosen theme.',
        bulletPoints: [
          'Theme-based 3D cutouts, acrylic plinths, and dessert risers',
          'High-density organic balloon garlands matching color palettes',
          'Neon LED cursive name lights and warm spotlighting',
          'Themed red carpet runner or grass turf floor finish',
        ],
      },
      {
        title: 'Welcome Archway & Entrance Decor',
        teluguTitle: 'స్వాగత తోరణం & ఎంట్రన్స్ డెకరేషన్',
        description:
          'Exciting entrance styling that greets every guest with immediate party energy from the hallway.',
        bulletPoints: [
          'Spiral or organic balloon gate archway at the venue door',
          'Personalized welcome easel stand with child’s photo & milestone stats',
          'Floating helium balloon clusters and pathway luminaries',
        ],
      },
      {
        title: 'Interactive Fun & Entertainment Package',
        teluguTitle: 'మ్యాజిక్ షో & గేమ్స్ నిర్వహణ',
        description:
          'Keeps the young guests energized and laughing with professional entertainers and activities.',
        bulletPoints: [
          'Professional stage magic show and comedy illusions',
          'Temporary skin-safe tattoo and face painting artists',
          'Live carnival snack stalls: Cotton Candy, Sweet Corn & Popcorn',
          'Return gift packing and customized souvenir distribution desk',
        ],
      },
      {
        title: 'Milestone Celebrations (Shashti Poorthi / Sathabhishekam)',
        teluguTitle: 'షష్టిపూర్తి & శతాభిషేకం వేడుకలు',
        description:
          'Dignified, auspicious styling for parents’ and grandparents’ 60th and 80th milestone celebrations.',
        bulletPoints: [
          'Traditional brass and fresh marigold homam setup',
          'Dignified floral stage seating for elders with foot-rest peethalu',
          'Memory photo gallery wall capturing family history through the decades',
          'Comfortable seating and acoustic audio for devotional and family speeches',
        ],
      },
    ],
    packageTiers: [
      {
        name: 'Little Star Package',
        tagline: 'Perfect for cozy home or apartment hall parties (30-80 guests)',
        priceRange: '₹12,000 - ₹20,000',
        features: [
          'Circular or panel backdrop with 400+ premium pastel balloons',
          'Personalized Happy Birthday banner & child’s name cutout',
          'Cylindrical cake plinths with cake stand',
          'Warm ambient spotlights on stage',
          'Balloon entrance gate arch',
        ],
      },
      {
        name: 'Theme Wonderland',
        tagline: 'Our top choice for party hall celebrations with games (80-250 guests)',
        priceRange: '₹25,000 - ₹45,000',
        popular: true,
        features: [
          'Full thematic 3D backdrop (Safari, Princess, Superhero, Space, etc.)',
          'Custom LED neon sign & illuminated 3D marquee age number',
          'Organic double-density balloon arch with chrome accents',
          'Professional party host / game anchor for 2 hours',
          'Live popcorn or cotton candy machine with operator',
          'Welcome photo easel board & entry arch',
        ],
      },
      {
        name: 'Royal Extravaganza',
        tagline: 'Grand scale celebration with full entertainment (250+ guests)',
        priceRange: '₹55,000 - ₹95,000',
        features: [
          'Grand multi-layer 3D stage setup with floral & balloon synthesis',
          'Complete venue ceiling & hall draping transformation',
          'Professional magic show + balloon twisting artist + face painter',
          'Two carnival food live counters (Popcorn + Cotton Candy)',
          'Photo-booth zone with instant props & selfie station',
          'Sound system, DJ lights, and confetti cannon blast during cake cutting',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you set up birthday decor inside our home or apartment?',
        answer:
          'Yes! We design flexible setups that fit beautifully inside living rooms, terrace spaces, society clubhouses, or commercial banquet halls without causing any damage to walls or ceilings.',
      },
      {
        question: 'How early do you arrive to set up the decor?',
        answer:
          'Our team arrives 3 to 4 hours prior to the scheduled party start time. Everything is fully inflated, tested, and staged at least 45 minutes before guests arrive.',
      },
      {
        question: 'Can we request customized themes not listed on the website?',
        answer:
          'Yes, absolutely. We create custom cutouts and backdrops for any theme or cartoon character your child loves with 3-4 days advance notice.',
      },
    ],
    baseBudgetGuide: '₹12,000 onwards',
    typicalDuration: '4 to 6 Hours',
  },
  {
    id: 'house-warming',
    name: 'House Warming (Gruhapravesam)',
    teluguName: 'శుభ గృహప్రవేశం',
    teluguTag: 'మన సంస్కృతి... మన వేడుకల్లో • Our Culture in Every Celebration',
    badge: 'Auspicious Rituals',
    tagline: 'Sacred Mango Toranalu, Brass Kalasham & Auspicious Blessing',
    heroSummary:
      'Step into your new home with prosperity, positivity, and traditional sanctity. Sri Ram Events crafts auspicious Gruhapravesam decor with fresh mango leaves (maamidi aakulu), golden marigolds, brass deepams, and Gomatha pooja arrangements.',
    primaryIllustrationImage: '/events/house_warming.jpg',
    masterBannerImage: '/events/real/housewarming_entrance.jpg',
    galleryImages: [
      {
        url: '/events/real/housewarming_entrance.jpg',
        title: 'Auspicious Threshold Decor & Brass Kalasham',
        subtitle: 'Intricately arranged green mango leaf toranalu, orange marigold garlands, sacred brass kalash pots with coconut, and glowing kuthu vilakku oil lamps.',
        tag: 'Main Door Toran',
      },
      {
        url: '/events/real/catering_feast.jpg',
        title: 'Gruhapravesam Satyanarayana Prasadam & Feast',
        subtitle: 'Traditional Andhra pure vegetarian feast and divine prasadam arranged for relatives and honored guests.',
        tag: 'Auspicious Feast',
      },
      {
        url: '/events/house_warming.jpg',
        title: 'Pooja Mandapam & Hall Illumination',
        subtitle: 'Sacred Satyanarayana Swamy vratham peetham, yellow marigold backdrop, and brass aarti lamps.',
        tag: 'Pooja Setup',
      },
      {
        url: '/events/real/reception_stage.jpg',
        title: 'Terrace & Lawn Dinner Seating',
        subtitle: 'Warm fairy light canopy and comfortable dining arrangement for friends, neighbors, and extended family.',
        tag: 'Guest Dining',
      },
    ],
    highlights: [
      'Authentic fresh Maamidi Aakulu (Mango leaves) & Marigold entrance toranalu',
      'Satyanarayana Swamy Vratham & Vastu Homam mandapam arrangement',
      'Gomatha Pooja pathway styling with sacred turmeric threshold decor',
      'Milk boiling ceremony (Paalu Ponginchatam) traditional stove setup',
    ],
    culturalHeritageNote:
      'Entering a new house in Andhra Pradesh is one of life’s most sacred occasions. From the morning Gomatha Pradakshina and auspicious milk boiling (Paalu Ponginchatam) to the evening Satyanarayana Swamy Vratham, every second requires spiritual cleanliness and reverent beauty.',
    detailedOverview: [
      'Building or acquiring a new home is a lifelong dream fulfilled. Sri Ram Events ensures your Gruhapravesam is treated with the sanctity, tradition, and dignity it deserves.',
      'We bring fresh, farm-sourced mango leaves, pristine yellow and orange marigolds, fragrant jasmines, and authentic brass heritage decor to create an atmosphere steeped in Vedic warmth.',
      'Our dedicated team handles the door frame toran installations, pooja room backdrop, homam kundam floor protection, and guest hospitality so you and your family can focus entirely on the sacred rituals.',
    ],
    offerings: [
      {
        title: 'Simhadwara (Main Entrance) Sacred Toranalu',
        teluguTitle: 'సింహద్వారం మామిడి తోరణాలు',
        description:
          'Stunning front doorway decor that welcomes Goddess Lakshmi and all blessings into your home.',
        bulletPoints: [
          'Thickly woven fresh mango leaf (maamidi aakulu) and marigold torans',
          'Carved brass Kalasham pots with husked coconut and betel leaves',
          'Twin tall traditional brass deepa sthambhas with fresh wick oil',
          'Natural flower rangoli framing the door threshold with turmeric & kumkum',
        ],
      },
      {
        title: 'Pooja Room & Homam Peetham Setup',
        teluguTitle: 'పూజా మందిరం & హోమ వేదిక',
        description:
          'Reverent sanctum decor for Ganapathi Homam, Navagraha Pooja, and Satyanarayana Swamy Vratham.',
        bulletPoints: [
          'Auspicious yellow cloth backdrop decorated with jasmine strings',
          'Vastu Homam heat-resistant floor insulation & brass vessel stand',
          'Peetham platform for priest and couple with silk asanas',
          'Brass pooja utensils, bell, sambrani holder, and camphor plate setup',
        ],
      },
      {
        title: 'Paalu Ponginchatam (Milk Boiling) Setup',
        teluguTitle: 'పాలు పొంగించే సాంప్రదాయ వేదిక',
        description:
          'Auspicious kitchen counter or center-hall decorative setup for the ceremonial first milk boiling.',
        bulletPoints: [
          'Auspicious earthen or brass pot adorned with turmeric & kumkum dots',
          'Floral base ring and fresh cow dung cake/charcoal stove or brass burner',
          'Decorated platform for family elders to gather and shower blessings',
        ],
      },
      {
        title: 'Terrace & Lawn Guest Hospitality',
        teluguTitle: 'అతిథుల విందు & లైటింగ్ సదుపాయం',
        description:
          'Comfortable seating and warm lighting across terraces or courtyards for guest dining and socializing.',
        bulletPoints: [
          'Golden fairy light string canopy across balcony, terrace, and railings',
          'Covered dining tables with banana leaf seating arrangements',
          'Drinking water counter and dedicated waste disposal bins',
        ],
      },
    ],
    packageTiers: [
      {
        name: 'Subham Astu',
        tagline: 'Standard traditional setup for apartments & compact independent houses',
        priceRange: '₹15,000 - ₹25,000',
        features: [
          'Simhadwara main entrance mango & marigold toranam',
          'Pooja room floral background with yellow marigold tassels',
          'Pair of brass deepams & threshold floral borders',
          'Floor safety mat for Homam rituals',
          'Clean pack-up after ceremonies',
        ],
      },
      {
        name: 'Mahalakshmi Vaibhavam',
        tagline: 'Our recommended complete setup for independent homes & villas',
        priceRange: '₹30,000 - ₹55,000',
        popular: true,
        features: [
          'Grand entrance archway with banana trunks, mango leaves & marigold cascades',
          'Complete Pooja Mandapam & Satyanarayana Vratham peetham with exotic flowers',
          'Brass Kalash pair, samai lamps, and floral rangoli with brass urli',
          'Exterior fairy light illumination for house front elevation & terrace',
          'Dining hall banana leaf seating and dining setup support',
        ],
      },
      {
        name: 'Divya Gruhapravesam',
        tagline: 'Luxury royal decor with complete venue lighting for large bungalows',
        priceRange: '₹65,000 - ₹1,20,000',
        features: [
          'Bespoke architectural floral styling across entire property (Gate to Terrace)',
          'Grand entryway tunnel with hanging marigold bells & warm uplighting',
          'Carved wooden traditional pooja mandapam with fragrant jasmine curtains',
          'Full building serial lighting facade & landscape warm floodlights',
          'Dedicated hospitality assistants & guest gift coordination',
        ],
      },
    ],
    faqs: [
      {
        question: 'What time will the entrance toran and pooja mandapam be ready?',
        answer:
          'Gruhapravesam rituals usually begin in the early morning Brahma Muhurtham (e.g. 4:00 AM - 6:00 AM). Our team completes all installations the previous evening and performs final floral touch-ups 2 hours before your priest’s scheduled arrival.',
      },
      {
        question: 'Do you provide the brass deepams and pooja peethalu?',
        answer:
          'Yes! We provide authentic, polished brass deepams, samai lamps, brass urlis, wooden peethalu, and decorative brass kalash pots as part of our package rentals.',
      },
      {
        question: 'Can you illuminate the house exterior with serial lighting?',
        answer:
          'Yes, we provide safe, high-grade weatherproof warm white LED fairy strings and spotlights to illuminate the house facade, balconies, and compound walls.',
      },
    ],
    baseBudgetGuide: '₹15,000 onwards',
    typicalDuration: '1 Day (Morning to Afternoon)',
  },
  {
    id: 'catering',
    name: 'Authentic Andhra Catering',
    teluguName: 'నోరూరించే ఆంధ్ర సాంప్రదాయ విందు',
    teluguTag: 'రుచికరమైన విందు... మరువలేని ఆతిథ్యం • Delicious Feast... Unforgettable Hospitality',
    badge: 'Gourmet Feast',
    tagline: 'Pure Ghee Delicacies, Banana Leaf Feasts & Live Counters',
    heroSummary:
      'A true Telugu celebration is remembered by the food served to loved ones. Sri Ram Events brings authentic Rayalaseema and coastal Andhra flavors prepared by master vantalu chefs using pure ghee, fresh ingredients, and served with traditional humility.',
    primaryIllustrationImage: '/events/caterings.jpg',
    masterBannerImage: '/events/real/catering_feast.jpg',
    galleryImages: [
      {
        url: '/events/real/catering_feast.jpg',
        title: 'Authentic Ariti Aaku Wedding Feast',
        subtitle: 'Rows of fresh green banana leaves loaded with steaming hot rice, podi, pure ghee, sambar, vadas, crispy appalam, and rich badam payasam.',
        tag: 'Traditional Feast',
      },
      {
        url: '/events/real/wedding_mandapam.jpg',
        title: 'Pristine Dining Hall & Service Management',
        subtitle: 'Hygienic table runners, stainless steel tumblers, and courteous uniformed hospitality staff.',
        tag: 'Service Quality',
      },
      {
        url: '/events/caterings.jpg',
        title: 'Live Tiffin & Chat Counters',
        subtitle: 'Sizzling hot live dosas, button idlis, filter coffee, and evening chats for family gatherings.',
        tag: 'Live Counters',
      },
      {
        url: '/events/real/reception_stage.jpg',
        title: 'Royal Buffet Spread & Dessert Display',
        subtitle: 'Multi-cuisine vegetarian & non-vegetarian spreads with chafing dishes and decorative fruit displays.',
        tag: 'Evening Buffet',
      },
    ],
    highlights: [
      'Pure Ghee Telugu Specialties: Pappu-Nethi, Gutti Vankaya, Avakaya, Sambar & Payasam',
      'Traditional Banana Leaf (Ariti Aaku) sit-down service or luxury buffet setups',
      'Hygienic kitchen protocols with mineral water cooking and premium ingredients',
      'Uniformed, courteous serving boys trained in traditional hospitality',
    ],
    culturalHeritageNote:
      'In our tradition, "Athithi Devo Bhava" is lived through the food we serve. Serving hot rice with fresh ghee, followed by aromatic sambar, rasam, crisps, and cooling curd on a fresh banana leaf represents the highest form of respect to wedding guests.',
    detailedOverview: [
      'Sri Ram Events culinary team has delighted over 100,000+ guests across Madanapalle, Tirupati, Punganur, and surrounding districts. We take immense pride in our authentic recipes passed down through generations.',
      'From morning pelli tiffin with steaming idlis, crispy medu vadas, and authentic Rayalaseema karam chutney to grand 24-item royal wedding feasts, we guarantee unmatched taste and pristine hygiene.',
      'Every catering order is cooked using branded ingredients, fresh cold-pressed oils, pure country ghee, and 100% RO purified water with dedicated supervision from master chefs.',
    ],
    offerings: [
      {
        title: 'Traditional Ariti Aaku (Banana Leaf) Grand Feast',
        teluguTitle: 'సాంప్రదాయ అరిటాకు భోజనం',
        description:
          'The crowning glory of any South Indian wedding or auspicious ceremony, served in courses with reverence.',
        bulletPoints: [
          'Sweet: Bobbatlu with ghee, Kasi Halwa, or Dry Fruit Payasam',
          'Starter: Medu Vada / Mirchi Bajji with peanut-ginger chutney',
          'Main: Steaming sona masoori rice, Mudda Pappu, pure cow ghee, Gongura & Avakaya',
          'Curries: Gutti Vankaya Kura, Bendakaya Fry, Potato Roast, and Paneer Butter Masala',
          'Liquids: Drumstick Sambar, Tomato Pepper Charu (Rasam), and thick sweet Curd with Appalam',
        ],
      },
      {
        title: 'Morning Breakfast & Tiffin Feasts',
        teluguTitle: 'ఉదయం టిఫిన్లు & ఫిల్టర్ కాఫీ',
        description:
          'Energizing breakfast spread served piping hot to early morning attendees and family members.',
        bulletPoints: [
          'Steaming Mallige Idli with Sambhar & two authentic chutneys',
          'Golden crispy Medu Vada and Mysore Bonda',
          'Live Masala & Ghee Roast Dosa counter on demand',
          'Traditional Rava Upma & Kesari Bath',
          'Authentic Kumbakonam degree-style Filter Coffee in brass davarah',
        ],
      },
      {
        title: 'Grand Evening Reception Buffet',
        teluguTitle: 'రాయల్ రిసెప్షన్ బఫే విందు',
        description:
          'Modern multi-cuisine spreads combining North Indian gravies, Chinese starters, and South Indian classics.',
        bulletPoints: [
          'Soup counter: Tomato Basil / Veg Sweet Corn / Mutton Marag',
          'Biryani feast: Dum Veg Biryani or Authentic Andhra Dum Mutton/Chicken Biryani',
          'Roti counter: Live Tandoori Naan, Butter Roti with Paneer Tikka Masala',
          'Dessert studio: Hot Gulab Jamun with vanilla ice cream, Rasmalai, and Fruit Salad',
        ],
      },
      {
        title: 'Live Street Food & Beverage Kiosks',
        teluguTitle: 'లైవ్ చాట్ & కూల్ డ్రింక్ కౌంటర్లు',
        description:
          'Interactive live stations that keep evening guests entertained and snacking with delight.',
        bulletPoints: [
          'Live Pani Puri, Dahi Puri, and Pav Bhaji counters',
          'Fresh Fruit Juices, Mojito Bar, and Tender Coconut water stall',
          'Sweet Beeda & traditional Pan counter for after-meal digestion',
        ],
      },
    ],
    packageTiers: [
      {
        name: 'Standard Festive Feast',
        tagline: 'Ideal for Gruhapravesam, Cradle & Family Gatherings (100-300 plates)',
        priceRange: '₹160 - ₹220 / plate',
        features: [
          '1 Traditional Sweet (Semya Payasam or Mysore Pak)',
          '1 Hot Snack (Medu Vada or Mirchi Bajji)',
          'Mudda Pappu + Ghee + Sambar + Rasam + Curd',
          '2 Veg Curries (Gutti Vankaya / Potato Fry)',
          'Papad, Pickle, Banana Leaf & Mineral Water tumblers',
          'Uniformed serving crew included',
        ],
      },
      {
        name: 'Grand Kalyana Bhojanam',
        tagline: 'Our signature 21-item royal wedding feast (300-1,500 plates)',
        priceRange: '₹260 - ₹380 / plate',
        popular: true,
        features: [
          '2 Sweets (Pure Ghee Bobbatlu + Dry Fruit Payasam)',
          '2 Hot Starters (Medu Vada + Vegetable Cutlet)',
          'Aromatic Veg Biryani + Mirchi Ka Salan + Raitha',
          'Pure Ghee, Mudda Pappu, Gongura Thokku, Avakaya',
          '3 Premium Curries: Paneer Makhani, Bendakaya Cashew Fry, Capsicum Masala',
          'Drumstick Sambar, Miriyala Charu, Sweet Curd, Chips, Appalam',
          'Ice Cream scoop + Sweet Beeda counter',
          'Full dining hall cleanup and table waste clearance crew',
        ],
      },
      {
        name: 'Royal Multi-Cuisine Feast',
        tagline: 'Gourmet North + South + Live Counters for Elite Receptions',
        priceRange: '₹420 - ₹650 / plate',
        features: [
          'Welcome Drink (Tender Coconut Punch / Mojito)',
          '2 Live Counters (Live Tandoori Naans + Live Dosa/Chaat)',
          'Authentic Dum Biryani (Veg or Non-Veg option)',
          '4 Gourmet Gravies + Fried Starters + Salads',
          'Luxury Dessert Bar: Hot Malpua with Rabdi, Gulab Jamun & Kulfi',
          'Designer Chafing dishes, cutlery, and premium guest hospitality',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you offer food tasting prior to final contract booking?',
        answer:
          'Yes! For weddings and large events with 300+ guests, we can arrange a food tasting session at our Madanapalle kitchen facility by prior appointment.',
      },
      {
        question: 'Is mineral water used for all cooking and food preparation?',
        answer:
          'Yes, 100%. We use certified RO mineral water for all food preparation, boiling, and beverage service to guarantee health and safety.',
      },
      {
        question: 'What is the minimum guest count for catering services?',
        answer:
          'We cater events starting from 50 guests up to 3,000+ guests with complete logistics, chafing dish sets, and uniformed serving crew.',
      },
    ],
    baseBudgetGuide: '₹160 / plate onwards',
    typicalDuration: 'Meal Service Hours',
  },
  {
    id: 'private-events',
    name: 'Private Celebrations & Receptions',
    teluguName: 'ప్రైవేట్ వేడుకలు & గ్రాండ్ రిసెప్షన్స్',
    teluguTag: 'మీ కలల వేడుకకు మా సృజనాత్మకత తోడు • Creativity for Your Dream Celebration',
    badge: 'Bespoke Experience',
    tagline: 'Intimate Family Galas, Anniversaries & Cradle Ceremonies',
    heroSummary:
      'From luxurious 25th wedding anniversaries and high-end cocktail parties to cradle ceremonies (Namakaranam / Uyyala Pandaga), we design cozy, classy, and emotionally heartwarming private gatherings tailored to your personal aesthetic.',
    primaryIllustrationImage: '/events/private_events.jpg',
    masterBannerImage: '/events/real/reception_stage.jpg',
    galleryImages: [
      {
        url: '/events/real/reception_stage.jpg',
        title: 'Chandelier Evening Reception Stage',
        subtitle: 'Crystal chandeliers, blush pink florals, velvet lounge furniture, and romantic lighting.',
        tag: 'Gala Stage',
      },
      {
        url: '/events/real/haldi_mehendi.jpg',
        title: 'Intimate Cradle & Naming Ceremony Decor',
        subtitle: 'Traditional wooden cradle (Uyyala) decorated with marigolds and fresh jasmine garlands.',
        tag: 'Namakaranam',
      },
      {
        url: '/events/private_events.jpg',
        title: 'Cozy Dining & Table Aesthetics',
        subtitle: 'Custom table centerpieces, candlelit runners, and personalized family photo displays.',
        tag: 'Table Styling',
      },
      {
        url: '/events/real/theme_party_stage.jpg',
        title: 'Acoustic Music & Ambient Lighting Rig',
        subtitle: 'High-fidelity audio soundscapes and gentle mood lighting for unforgettable family conversations.',
        tag: 'Atmosphere',
      },
    ],
    highlights: [
      'Tailored themes for Silver & Golden Wedding Anniversaries',
      'Namakaranam & Uyyala Pandaga traditional flower-decked cradle styling',
      'Intimate sit-down dinner tables with floral centerpieces and candles',
      'Live acoustic musicians, violinists, or private sound systems',
    ],
    culturalHeritageNote:
      'Milestones like a baby’s 21st-day naming ceremony (Namakaranam), ear-piercing (Karna Vedha), or parents’ 25th anniversary deserve deep personal sentiment, warmth, and attention to detail that large commercial vendors overlook.',
    detailedOverview: [
      'Private celebrations require a warm, refined touch where guests feel close, comfortable, and cherished. Sri Ram Events creates charming intimate spaces that reflect your family’s unique personality.',
      'We curate custom photo memory walkways that narrate the couple’s journey across 25 years, or design adorable cradle setups draped in fragrant mallipoo (jasmine) and golden silk for your newborn.',
      'Every acoustic detail, lighting temperature, and table runner is thoughtfully positioned to foster laughter, joyous conversations, and timeless family photographs.',
    ],
    offerings: [
      {
        title: 'Namakaranam (Naming Ceremony) & Traditional Cradle Decor',
        teluguTitle: 'నామకరణం & ఉయ్యాల అలంకరణ',
        description:
          'Sweet, auspicious setups for welcoming the newest member of your family into the world.',
        bulletPoints: [
          'Hand-carved wooden or brass cradle draped in fresh jasmine & rose petals',
          'Soft pastel or golden silk backdrop with baby’s illuminated name crest',
          'Comfortable mother-and-baby elevated seating with hygienic floral cushioning',
          'Gift display table and auspicious brass kalash arrangement',
        ],
      },
      {
        title: 'Silver & Golden Wedding Anniversary Galas',
        teluguTitle: '25వ & 50వ పెళ్లిరోజు మహోత్సవం',
        description:
          'Elegant stages celebrating lifelong love, companionship, and family achievements.',
        bulletPoints: [
          'Walk down memory lane: Illuminated chronological photo timeline wall',
          'Romantic floral arch with blush roses, white hydrangeas & fairy light curtain',
          'Bespoke couple lounge sofa and champagne flute table setup',
          'AV slideshow projection screen showcasing historic family videos',
        ],
      },
      {
        title: 'Cocktail & Evening Lounge Styling',
        teluguTitle: 'ఈవెనింగ్ లాంజ్ & క్యాండిల్‌లైట్ డిన్నర్',
        description:
          'Chic contemporary lighting and furniture arrangements for private celebrations and reunions.',
        bulletPoints: [
          'Low cocktail tables with warm votive candles and floral bouquets',
          'Warm Edison bulb lighting arrays and ambient uplighting',
          'Acoustic sound setup for soft retro Telugu melodies and speech microphones',
        ],
      },
      {
        title: 'Personalized Keepsakes & Guest Favors',
        teluguTitle: 'ప్రత్యేక రిటర్న్ గిఫ్ట్‌లు',
        description:
          'Customized gift packing that leaves each relative and close friend with a heartfelt memory.',
        bulletPoints: [
          'Custom printed gift boxes with family monogram and personalized note',
          'Traditional tamboolam bag packing with dry fruits, kumkum & sweets',
          'Instant photo print corner for guests to take framed memories home',
        ],
      },
    ],
    packageTiers: [
      {
        name: 'Cozy Family Gathering',
        tagline: 'Ideal for intimate home or club ceremonies (30-100 guests)',
        priceRange: '₹18,000 - ₹32,000',
        features: [
          'Custom floral backdrop or decorated cradle setup',
          'Warm ambient stage spotlighting and name plate cutout',
          'Welcome easel stand and memory photo gallery',
          'Floor setup & packing assistance',
        ],
      },
      {
        name: 'Milestone Elegance',
        tagline: 'Our premier package for 25th Anniversaries & Grand Cradle Fests (100-300 guests)',
        priceRange: '₹38,000 - ₹68,000',
        popular: true,
        features: [
          'Grand chandelier stage with fresh imported flowers and arch',
          'Illuminated photo memory walkway with 20+ framed moments',
          'Luxury couple lounge seating with side floral columns',
          'Acoustic sound system with wireless mics for speeches',
          'Complete venue warm mood lighting & fairy light runners',
        ],
      },
      {
        name: 'VIP Private Gala',
        tagline: 'End-to-end luxury hospitality for elite family celebrations',
        priceRange: '₹80,000 - ₹1,50,000',
        features: [
          'Bespoke ballroom or open-lawn transformation with designer truss',
          'Live instrumental music coordination (Violin / Flute / Saxophone)',
          'Customized interactive dessert bar & mocktail counter setup',
          'Dedicated personal event coordinator from start to finish',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you organize Namakaranam ceremonies at home?',
        answer:
          'Yes, we specialize in transforming living rooms, courtyards, and terraces into divine cradle sanctuaries with complete safety and zero mess.',
      },
      {
        question: 'How do you handle audio for speeches and family memories?',
        answer:
          'We provide discreet, crystal-clear acoustic sound systems with high-grade cordless microphones so everyone can comfortably hear vows, speeches, and video audio without ear-piercing loudness.',
      },
      {
        question: 'Do you arrange custom return gifts for our guests?',
        answer:
          'Yes, we curate and package customized return gifts—from traditional brass deepams and sweets to personalized memory frames—within your chosen budget.',
      },
    ],
    baseBudgetGuide: '₹18,000 onwards',
    typicalDuration: '4 to 6 Hours',
  },
  {
    id: 'school-events',
    name: 'School & College Cultural Fests',
    teluguName: 'స్కూల్ & కాలేజ్ వార్షికోత్సవాలు',
    teluguTag: 'ప్రతిభకు వేదిక... ఉత్సాహభరిత వేడుక • A Stage for Talent... A Vibrant Celebration',
    badge: 'Institutional Fests',
    tagline: 'High-Impact Stages, Concert Audio, LED Walls & Sports Meets',
    heroSummary:
      'Bring stadium energy and professional concert production to your educational institution. Sri Ram Events powers Annual Days, Youth Fests, Sports Meets, and Graduation Galas with massive stages, high-output line-array audio, dynamic LED video backdrops, and seamless crowd coordination.',
    primaryIllustrationImage: '/events/school_events.jpg',
    masterBannerImage: '/events/real/college_fest_stage.jpg',
    galleryImages: [
      {
        url: '/events/real/college_fest_stage.jpg',
        title: 'Concert Mega Stage & High-Tech LED Video Wall',
        subtitle: 'High-resolution digital LED backdrop wall, moving beam stage lights, podium, and energetic student performers.',
        tag: 'Annual Day Stage',
      },
      {
        url: '/events/real/theme_party_stage.jpg',
        title: 'Youth Fest DJ & Laser Light Production',
        subtitle: 'Pumping subwoofers, laser effects, and smoke machines designed for electrifying student dance performances.',
        tag: 'Dance & AV',
      },
      {
        url: '/events/school_events.jpg',
        title: 'Trophy Counter & Graduation Setup',
        subtitle: 'Dignified stage styling for chief guests, prize distribution counters, and convocation ceremonies.',
        tag: 'Awards & Stage',
      },
      {
        url: '/events/real/reception_stage.jpg',
        title: 'VIP Seating & Shamiana Enclosures',
        subtitle: 'Waterproof German hangar tents, velvet chair covers, and red-carpet walkways for parents and dignitaries.',
        tag: 'Seating & Tents',
      },
    ],
    highlights: [
      'Gigantic outdoor and auditorium stage structures with heavy-duty load capacities',
      'P2.9 and P3.9 High-Definition LED video screens for live camera relay & graphics',
      'Professional line-array concert audio systems engineered for zero feedback',
      'Dignified podiums, lighting rigs, trophy presentation desks, and VIP shamianas',
    ],
    culturalHeritageNote:
      'School Annual Days and college cultural fests are seminal milestones where students showcase classical Kuchipudi dances, patriotic dramas, and contemporary arts. Our staging delivers the grandeur and respect their immense effort deserves.',
    detailedOverview: [
      'Sri Ram Events is trusted by leading schools, junior colleges, engineering colleges, and universities across Madanapalle, Tirupati, and Rayalaseema to manage their mega events with absolute safety and technical precision.',
      'From building robust stage platforms that safely hold 80+ dancing students simultaneously to providing concert-grade line-array sound and dynamic intelligent moving-head lighting, we take complete accountability.',
      'Our team also manages logistical essentials: generator backup systems, waterproof shamiana canopies, red carpet walkways, trophy tables, and microphone logistics for smooth non-stop show flow.',
    ],
    offerings: [
      {
        title: 'Concert Auditorium & Open Ground Stage Structures',
        teluguTitle: 'భారీ ఆడిటోరియం & గ్రౌండ్ స్టేజ్ నిర్మాణం',
        description:
          'Engineered stages with marine plywood flooring, non-slip vinyl coverings, and safety handrails.',
        bulletPoints: [
          'Configurable stage sizes: 30x20 ft, 40x30 ft, or 60x40 ft with ramps',
          'Heavy-duty aluminum box-truss lighting cages and roof setups',
          'Side wings for backstage green rooms and quick artist costume changes',
          'Red-carpet entrance pathways and dignity barriers for crowd control',
        ],
      },
      {
        title: 'High-Definition LED Video Wall & Live Multi-Cam Relay',
        teluguTitle: 'హై-డెఫినిషన్ LED వాల్ & లైవ్ ప్రసారం',
        description:
          'Crystal-clear visual displays so every parent sitting even in the last row enjoys every facial expression.',
        bulletPoints: [
          'Full P3.9 outdoor-rated ultra-bright LED digital backdrop',
          'Multi-camera setup with video mixer for instant live stage telecast',
          'Split-screen support for institution promo videos, PPTs & live student performances',
        ],
      },
      {
        title: 'JBL / RCF Concert Line-Array Sound Production',
        teluguTitle: 'కచేరీ స్థాయి లైన్-అరే సౌండ్ సిస్టమ్',
        description:
          'High-fidelity sound that covers thousands of attendees with balanced speech clarity and deep bass punch.',
        bulletPoints: [
          'Multi-box flying line array speaker clusters with heavy subwoofers',
          'Digital audio mixing console with 32+ channels and anti-howling feedback suppression',
          'Wireless lapel, headset, and podium microphones for chief guests and anchors',
          'In-ear monitors and floor wedge monitors for student singing and drama',
        ],
      },
      {
        title: 'Stage Lighting, Cold Pyro & Special Effects',
        teluguTitle: 'లైటింగ్, స్పెషల్ ఎఫెక్ట్స్ & కాన్ఫెట్టి',
        description:
          'Transforms cultural dance performances into television-grade spectacles.',
        bulletPoints: [
          'Sharpy moving head beam lights, LED wash cans, and follow-spots',
          'CO2 jet blast cannons and synchronized cold pyro fountains for grand finale',
          'Dual heavy-duty confetti air cannons blasting golden ribbons at show end',
        ],
      },
    ],
    packageTiers: [
      {
        name: 'School Auditorium Package',
        tagline: 'Ideal for indoor auditorium annual days & award ceremonies (300-800 attendees)',
        priceRange: '₹35,000 - ₹65,000',
        features: [
          'Stage decoration with thematic institution backdrop & flex framing',
          'Professional indoor sound system with 6 wireless microphones & podium mic',
          'Auditorium warm stage lighting + 8 LED RGB wash lights',
          'Chief guest podium styling, lamp lighting stand, and trophy display table',
          'Sound engineer and technician present throughout the event',
        ],
      },
      {
        name: 'Grand Mega Fest (Line-Array & Lights)',
        tagline: 'Our flagship choice for open-ground college fests & annual days (1,000-3,000 attendees)',
        priceRange: '₹85,000 - ₹1,80,000',
        popular: true,
        features: [
          'Engineered 40x30 ft raised stage structure with side green rooms',
          'Concert Line-Array audio system with dual bass bins & delay towers',
          'Full 4-pillar aluminum lighting box truss with 16 Sharpy beam lights',
          'High-output fog machines & multi-camera AV recording setup',
          'Silent diesel generator backup power system',
          'Complete floor technician crew & event production manager',
        ],
      },
      {
        name: 'University Stadium Production',
        tagline: 'Massive concert-grade production with full LED video wall (3,000+ attendees)',
        priceRange: '₹2,20,000 - ₹4,50,000',
        features: [
          'Gigantic 60x40 ft multi-level performance stage with heavy-duty roof',
          'Massive 30x12 ft P3.9 LED video screen + side delay screens',
          'Concert sound production with 16 line-array tops and 8 dual subs',
          'Intelligent computer-programmed lighting show with cold pyro & laser rig',
          'Waterproof German hangar enclosure setup for VIP and student seating',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you handle outdoor sports meets and ground shamianas as well?',
        answer:
          'Yes! In addition to cultural stage production, we provide complete ground shamianas, VIP tents, sports commentary sound systems, winner victory stands, and flag-hoisting pedestals.',
      },
      {
        question: 'Do you provide uninterrupted generator backup for power cuts?',
        answer:
          'Yes, we supply silent, high-capacity diesel generators (DG sets) with automatic changeover switches so the music and lights never stutter even for a second.',
      },
      {
        question: 'How early do you set up the stage for rehearsals?',
        answer:
          'For major annual days, our team builds the stage and installs the sound system 24 hours in advance so students and faculty can run complete dress rehearsals with microphones.',
      },
    ],
    baseBudgetGuide: '₹35,000 onwards',
    typicalDuration: '1 to 2 Days',
  },
  {
    id: 'theme-parties',
    name: 'Creative Theme Parties',
    teluguName: 'సృజనాత్మక థీమ్ పార్టీలు',
    teluguTag: 'సృజనాత్మకత నిండిన పండుగ • A Celebration Filled with Creativity',
    badge: 'Custom Themes',
    tagline: 'Neon Nights, Telugu Cinema Nostalgia & Immersive Worlds',
    heroSummary:
      'Break away from ordinary gatherings. From neon glow discos and vintage Telugu cinema nights to Bohemian garden parties and Arabian desert tents, Sri Ram Events constructs imaginative, photogenic worlds designed for unforgettable memories.',
    primaryIllustrationImage: '/events/theme_parties.jpg',
    masterBannerImage: '/events/real/theme_party_stage.jpg',
    galleryImages: [
      {
        url: '/events/real/theme_party_stage.jpg',
        title: 'Neon Nights & Photobooth Experience',
        subtitle: 'Geometric neon ceiling frames, glowing photobooth backdrop, DJ party booth, lasers, and celebratory confetti shower.',
        tag: 'Neon Party',
      },
      {
        url: '/events/real/reception_stage.jpg',
        title: 'Bohemian Garden & Fairy Light Canopy',
        subtitle: 'Earthy pampas grass, warm fairy light strings, low wooden tables, and macrame decor.',
        tag: 'Boho Chic',
      },
      {
        url: '/events/theme_parties.jpg',
        title: 'Retro Telugu Cinema & Filmy Night',
        subtitle: 'Vintage Tollywood movie posters, film roll cutouts, clapboard props, and retro lighting.',
        tag: 'Tollywood Theme',
      },
      {
        url: '/events/real/birthday_stage.jpg',
        title: 'Pastel Floral Fantasy Theme',
        subtitle: 'Dreamy pastel clouds, fairy light cascades, and artistic dessert pedestals.',
        tag: 'Fantasy Decor',
      },
    ],
    highlights: [
      'Tailored concepts: Neon Glow Disco, Retro Telugu Cinema, Bollywood Sangeet, Boho Garden',
      'Immersive photo-booths with customized wacky props and instant social media frames',
      'Dynamic DJ sound setups, laser projectors, blacklights, and smoke atmospheres',
      'Thematic table centerpieces, custom entry tunnels, and interactive party activities',
    ],
    culturalHeritageNote:
      'We infuse regional joy—from entertaining Tollywood movie nostalgia and iconic Telugu dialogues to vibrant village carnival (Jathara) themes—creating spaces where every guest smiles and starts clicking photos immediately.',
    detailedOverview: [
      'Want an event that people talk about for years? Theme parties are where our creative designers unleash pure imagination. We turn blank venues, lawns, or rooftops into themed universes.',
      'From custom-fabricated neon signs and blacklight ultraviolet rooms to rustic village setups complete with clay pots, bullock cart backdrops, and marigold canopies, no theme is impossible.',
      'Our team coordinates every sensory detail: themed welcome drinks, matching music playlists, playful party props, and customized lighting rigs that keep energy electric all night.',
    ],
    offerings: [
      {
        title: 'Neon Glow & EDM Club Experience',
        teluguTitle: 'నియాన్ గ్లో & డిస్కో పార్టీ',
        description:
          'High-energy party setup bathed in ultraviolet blacklights, vibrant neon geometrical structures, and laser light grids.',
        bulletPoints: [
          'Custom LED neon slogans ("Let’s Celebrate", "Party All Night")',
          'UV-reactive balloon sculptures and glowing geometric light frames',
          'Glow sticks, neon bracelets, and UV body paint station for guests',
          'DJ truss setup with party laser beams and atmospheric haze fog',
        ],
      },
      {
        title: 'Retro Telugu Cinema & Filmy Sangeet',
        teluguTitle: 'రెట్రో టాలీవుడ్ సినిమా థీమ్',
        description:
          'A nostalgic tribute to golden Tollywood with iconic movie cutouts, retro dialogues, and cinema aesthetics.',
        bulletPoints: [
          'Cinema reel photo-booth with director’s chair, clapboard & megaphone props',
          'Vintage movie poster walkway featuring legendary Telugu classics',
          'Movie premiere red carpet entryway with golden stanchions',
          'Customized movie ticket invitation cards and popcorn box styling',
        ],
      },
      {
        title: 'Bohemian Chic Garden & Lawn Party',
        teluguTitle: 'బోహో-చిక్ గార్డెన్ వేడుక',
        description:
          'Earthy, relaxed elegance combining dried pampas grass, macrame canopies, fairy lights, and cozy floor seating.',
        bulletPoints: [
          'Tepee tents adorned with warm fairy lights and wild floral arrangements',
          'Low picnic tables with macrame runners and woven cushion seating',
          'Warm Edison bulb festoon lighting strung across trees and poles',
          'Acoustic live guitar or violin background music integration',
        ],
      },
      {
        title: 'Interactive Photo-Booth & Prop Studio',
        teluguTitle: 'ఫోటో-బూత్ & ప్రాప్స్ స్టూడియో',
        description:
          'Dedicated photo-op zone with professional lighting so every guest leaves with Instagram-worthy pictures.',
        bulletPoints: [
          'Customized 3D backdrop matching your party theme and host names',
          'High-variety prop box: quirky Telugu dialogue placards, oversized glasses & hats',
          'Ring light and studio strobe flash illumination for smartphone cameras',
        ],
      },
    ],
    packageTiers: [
      {
        name: 'Themed Lounge',
        tagline: 'Ideal for intimate home terrace or club room parties (30-80 guests)',
        priceRange: '₹18,000 - ₹32,000',
        features: [
          'Custom themed backdrop with LED neon sign or movie poster collage',
          'Photo-booth zone with 20+ thematic party props',
          'Themed table centerpieces and ambient color wash lighting',
          'Welcome entryway signboard with customized event tagline',
        ],
      },
      {
        name: 'Total Theme Immersion',
        tagline: 'Our recommended full-room transformation for banquets & lawns (80-250 guests)',
        priceRange: '₹38,000 - ₹75,000',
        popular: true,
        features: [
          'Full venue transformation (Neon, Boho, Retro Tollywood, or Casino)',
          'High-power sound system + DJ setup with laser and beam lighting',
          'Interactive photo-booth with personalized print graphics',
          'Custom entry tunnel or archway matching the party theme',
          'Party accessories for all guests (Glow gear / filmy props)',
          'Haze smoke machine & confetti blast at peak celebration',
        ],
      },
      {
        name: 'Bespoke Concept Production',
        tagline: 'Custom architectural builds & festival environments (250+ guests)',
        priceRange: '₹95,000 - ₹1,80,000',
        features: [
          'Custom 3D fabricated set design (e.g. Village Jathara / Arabian Night / Royal Palace)',
          'Complete venue draping, ambient festoon lighting, and live food station styling',
          'Professional DJ, emcee/anchor, and interactive performer coordination',
          'Multi-angle photobooths with slow-motion 360-degree video booth option',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you bring an entirely custom theme idea to life?',
        answer:
          'Yes! We love ambitious ideas. If you have a theme in mind (e.g. Harry Potter, 90s Telugu Retro, Marvel, Great Gatsby), our creative team fabricates customized cutouts, backdrops, and lighting to execute it perfectly.',
      },
      {
        question: 'Do you provide DJ and music equipment for theme parties?',
        answer:
          'Yes, we provide professional JBL sound systems, party DJ consoles, party lights, and can arrange experienced event DJs who understand both modern chartbusters and energetic Telugu beats.',
      },
      {
        question: 'How long does the setup take?',
        answer:
          'Depending on the complexity, theme party transformations usually take 4 to 6 hours on the event day. Our team works cleanly and conducts a full sound/light test before guests arrive.',
      },
    ],
    baseBudgetGuide: '₹18,000 onwards',
    typicalDuration: '4 to 6 Hours',
  },
];

export function getServiceById(id: string): ServiceDetail | undefined {
  return SERVICES_DATA.find((service) => service.id.toLowerCase() === id.toLowerCase());
}
