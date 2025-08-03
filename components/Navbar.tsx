"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const userNameOrEmail =
    session?.user?.name || session?.user?.email || "User";

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100 border-b border-pink-300 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-pink-700">
          TravelTales
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-pink-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
       <div className="hidden md:flex items-center space-x-6 text-sm text-pink-800 font-medium">
          <Link href="/" className="hover:text-pink-600 text-red-800">Home</Link>
          <Link href="/explore" className="hover:text-pink-600">Explore</Link>

          {session ? (
            <>
              <Link href="/addStory" className="hover:text-pink-600">Add Story</Link>
              <Link href="/getMyTales" className="hover:text-pink-600">Your Stories</Link>
              <Link href="/profile" className="hover:text-pink-600">{userNameOrEmail}</Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-pink-600">Login</Link>
              <Link href="/register" className="hover:text-pink-600">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-3 px-2 text-pink-800 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-pink-600">Home</Link>
          <Link href="/explore" onClick={() => setMenuOpen(false)} className="block hover:text-pink-600">Explore</Link>

          {session ? (
            <>
              <Link href="/addStory" onClick={() => setMenuOpen(false)} className="block hover:text-pink-600">Add Story</Link>
              <Link href="/getMyTales" onClick={() => setMenuOpen(false)} className="block hover:text-pink-600">Your Stories</Link>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="block hover:text-pink-600">{userNameOrEmail}</Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="block text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="block hover:text-pink-600">Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="block hover:text-pink-600">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}