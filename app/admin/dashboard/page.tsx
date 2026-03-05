"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../../components/AdminNavbar";
import { getToken } from "../../utils/auth";

export default function Dashboard(){

  const router = useRouter();

  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const token = getToken();

    if(!token){
      router.push("/admin/login");
      return;
    }

    fetch("/api/admin/verify",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res=>{
      if(!res.ok){
        router.push("/admin/login");
      }else{
        setLoading(false);
      }
    });

  },[]);

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return(

    <div className="min-h-screen bg-gray-100">

      <AdminNavbar/>

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              Manage Nominees
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              View Votes
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              Election Results
            </h2>
          </div>

        </div>

      </div>

    </div>

  );
}