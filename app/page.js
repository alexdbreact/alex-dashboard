"use client";
import { useRouter } from "next/navigation";
import { FaFileSignature } from "react-icons/fa6";


export default function page() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <button
        className="px-16 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push("/login")}
      >
Login      </button>
    </div>
  );
}