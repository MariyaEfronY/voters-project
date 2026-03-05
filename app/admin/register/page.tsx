"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegister() {

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);
  const [msg,setMsg] = useState("");

  async function registerAdmin() {

  setLoading(true);

  try {

    const res = await fetch("/api/admin/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,password})
    });

    let data;

    try {
      data = await res.json();
    } catch {
      data = { message: "Server returned empty response" };
    }

    setMsg(data?.message || "Something happened");

    if(res.ok){
      setTimeout(()=>{
        router.push("/admin/login");
      },1500)
    }

  } catch (error) {

    setMsg("Connection error");

  } finally {

    setLoading(false);

  }


  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Register
        </h2>

        <input
          className="w-full border text-black p-3 mb-4 rounded-lg"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="w-full border text-black p-3 mb-4 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border text-black p-3 mb-4 rounded-lg"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={registerAdmin}
          className="w-full text-black bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800"
        >
          {loading ? "Creating..." : "Register Admin"}
        </button>

        {msg && (
          <p className="text-center mt-4 text-sm text-gray-600">
            {msg}
          </p>
        )}

      </div>

    </div>

  );
}