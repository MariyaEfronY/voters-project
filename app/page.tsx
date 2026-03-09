"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Landmark, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AboutSection from "./components/AboutSection";
import RulesSection from "./components/RulesSection";

export default function StatePortal() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
      {/* 1. TOP OFFICIAL BAR */}
      <div className="bg-slate-100 border-b border-slate-200 py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Official State Government Portal
            </span>
          </div>
          <div className="flex gap-4">
            <button className="hover:text-slate-900 transition-colors">English | Hindi</button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-white">
              <Landmark size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black leading-tight text-blue-900 uppercase">State Election</h1>
              <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Commission of India</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            <Link href="/" className="text-blue-600 border-b-2 border-blue-600 pb-1">Home</Link>
            <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>

            <Link href="/login">
              <button className="bg-blue-900 text-white px-6 py-2.5 rounded-full hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
                Admin Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative bg-blue-900 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/30 border border-blue-400/30 rounded-full text-xs font-black uppercase tracking-widest mb-6 text-white">
              General Elections 2026
            </span>
            <h2 className="text-5xl md:text-6xl font-black leading-[1.1] mb-6 text-white">
              Your Vote is Your <br /><span className="text-blue-400">Voice & Power.</span>
            </h2>
            <div className="relative max-w-md group">
              <input
                type="text"
                placeholder="Find services, voter ID, or results..."
                className="w-full pl-14 pr-4 py-5 bg-white rounded-2xl text-slate-900 font-medium outline-none focus:ring-4 focus:ring-blue-400/40 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hidden lg:block relative">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-[3rem] border border-white/20">
              <img src="portal_image.svg" alt="Landmark" className="rounded-[2.5rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 w-full object-cover aspect-video" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SECTIONS */}
      <AboutSection />
      <RulesSection />

      {/* 5. FOOTER (Modified to include your original footer) */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <Landmark size={24} className="text-blue-400" />
              <h1 className="text-lg font-black uppercase tracking-tighter">State Election Commission</h1>
            </div>
            <p className="text-slate-400 max-w-md">Encouraging participation through secure digital infrastructure.</p>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs tracking-widest mb-6 text-blue-400">Quick Support</h5>
            <p className="text-sm text-slate-400">Toll Free: 1800-ELECTIONS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}