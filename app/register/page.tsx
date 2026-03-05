"use client";

import React, { useState, useEffect } from 'react';
import { User, Phone, CreditCard, Calendar, MapPin, ChevronRight, CheckCircle2, AlertCircle, Sparkles, Check } from 'lucide-react';

// ---------- Field Component ----------
interface FieldProps {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  error?: string;
  touched?: boolean;
}

const Field = ({ id, name, label, icon, value, onChange, onBlur, type = "text", placeholder, required, maxLength, error, touched }: FieldProps) => {
  return (
    <div className="relative group">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
          {icon}
        </div>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl outline-none transition-all duration-200 
                     font-medium text-slate-800 placeholder:text-slate-400
                     hover:border-blue-400 hover:shadow-sm hover:shadow-blue-100
                     focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:shadow-md focus:shadow-blue-100
                     ${touched && error ? 'border-red-300 bg-red-50/30' : touched && !error ? 'border-green-300' : 'border-slate-200'}`}
        />
        {touched && !error && value && (
          <div className="absolute right-3 top-3 text-green-500">
            <Check size={18} />
          </div>
        )}
      </div>
      {touched && error && (
        <p className="text-xs text-red-500 mt-1 ml-2 flex items-center gap-1 animate-fadeIn">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
};

// ---------- Main Component ----------
export default function VoterRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhar: '',
    dob: '',
    address: '',
    gender: 'Male',
  });

  const [touched, setTouched] = useState({
    phone: false,
    aadhar: false,
  });

  const [loading, setLoading] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Validation
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone) ? '' : 'Phone number must be exactly 10 digits';
  };

  const validateAadhar = (aadhar: string) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar) ? '' : 'Aadhar number must be exactly 12 digits';
  };

  const phoneError = touched.phone ? validatePhone(formData.phone) : '';
  const aadharError = touched.aadhar ? validateAadhar(formData.aadhar) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone' || name === 'aadhar') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (field: 'phone' | 'aadhar') => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ phone: true, aadhar: true });
    if (validatePhone(formData.phone) || validateAadhar(formData.aadhar) || !formData.name || !formData.dob || !formData.address) {
      setError('Please fill all fields correctly.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/voters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setGeneratedId(result.data.voterId);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
        setFormData({ name: '', phone: '', aadhar: '', dob: '', address: '', gender: 'Male' });
        setTouched({ phone: false, aadhar: false });
      } else {
        setError(result.message || "Registration failed. Please check your details.");
      }
    } catch (err) {
      setError("Server connection lost. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white py-12 px-4 relative overflow-hidden">
      {/* Static government background (always visible) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #1e3a8a 0px, #1e3a8a 1px, transparent 1px, transparent 32px)`
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FF9933]/10" />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#138808]/10" />
          </div>
        </div>
      </div>

      {/* Animated background elements (client‑side only) */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl animate-drift" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl animate-drift-reverse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-blue-900/10 rounded-full animate-rotate-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-900/10 rounded-full animate-rotate-slow-reverse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-blue-900/10 rounded-full animate-rotate-slow" />
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-900/5 rounded-full blur-xl animate-float-particle"
              style={{
                width: `${Math.random() * 150 + 50}px`,
                height: `${Math.random() * 150 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Card */}
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/60 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)`
            }} />
            <h2 className="text-3xl font-extrabold tracking-tight relative flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-300" />
              Voter Registration
            </h2>
            <p className="text-blue-200 mt-2">Government of India - Election Commission</p>
            <div className="mt-4 border-l-4 border-blue-400 pl-4 italic text-sm text-blue-200">
              "The future of this nation depends on the citizens who vote." — Barack Obama
            </div>
          </div>

          <div className="p-8">
            {generatedId ? (
              <div className="py-10 text-center animate-in zoom-in-95 duration-500 relative">
                {showCelebration && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-500 rounded-full animate-celebrate"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `rotate(${i * 30}deg) translateY(-50px)`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Registration Complete</h3>
                <p className="text-slate-600 mt-2">Your official Voter ID has been generated.</p>
                <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border-2 border-dashed border-indigo-200 inline-block px-12 animate-pulse-glow">
                  <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Digital ID</span>
                  <p className="text-4xl font-black text-slate-800 mt-1 select-all tracking-wider">{generatedId}</p>
                </div>
                <button
                  onClick={() => setGeneratedId(null)}
                  className="block mx-auto mt-8 text-indigo-600 font-semibold hover:underline transition-all hover:scale-105 active:scale-95"
                >
                  Register another voter
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2 animate-shake">
                    <AlertCircle size={20} />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Field
                      id="name"
                      name="name"
                      label="Full Legal Name"
                      icon={<User size={18} />}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Field
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      icon={<Phone size={18} />}
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder="10-digit mobile"
                      required
                      maxLength={10}
                      error={phoneError}
                      touched={touched.phone}
                    />
                  </div>

                  <div>
                    <Field
                      id="aadhar"
                      name="aadhar"
                      label="Aadhar Number"
                      icon={<CreditCard size={18} />}
                      value={formData.aadhar}
                      onChange={handleChange}
                      onBlur={() => handleBlur('aadhar')}
                      placeholder="12-digit Aadhar"
                      required
                      maxLength={12}
                      error={aadharError}
                      touched={touched.aadhar}
                    />
                  </div>

                  <div>
                    <Field
                      id="dob"
                      name="dob"
                      label="Date of Birth"
                      icon={<Calendar size={18} />}
                      value={formData.dob}
                      onChange={handleChange}
                      type="date"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl outline-none transition-all duration-200
                                 font-medium text-slate-800
                                 hover:border-blue-400 hover:shadow-sm hover:shadow-blue-100
                                 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:shadow-md focus:shadow-blue-100
                                 appearance-none cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
                      Residential Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-600">
                        <MapPin size={18} />
                      </div>
                      <textarea
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House no, Street, Landmark, City, Pincode"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none transition-all duration-200 
                                   font-medium text-slate-800 placeholder:text-slate-400 h-24 resize-none
                                   hover:border-blue-400 hover:shadow-sm hover:shadow-blue-100
                                   focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:shadow-md focus:shadow-blue-100"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 group relative overflow-hidden
                             ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98]'}`}
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
                      <span>Securing Data...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative">Generate Voter Identity</span>
                      <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform relative" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-slate-600 text-sm italic">
            "Voting is not only our right—it is our power." — Loung Ung
          </p>
          <p className="text-slate-500 text-xs">
            All data is encrypted and stored according to government security protocols.
          </p>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(10px) translateX(5px); }
        }
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }

        @keyframes float-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(30px, -20px) scale(1.1); opacity: 0.2; }
          66% { transform: translate(-20px, 30px) scale(0.9); opacity: 0.25; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
        .animate-float-particle {
          animation: float-particle 20s infinite alternate ease-in-out;
        }

        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-drift {
          animation: drift 25s infinite ease-in-out;
        }
        .animate-drift-reverse {
          animation: drift 25s infinite reverse ease-in-out;
        }

        @keyframes rotate-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 60s linear infinite;
        }
        .animate-rotate-slow-reverse {
          animation: rotate-slow 60s linear infinite reverse;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes celebrate {
          0% { opacity: 1; transform: rotate(0deg) translateY(0) scale(1); }
          100% { opacity: 0; transform: rotate(720deg) translateY(-100px) scale(0); }
        }
        .animate-celebrate {
          animation: celebrate 1.5s ease-out forwards;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.3); }
          50% { box-shadow: 0 0 20px 5px rgba(79, 70, 229, 0.5); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}