"use client";
import { useState, useEffect } from 'react';

export default function VotingPage() {
  const [voterIdInput, setVoterIdInput] = useState('');
  const [nominees, setNominees] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  // Load Nominees
  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await fetch('/api/nominees');
        const result = await res.json();
        setNominees(result.data || []);
      } catch (err) {
        console.error("Failed to load nominees");
      }
    };
    fetchNominees();
  }, []);

  const handleVoteSubmission = async () => {
    if (!voterIdInput || !selectedId) return;
    
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          voterIdString: voterIdInput.trim(), 
          nomineeId: selectedId 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', msg: result.message });
        setVoterIdInput('');
        setSelectedId('');
      } else {
        setStatus({ type: 'error', msg: result.message || "Voting failed" });
      }
    } catch (err: any) {
      console.error("FETCH_ERROR:", err);
      setStatus({ type: 'error', msg: "Network error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-3xl shadow-xl">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Secure Voting</h1>

      <div className="space-y-6">
        {/* Voter ID Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-500 uppercase">Your Voter ID</label>
          <input 
            type="text"
            className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition outline-none"
            placeholder="Enter Voter ID (e.g., VT-12345)"
            value={voterIdInput}
            onChange={(e) => setVoterIdInput(e.target.value)}
          />
        </div>

        {/* Nominee List */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 uppercase">Choose Nominee</label>
          <div className="grid grid-cols-1 gap-3">
            {nominees.map((n: any) => (
              <button
                key={n._id}
                onClick={() => setSelectedId(n._id)}
                className={`p-4 text-left border-2 rounded-2xl transition flex justify-between items-center ${
                  selectedId === n._id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div>
                  <p className="font-bold text-gray-800">{n.name}</p>
                  <p className="text-xs text-blue-600 font-semibold">{n.party}</p>
                </div>
                {selectedId === n._id && <div className="w-4 h-4 bg-blue-600 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleVoteSubmission}
          disabled={loading || !voterIdInput || !selectedId}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing Vote...' : 'Confirm My Vote'}
        </button>

        {/* Status Message */}
        {status.msg && (
          <div className={`p-4 rounded-2xl text-center font-bold animate-in fade-in slide-in-from-top-2 ${
            status.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
}