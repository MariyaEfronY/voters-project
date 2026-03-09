"use client";

import { useState } from "react";
import { UserPlus, Flag, CheckCircle } from "lucide-react";

export default function AddNominee() {

  const [data, setData] = useState({ name: "", party: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const res = await fetch("/api/nominees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSuccess("Nominee Added Successfully!");
      setData({ name: "", party: "" });
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-200 animate-fade-in">

        {/* Header */}

        <div className="flex items-center gap-3 mb-6">

          <div className="bg-blue-100 p-3 rounded-xl">
            <UserPlus className="text-blue-600" size={24}/>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black">
              Add Nominee
            </h2>

            <p className="text-gray-500 text-sm">
              Register a candidate for election
            </p>
          </div>

        </div>


        {/* Success Message */}

        {success && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            <CheckCircle size={18}/>
            {success}
          </div>
        )}


        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nominee Name */}

          <div>
            <label className="text-sm font-medium text-black">
              Nominee Name
            </label>

            <input
              className="w-full border border-gray-300 p-3 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter nominee name"
              value={data.name}
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
              required
            />
          </div>


          {/* Party Name */}

          <div>
            <label className="text-sm font-medium text-black flex items-center gap-1">
              <Flag size={16}/>
              Party Name
            </label>

            <input
              className="w-full border border-gray-300 p-3 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter party name"
              value={data.party}
              onChange={(e) =>
                setData({ ...data, party: e.target.value })
              }
              required
            />
          </div>


          {/* Submit Button */}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex justify-center items-center gap-2"
          >
            {loading ? "Adding Nominee..." : "Add Nominee"}
          </button>

        </form>

      </div>

    </div>
  );
}