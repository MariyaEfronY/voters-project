"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Vote,
  UserCheck,
  FileCheck,
} from "lucide-react";

import Header from "../components/Header";

interface Nominee {
  _id: string;
  name: string;
  party: string;
}

export default function VotingWizard() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [voterIdInput, setVoterIdInput] = useState("");
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    fetch("/api/nominees")
      .then((res) => res.json())
      .then((res) => setNominees(res.data || []))
      .catch(() =>
        setStatus({
          type: "error",
          msg: "Failed to load nominees. Please refresh.",
        })
      );
  }, []);

  const handleNext = () => {
    setStatus({ type: "", msg: "" });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStatus({ type: "", msg: "" });
    setStep(step - 1);
  };

  const submitVote = async () => {
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voterIdString: voterIdInput.trim(),
          nomineeId: selectedNominee!._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(4);
      } else {
        setStatus({ type: "error", msg: data.message || "Voting failed" });
      }
    } catch {
      setStatus({ type: "error", msg: "Connection failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Identity", icon: UserCheck },
    { number: 2, label: "Select", icon: Vote },
    { number: 3, label: "Confirm", icon: FileCheck },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4 py-12 relative overflow-hidden">

        {/* Background Glow */}
        {mounted && (
          <>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          </>
        )}

        <div className="max-w-2xl mx-auto mt-10 relative z-10">

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-950 p-6 text-white">

              <div className="flex justify-between items-center flex-wrap gap-4">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Vote size={26} />
                  Secure Voting
                </h1>

                {/* STEPS */}
                <div className="flex items-center gap-2">
                  {steps.map((s) => (
                    <div key={s.number} className="flex items-center">

                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold
                        ${step === s.number
                            ? "bg-blue-400 text-blue-900"
                            : step > s.number
                              ? "bg-green-500 text-white"
                              : "bg-white/20"
                          }`}
                      >
                        {step > s.number ? "✓" : s.number}
                      </div>

                      {s.number < steps.length && (
                        <div
                          className={`w-8 h-1 mx-1 ${step > s.number
                            ? "bg-green-500"
                            : "bg-white/30"
                            }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

              </div>

              <p className="text-blue-200 text-sm mt-2">
                Step {step} of {steps.length}
              </p>

            </div>

            {/* CONTENT */}
            <div className="p-8">

              {status.msg && (
                <div className="mb-6 flex gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 animate-shake">
                  <AlertCircle />
                  {status.msg}
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Identify Yourself
                    </h2>
                    <p className="text-gray-500">
                      Enter your voter ID to continue
                    </p>
                  </div>

                  <input
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-black font-mono text-lg
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="VT-12345-ABCD"
                    value={voterIdInput}
                    onChange={(e) =>
                      setVoterIdInput(e.target.value.toUpperCase())
                    }
                  />

                  <button
                    onClick={handleNext}
                    disabled={!voterIdInput.trim()}
                    className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold
                    hover:bg-blue-700 transition"
                  >
                    Continue
                  </button>

                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">

                  {nominees.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => setSelectedNominee(n)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center
                      ${selectedNominee?._id === n._id
                          ? "border-blue-500 bg-blue-50 shadow"
                          : "border-gray-200 hover:border-blue-400"
                        }`}
                    >

                      <div>
                        <p className="font-bold text-gray-800 text-lg">
                          {n.name}
                        </p>
                        <p className="text-blue-600 font-medium text-sm">
                          {n.party}
                        </p>
                      </div>

                      {selectedNominee?._id === n._id && (
                        <CheckCircle className="text-blue-600" />
                      )}

                    </div>
                  ))}

                  <div className="flex gap-4 pt-4">

                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 bg-gray-200 rounded-xl hover:bg-gray-300"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={!selectedNominee}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                    >
                      Review
                    </button>

                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && selectedNominee && (
                <div className="space-y-6 text-center">

                  <h2 className="text-2xl font-bold text-gray-800">
                    Confirm Your Vote
                  </h2>

                  <div className="bg-gray-50 p-6 rounded-xl border">

                    <p className="font-mono text-gray-800">
                      {voterIdInput}
                    </p>

                    <p className="text-xl font-bold text-blue-700">
                      {selectedNominee.name}
                    </p>

                    <p className="text-blue-600">
                      {selectedNominee.party}
                    </p>

                  </div>

                  <button
                    onClick={submitVote}
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-green-600 text-white font-bold
                    hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >

                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Cast Vote"
                    )}

                  </button>

                </div>
              )}

              {/* STEP 4 SUCCESS */}
              {step === 4 && (
                <div className="text-center py-12 space-y-6">

                  <CheckCircle className="w-24 h-24 text-green-500 mx-auto animate-bounce" />

                  <h2 className="text-3xl font-bold text-gray-800">
                    Vote Recorded Successfully
                  </h2>

                  <p className="text-gray-500">
                    Your vote has been securely saved.
                  </p>

                  <button
                    onClick={() => router.push("/")}
                    className="px-8 py-4 bg-blue-800 text-white rounded-xl font-bold
                    hover:bg-blue-900 transition"
                  >
                    Return Home
                  </button>

                </div>
              )}

            </div>
          </div>

          <p className="text-center text-blue-200 text-sm mt-6">
            All votes are encrypted and secure.
          </p>

        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          25%{transform:translateX(-5px)}
          75%{transform:translateX(5px)}
        }

        .animate-shake{
          animation:shake .4s ease-in-out
        }
      `}</style>

    </>
  );
}