import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hotel, Share2, Heart, Clock, PawPrint, Feather, 
  Compass, Leaf, Zap, Check, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function SimilipalInfoTab({ onSelectCategory }) {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Similipal Tiger Reserve - Eco Destination',
          text: 'Explore Similipal Tiger Reserve, home to rare melanistic tigers and pristine waterfalls in Odisha.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback clipboard write
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full mt-8 sm:mt-10 rounded-3xl bg-[#0b1c12]/90 border border-forest-800/70 p-5 sm:p-8 backdrop-blur-md shadow-2xl text-[#f7f4ee]">
      
      {/* Top Header: Badge on Left, Actions on Right */}
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/60 border border-forest-500/40 text-[11px] font-semibold uppercase tracking-wider text-forest-300">
          <Hotel className="w-3.5 h-3.5 text-forest-400" />
          <span>ECO DESTINATION</span>
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 sm:p-2.5 rounded-full border border-forest-800/80 bg-forest-950/60 hover:bg-forest-800/70 hover:border-forest-600 text-cream-200 transition-all touch-manipulation active:scale-95"
            aria-label="Share Destination"
            title={copied ? "Copied to clipboard!" : "Share Destination"}
          >
            {copied ? <Check className="w-4 h-4 text-forest-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 sm:p-2.5 rounded-full border border-forest-800/80 bg-forest-950/60 hover:bg-forest-800/70 hover:border-forest-600 text-cream-200 transition-all touch-manipulation active:scale-95"
            aria-label="Save Destination"
            title={isSaved ? "Saved to Favorites" : "Save to Favorites"}
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'fill-rose-500 text-rose-500' : 'text-cream-200 hover:text-rose-400'
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Main Title & Description */}
      <div className="mt-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-100 tracking-tight">
          Similipal
        </h2>
        <p className="mt-2 text-xs sm:text-sm md:text-base text-cream-200/85 font-light leading-relaxed max-w-4xl">
          Similipal Tiger Reserve, home to melanistic tigers, elephants and iconic Barehipani and Joranda falls, clusters six eco-camps amid sal forests and Semul blooms.
        </p>

        {/* Read Overview Toggle */}
        <div className="flex items-center gap-1.5 text-xs text-cream-400/80 mt-2.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-forest-400 shrink-0" />
          <button
            type="button"
            onClick={() => setShowFullOverview(!showFullOverview)}
            className="hover:text-forest-300 underline underline-offset-4 decoration-forest-500/40 hover:decoration-forest-400 transition-colors inline-flex items-center gap-1"
          >
            <span>Read full overview • 2 min read</span>
            {showFullOverview ? <ChevronUp className="w-3 h-3 text-forest-400" /> : <ChevronDown className="w-3 h-3 text-forest-400" />}
          </button>
        </div>

        {/* Expandable Overview Detail */}
        <AnimatePresence>
          {showFullOverview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-3 p-4 rounded-2xl bg-forest-950/70 border border-forest-800/60 text-xs sm:text-sm text-cream-200/90 leading-relaxed space-y-2"
            >
              <p>
                Covering an expansive 2,750 square kilometers in Mayurbhanj district, Similipal is a designated UNESCO World Network of Biosphere Reserves, national park, and Project Tiger reserve. Its distinct plateau landscape ranges from 300 meters to Meghasani peak at 1,165 meters.
              </p>
              <p>
                The reserve is internationally famous for harboring the world's only wild pseudomelanistic Royal Bengal Tigers, along with over 1,076 species of vascular plants, 42 species of mammals, 242 species of birds, and 30 species of reptiles fed by 12 perennial rivers.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chips / Pills Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-5 pt-1">
        <button
          type="button"
          onClick={() => onSelectCategory && onSelectCategory('stay')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-950/70 hover:bg-forest-900 border border-forest-800/80 hover:border-forest-600 text-xs text-cream-200 transition-all touch-manipulation active:scale-95 cursor-pointer"
        >
          <Hotel className="w-3.5 h-3.5 text-forest-400" />
          <span>Stay options</span>
          <span className="px-1.5 py-0.5 rounded-full bg-forest-900/90 border border-forest-700/60 text-[10px] font-bold text-forest-300">
            5
          </span>
        </button>

        <span className="text-forest-700 select-none">•</span>

        <button
          type="button"
          onClick={() => onSelectCategory && onSelectCategory('jeep')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-950/70 hover:bg-forest-900 border border-forest-800/80 hover:border-forest-600 text-xs text-cream-200 transition-all touch-manipulation active:scale-95 cursor-pointer"
        >
          <PawPrint className="w-3.5 h-3.5 text-forest-400" />
          <span>Safari options</span>
          <span className="px-1.5 py-0.5 rounded-full bg-forest-900/90 border border-forest-700/60 text-[10px] font-bold text-forest-300">
            7
          </span>
        </button>

        <span className="text-forest-700 select-none">•</span>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-950/70 border border-forest-800/80 text-xs text-cream-200">
          <Feather className="w-3.5 h-3.5 text-forest-400" />
          <span>Birding trails</span>
        </div>

        <span className="text-forest-700 select-none">•</span>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-950/70 border border-forest-800/80 text-xs text-cream-200">
          <Compass className="w-3.5 h-3.5 text-forest-400" />
          <span>Trek routes</span>
        </div>
      </div>

      {/* Two Column Cards Grid: Highlights & Destination Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        
        {/* HIGHLIGHTS CARD */}
        <div className="rounded-2xl bg-[#07160d]/90 border border-forest-800/60 p-5 sm:p-6 shadow-lg">
          <div className="flex items-center gap-2 text-forest-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Leaf className="w-4 h-4 text-forest-400" />
            <span>HIGHLIGHTS</span>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm text-cream-200/90 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-base select-none shrink-0 leading-tight">🐅</span>
              <span>Only Tiger Reserve in India with melanistic tigers; 75% of Odisha's tigers and 25% of its elephants</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-base select-none shrink-0 leading-tight">💧</span>
              <span>Twin signature falls Barehipani (399 m) and Joranda (181 m) inside the park</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-base select-none shrink-0 leading-tight">🌸</span>
              <span>Semul bloom across sal forests with 94 orchid species</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-base select-none shrink-0 leading-tight">🏕️</span>
              <span>Nature camps available around the reserve include Barehipani, Jamuani, Kumari, Gurguria, Ramatirtha, and Talabandha.</span>
            </li>
          </ul>
        </div>

        {/* DESTINATION NOTES CARD */}
        <div className="rounded-2xl bg-[#07160d]/90 border border-forest-800/60 p-5 sm:p-6 shadow-lg">
          <div className="flex items-center gap-2 text-forest-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>DESTINATION NOTES</span>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm text-cream-200/90 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-base select-none shrink-0 leading-tight">🎟️</span>
              <span>
                Entry permits issued only via{' '}
                <a 
                  href="https://www.similipal.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-forest-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                  www.similipal.org
                </a>
                ; guides mandatory and vehicles need 180 mm+ ground clearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-base select-none shrink-0 leading-tight">🕒</span>
              <span>Tourism window typically from mid-October; exit by 6:00 pm, leave Barehipani/Joranda by 4:00 pm.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-base select-none shrink-0 leading-tight">🚙</span>
              <span>Open jeep safaris managed by EDCs from Gudugudia, Pithabata, Jamuani, Talabandha and Barehipani (morning and afternoon slots).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-base select-none shrink-0 leading-tight">📢</span>
              <span>Max 60 four-wheelers per day: 35 via Jashipur, 25 via Pithabata (official advisory).</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
