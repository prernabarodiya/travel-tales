// app/profile/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import api from "@/lib/axios"

interface UserType {
  _id: string;
  email: string;
  profileName: string;
  stories: string[];
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
        try {
          const res = await api.get(`/me`, {
            params: { email: session.user.email },
          });
          setUser(res.data);
          
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  if (loading || status === "loading") return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4 text-red-500">User not found or not authenticated</div>;

 return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-4xl font-bold mb-4">
          {user.profileName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          {user.profileName || "No Profile Name"}
        </h1>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Stories</h2>
        {user.stories.length === 0 ? (
          <p className="text-gray-500">No stories yet.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {user.stories.map((story, index) => (
              <li key={index}>{story}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

}
