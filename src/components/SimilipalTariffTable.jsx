import React from 'react';
import { Phone, Mail, Users, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { SIMILIPAL_RATE_CHART, TOUR_OPERATOR_INFO } from '../data/packages';

export default function SimilipalTariffTable({ className = '' }) {
  return (
    <div className={`w-full rounded-2xl sm:rounded-3xl bg-[#0a1a12]/95 border border-forest-700/60 p-4 sm:p-8 backdrop-blur-md shadow-2xl text-[#f7f4ee] ${className}`}>
      
      {/* Operator Header matching the chart */}
      <div className="text-center pb-6 border-b border-forest-800/80">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/80 border border-forest-500/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-forest-300 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-forest-400" />
          <span>Official Tariff & Rates</span>
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-rose-400 tracking-wide uppercase">
          {TOUR_OPERATOR_INFO.company}
        </h3>
        
        <h4 className="font-sans text-sm sm:text-base font-bold text-forest-300 tracking-widest uppercase mt-1">
          {TOUR_OPERATOR_INFO.destination}
        </h4>

        {/* Contacts & Email */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-3 text-xs sm:text-sm text-cream-200">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-forest-400" />
            <span className="font-semibold text-cream-400">CONTACTS:</span>
            <a href="tel:+919437266828" className="hover:text-forest-300 font-mono font-medium underline underline-offset-2">9437266828</a>
            <span>/</span>
            <a href="tel:+918018868898" className="hover:text-forest-300 font-mono font-medium underline underline-offset-2">8018868898</a>
          </div>

          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-forest-400" />
            <span className="font-semibold text-cream-400">EMAIL:</span>
            <a href={`mailto:${TOUR_OPERATOR_INFO.email}`} className="hover:text-forest-300 font-mono font-medium underline underline-offset-2">
              {TOUR_OPERATOR_INFO.email}
            </a>
          </div>
        </div>

        <div className="mt-4">
          <span className="inline-block px-4 py-1.5 rounded-xl bg-forest-950/80 border border-forest-700/60 font-serif text-base sm:text-lg font-bold text-amber-300 tracking-wider uppercase">
            TOUR PACKAGES
          </span>
        </div>
      </div>

      {/* Responsive Rate Table */}
      <div className="mt-6 overflow-x-auto no-scrollbar rounded-2xl border border-forest-800/80 bg-forest-950/60">
        <table className="w-full text-left border-collapse min-w-[580px]">
          <thead>
            <tr className="bg-forest-900/80 text-cream-100 text-xs sm:text-sm border-b border-forest-700/80 font-serif">
              <th className="py-3.5 px-4 font-bold tracking-wider text-forest-300 border-r border-forest-800/80 w-1/4">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-forest-400" />
                  <span>Nos (Persons)</span>
                </div>
              </th>
              <th className="py-3.5 px-4 font-bold tracking-wider text-center border-r border-forest-800/80 w-1/4">
                1 Night 2 Days
              </th>
              <th className="py-3.5 px-4 font-bold tracking-wider text-center border-r border-forest-800/80 w-1/4">
                2 Night 3 Days
              </th>
              <th className="py-3.5 px-4 font-bold tracking-wider text-center w-1/4">
                3 Night 4 Days
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-800/60 text-xs sm:text-sm">
            {SIMILIPAL_RATE_CHART.map((row, idx) => (
              <tr 
                key={row.nos} 
                className={`transition-colors hover:bg-forest-800/40 ${
                  idx % 2 === 0 ? 'bg-forest-950/40' : 'bg-[#08150d]/40'
                }`}
              >
                <td className="py-3 px-4 font-semibold text-cream-200 border-r border-forest-800/80">
                  <span className="inline-flex items-center justify-center min-w-[68px] px-2.5 py-1 rounded-lg bg-forest-900/60 border border-forest-700/60 text-forest-300 font-mono text-xs font-bold">
                    {row.label}
                  </span>
                </td>
                <td className="py-3 px-4 text-center border-r border-forest-800/80 font-mono font-medium text-cream-100">
                  <span className="text-forest-200 font-semibold">{row.p1n2d}</span>
                  <span className="text-[11px] text-cream-400/80 block sm:inline sm:ml-1 font-sans">/ Per Head</span>
                </td>
                <td className="py-3 px-4 text-center border-r border-forest-800/80 font-mono font-medium text-cream-100">
                  <span className="text-forest-200 font-semibold">{row.p2n3d}</span>
                  <span className="text-[11px] text-cream-400/80 block sm:inline sm:ml-1 font-sans">/ Per Head</span>
                </td>
                <td className="py-3 px-4 text-center font-mono font-medium text-cream-100">
                  <span className="text-amber-300 font-semibold">{row.p3n4d}</span>
                  <span className="text-[11px] text-cream-400/80 block sm:inline sm:ml-1 font-sans">/ Per Head</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes & Extra Charges from Chart */}
      <div className="mt-5 pt-4 border-t border-forest-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 text-xs text-cream-300/90 font-medium">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-400" />
            <strong className="text-forest-300">PLUS 5 % GST</strong> applicable on all packages
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-400" />
            <span>Extra 1 Person – <strong className="text-forest-200">₹1,500/-</strong></span>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-400" />
            <span className="text-cream-400">Guide Charges Extra • NOS refers to number of persons</span>
          </p>
        </div>

        {/* Quick Contact & WhatsApp Booking Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="tel:+919437266828"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-forest-700/80 hover:bg-forest-600 text-white text-xs font-semibold shadow-md transition-all touch-manipulation active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 9437266828</span>
          </a>
          <a
            href="https://wa.me/919437266828?text=Hello%20Wajid,%20I%20am%20interested%20in%20Similipal%20Tour%20Packages."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all touch-manipulation active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Booking</span>
          </a>
        </div>
      </div>

    </div>
  );
}
