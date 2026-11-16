import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, Clock, Users, CheckCircle2, ShieldCheck, 
  MapPin, ArrowRight, Sparkles, Phone, Calendar, Info, 
  Trees, Mountain, Waves, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PACKAGES } from '../data/packages';
import PackageModal from '../components/PackageModal';
import SimilipalCardSlideshow from '../components/SimilipalCardSlideshow';
import SimilipalInfoTab from '../components/SimilipalInfoTab';
import SimilipalTariffTable from '../components/SimilipalTariffTable';

export default function SimilipalSafaris() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const safariTours = [
    {
      id: 'core-jungle-safari',
      title: 'Core Tiger Reserve 4x4 Gypsy Safari',
      category: 'jeep',
      categoryLabel: 'Wildlife Drive',
      duration: '3 - 4 Hours',
      timing: 'Morning: 6:00 AM - 9:00 AM | Afternoon: 3:00 PM - 6:00 PM',
      capacity: 'Up to 6 Persons / Vehicle',
      price: '₹3,800',
      priceUnit: 'per vehicle',
      image: '/images/gallery/gallery-tiger.jpg',
      badge: 'Most Popular',
      overview: 'Rugged open-top 4x4 expedition through core sal trails, deep waterholes, and the famous Chahala salt-lick where melanistic tigers and leopards roam.',
      highlights: [
        'Open-top 4x4 Gypsy with forest department entry permits',
        'Certified native Mayurbhanj wildlife tracker guide included',
        'Access to Chahala salt-lick wildlife observation tower',
        'High probability of spotting Royal Bengal tigers, leopards & wild elephants'
      ],
      packageRef: 'similipal-adventure'
    },
    {
      id: 'waterfalls-safari',
      title: 'Barehipani & Joranda Canyon Safari',
      category: 'waterfalls',
      categoryLabel: 'Scenic Waterfalls',
      duration: '6 - 7 Hours',
      timing: 'Full Day Expedition (6:00 AM - 5:00 PM)',
      capacity: 'Up to 6 Persons / Vehicle',
      price: '₹4,500',
      priceUnit: 'per vehicle',
      image: '/images/destinations/barehipani.jpg',
      badge: 'Twin Waterfall Trail',
      overview: 'Journey across scenic cliff passes to witness the thunderous 399m two-tiered Barehipani Falls with rainbows and the misty 181m gorge of Joranda Falls.',
      highlights: [
        'Spectacular panoramic viewpoint of Barehipani 399m waterfalls',
        'Joranda falls gorge overlook and canyon echo point',
        'Gurguria orchidarium & fragrant medicinal nursery tour',
        'Scenic riverbed crossing & traditional packed Odia breakfast'
      ],
      packageRef: 'similipal-adventure'
    },
    {
      id: 'wilderness-package-2d1n',
      title: 'Similipal 2D/1N Forest Canopy Stay & Safari',
      category: 'stay',
      categoryLabel: 'Eco-Stay & Safari',
      duration: '2 Days / 1 Night',
      timing: 'Check-in 10:00 AM (Day 1) to Departure 4:00 PM (Day 2)',
      capacity: '2 - 16 Persons (Group Tiers)',
      price: '₹4,000',
      priceUnit: 'per head onwards (+ 5% GST)',
      image: '/images/hero/hero-melanistic-tiger.jpg',
      badge: 'Signature Tour',
      overview: 'Complete wilderness experience including night stay in authentic forest rest house cottages inside the biosphere, 4x4 Gypsy safari drive, and tribal cuisine.',
      highlights: [
        'Eco-cottage stay inside biosphere at Jamuani / Gurguria',
        'Core jungle tracking safaris with native Mayurbhanj naturalist',
        'All authentic Odia tribal meals included',
        'Barehipani & Joranda waterfalls visit'
      ],
      packageRef: 'similipal-1n2d'
    },
    {
      id: 'nature-explorer-3d2n',
      title: 'Similipal 3D/2N Deep Biosphere Expedition',
      category: 'stay',
      categoryLabel: 'Grand Safari',
      duration: '3 Days / 2 Nights',
      timing: '3 Full Days Immersive Wilderness Circuit',
      capacity: '2 - 16 Persons (Group Tiers)',
      price: '₹7,200',
      priceUnit: 'per head onwards (+ 5% GST)',
      image: '/images/hero/hero-similipal.jpg',
      badge: 'Deep Explorer',
      overview: 'The definitive deep-forest expedition covering Similipal’s core trails, tiger territory, orchid sanctuaries, pine groves, and remote waterfalls.',
      highlights: [
        'Two full-day 4x4 jungle tracking drives with professional naturalist',
        'Exclusive sunrise safari at Chahala meadows for tiger tracking',
        'Visit to Gurguria orchidarium, herbal garden & pine valleys',
        'Night stargazing amidst untouched sal canopies & tribal folk evening'
      ],
      packageRef: 'similipal-2n3d'
    },
    {
      id: 'complete-circuit-4d3n',
      title: 'Similipal 4D/3N Complete Sanctuary Circuit',
      category: 'stay',
      categoryLabel: 'Grand Circuit',
      duration: '4 Days / 3 Nights',
      timing: '4 Full Days Complete Wilderness Immersion',
      capacity: '2 - 16 Persons (Group Tiers)',
      price: '₹10,800',
      priceUnit: 'per head onwards (+ 5% GST)',
      image: '/images/destinations/barehipani.jpg',
      badge: 'Full Reserve Tour',
      overview: 'Comprehensive 4-day grand circuit covering the entire Mayurbhanj biosphere reserve: Devasthali grasslands, waterfalls, Ramatirtha crocodile sanctuary, and remote tribal valleys.',
      highlights: [
        'Three extensive open 4x4 Gypsy jungle safaris across core zones',
        'Complete coverage of Barehipani, Joranda, Chahala & Gurguria',
        'Visit to Ramatirtha Mugger Crocodile Sanctuary & Khairi river',
        '3 Nights forest eco-cottage stay with all tribal meals included'
      ],
      packageRef: 'similipal-3n4d'
    }
  ];

  const filteredSafaris = activeTab === 'all' 
    ? safariTours 
    : safariTours.filter(s => s.category === activeTab);

  const zones = [
    {
      name: 'Chahala Meadow & Salt-Lick',
      type: 'Core Wildlife Sanctuary',
      image: '/images/gallery/gallery-tiger.jpg',
      desc: 'Similipal’s premier wildlife sighting zone featuring the historic royal rest house and an expansive salt-lick frequented by Royal Bengal & rare melanistic tigers, wild elephants, and barking deer.'
    },
    {
      name: 'Barehipani & Joranda Falls',
      type: 'Ghats & Waterfalls',
      image: '/images/destinations/barehipani.jpg',
      desc: 'The heart of Similipal’s canyons, home to Barehipani Falls (399m) cascading in two graceful tiers across cliff faces, and the sheer 181m plunge pool of Joranda Falls.'
    },
    {
      name: 'Gurguria & Jamuani Valleys',
      type: 'Eco-Tourism & Canopy',
      image: '/images/destinations/similipal.jpg',
      desc: 'Lush valleys flanked by bubbling streams, home to the indigenous orchidarium housing 80+ wild orchid varieties, pine forests, and eco-cottages nestled inside the forest canopy.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08140c] text-[#f7f4ee] pt-24 sm:pt-28 pb-16 sm:pb-24">
      
      {/* =========================================
          SIMILIPAL IMAGE CARD SLIDESHOW (TOP HERO)
      ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <SimilipalCardSlideshow />
        <SimilipalInfoTab onSelectCategory={setActiveTab} />
      </section>

      {/* =========================================
          CATEGORY FILTER TABS
      ========================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex items-center sm:justify-center overflow-x-auto no-scrollbar py-1 gap-2.5 sm:gap-3">
          {[
            { id: 'all', label: 'All Safaris & Tours' },
            { id: 'jeep', label: '4x4 Wildlife Gypsies' },
            { id: 'waterfalls', label: 'Waterfall Trails' },
            { id: 'stay', label: 'Eco-Stay Packages' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shrink-0 touch-manipulation active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-forest-500 to-forest-600 text-white shadow-lg shadow-forest-600/30'
                    : 'bg-forest-950/80 border border-forest-800/80 text-cream-200/70 hover:text-white hover:bg-forest-900/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================
          SAFARI PACKAGES GRID
      ========================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {filteredSafaris.map((safari, idx) => (
            <motion.div
              key={safari.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#0c2316]/95 to-[#07160d]/95 border border-forest-700/50 hover:border-forest-500/60 transition-all duration-300 shadow-2xl flex flex-col justify-between"
            >
              {/* Header Image */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                <img
                  src={safari.image}
                  alt={safari.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2316] via-transparent to-black/40" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-forest-950/90 backdrop-blur-md text-forest-300 border border-forest-600/50 shadow-md">
                    {safari.badge}
                  </span>
                </div>

                {/* Duration & Capacity Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-cream-100 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-forest-400" />
                    <span>{safari.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-forest-300 font-medium">
                    <Users className="w-4 h-4" />
                    <span>{safari.capacity}</span>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-forest-400 mb-1.5 block">
                    {safari.categoryLabel}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-100 group-hover:text-forest-200 transition-colors mb-3 leading-snug">
                    {safari.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-300/80 leading-relaxed font-light mb-6">
                    {safari.overview}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-forest-800/60">
                    {safari.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-cream-200/90">
                        <CheckCircle2 className="w-4 h-4 text-forest-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tariff & Actions */}
                <div className="pt-4 border-t border-forest-800/60 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cream-400/80 block">All-Inclusive Tariff</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-forest-300">{safari.price}</span>
                      <span className="text-xs text-cream-400/70">{safari.priceUnit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        const pkg = PACKAGES.find(p => p.id === safari.packageRef) || PACKAGES[0];
                        setSelectedPackage(pkg);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-forest-900/60 hover:bg-forest-800 text-cream-200 text-xs font-semibold border border-forest-700/50 transition-colors touch-manipulation"
                    >
                      Full Details
                    </button>
                    <Link
                      to={`/contact?safari=${encodeURIComponent(safari.title)}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-400 hover:to-forest-500 text-white text-xs font-semibold shadow-lg transition-all touch-manipulation active:scale-95"
                    >
                      <span>Book Safari</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================
          OFFICIAL TOUR PACKAGES TARIFF CHART
      ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <SimilipalTariffTable />
      </section>

      {/* =========================================
          KEY SAFARI ZONES
      ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/80 border border-forest-500/40 text-[11px] font-semibold uppercase tracking-widest text-forest-300 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Biosphere Geography</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-cream-100">
            Similipal Safari Zones
          </h2>
          <p className="text-xs sm:text-sm text-cream-300/80 mt-2 font-light">
            Each safari sector offers an entirely unique landscape, flora ecosystem, and wildlife sighting opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {zones.map((zone, i) => (
            <div
              key={i}
              className="group rounded-3xl overflow-hidden bg-forest-950/80 border border-forest-800/60 shadow-xl flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={zone.image}
                  alt={zone.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-forest-950/90 text-forest-300 border border-forest-700/50">
                    {zone.type}
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-cream-100 mb-2">{zone.name}</h3>
                  <p className="text-xs text-cream-300/75 leading-relaxed font-light">{zone.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          ESSENTIAL VISITOR GUIDELINES & PERMIT RULES
      ========================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#0c2316]/95 via-[#08180e]/95 to-[#051109]/95 border border-forest-600/40 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-forest-400 font-semibold text-xs uppercase tracking-widest mb-2">
            <Info className="w-4 h-4" />
            <span>Essential Tourist Information</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-100 mb-6">
            Safari Entry Guidelines & Booking Policy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-forest-300 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-forest-400" />
                <span>Entry Gates</span>
              </div>
              <p className="text-xs text-cream-300/80 leading-relaxed font-light">
                <strong>Pithabata Gate</strong> (Baripada side – 22 km) & <strong>Kaliani Gate</strong> (Jashipur side – NH49). Enter from one gate and exit from either with prior valid permit.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-forest-300 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 text-forest-400" />
                <span>Permit Hours</span>
              </div>
              <p className="text-xs text-cream-300/80 leading-relaxed font-light">
                Daily entry permits are issued between <strong>6:00 AM and 9:00 AM strictly</strong>. Daily vehicle quota is capped by the Forest Department.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-forest-300 font-bold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-forest-400" />
                <span>Best Visiting Season</span>
              </div>
              <p className="text-xs text-cream-300/80 leading-relaxed font-light">
                <strong>November to mid-June</strong>. The sanctuary remains closed during peak monsoons (mid-June to October) for wildlife breeding and forest replenishment.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-forest-300 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-forest-400" />
                <span>Mandatory Protocols</span>
              </div>
              <p className="text-xs text-cream-300/80 leading-relaxed font-light">
                4x4 vehicles with certified guides mandatory. Zero single-use plastic zone. Never step out of safari vehicles in core tiger zones.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM CTA
      ========================================= */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-100 mb-3">
          Need customized safari permits or group bookings?
        </h3>
        <p className="text-xs sm:text-sm text-cream-300/80 font-light mb-6">
          Our native Mayurbhanj travel specialists handle official Forest Department booking permits, certified 4x4 Gypsies, and authentic eco-cottage stays.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-400 hover:to-forest-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            <span>Request Safari Permit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/packages"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 border border-white/20 font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all"
          >
            <span>View All Odisha Packages</span>
          </Link>
        </div>
      </div>

      {/* Package Detail Modal */}
      <PackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />

    </div>
  );
}
