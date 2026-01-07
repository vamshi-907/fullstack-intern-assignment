"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      alert("Account created successfully");
      router.push("/login");
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500">
      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 hover:scale-[1.02]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        {/* Name */}
        <input
          className="w-full mb-3 px-4 py-3 rounded-lg border
                     text-gray-800 placeholder-gray-500
                     focus:ring-4 focus:ring-green-300 focus:outline-none"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          className="w-full mb-3 px-4 py-3 rounded-lg border
                     text-gray-800 placeholder-gray-500
                     focus:ring-4 focus:ring-green-300 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full mb-5 px-4 py-3 rounded-lg border
                     text-gray-800 placeholder-gray-500
                     focus:ring-4 focus:ring-green-300 focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold
                     hover:bg-green-700 active:scale-95 shadow-lg"
        >
          Register
        </button>

        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
