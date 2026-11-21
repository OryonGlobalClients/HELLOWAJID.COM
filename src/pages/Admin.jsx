import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  User,
  LogOut,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Package as PackageIcon,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Upload,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  X,
  ListPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { GALLERY_CATEGORIES } from '../data/gallery';

const ADMIN_CREDENTIALS = {
  username: 'hellowajid',
  password: 'hellowajid@123',
};

const STORAGE_AUTH_KEY = 'ot_admin_authenticated';

export default function Admin() {
  const {
    gallery,
    packages,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetGallery,
    addPackage,
    updatePackage,
    deletePackage,
    resetPackages,
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_AUTH_KEY) === 'true';
  });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab: 'gallery' | 'packages'
  const [activeTab, setActiveTab] = useState('gallery');

  // Search queries
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [packageSearch, setPackageSearch] = useState('');

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Modals state
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null); // null if adding
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    category: 'wildlife',
    location: '',
    src: '',
    aspect: 'aspect-[4/3]',
    description: '',
  });

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null); // null if adding
  const [packageFormData, setPackageFormData] = useState({
    id: '',
    title: '',
    duration: '',
    badge: 'Curated Expedition',
    price: '₹9,999',
    perPerson: 'per person',
    image: '',
    description: '',
    highlights: [''],
    itinerary: [{ day: 'Day 1', plan: '' }],
  });

  // Confirm delete dialog state
  const [deleteDialog, setDeleteDialog] = useState(null); // { type: 'gallery'|'package', id, title }

  // ---------------------------------------------
  // AUTHENTICATION HANDLERS
  // ---------------------------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const cleanUser = loginForm.username.trim().toLowerCase();
    const cleanPass = loginForm.password.trim();

    if (cleanUser === ADMIN_CREDENTIALS.username.toLowerCase() && cleanPass === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem(STORAGE_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      showToast(`Welcome back, ${ADMIN_CREDENTIALS.username}!`);
    } else {
      setLoginError('Invalid Admin ID or Password. Please check and try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_AUTH_KEY);
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
    showToast('Logged out successfully.');
  };

  // ---------------------------------------------
  // GALLERY MODAL HANDLERS
  // ---------------------------------------------
  const openAddGalleryModal = () => {
    setEditingGalleryItem(null);
    setGalleryFormData({
      title: '',
      category: 'wildlife',
      location: '',
      src: '',
      aspect: 'aspect-[4/3]',
      description: '',
    });
    setGalleryModalOpen(true);
  };

  const openEditGalleryModal = (item) => {
    setEditingGalleryItem(item);
    setGalleryFormData({
      title: item.title || '',
      category: item.category || 'wildlife',
      location: item.location || '',
      src: item.src || '',
      aspect: item.aspect || 'aspect-[4/3]',
      description: item.description || '',
    });
    setGalleryModalOpen(true);
  };

  const handleImageFileUpload = (e, targetField = 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (targetField === 'gallery') {
        setGalleryFormData((prev) => ({ ...prev, src: reader.result }));
      } else {
        setPackageFormData((prev) => ({ ...prev, image: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveGallery = (e) => {
    e.preventDefault();
    if (!galleryFormData.title.trim()) {
      alert('Please enter an image title.');
      return;
    }
    if (!galleryFormData.src.trim()) {
      alert('Please provide an image URL or upload an image file.');
      return;
    }

    if (editingGalleryItem) {
      updateGalleryItem(editingGalleryItem.id, galleryFormData);
      showToast(`Updated "${galleryFormData.title}"`);
    } else {
      addGalleryItem(galleryFormData);
      showToast(`Added new photo "${galleryFormData.title}"`);
    }
    setGalleryModalOpen(false);
  };

  // ---------------------------------------------
  // PACKAGE MODAL HANDLERS
  // ---------------------------------------------
  const openAddPackageModal = () => {
    setEditingPackage(null);
    setPackageFormData({
      id: '',
      title: '',
      duration: '3 Days / 2 Nights',
      badge: 'Special Expedition',
      price: '₹14,999',
      perPerson: 'per person',
      image: '',
      description: '',
      highlights: ['Exclusive safari access', 'Eco-resort stay included', 'All meals & local guide'],
      itinerary: [
        { day: 'Day 1', plan: 'Arrival and check-in to eco-resort.' },
        { day: 'Day 2', plan: 'Full day wildlife safari and scenic spots.' },
        { day: 'Day 3', plan: 'Morning nature walk and return departure.' },
      ],
    });
    setPackageModalOpen(true);
  };

  const openEditPackageModal = (pkg) => {
    setEditingPackage(pkg);
    setPackageFormData({
      id: pkg.id || '',
      title: pkg.title || '',
      duration: pkg.duration || '',
      badge: pkg.badge || '',
      price: pkg.price || '',
      perPerson: pkg.perPerson || 'per person',
      image: pkg.image || '',
      description: pkg.description || '',
      highlights: Array.isArray(pkg.highlights) && pkg.highlights.length > 0 ? [...pkg.highlights] : [''],
      itinerary: Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 ? JSON.parse(JSON.stringify(pkg.itinerary)) : [{ day: 'Day 1', plan: '' }],
    });
    setPackageModalOpen(true);
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    if (!packageFormData.title.trim()) {
      alert('Please enter a package title.');
      return;
    }
    if (!packageFormData.price.trim()) {
      alert('Please enter a package price.');
      return;
    }
    if (!packageFormData.image.trim()) {
      alert('Please provide a package cover image.');
      return;
    }

    const cleanedData = {
      ...packageFormData,
      highlights: packageFormData.highlights.filter((h) => h.trim() !== ''),
      itinerary: packageFormData.itinerary.filter((item) => item.plan.trim() !== ''),
    };

    if (editingPackage) {
      updatePackage(editingPackage.id, cleanedData);
      showToast(`Updated package "${cleanedData.title}"`);
    } else {
      addPackage(cleanedData);
      showToast(`Created package "${cleanedData.title}"`);
    }
    setPackageModalOpen(false);
  };

  // Filtered Lists
  const filteredGallery = gallery.filter((item) => {
    const matchesCategory = galleryFilter === 'all' || item.category === galleryFilter;
    const matchesSearch =
      (item.title || '').toLowerCase().includes(gallerySearch.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(gallerySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredPackages = packages.filter((pkg) => {
    return (
      (pkg.title || '').toLowerCase().includes(packageSearch.toLowerCase()) ||
      (pkg.duration || '').toLowerCase().includes(packageSearch.toLowerCase())
    );
  });

  // ---------------------------------------------
  // 1. LOGIN SCREEN (When Not Authenticated)
  // ---------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#06110a] text-[#f7f4ee] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-forest-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-forest-950/80 border border-forest-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10"
        >
          {/* Logo / Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-forest-900 border border-forest-600/40 text-forest-300 shadow-inner mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-cream-300/70 mt-1">
              Sign in to manage Gallery Images and Tour Packages
            </p>
          </div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-xl bg-red-950/70 border border-red-700/60 text-red-200 text-xs flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                Admin ID / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-forest-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Enter admin ID"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-forest-900/60 border border-forest-800 focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-white placeholder-cream-400/40 text-sm outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-forest-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-forest-900/60 border border-forest-800 focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-white placeholder-cream-400/40 text-sm outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-cream-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-400 hover:to-forest-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-forest-600/25 transition duration-200 active:scale-[0.99]"
            >
              Sign In to Portal
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-forest-800/60 text-center">
            <Link
              to="/"
              className="text-xs text-forest-300 hover:text-forest-200 inline-flex items-center gap-1.5 transition"
            >
              <span>← Back to Website</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ---------------------------------------------
  return (
    <div className="min-h-screen bg-[#07130b] text-[#f7f4ee] pb-24">
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-5 left-1/2 z-50 px-4 py-2.5 rounded-full bg-forest-900/95 border border-forest-500/80 text-white shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs sm:text-sm font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP ADMIN HEADER */}
      <header className="sticky top-0 z-40 bg-forest-950/90 border-b border-forest-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-900 border border-forest-600/40 flex items-center justify-center text-forest-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-white text-base sm:text-lg">Odisha Tourism</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-forest-600/80 text-white">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-cream-300/70 hidden sm:block">
                Logged in as <span className="text-forest-300 font-semibold">{ADMIN_CREDENTIALS.username}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg border border-forest-800 bg-forest-900/50 hover:bg-forest-800/70 text-cream-200 text-xs font-medium inline-flex items-center gap-1.5 transition"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-forest-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/80 border border-red-800/70 text-red-200 text-xs font-medium inline-flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ADMIN TABS & HERO BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-forest-800/60">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">Content Management</h1>
            <p className="text-xs sm:text-sm text-cream-300/70 mt-1">
              Select a section below to update live photos and tour packages.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="flex items-center gap-2 bg-forest-950/90 p-1.5 rounded-2xl border border-forest-800/80 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-forest-500 to-forest-600 text-white shadow-md'
                  : 'text-cream-300/70 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery Images</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/30">
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('packages')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'packages'
                  ? 'bg-gradient-to-r from-forest-500 to-forest-600 text-white shadow-md'
                  : 'text-cream-300/70 hover:text-white'
              }`}
            >
              <PackageIcon className="w-4 h-4" />
              <span>Tour Packages</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/30">
                {packages.length}
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================
            SECTION 1: GALLERY MANAGEMENT
        ========================================================= */}
        {activeTab === 'gallery' && (
          <div>
            {/* Gallery Control Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
              {/* Search & Filter */}
              <div className="flex flex-1 flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search photos by title, location..."
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-forest-950/80 border border-forest-800 text-sm text-white placeholder-cream-400/40 focus:border-forest-500 focus:outline-none"
                  />
                </div>

                <select
                  value={galleryFilter}
                  onChange={(e) => setGalleryFilter(e.target.value)}
                  className="py-2 px-3 rounded-xl bg-forest-950/80 border border-forest-800 text-sm text-cream-200 focus:border-forest-500 focus:outline-none"
                >
                  {GALLERY_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-forest-950 text-white">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all gallery photos back to original defaults? Any custom added photos will be replaced.')) {
                      resetGallery();
                      showToast('Gallery reset to initial state.');
                    }
                  }}
                  title="Reset to default original photos"
                  className="px-3 py-2 rounded-xl border border-forest-800 hover:bg-forest-900/60 text-cream-300 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  onClick={openAddGalleryModal}
                  className="px-4 py-2 rounded-xl bg-forest-500 hover:bg-forest-400 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-lg transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>
            </div>

            {/* Gallery Cards Grid */}
            {filteredGallery.length === 0 ? (
              <div className="text-center py-16 bg-forest-950/40 rounded-3xl border border-forest-800/60 p-8">
                <ImageIcon className="w-10 h-10 text-forest-600 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-white">No Photos Found</h3>
                <p className="text-xs text-cream-300/70 mt-1">Try adjusting your search query or add a new photo.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-forest-950/80 border border-forest-800/70 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-lg hover:border-forest-600/60 transition"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-forest-300 border border-white/10">
                          {item.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-serif text-base font-bold text-white line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="flex items-center gap-1 text-xs text-cream-300/70 mt-1 truncate">
                          <MapPin className="w-3 h-3 text-forest-400 shrink-0" />
                          <span className="truncate">{item.location || 'Odisha'}</span>
                        </p>
                        {item.description && (
                          <p className="text-xs text-cream-400/60 mt-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-3 bg-forest-900/40 border-t border-forest-800/60 flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditGalleryModal(item)}
                        className="p-1.5 rounded-lg hover:bg-forest-800 text-cream-200 hover:text-white transition"
                        title="Edit photo"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteDialog({ type: 'gallery', id: item.id, title: item.title })}
                        className="p-1.5 rounded-lg hover:bg-red-950/80 text-red-400 hover:text-red-200 transition"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            SECTION 2: PACKAGES MANAGEMENT
        ========================================================= */}
        {activeTab === 'packages' && (
          <div>
            {/* Packages Control Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search packages by title, duration..."
                  value={packageSearch}
                  onChange={(e) => setPackageSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-forest-950/80 border border-forest-800 text-sm text-white placeholder-cream-400/40 focus:border-forest-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all packages back to original defaults? Any custom added packages will be replaced.')) {
                      resetPackages();
                      showToast('Packages reset to original defaults.');
                    }
                  }}
                  title="Reset to default original packages"
                  className="px-3 py-2 rounded-xl border border-forest-800 hover:bg-forest-900/60 text-cream-300 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  onClick={openAddPackageModal}
                  className="px-4 py-2 rounded-xl bg-forest-500 hover:bg-forest-400 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-lg transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Package</span>
                </button>
              </div>
            </div>

            {/* Packages List */}
            {filteredPackages.length === 0 ? (
              <div className="text-center py-16 bg-forest-950/40 rounded-3xl border border-forest-800/60 p-8">
                <PackageIcon className="w-10 h-10 text-forest-600 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-white">No Packages Found</h3>
                <p className="text-xs text-cream-300/70 mt-1">Try adjusting your search query or add a new package.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-forest-950/80 border border-forest-800/70 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-xl hover:border-forest-600/60 transition"
                  >
                    <div>
                      {/* Image + Header Banner */}
                      <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                        {pkg.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest-600/90 text-white backdrop-blur-md">
                            {pkg.badge}
                          </span>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-cream-100">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md">
                            <Clock className="w-3.5 h-3.5 text-forest-400" />
                            {pkg.duration}
                          </span>
                          <span className="font-serif text-lg font-bold text-forest-300">
                            {pkg.price}
                          </span>
                        </div>
                      </div>

                      {/* Info Details */}
                      <div className="p-5">
                        <h3 className="font-serif text-lg font-bold text-white mb-2 leading-snug">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-cream-300/80 font-light line-clamp-2 mb-3">
                          {pkg.description}
                        </p>

                        {/* Highlights tag preview */}
                        {Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-forest-900">
                            {pkg.highlights.slice(0, 3).map((h, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-forest-900/60 border border-forest-800 text-cream-200/90 truncate max-w-[200px]"
                              >
                                ✓ {h}
                              </span>
                            ))}
                            {pkg.highlights.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded text-forest-400">
                                +{pkg.highlights.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-3 bg-forest-900/40 border-t border-forest-800/60 flex items-center justify-between">
                      <span className="text-[11px] text-cream-400/70">
                        {Array.isArray(pkg.itinerary) ? `${pkg.itinerary.length} Days Itinerary` : ''}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditPackageModal(pkg)}
                          className="px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteDialog({ type: 'package', id: pkg.id, title: pkg.title })}
                          className="p-1.5 rounded-lg hover:bg-red-950/80 text-red-400 hover:text-red-200 transition"
                          title="Delete package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================================================
          MODAL: ADD / EDIT GALLERY ITEM
      ========================================================= */}
      <AnimatePresence>
        {galleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-forest-950 border border-forest-800 rounded-3xl p-6 shadow-2xl my-8 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-forest-800/80 mb-5">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-forest-400" />
                  <span>{editingGalleryItem ? 'Edit Photo Details' : 'Add New Gallery Photo'}</span>
                </h3>
                <button
                  onClick={() => setGalleryModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-forest-900 text-cream-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveGallery} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Bengal Tiger in Similipal Meadows"
                    value={galleryFormData.title}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                  />
                </div>

                {/* Category & Aspect Ratio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">
                      Category *
                    </label>
                    <select
                      value={galleryFormData.category}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                    >
                      {GALLERY_CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id} className="bg-forest-950 text-white">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">
                      Aspect Ratio
                    </label>
                    <select
                      value={galleryFormData.aspect}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, aspect: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                    >
                      <option value="aspect-[4/3]">Standard (4:3)</option>
                      <option value="aspect-[3/4]">Portrait / Tall (3:4)</option>
                      <option value="aspect-[16/9]">Widescreen (16:9)</option>
                      <option value="aspect-[16/10]">Wide (16:10)</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">
                    Location Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Similipal Biosphere Reserve, Mayurbhanj"
                    value={galleryFormData.location}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                  />
                </div>

                {/* Image Source & File Upload */}
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">
                    Image Source (URL or Upload File) *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste image URL (or /images/...)"
                      value={galleryFormData.src}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, src: e.target.value })}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-forest-900/80 border border-forest-800 text-xs text-white focus:border-forest-500 focus:outline-none"
                    />
                    <label className="px-3 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-100 text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, 'gallery')}
                      />
                    </label>
                  </div>

                  {/* Image Preview */}
                  {galleryFormData.src && (
                    <div className="mt-2.5 rounded-xl overflow-hidden border border-forest-800 max-h-40 bg-black/40">
                      <img
                        src={galleryFormData.src}
                        alt="Preview"
                        className="w-full h-36 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">
                    Description / Caption
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short description of the photo..."
                    value={galleryFormData.description}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-3 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGalleryModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-forest-800 hover:bg-forest-900 text-xs font-medium text-cream-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest-500 hover:bg-forest-400 text-white text-xs font-semibold shadow-lg"
                  >
                    {editingGalleryItem ? 'Save Changes' : 'Add Photo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MODAL: ADD / EDIT PACKAGE
      ========================================================= */}
      <AnimatePresence>
        {packageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl bg-forest-950 border border-forest-800 rounded-3xl p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-forest-800/80 mb-5 sticky top-0 bg-forest-950 z-10">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <PackageIcon className="w-5 h-5 text-forest-400" />
                  <span>{editingPackage ? 'Edit Package Details' : 'Create New Tour Package'}</span>
                </h3>
                <button
                  onClick={() => setPackageModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-forest-900 text-cream-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePackage} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Similipal Deep Wilderness Expedition"
                    value={packageFormData.title}
                    onChange={(e) => setPackageFormData({ ...packageFormData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                  />
                </div>

                {/* Duration & Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">
                      Duration *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3 Days / 2 Nights"
                      value={packageFormData.duration}
                      onChange={(e) => setPackageFormData({ ...packageFormData, duration: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Popular Wildlife Safari"
                      value={packageFormData.badge}
                      onChange={(e) => setPackageFormData({ ...packageFormData, badge: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Price & Price Unit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">
                      Starting Price *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹12,999"
                      value={packageFormData.price}
                      onChange={(e) => setPackageFormData({ ...packageFormData, price: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">
                      Price Unit
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. per person"
                      value={packageFormData.perPerson}
                      onChange={(e) => setPackageFormData({ ...packageFormData, perPerson: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">
                    Package Cover Image *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Image URL or /images/..."
                      value={packageFormData.image}
                      onChange={(e) => setPackageFormData({ ...packageFormData, image: e.target.value })}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-forest-900/80 border border-forest-800 text-xs text-white focus:border-forest-500 focus:outline-none"
                    />
                    <label className="px-3 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-100 text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, 'package')}
                      />
                    </label>
                  </div>

                  {/* Image Preview */}
                  {packageFormData.image && (
                    <div className="mt-2.5 rounded-xl overflow-hidden border border-forest-800 max-h-40 bg-black/40">
                      <img
                        src={packageFormData.image}
                        alt="Preview"
                        className="w-full h-36 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">
                    Overview Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detailed package overview..."
                    value={packageFormData.description}
                    onChange={(e) => setPackageFormData({ ...packageFormData, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-forest-900/80 border border-forest-800 text-sm text-white focus:border-forest-500 focus:outline-none"
                  />
                </div>

                {/* Highlights List */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-cream-200">
                      Key Highlights / Inclusions
                    </label>
                    <button
                      type="button"
                      onClick={() => setPackageFormData({ ...packageFormData, highlights: [...packageFormData.highlights, ''] })}
                      className="text-xs text-forest-300 hover:text-forest-200 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Highlight</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {packageFormData.highlights.map((h, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Highlight #${index + 1}`}
                          value={h}
                          onChange={(e) => {
                            const updated = [...packageFormData.highlights];
                            updated[index] = e.target.value;
                            setPackageFormData({ ...packageFormData, highlights: updated });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-forest-900/80 border border-forest-800 text-xs text-white focus:border-forest-500 focus:outline-none"
                        />
                        {packageFormData.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = packageFormData.highlights.filter((_, i) => i !== index);
                              setPackageFormData({ ...packageFormData, highlights: updated });
                            }}
                            className="p-1.5 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day-by-Day Itinerary */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-cream-200">
                      Day-by-Day Itinerary
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const dayNum = packageFormData.itinerary.length + 1;
                        setPackageFormData({
                          ...packageFormData,
                          itinerary: [...packageFormData.itinerary, { day: `Day ${dayNum}`, plan: '' }],
                        });
                      }}
                      className="text-xs text-forest-300 hover:text-forest-200 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Day</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {packageFormData.itinerary.map((item, index) => (
                      <div key={index} className="flex gap-2 items-start bg-forest-900/40 p-2.5 rounded-xl border border-forest-800/60">
                        <input
                          type="text"
                          placeholder="Day 1"
                          value={item.day}
                          onChange={(e) => {
                            const updated = [...packageFormData.itinerary];
                            updated[index].day = e.target.value;
                            setPackageFormData({ ...packageFormData, itinerary: updated });
                          }}
                          className="w-24 px-2.5 py-1.5 rounded-lg bg-forest-900 border border-forest-800 text-xs text-forest-300 font-semibold focus:outline-none"
                        />
                        <textarea
                          rows={2}
                          placeholder="Daily plan activities, safari, stay..."
                          value={item.plan}
                          onChange={(e) => {
                            const updated = [...packageFormData.itinerary];
                            updated[index].plan = e.target.value;
                            setPackageFormData({ ...packageFormData, itinerary: updated });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-forest-900 border border-forest-800 text-xs text-white focus:border-forest-500 focus:outline-none"
                        />
                        {packageFormData.itinerary.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = packageFormData.itinerary.filter((_, i) => i !== index);
                              setPackageFormData({ ...packageFormData, itinerary: updated });
                            }}
                            className="p-1.5 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex items-center justify-end gap-2.5 sticky bottom-0 bg-forest-950 py-2 border-t border-forest-800">
                  <button
                    type="button"
                    onClick={() => setPackageModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-forest-800 hover:bg-forest-900 text-xs font-medium text-cream-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest-500 hover:bg-forest-400 text-white text-xs font-semibold shadow-lg"
                  >
                    {editingPackage ? 'Save Package' : 'Create Package'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================
          DELETE CONFIRMATION DIALOG
      ========================================================= */}
      <AnimatePresence>
        {deleteDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-forest-950 border border-red-900/60 rounded-3xl p-6 shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-700/60 text-red-400 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-1">
                Delete {deleteDialog.type === 'gallery' ? 'Photo' : 'Package'}?
              </h3>
              <p className="text-xs text-cream-300/70 mb-5">
                Are you sure you want to delete <span className="text-white font-medium">"{deleteDialog.title}"</span>? This action cannot be undone.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteDialog(null)}
                  className="px-4 py-2 rounded-xl border border-forest-800 hover:bg-forest-900 text-xs font-medium text-cream-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (deleteDialog.type === 'gallery') {
                      deleteGalleryItem(deleteDialog.id);
                      showToast('Photo deleted successfully.');
                    } else {
                      deletePackage(deleteDialog.id);
                      showToast('Package deleted successfully.');
                    }
                    setDeleteDialog(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
