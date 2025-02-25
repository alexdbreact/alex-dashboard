"use client";

import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";




export default function RootLayout({ children }) {
     const [loading, setLoading] = useState(true);
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const router = useRouter();
    
      useEffect(() => {
        async function checkAuth() {
          const res = await fetch("/api/auth");
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            router.push("/login");
          }
          setLoading(false);
        }
        checkAuth();
      }, [router]);
    
      const handleLogout = async () => {
        await fetch("/api/auth", { method: "DELETE" });
        router.push("/login");
      };
    
      if (loading) return <p>Loading...</p>;
      if (!isAuthenticated) return null;
  return (
     <div >
         <div>
{children}         </div>
         <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded mt-2 mb-20">
           Logout
         </button>
       </div>
  );
}