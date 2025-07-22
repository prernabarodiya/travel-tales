"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Story from "@/types/story";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import StoryCard from "@/components/StoryCard";

interface UserType {
  _id: string;
  email: string;
  profileName: string;
  stories: Story[];
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

    <div>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-gray-200 shadow-2xl rounded-3xl p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-4xl font-bold shadow-md">
            {user.profileName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            {user.profileName || "No Profile Name"}
          </h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Stories */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Your Stories</h2>
          {user.stories.length === 0 ? (
            <p className="text-gray-500">No stories yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {user.stories.map((story, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {story.images?.[0] && (
                    <Image
                      src={story.images[0]}
                      alt={`Image of ${story.location}`}
                      width={500}
                      height={300}
                      className="w-full h-52 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{story.location}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-3">{story.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
