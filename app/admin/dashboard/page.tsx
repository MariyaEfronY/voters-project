"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getToken } from "../../utils/auth";
import { UserCheck, Users, BarChart3, ArrowRight, Zap, Database, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ voters: 0, nominees: 0, votesCast: 0, participation: 0 });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const statsRes = await fetch("/api/admin/stats", {
          // Prevent caching so data is always fresh
          cache: 'no-store'
        });
        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.stats);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    const initDashboard = async () => {
      const verifyRes = await fetch("/api/admin/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!verifyRes.ok) {
        router.push("/admin/login");
      } else {
        await fetchStats();
        setLoading(false);
      }
    };

    initDashboard();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [router]);
  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-600 font-medium animate-pulse">Synchronizing Live Data...</p>
      </div>
    );
  }

  const statItems = [
    { label: "Total Voters", value: stats.voters, icon: <Users size={20} />, color: "text-blue-600" },
    { label: "Nominees", value: stats.nominees, icon: <UserCheck size={20} />, color: "text-purple-600" },
    { label: "Votes Cast", value: stats.votesCast, icon: <CheckCircle2 size={20} />, color: "text-emerald-600" },
  ];

  const cards = [
    { title: "Manage Nominees", desc: "Add or edit candidates.", icon: <UserCheck size={24} />, path: "/admin/nominee", color: "blue" },
    { title: "Register Voters", desc: "Onboard new voters.", icon: <Users size={24} />, path: "/admin/register-voters", color: "emerald" },
    { title: "Election Results", desc: "View live analytics.", icon: <BarChart3 size={24} />, path: "/admin/fetched-votes", color: "violet" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin <span className="text-blue-600">Command Center</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live system monitoring active
          </p>
        </div>
      </div>

      {/* Live Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statItems.map((s, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={s.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl bg-slate-50 ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
            </div>
          </motion.div>
        ))}
        <div className="bg-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-200 flex flex-col justify-center">
          <p className="text-xs font-bold text-blue-100 uppercase tracking-wider">Turnout Rate</p>
          <p className="text-2xl font-black text-white">{stats.participation}%</p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -5 }}
            onClick={() => router.push(card.path)}
            className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer"
          >
            <div className={`mb-6 inline-flex p-4 rounded-2xl bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
              {card.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h2>
            <p className="text-slate-500 text-sm mb-6">{card.desc}</p>
            <div className="flex items-center text-sm font-bold text-blue-600">
              Manage <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}