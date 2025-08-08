
"use client"

import Story from "@/types/story";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import StoryCard from "@/components/StoryCard";
import Navbar from "@/components/Navbar";
import notFound from "@/public/notFound.svg"
import { useRouter } from "next/navigation";

export default function MyStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("/api/getMyTales", {
          params: { userId: session?.user?.id },
        });
        setStories(res.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    if (session?.user?.id) {
      fetchStories();
    }
  }, [session?.user?.id]);

  return (
    <div className=" min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-200">
      <Navbar />

      <div className="py-10  px-5 rounded-xl max-w-7xl mx-auto text-pink-400">
        {stories.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <img src={notFound.src} alt="No Tales Found" className="w-64 h-64" />
            <p className=" text-xl font-semibold text-pink-700 text-center">
              Oops! Looks like you don’t have any tales yet.
            </p>
            <p className="text-pink-500 text-center mt-2 text-sm">
              Start sharing your adventures and let the world know your story!
            </p>
            <button
              className="bg-pink-700 text-white hover:bg-pink-600 cursor-pointer
             rounded-full px-8 py-3 text-lg font-semibold transition duration-200 mt-2"
              onClick={() => router.push("/addStory")}
            >
              Start Your Tale
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.details} {...story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}