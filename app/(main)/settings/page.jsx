"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, User } from "lucide-react";
import { useUser } from "@/app/provider"; // your custom user context
import { supabase } from "@/services/supabaseClient"; // Supabase client
import { useRouter } from "next/navigation";

function SettingsPage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      alert("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err.message);
      alert("Failed to log out. Please try again.");
    }
  };

  // Login button redirect
  const handleLoginRedirect = () => {
    router.push("/auth"); // redirect to auth page
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <User className="w-5 h-5" />
        Profile Settings
      </h1>

      {/* User Info */}
      {user ? (
        <div className="space-y-3 mb-6">
          <div>
            <h2 className="text-gray-600 text-sm">Name</h2>
            <p className="font-medium">{user?.name || "N/A"}</p>
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Email</h2>
            <p className="font-medium">{user?.email || "N/A"}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">You are not logged in</p>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        {user && (
          <Button
            variant="destructive"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        )}

        {!user && (
          <Button
            variant="default"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleLoginRedirect}
          >
            <LogIn className="w-4 h-4" /> Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
