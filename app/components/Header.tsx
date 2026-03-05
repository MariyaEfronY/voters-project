"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

/**
 * Professional Government-Style Election Header
 * Clean UI, responsive layout, subtle animation
 */
export default function ElectionHeader() {
  return (
    <header className="relative w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white border-b border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -right-32 top-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float-reverse" />
      </div>

      {/* Main header container */}
      <div className="relative max-w-7xl mx-auto px-6 py-6 flex items-center justify-center gap-4">
        {/* Icon */}
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm shadow">
          <ShieldCheck className="w-8 h-8 text-orange-400" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Election Commission of Tamil Nadu
          </h1>

          <p className="text-blue-200 text-sm md:text-base mt-1">
            Chief Minister Election 2026
          </p>
        </div>
      </div>

      {/* Bottom divider highlight */}
      <div className="w-full h-[2px] bg-gradient-to-r from-orange-500 via-white/40 to-green-500" />

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(18px); }
          100% { transform: translateY(0px); }
        }

        @keyframes float-reverse {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 8s infinite ease-in-out;
        }

        .animate-float-reverse {
          animation: float-reverse 10s infinite ease-in-out;
        }
      `}</style>
    </header>
  );
}

/*
Basic component tests (example for Jest + React Testing Library)
These help ensure the header renders without crashing.

import { render, screen } from '@testing-library/react'
import ElectionHeader from './ElectionHeader'

test('renders election title', () => {
  render(<ElectionHeader />)
  expect(screen.getByText(/Election Commission of Tamil Nadu/i)).toBeInTheDocument()
})

test('renders election subtitle', () => {
  render(<ElectionHeader />)
  expect(screen.getByText(/Chief Minister Election 2026/i)).toBeInTheDocument()
})
*/