export const SIMILIPAL_RATE_CHART = [
  { nos: 2, label: '2 Nos', p1n2d: '₹6,500', p2n3d: '₹10,500', p3n4d: '₹15,300' },
  { nos: 4, label: '4 Nos', p1n2d: '₹4,800', p2n3d: '₹8,500', p3n4d: '₹12,500' },
  { nos: 6, label: '6 Nos', p1n2d: '₹4,200', p2n3d: '₹7,800', p3n4d: '₹11,400' },
  { nos: 8, label: '8 Nos', p1n2d: '₹4,000', p2n3d: '₹7,500', p3n4d: '₹10,800' },
  { nos: 10, label: '10 Nos', p1n2d: '₹4,500', p2n3d: '₹8,000', p3n4d: '₹11,800' },
  { nos: 12, label: '12 Nos', p1n2d: '₹4,200', p2n3d: '₹7,800', p3n4d: '₹11,400' },
  { nos: 14, label: '14 Nos', p1n2d: '₹4,000', p2n3d: '₹7,500', p3n4d: '₹11,000' },
  { nos: 16, label: '16 Nos', p1n2d: '₹4,000', p2n3d: '₹7,200', p3n4d: '₹10,800' },
];

export const TOUR_OPERATOR_INFO = {
  company: 'HELLO TOUR & TRAVELS',
  destination: 'SIMILIPAL TIGER RESERVE',
  contacts: ['9437266828', '8018868898'],
  email: 'wajidhossain828@gmail.com',
  gstNote: 'PLUS 5 % GST',
  extraPersonNote: 'Extra 1 Person – 1500/-',
  guideNote: 'Guide Charges Extra',
  nosNote: 'NOS refers to number of persons',
};

export const PACKAGES = [
  {
    id: 'similipal-1n2d',
    title: 'Similipal Tiger Reserve Tour (1 Night 2 Days)',
    duration: '1 Night / 2 Days',
    durationKey: '1n2d',
    badge: 'Popular Weekend Trip',
    price: '₹4,000',
    maxPrice: '₹6,500',
    perPerson: 'per head onwards (+ 5% GST)',
    image: '/images/destinations/similipal.jpg',
    description: 'An exhilarating introduction to Similipal National Park. Experience dense sal forests, Barehipani twin falls, guided 4x4 wildlife safari, and eco-cottage stay inside the biosphere.',
    rates: [
      { persons: 2, price: '₹6,500' },
      { persons: 4, price: '₹4,800' },
      { persons: 6, price: '₹4,200' },
      { persons: 8, price: '₹4,000' },
      { persons: 10, price: '₹4,500' },
      { persons: 12, price: '₹4,200' },
      { persons: 14, price: '₹4,000' },
      { persons: 16, price: '₹4,000' }
    ],
    highlights: [
      'Core forest open-top 4x4 Gypsy safari drive',
      'Barehipani (399m) & Joranda (181m) waterfalls',
      'Forest eco-cottage stay inside biosphere sanctuary',
      'All meals featuring authentic tribal Odia cuisine',
      'Forest entry permits & toll clearances managed'
    ],
    itinerary: [
      { day: 'Day 1', plan: 'Entry from Pithabata/Jashipur gate, check-in to forest eco-cottage, afternoon jungle tracking safari, visit Barehipani Waterfall.' },
      { day: 'Day 2', plan: 'Early morning birding walk, Joranda Falls viewpoint, Chahala salt-lick wildlife sighting, return departure.' }
    ]
  },
  {
    id: 'similipal-2n3d',
    title: 'Similipal Tiger Reserve Tour (2 Nights 3 Days)',
    duration: '2 Nights / 3 Days',
    durationKey: '2n3d',
    badge: 'Best Wildlife Safari',
    price: '₹7,200',
    maxPrice: '₹10,500',
    perPerson: 'per head onwards (+ 5% GST)',
    image: '/images/destinations/similipal.jpg',
    description: 'The definitive deep-forest expedition covering Similipal’s core trails, tiger territory, orchid sanctuaries, pine valleys, and remote waterfalls.',
    rates: [
      { persons: 2, price: '₹10,500' },
      { persons: 4, price: '₹8,500' },
      { persons: 6, price: '₹7,800' },
      { persons: 8, price: '₹7,500' },
      { persons: 10, price: '₹8,000' },
      { persons: 12, price: '₹7,800' },
      { persons: 14, price: '₹7,500' },
      { persons: 16, price: '₹7,200' }
    ],
    highlights: [
      'Two full-day 4x4 jungle tracking safaris in core tiger zone',
      'Exclusive sunrise safari at Chahala meadow & observation tower',
      'Visit to Gurguria orchidarium, herbal garden & pine valley',
      'Night stargazing amidst untouched sal canopies',
      'Private bonfire & authentic Odia tribal cuisine'
    ],
    itinerary: [
      { day: 'Day 1', plan: 'Arrival in Baripada/Jashipur, transfer to Jamuani/Gurguria eco-resort, sunset nature trail walk, tribal dinner.' },
      { day: 'Day 2', plan: 'Full day safari: Chahala wildlife post, Barehipani waterfalls, Joranda plunge pool viewpoint, campfire evening.' },
      { day: 'Day 3', plan: 'Morning visit to Gurguria pine forest & orchidarium with 90+ orchid species, souvenir stop, return departure.' }
    ]
  },
  {
    id: 'similipal-3n4d',
    title: 'Similipal Tiger Reserve Tour (3 Nights 4 Days)',
    duration: '3 Nights / 4 Days',
    durationKey: '3n4d',
    badge: 'Complete Deep Wilderness',
    price: '₹10,800',
    maxPrice: '₹15,300',
    perPerson: 'per head onwards (+ 5% GST)',
    image: '/images/destinations/barehipani.jpg',
    description: 'Comprehensive 4-day grand circuit covering the entire Mayurbhanj biosphere reserve: Devasthali grasslands, waterfalls, Ramatirtha crocodile sanctuary, and remote tribal valleys.',
    rates: [
      { persons: 2, price: '₹15,300' },
      { persons: 4, price: '₹12,500' },
      { persons: 6, price: '₹11,400' },
      { persons: 8, price: '₹10,800' },
      { persons: 10, price: '₹11,800' },
      { persons: 12, price: '₹11,400' },
      { persons: 14, price: '₹11,000' },
      { persons: 16, price: '₹10,800' }
    ],
    highlights: [
      'Three extensive open 4x4 Gypsy jungle safaris across core zones',
      'Complete coverage of Barehipani, Joranda, Chahala & Devasthali',
      'Visit to Ramatirtha Mugger Crocodile Sanctuary & Khairi riverbank',
      'Stargazing in pristine zero-light-pollution forest canopy',
      '3 Nights eco-camp stay at Jamuani, Barehipani or Gurguria with all meals'
    ],
    itinerary: [
      { day: 'Day 1', plan: 'Arrival and entry into Similipal. Check-in to forest cottage, afternoon acclimatization nature walk along river bed.' },
      { day: 'Day 2', plan: 'Full-day core safari: Chahala meadows, salt lick tiger tracking, and Barehipani 399m cascading falls.' },
      { day: 'Day 3', plan: 'Explore Joranda Falls canyon gorge, Gurguria pine forest, orchidarium, and evening tribal folklore.' },
      { day: 'Day 4', plan: 'Morning wildlife drive, visit Ramatirtha crocodile breeding project, departure with unforgettable memories.' }
    ]
  }
];
