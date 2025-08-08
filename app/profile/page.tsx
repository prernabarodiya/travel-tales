"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

import Image from "next/image";
import Navbar from "@/components/Navbar";

import User from "@/types/user"
import UserProfileEdit from "@/components/UserProfileEdit";


export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);


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

  const handleEdit = async () => {

  }

  if (loading || status === "loading") return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4 text-red-500">User not found or not authenticated</div>;

  return (

    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-200 py-10 px-4">
        
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100 shadow-2xl rounded-3xl p-8">
          {/* Profile Header */}
          
          <div className="flex flex-col items-center text-center mb-10">

            {user.image ? (
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-md relative">
                <Image
                  src={user.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-4xl font-bold shadow-md">
                {user.profileName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
              </div>
            )}
            
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {user.profileName || "No Profile Name"}
            </h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="flex justify-end">
           <button className="w-32 text-white bg-pink-700 hover:bg-pink-600 border-pink-700 rounded-md cursor-pointer p-2"
  onClick={() => setOpen(true)}
>
  Edit
</button>

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
                    className="bg-blue-200 border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
        {open && <UserProfileEdit user={user} onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}
