"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();
    const userNameOrEmail = session?.user?.name || session?.user?.email || "User";

    return (
        <div className="bg-gray-100 shadow-lg px-6 py-4 flex justify-between items-center border-b border-blue-800">

            {/* Brand */}
            <div>
                <Link href="/" className="text-xl font-bold text-blue-800">
                    TravelTales
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6 text-blue-800">
                <Link href="/" className="text-blue-800 font-medium hover:text-blue-500">
                    Home
                </Link>
                <Link href="/explore" className="text-blue-800 font-medium hover:text-blue-500">
                    Explore
                </Link>

                {session ? (
                    <>
                       
                        <Link href="/addStory" className="text-blue-800 font-medium hover:text-blue-500">
                            Add Story
                        </Link>
                        <Link href="/getMyTales" className="text-blue-800 font-medium hover:text-blue-500">
                            Your Stories
                        </Link>
                         <Link href="/profile" className="text-blue-800 font-medium hover:text-blue-500">
                            {userNameOrEmail}
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="text-red-500 hover:text-red-700 font-medium"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-blue-800 font-medium hover:text-blue-500">
                            Login
                        </Link>
                        <Link href="/register" className="text-blue-800 font-medium hover:text-blue-500">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
