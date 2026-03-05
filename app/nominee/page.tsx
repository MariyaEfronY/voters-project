"use client";
import { useState } from 'react';

export default function AddNominee() {
  const [data, setData] = useState({ name: '', party: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/nominees', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.ok) alert("Nominee Added!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 border rounded-lg max-w-sm">
      <input 
        className="w-full border p-2" 
        placeholder="Nominee Name" 
        onChange={(e) => setData({...data, name: e.target.value})} 
      />
      <input 
        className="w-full border p-2" 
        placeholder="Party Name" 
        onChange={(e) => setData({...data, party: e.target.value})} 
      />
      <button className="bg-green-600 text-white p-2 w-full">Add Nominee</button>
    </form>
  );
}