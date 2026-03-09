"use client";

import Link from "next/link";
import { Landmark, Vote, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import AboutSection from "./components/AboutSection";
import RulesSection from "./components/RulesSection";

export default function StatePortal() {
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
            {/* Admin and other links removed for "Only One Button" requirement */}
            <Link href="/login">
              <button className="bg-blue-900 text-white px-6 py-2.5 rounded-full hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
                Admin Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative bg-blue-900 py-32 px-6 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/30 border border-blue-400/30 rounded-full text-xs font-black uppercase tracking-widest mb-6 text-white">
              General Elections 2026
            </span>
            <h2 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 text-white">
              Your Vote is Your <br /><span className="text-blue-400">Voice & Power.</span>
            </h2>

            <p className="text-blue-100/80 text-lg mb-10 max-w-md font-medium leading-relaxed">
              Exercise your democratic right securely. Click below to enter the official voting portal.
            </p>

            {/* --- THE SINGLE PRIMARY BUTTON --- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link href="/votting">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#10b981" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 px-10 py-6 bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-[0.1em] shadow-2xl shadow-emerald-500/40 transition-all text-lg"
                >
                  <Vote size={28} />
                  Proceed to Voting
                  <ArrowRight size={20} className="ml-2" />
                </motion.button>
              </Link>

              <div className="flex items-center gap-3 text-blue-300 text-xs font-black uppercase tracking-widest">
                <ShieldCheck className="text-emerald-400" size={20} />
                Identity Verified System
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hidden lg:block relative">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-[4rem] border border-white/20 shadow-2xl">
              <div className="aspect-video bg-slate-800 rounded-[3.5rem] overflow-hidden">
                <img src="portal_image.svg" alt="Election" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SECTIONS */}
      <AboutSection />
      <RulesSection />

      {/* 5. FOOTER */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <Landmark size={24} className="text-blue-400" />
            <h1 className="text-lg font-black uppercase tracking-tighter">State Election Commission</h1>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2026 Official Governance Infrastructure
          </p>
        </div>
      </footer>
    </div>
  );
}