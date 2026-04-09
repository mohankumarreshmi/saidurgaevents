export const EVENT_CATEGORIES = [
  {
    slug: 'wedding',
    name: 'Wedding Ceremonies',
    description:
      'Grand celebrations of love with traditional South Indian rituals, stunning décor, and unforgettable memories.',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    icon: '💒',
  },
  {
    slug: 'engagement',
    name: 'Engagement Functions',
    description:
      'Mark the beginning of forever with beautifully arranged engagement ceremonies full of joy and tradition.',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80',
    icon: '💍',
  },
  {
    slug: 'bride-groom-functions',
    name: 'Bride & Groom Functions',
    description:
      'Separate pre-wedding celebrations for the bride and groom, each tailor-made to honour the occasion.',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    icon: '👰',
  },
  {
    slug: 'mehandi',
    name: 'Mehandi Ceremony',
    description:
      'Colourful Mehandi events with artists, décor, and music that set the perfect mood for pre-wedding festivities.',
    imageUrl: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=800&q=80',
    icon: '🌿',
  },
  {
    slug: 'haldi',
    name: 'Haldi Ceremony',
    description:
      'Vibrant Haldi functions with floral themes, earthy colours, and joyous traditions.',
    imageUrl: 'https://images.unsplash.com/photo-1591861937702-c4c3d50f52e1?w=800&q=80',
    icon: '🌼',
  },
  {
    slug: 'house-warming',
    name: 'House Warming (Griha Pravesh)',
    description:
      'Welcome good fortune into your new home with traditional poojas, decorations, and catering.',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    icon: '🏠',
  },
  {
    slug: 'office-warming',
    name: 'Office Inauguration',
    description:
      'Launch your new workspace with auspicious rituals, corporate décor, and professional event management.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    icon: '🏢',
  },
  {
    slug: 'birthday',
    name: 'Birthday Celebrations',
    description:
      'From milestone birthdays to kids\' parties — we craft magical moments for every age.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    icon: '🎂',
  },
  {
    slug: 'baby-shower',
    name: 'Baby Shower',
    description:
      'Celebrate the upcoming arrival with a beautifully themed baby shower full of warmth and blessings.',
    imageUrl: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=80',
    icon: '👶',
  },
  {
    slug: 'corporate',
    name: 'Corporate Events',
    description:
      'Conferences, award nights, team outings — end-to-end corporate event solutions for every scale.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    icon: '🎯',
  },
];

export const SERVICE_CATEGORIES = [
  { value: 'music', label: 'Music & Entertainment' },
  { value: 'decor', label: 'Decoration' },
  { value: 'catering', label: 'Catering' },
  { value: 'photography', label: 'Photography & Videography' },
  { value: 'transport', label: 'Transport & Logistics' },
  { value: 'other', label: 'Other Services' },
];

export const SERVICES_DATA = [
  {
    name: 'Traditional Nadaswaram Band',
    category: 'music',
    description:
      'Authentic South Indian Nadaswaram performance bringing traditional blessings and auspicious atmosphere to your ceremonies.',
    priceRange: '₹15,000 – ₹40,000',
    features: [
      'Experienced professional artists',
      'All traditional instruments included',
      'Customised ragas on request',
      'Available for 2–8 hours',
    ],
    icon: '🎺',
  },
  {
    name: 'Orchestra & Live Band',
    category: 'music',
    description:
      'Full live orchestra with singers, instrumentalists, and sound system for reception and stage events.',
    priceRange: '₹50,000 – ₹2,00,000',
    features: [
      'Up to 15 musicians',
      'Telugu, Tamil, Hindi & English songs',
      'Professional PA system',
      'LED stage lighting',
    ],
    icon: '🎸',
  },
  {
    name: 'Classical Dance Troupe',
    category: 'music',
    description:
      'Bharatanatyam, Kuchipudi and folk dance performances to grace your celebration with cultural elegance.',
    priceRange: '₹20,000 – ₹80,000',
    features: [
      'Trained classical dancers',
      'Custom choreography available',
      'Costumes & make-up included',
      'Stage & floor performances',
    ],
    icon: '💃',
  },
  {
    name: 'Folk Dance & Dappu',
    category: 'music',
    description:
      'Energetic South Indian folk performances including Dappu, Bonalu, and Kolattam to add festive fervour.',
    priceRange: '₹10,000 – ₹35,000',
    features: [
      'Traditional folk costumes',
      'Group performances (10–30 artists)',
      'Customised theme routines',
      'Indoor & outdoor venues',
    ],
    icon: '🥁',
  },
  {
    name: 'Professional Singers',
    category: 'music',
    description:
      'Solo and duet vocalists for all event types — from classical carnatic to contemporary film songs.',
    priceRange: '₹8,000 – ₹60,000',
    features: [
      'Multiple language artists',
      'Karaoke & live accompaniment',
      'Devotional & film genres',
      'PA system included',
    ],
    icon: '🎤',
  },
  {
    name: 'Floral & Traditional Decor',
    category: 'decor',
    description:
      'Stunning South Indian floral decorations using marigold, jasmine, rose and fresh seasonal flowers.',
    priceRange: '₹30,000 – ₹5,00,000',
    features: [
      'Mandap & stage decoration',
      'Entrance arch & pathway',
      'Floral jewellery for bride',
      'Table centrepieces',
    ],
    icon: '🌸',
  },
  {
    name: 'Photography & Videography',
    category: 'photography',
    description:
      'Cinematic wedding films and candid photography that capture every precious moment of your celebration.',
    priceRange: '₹25,000 – ₹3,00,000',
    features: [
      'Candid & traditional shoots',
      'Drone videography',
      'Same-day edit reels',
      'Edited photo album & hard disk',
    ],
    icon: '📸',
  },
  {
    name: 'South Indian Catering',
    category: 'catering',
    description:
      'Authentic South Indian wedding feasts — from traditional banana-leaf meals to multi-cuisine buffets.',
    priceRange: '₹400 – ₹1,200 per plate',
    features: [
      'Traditional Sapta Bhojanam',
      'Live counter stations',
      'Sweets & savouries',
      'Trained serving staff',
    ],
    icon: '🍽️',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Priya & Karthik',
    event: 'Wedding Ceremony',
    quote:
      'Sai Durga Events made our wedding day absolutely magical. Every detail was taken care of with love and professionalism.',
    rating: 5,
  },
  {
    name: 'Ramesh Family',
    event: 'House Warming',
    quote:
      'The Griha Pravesh ceremony was organised beautifully. The décor and nadaswaram band were outstanding!',
    rating: 5,
  },
  {
    name: 'Lakshmi & Suresh',
    event: 'Mehandi Ceremony',
    quote:
      'We loved every moment of our Mehandi function. The artists were talented and the décor was breathtaking.',
    rating: 5,
  },
];
