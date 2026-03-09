"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Download,
  RefreshCw,
  UserCheck,
  Calendar,
} from "lucide-react";

interface Vote {
  _id: string;
  voter: {
    name: string;
    phone: string;
    voterId: string;
  };
  nominee: {
    name: string;
    party: string;
  };
  createdAt: string;
}

export default function VotesPage() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVotes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/fetch-votes");
      const data = await res.json();
      setVotes(data);
    } catch (error) {
      console.error("Error fetching votes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const filteredVotes = votes.filter(
    (vote) =>
      vote.voter?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vote.voter?.voterId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6 md:p-12 overflow-hidden">
      {/* Premium background elements: soft radial gradient + subtle noise texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#EFF6FF,_transparent_50%)] opacity-60 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#DBEAFE,_transparent_60%)] opacity-40 -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4wMjUiIC8+PC9zdmc+')] opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Election Audit Log
            </h1>
            <p className="text-slate-600 font-medium mt-2 max-w-2xl">
              Real-time verification of cast ballots and voter integrity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchVotes}
              className="p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all shadow-md hover:shadow-lg active:scale-95"
              aria-label="Refresh votes"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-slate-800 text-white rounded-2xl font-semibold shadow-xl shadow-slate-200/50 hover:bg-blue-700 transition-all active:scale-95">
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="mb-8">
          <div className="inline-block bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-slate-200/70 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center">
                <UserCheck size={28} />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  Total Ballots Cast
                </p>
                <p className="text-4xl font-black text-slate-900">{votes.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl shadow-slate-200/70 border border-slate-200/80 overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/60">
            <div className="relative w-full sm:max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or Voter ID..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-slate-500 font-medium">
              {filteredVotes.length} record{filteredVotes.length !== 1 ? "s" : ""} found
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80">
                  <th className="px-8 py-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Voter Details
                  </th>
                  <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">
                    Identity
                  </th>
                  <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Ballot Cast To
                  </th>
                  <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {filteredVotes.map((vote, idx) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      key={vote._id}
                      className="hover:bg-blue-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-slate-700 font-bold text-sm uppercase shadow-inner">
                            {vote.voter?.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              {vote.voter?.name}
                            </p>
                            <p className="text-slate-500 text-xs font-medium">
                              {vote.voter?.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="inline-flex items-center px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono text-xs font-bold shadow-sm">
                          {vote.voter?.voterId}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <div>
                          <p className="font-bold text-blue-700 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            {vote.nominee?.name}
                          </p>
                          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider ml-3.5">
                            {vote.nominee?.party}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                          <Calendar size={14} className="text-slate-400" />
                          {new Date(vote.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredVotes.length === 0 && !loading && (
              <div className="py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full text-slate-400 mb-4">
                  <FileText size={32} />
                </div>
                <p className="text-slate-700 font-medium">No voting records found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}