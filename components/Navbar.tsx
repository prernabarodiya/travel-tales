"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const userNameOrEmail = session?.user?.name || session?.user?.email || "User";

    return (
       <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    {/* Left - Brand */}
    <div>
        <Link href="/" className="text-xl font-bold text-blue-600">
            TravelTales
        </Link>
    </div>

    {/* Right - Nav Links + Auth */}
    <div className="flex items-center space-x-6 ">
        <Link href="/" className="text-gray-800 font-medium hover:text-blue-600">
            Home
        </Link>
        <Link href="/explore" className="text-gray-800 font-medium hover:text-blue-600">
            Explore
        </Link>

        {session ? (
            <>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-800 font-medium hover:text-blue-600"
                >
                    {userNameOrEmail}
                </button>
                <Link href="/add-story" className="text-gray-800 font-medium hover:text-blue-600">
                    Add Story
                </Link>
                <Link href="/your-stories" className="text-gray-800 font-medium hover:text-blue-600">
                    Your Stories
                </Link>

                {menuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
                        <Link
                            href="/profile"
                            className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                            Logout
                        </button>
                    </div>
                    
                )}</div>
            </>
        ) : (
            <>
                <Link
                    href="/login"
                    className="text-gray-800 font-medium hover:text-blue-600"
                >
                    Login
                </Link>
                <Link
                    href="/register"
                    className="text-gray-800 font-medium hover:text-blue-600"
                >
                    Register
                </Link>
            </>
        )}
    </div>
</div>

    );
}
