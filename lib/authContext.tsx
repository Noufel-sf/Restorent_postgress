"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USERS, MockUser } from "./mockData";
import toast from "react-hot-toast";

interface AuthContextType {
  user: MockUser | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => boolean;
  loginAs: (role: "admin" | "customer") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "pepper_mock_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } else {
        // Default to demo customer for immediate pleasant experience, or null
        const defaultCustomer = MOCK_USERS.find((u) => u.role === "customer") || null;
        if (defaultCustomer) {
          setUser(defaultCustomer);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultCustomer));
        }
      }
    } catch {
      // ignore storage errors
    }
    setMounted(true);
  }, []);

  const saveUser = (newUser: MockUser | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      document.cookie = `pepper_role=${newUser.role}; path=/; max-age=864000`;
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
      document.cookie = "pepper_role=; path=/; max-age=0";
    }
  };

  const login = (email: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === cleanEmail);

    if (found) {
      saveUser(found);
      toast.success(`Welcome back, ${found.name}!`);
      return true;
    }

    // Dynamic demo login for any custom email
    const isAdminEmail = cleanEmail.includes("admin");
    const customUser: MockUser = {
      id: `u-${Date.now()}`,
      name: isAdminEmail ? "Admin Manager" : cleanEmail.split("@")[0] || "Food Lover",
      email: cleanEmail,
      role: isAdminEmail ? "admin" : "customer",
      avatar: isAdminEmail ? "/chef1.png" : "/chef2.png",
      address: "123 Delicious Lane",
      city: "Gourmet City",
      phoneNumber: "+1 (555) 789-0123",
    };

    saveUser(customUser);
    toast.success(`Logged in as ${customUser.name}!`);
    return true;
  };

  const loginAs = (role: "admin" | "customer") => {
    const target = MOCK_USERS.find((u) => u.role === role);
    if (target) {
      saveUser(target);
      toast.success(`Switched to ${target.name} (${role})`);
    }
  };

  const logout = () => {
    saveUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user: mounted ? user : null,
        isAdmin: user?.role === "admin",
        isAuthenticated: !!user,
        login,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
