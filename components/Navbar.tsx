"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const userNameOrEmail =
    session?.user?.name || session?.user?.email || "User";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const MenuLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Link href="/" onClick={onClick} className="hover:text-pink-600">
        Home
      </Link>
      <Link href="/explore" onClick={onClick} className="hover:text-pink-600">
        Explore
      </Link>

      {session ? (
        <>
          <Link href="/addStory" onClick={onClick} className="hover:text-pink-600">
            Add Story
          </Link>
          <Link href="/getMyTales" onClick={onClick} className="hover:text-pink-600">
            Your Stories
          </Link>
          <Link href="/profile" onClick={onClick} className="hover:text-pink-600">
            {userNameOrEmail}
          </Link>
          <button
            onClick={() => {
              onClick?.();
              signOut({ callbackUrl: "/" });
            }}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" onClick={onClick} className="hover:text-pink-600">
            Login
          </Link>
          <Link href="/register" onClick={onClick} className="hover:text-pink-600">
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100 border-b border-pink-300 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-pink-700">
          TravelTales
        </Link>

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            className="text-pink-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="flex items-center space-x-6 text-sm text-pink-800 font-medium">
            <MenuLinks />
          </div>
        )}
      </div>

  {menuOpen && isMobile && (
  <div className="md:hidden mt-3 flex flex-col divide-y divide-pink-300 px-2 text-pink-800 text-sm font-medium">
    <Link href="/" onClick={() => setMenuOpen(false)} className="py-2 hover:text-pink-600">Home</Link>
    <Link href="/explore" onClick={() => setMenuOpen(false)} className="py-2 hover:text-pink-600">Explore</Link>

    {session ? (
      <>
        <Link href="/addStory" onClick={() => setMenuOpen(false)} className="py-2 hover:text-pink-600">Add Story</Link>
        <Link href="/getMyTales" onClick={() => setMenuOpen(false)} className="py-2 hover:text-pink-600">Your Stories</Link>
        <Link href="/profile" onClick={() => setMenuOpen(false)} className="py-2 hover:text-pink-600">{userNameOrEmail}</Link>
        <button
          onClick={() => {
            setMenuOpen(false);
            signOut({ callbackUrl: "/" });
          }}
          className="py-2 text-red-500 hover:text-red-700 text-left"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link href="/login" onClick={() => setMenuOpen(false)} className="py-2 hover:text-pink-600">Login</Link>
        <Link href="/register" onClick={() => setMenuOpen(false)} className="py-2 hover:text-pink-600">Register</Link>
      </>
    )}
  </div>
)}


    </nav>
  );
}
