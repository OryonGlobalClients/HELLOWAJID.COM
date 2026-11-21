import React, { createContext, useContext, useState, useEffect } from 'react';
import { GALLERY_ITEMS as DEFAULT_GALLERY } from '../data/gallery';
import { PACKAGES as DEFAULT_PACKAGES } from '../data/packages';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  GALLERY: 'ot_custom_gallery_v5',
  PACKAGES: 'ot_custom_packages_v2',
};

export function DataProvider({ children }) {
  // 1. Gallery State with localStorage persistence
  const [gallery, setGallery] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load gallery from storage:', e);
    }
    return DEFAULT_GALLERY;
  });

  // 2. Packages State with localStorage persistence
  const [packages, setPackages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load packages from storage:', e);
    }
    return DEFAULT_PACKAGES;
  });

  // Sync gallery changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error('Failed to save gallery to storage:', e);
    }
  }, [gallery]);

  // Sync packages changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    } catch (e) {
      console.error('Failed to save packages to storage:', e);
    }
  }, [packages]);

  // ---------------------------------------------
  // GALLERY ACTIONS
  // ---------------------------------------------
  const addGalleryItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      aspect: item.aspect || 'aspect-[4/3]',
    };
    setGallery((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateGalleryItem = (id, updatedFields) => {
    setGallery((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteGalleryItem = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  const resetGallery = () => {
    setGallery(DEFAULT_GALLERY);
    try {
      localStorage.removeItem(STORAGE_KEYS.GALLERY);
    } catch (e) {
      console.error(e);
    }
  };

  // ---------------------------------------------
  // PACKAGES ACTIONS
  // ---------------------------------------------
  const addPackage = (pkg) => {
    const newPkg = {
      ...pkg,
      id: pkg.id || `pkg-${Date.now()}`,
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
      itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : [],
    };
    setPackages((prev) => [newPkg, ...prev]);
    return newPkg;
  };

  const updatePackage = (id, updatedFields) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...updatedFields } : pkg))
    );
  };

  const deletePackage = (id) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  const resetPackages = () => {
    setPackages(DEFAULT_PACKAGES);
    try {
      localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DataContext.Provider
      value={{
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
