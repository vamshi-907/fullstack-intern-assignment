"use client";

import { useState } from "react";
import { api, setToken } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      router.push("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 hover:scale-[1.02]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          type="email"
          className="w-full mb-3 px-4 py-3 rounded-lg border
                     text-gray-800 placeholder-gray-500
                     focus:ring-4 focus:ring-blue-300 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full mb-5 px-4 py-3 rounded-lg border
                     text-gray-800 placeholder-gray-500
                     focus:ring-4 focus:ring-blue-300 focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold
                     hover:bg-blue-700 active:scale-95 shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-sm mt-5 text-gray-600">
          New here?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}
