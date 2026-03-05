"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "../../utils/auth";

export default function AdminLogin(){

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);
  const [msg,setMsg] = useState("");

  async function loginAdmin(){

    setLoading(true);

    const res = await fetch("/api/admin/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });

    const data = await res.json();

    setLoading(false);

    if(res.ok){

      saveToken(data.token);

      router.push("/admin/dashboard");

    }else{
      setMsg(data.message);
    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          className="w-full border text-black p-3 mb-4 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 mb-4 text-black rounded-lg"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={loginAdmin}
          className="w-full bg-green-600 text-black text-white py-3 rounded-lg hover:bg-green-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {msg && (
          <p className="text-center mt-4 text-red-500 text-sm">
            {msg}
          </p>
        )}

      </div>

    </div>
  )
}