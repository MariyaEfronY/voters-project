"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getToken } from "../../utils/auth";
import { UserCheck, Users, BarChart3, ArrowRight, Zap } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch("/api/admin/verify", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (!res.ok) router.push("/admin/login");
      else setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-600 font-medium animate-pulse">Loading Secure Environment...</p>
      </div>
    );
  }

  const cards = [
    {
      title: "Manage Nominees",
      desc: "Add, edit and manage candidates for the upcoming election cycle.",
      icon: <UserCheck size={24} />,
      path: "/admin/nominee",
      color: "blue",
    },
    {
      title: "Register Voters",
      desc: "Securely onboard new voters and manage system access credentials.",
      icon: <Users size={24} />,
      path: "/admin/register-voters",
      color: "emerald",
    },
    {
      title: "Election Results",
      desc: "Real-time visualization of casted votes and participation analytics.",
      icon: <BarChart3 size={24} />,
      path: "/admin/fetched-votes",
      color: "violet",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Welcome Back, <span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            System status: <span className="text-emerald-600 font-semibold inline-flex items-center gap-1"><Zap size={16} /> Active</span>
          </p>
        </div>
        <div className="hidden lg:block bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Election Date</p>
          <p className="text-slate-900 font-semibold">March 25, 2026</p>
        </div>
      </div>

      {/* Grid Layout - Fixed to 3 columns on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            onClick={() => router.push(card.path)}
            className="group relative bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Icon Header */}
            <div className={`mb-8 inline-flex p-4 rounded-2xl transition-all duration-300 ${
              card.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600' :
              card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600' :
              'bg-violet-50 text-violet-600 group-hover:bg-violet-600'
            } group-hover:text-white group-hover:shadow-lg group-hover:shadow-current/30`}>
              {card.icon}
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {card.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              {card.desc}
            </p>

            <div className={`flex items-center text-sm font-bold pt-4 border-t border-slate-50 ${
              card.color === 'blue' ? 'text-blue-600' :
              card.color === 'emerald' ? 'text-emerald-600' :
              'text-violet-600'
            }`}>
              Open Panel <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-2" />
            </div>

            {/* Subtle Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>
      
      {/* Quick Activity Section (Optional) */}
      <div className="mt-12 p-8 bg-slate-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-xl font-bold">Need a system report?</h3>
          <p className="text-slate-400 text-sm mt-1">Generate a full PDF audit log of all current election activities.</p>
        </div>
        <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap">
          Generate Audit Report
        </button>
      </div>
    </motion.div>
  );
}