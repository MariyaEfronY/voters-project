"use client";

import { useRouter } from "next/navigation";
import { logout } from "../utils/auth";

export default function AdminNavbar() {

  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  return (
    <div className="w-full bg-blue-900 text-white px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        Voting System Admin
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

    </div>
  );
}