import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Play, Pause, 
  Maximize2, Trees
} from 'lucide-react';
import Lightbox from './Lightbox';

const SIMILIPAL_SLIDES = [
  {
    id: 'milenastic-tiger',
    title: 'Rare Melanistic Tiger (Black Tiger)',
    category: 'Wildlife Sanctuary',
    location: 'Chahala Core Range',
    desc: 'Similipal is the world’s sole natural habitat for wild pseudomelanistic Royal Bengal Tigers characterized by thick, merged black stripes.',
    image: '/images/Similipal/milenastic-tiger.jpg',
  },
  {
    id: 'royal-bengal-tiger',
    title: 'Royal Bengal Tiger in Sal Canopy',
    category: 'Apex Predator',
    location: 'Core Tiger Reserve',
    desc: 'Majestic Royal Bengal Tiger prowling through the sun-dappled virgin sal forest floor of Mayurbhanj.',
    image: '/images/Similipal/royal-bengal-tiger.jpg',
  },
  {
    id: 'tiger-closeup',
    title: 'Wild Tiger Stare',
    category: 'Intense Gaze',
    location: 'Jamuani Meadow Edge',
    desc: 'Close-up portrait of the magnificent striped sentinel emerging from dense bamboo thickets.',
    image: '/images/Similipal/tiger-closeup.jpg',
  },
  {
    id: 'barehipani-waterfall',
    title: 'Barehipani Waterfall with Rainbow',
    category: '399m Cascades',
    location: 'Meghasani Gorge',
    desc: 'India’s second-highest waterfall cascading down red volcanic cliffs with a vivid natural rainbow arc.',
    image: '/images/Similipal/barehipani-waterfall.jpg',
  },
  {
    id: 'barehipani-cliff',
    title: 'Barehipani Canyon Cliffs',
    category: 'Dramatic Landscape',
    location: 'Twin Falls Overlook',
    desc: 'Dramatic view of the sheer granite cliffs and deep gorge through which the Budhabalanga river plunges.',
    image: '/images/Similipal/barehipani-cliff.jpg',
  },
  {
    id: 'elephant-group',
    title: 'Wild Asian Elephant Herd',
    category: 'Elephant Corridor',
    location: 'Devasthali Grasslands',
    desc: 'A family herd of wild Asian elephants foraging through the mist-shrouded tall grasslands of Similipal.',
    image: '/images/Similipal/elephant-group.jpg',
  },
  {
    id: 'deer',
    title: 'Spotted Chital Deer',
    category: 'Forest Fauna',
    location: 'Chahala Meadows',
    desc: 'Alert spotted deer grazing peacefully amidst the golden forest glades near the salt-lick.',
    image: '/images/Similipal/deer.jpg',
  },
  {
    id: 'leopard',
    title: 'Indian Leopard in Sal Branches',
    category: 'Canopy Predator',
    location: 'Gurguria Canopy',
    desc: 'A striking Indian leopard perched silently high in the boughs of an ancient sal tree.',
    image: '/images/Similipal/leopard.jpg',
  },
  {
    id: 'leo',
    title: 'Leopard Resting in Forest Twilight',
    category: 'Nocturnal Hunter',
    location: 'Upper Ridges',
    desc: 'Fierce beauty of the forest leopard resting comfortably camouflaged against rugged tree bark.',
    image: '/images/Similipal/leo.jpg',
  },
  {
    id: 'animal-group',
    title: 'Canopy Wildlife Gathering',
    category: 'Biodiversity Hotspot',
    location: 'Central Biosphere',
    desc: 'A rich tapestry of endemic fauna coexisting in the protected biosphere core.',
    image: '/images/Similipal/animal-group.jpg',
  },
  {
    id: 'repts',
    title: 'Mugger Crocodile Habitat',
    category: 'Aquatic Sanctuary',
    location: 'Ramatirtha & Khairi River',
    desc: 'Endangered mugger crocodiles basking along the pristine boulder-strewn river banks of Similipal.',
    image: '/images/Similipal/repts.jpg',
  },
  {
    id: 'birdview',
    title: 'Similipal Sal Canopy Bird’s Eye View',
    category: 'Aerial Panorama',
    location: 'Mayurbhanj Plateau',
    desc: 'Endless rolling waves of ancient emerald sal canopy stretching towards the horizon in Mayurbhanj.',
    image: '/images/Similipal/birdview.jpg',
  }
];

export default function SimilipalCardSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentSlide = SIMILIPAL_SLIDES[currentIndex];

  // Auto-play slideshow timer - ZERO page scrolling, pure state update
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SIMILIPAL_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SIMILIPAL_SLIDES.length) % SIMILIPAL_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SIMILIPAL_SLIDES.length);
  };

  // Adapt slides for Lightbox component
  const lightboxItems = SIMILIPAL_SLIDES.map((s) => ({
    id: s.id,
    title: s.title,
    caption: s.desc,
    description: s.desc,
    location: s.location,
    src: s.image,
    image: s.image,
  }));

  return (
    <div className="w-full">
      {/* Top Header of the Page & Slider Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/85 border border-forest-500/40 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-forest-300 shadow-md mb-3">
            <Trees className="w-3.5 h-3.5 text-forest-400" />
            <span>UNESCO World Biosphere Reserve • Mayurbhanj</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-cream-100 leading-tight">
            Explore Similipal <br className="hidden sm:inline" />
            <span className="italic font-normal text-forest-300">Safaris & Showcase</span>
          </h1>
        </div>

        {/* Play/Pause & Counter Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto bg-forest-950/80 border border-forest-800/80 px-4 py-2 rounded-2xl backdrop-blur-md">
          <span className="text-xs text-cream-300 font-mono tracking-wider font-semibold">
            {String(currentIndex + 1).padStart(2, '0')} / {String(SIMILIPAL_SLIDES.length).padStart(2, '0')}
          </span>
          <div className="w-px h-4 bg-forest-800" />
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full hover:bg-forest-800 text-cream-200 transition-colors touch-manipulation active:scale-95"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-forest-400" /> : <Play className="w-4 h-4 text-forest-400" />}
          </button>
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="p-1.5 rounded-full hover:bg-forest-800 text-cream-200 transition-colors touch-manipulation active:scale-95"
            aria-label="View Fullscreen"
            title="View Fullscreen"
          >
            <Maximize2 className="w-4 h-4 text-forest-400" />
          </button>
        </div>
      </div>

      {/* Main Slideshow Card */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a1f13] border border-forest-700/50 shadow-2xl group">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="w-full h-full object-cover select-none"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-forest-600/80 text-white border border-white/10 backdrop-blur-md transition-all touch-manipulation active:scale-90 z-20 group/btn"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-forest-600/80 text-white border border-white/10 backdrop-blur-md transition-all touch-manipulation active:scale-90 z-20 group/btn"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Minimalist Dot Indicators - Completely passive, no scrollIntoView */}
      <div className="flex items-center justify-center gap-2 pt-5">
        {SIMILIPAL_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => {
              setCurrentIndex(idx);
              setIsPlaying(false);
            }}
            className={`transition-all duration-300 rounded-full touch-manipulation ${
              idx === currentIndex
                ? 'w-8 h-2 bg-forest-400 shadow-sm shadow-forest-400/50'
                : 'w-2 h-2 bg-forest-800/80 hover:bg-forest-600'
            }`}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
          />
        ))}
      </div>

      {/* Lightbox Modal when clicking maximize */}
      {isLightboxOpen && (
        <Lightbox
          items={lightboxItems}
          currentIndex={currentIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
