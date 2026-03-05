"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12 px-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)`
        }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-black/30 border border-white/20 p-12 text-center w-full"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
            Welcome to Voting Portal
          </h1>
          <p className="text-slate-500 text-lg mb-8">
            Secure, transparent, and easy – your voice matters.
          </p>
          <button
            onClick={() => router.push('/register')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg"
          >
            Start Registration
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-blue-200/70 text-sm">
        <p>All data is encrypted and stored according to government security protocols.</p>
      </div>
    </div>
  );
}