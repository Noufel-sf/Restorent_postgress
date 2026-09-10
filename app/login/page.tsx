"use client";

import React, { useState, Suspense } from "react";
import { useAuth } from "@/lib/authContext";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CiLock, CiMail } from "react-icons/ci";
import { FaShieldHalved, FaUserCheck } from "react-icons/fa6";

function LoginForm() {
  const { user, login, loginAs, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const success = login(email, password);
    if (success) {
      router.push(redirect);
    }
  };

  const handleQuickLogin = (role: "admin" | "customer") => {
    loginAs(role);
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push(redirect === "/admin" ? "/foods" : redirect);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight text-primary">
          Pepper.
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Sign in to your account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Explore delicious meals or manage the restaurant dashboard
        </p>
      </div>

      {user && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/30 bg-white">
                <Image
                  src={user.avatar || "/chef1.png"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">
                  Role: <span className="font-bold text-primary">{user.role}</span>
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Quick 1-Click Demo Logins */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Instant 1-Click Demo
          </span>
          <p className="mt-0.5 text-xs text-gray-500">
            Select a role to test the application immediately:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleQuickLogin("admin")}
            className="group flex flex-col items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center transition hover:border-primary hover:bg-primary/10 hover:shadow-sm"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <FaShieldHalved className="text-lg" />
            </div>
            <span className="text-sm font-bold text-gray-900">Admin Demo</span>
            <span className="mt-0.5 text-[11px] text-gray-500">Access Restaurant Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin("customer")}
            className="group flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 bg-gray-50/50 p-4 text-center transition hover:border-gray-400 hover:bg-gray-100 hover:shadow-sm"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white">
              <FaUserCheck className="text-lg" />
            </div>
            <span className="text-sm font-bold text-gray-900">Customer Demo</span>
            <span className="mt-0.5 text-[11px] text-gray-500">Browse Menu &amp; Order</span>
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs text-gray-400 uppercase">or enter credentials</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700">Email Address</label>
            <div className="relative mt-1 flex items-center">
              <CiMail className="absolute left-3 text-lg text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pepper.com or alex@example.com"
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700">Password</label>
            <div className="relative mt-1 flex items-center">
              <CiLock className="absolute left-3 text-lg text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99]"
          >
            Sign In
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-gray-400">
        Demo Mode: Any email containing &quot;admin&quot; logs in as Administrator.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-gray-50/50 px-4 py-12">
      <Suspense fallback={<div className="text-center text-sm text-gray-500">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
