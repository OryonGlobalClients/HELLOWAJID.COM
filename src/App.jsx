import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import { DataProvider } from './context/DataContext';

import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Gallery from './pages/Gallery';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import SimilipalSafaris from './pages/SimilipalSafaris';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <DataProvider>
      <div className="flex flex-col min-h-screen bg-[#08140c] text-[#f7f4ee]">
        <ScrollToTop />
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/similipal-safaris" element={<SimilipalSafaris />} />
            <Route path="/explore-similipal" element={<SimilipalSafaris />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppButton />}
      </div>
    </DataProvider>
  );
}
