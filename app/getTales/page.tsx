
"use client"

import Story from "@/types/story";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import StoryCard from "@/components/StoryCard";

export default function AllTales() {
  const [stories, setStories] = useState<Story[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("/api/getTales");
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
    <div className="">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 ">
      {stories?.map((story) => (
        <StoryCard key={story.details} {...story} />
      ))}
    </div>
    </div>
    
  );
}
