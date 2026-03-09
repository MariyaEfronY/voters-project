"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "../utils/auth";
import { Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function loginAdmin() {
    if (!email || !password) {
      setMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        saveToken(data.token);
        router.push("/admin/dashboard");
      } else {
        setMsg(data.message || "Invalid credentials");
      }
    } catch (err) {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-black p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/20"
      >
        {/* Header Section: Perfectly Centered */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6 shadow-sm">
            <ShieldCheck size={36} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-black text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Enter your admin credentials
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Input Group */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-black text-sm font-bold text-slate-700 ml-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full text-black bg-slate-50 border border-slate-200 text-slate-900 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input Group */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-slate-700 ml-1"
            >
              Password
            </label>
            <div className="relative group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full text-black bg-slate-50 border border-slate-200 text-slate-900 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all pr-12 placeholder:text-slate-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loginAdmin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={loginAdmin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Authenticating...</span>
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>

          {/* Error Message with Proper Spacing */}
          <div className="min-h-[20px]"> {/* Prevents layout jump when msg appears */}
            <AnimatePresence mode="wait">
              {msg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {msg}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}