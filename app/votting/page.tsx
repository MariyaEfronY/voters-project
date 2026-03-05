"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronLeft, ChevronRight, AlertCircle, Vote, UserCheck, FileCheck } from 'lucide-react';

interface Nominee {
  _id: string;
  name: string;
  party: string;
}

export default function VotingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [voterIdInput, setVoterIdInput] = useState('');
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/nominees')
      .then(res => res.json())
      .then(res => setNominees(res.data || []))
      .catch(() => setStatus({ type: 'error', msg: 'Failed to load nominees. Please refresh.' }));
  }, []);

  const handleNext = () => {
    setStatus({ type: '', msg: '' });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStatus({ type: '', msg: '' });
    setStep(step - 1);
  };

  const submitVote = async () => {
    setLoading(true);
    setStatus({ type: '', msg: '' });
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          voterIdString: voterIdInput.trim(), 
          nomineeId: selectedNominee!._id 
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep(4); // Success step
      } else {
        setStatus({ type: 'error', msg: data.message || 'Voting failed' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Connection failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: 'Identity', icon: UserCheck },
    { number: 2, label: 'Select', icon: Vote },
    { number: 3, label: 'Confirm', icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12 px-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)`
        }} />
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

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-black/30 border border-white/20 overflow-hidden">
          {/* Header with progress */}
<div className="bg-gradient-to-r from-blue-800 to-blue-950 p-6 text-white">
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold flex items-center gap-2">
      <Vote className="w-6 h-6" />
      Secure Voting
    </h1>

    <div className="flex items-center gap-2">
      {steps.map((s) => (
        <div key={s.number} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
            ${
              step === s.number
                ? "bg-blue-400 text-blue-900"
                : step > s.number
                ? "bg-green-500 text-white"
                : "bg-white/20 text-white/60"
            }`}
          >
            {step > s.number ? "✓" : s.number}
          </div>

          {s.number < steps.length && (
            <div
              className={`w-6 h-0.5 mx-1 ${
                step > s.number ? "bg-green-500" : "bg-white/20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  </div>

  <p className="text-blue-200 mt-2 text-sm">
    {step <= steps.length
      ? `Step ${step} of ${steps.length}: ${steps[step - 1]?.label}`
      : "Vote Completed"}
  </p>
</div>

          <div className="p-8">
            {/* Error/Success messages */}
            {status.msg && status.type === 'error' && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-shake">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">{status.msg}</p>
              </div>
            )}

            {/* STEP 1: IDENTITY INPUT */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Identify Yourself</h2>
                  <p className="text-slate-500 mt-1">Enter the Voter ID you received during registration.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Voter ID</label>
                  <input 
                    className="w-full p-4 border-2 border-slate-200 rounded-2xl outline-none transition-all
                               focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 font-mono text-lg"
                    placeholder="e.g., VT-12345-ABCD"
                    value={voterIdInput}
                    onChange={(e) => setVoterIdInput(e.target.value.toUpperCase())}
                  />
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!voterIdInput.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold
                             hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300
                             disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Continue</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* STEP 2: NOMINEE SELECTION */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Select Your Candidate</h2>
                  <p className="text-slate-500 mt-1">Choose one nominee to vote for.</p>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {nominees.map((n) => (
                    <div 
                      key={n._id}
                      onClick={() => setSelectedNominee(n)}
                      className={`p-5 border-2 rounded-2xl cursor-pointer transition-all flex justify-between items-center
                        ${selectedNominee?._id === n._id 
                          ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                    >
                      <div>
                        <p className="font-bold text-slate-800 text-lg">{n.name}</p>
                        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">{n.party}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                        ${selectedNominee?._id === n._id 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-slate-300'}`}>
                        {selectedNominee?._id === n._id && '✓'}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={handleBack} 
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!selectedNominee}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold
                               hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300
                               disabled:cursor-not-allowed transition"
                  >
                    Review Selection
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRMATION */}
            {step === 3 && selectedNominee && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-800">Confirm Your Vote</h2>
                  <p className="text-slate-500">Please verify all details before casting.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Voter ID</p>
                      <p className="text-xl font-mono font-bold text-slate-800 break-all">{voterIdInput}</p>
                    </div>
                    <div className="h-px bg-slate-200" />
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selected Candidate</p>
                      <p className="text-2xl font-bold text-blue-700">{selectedNominee.name}</p>
                      <p className="text-sm font-semibold text-blue-600">{selectedNominee.party}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleBack} 
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={20} /> Change
                  </button>
                  <button 
                    onClick={submitVote}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold
                               hover:from-green-700 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-300
                               transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        <span>Cast Vote Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
              <div className="text-center py-10 space-y-6">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">Vote Recorded!</h2>
                  <p className="text-slate-500 mt-2">Your vote has been securely cast. Thank you for participating.</p>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => router.push('/')}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-950 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <ChevronLeft size={20} />
                    Return to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-blue-200/70 text-sm">
          <p>All votes are encrypted and recorded immutably.</p>
        </div>
      </div>

      {/* Animation styles (same as Welcome page) */}
      <style>{`
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

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}