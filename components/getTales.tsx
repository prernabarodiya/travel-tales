

import Story from "@/types/story";
import { useEffect, useState } from "react";
import axios from "axios";
import StoryCard from "@/components/StoryCard";

export default function AllTales() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("/api/getTales");
        setStories(res.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

   
      fetchStories();
    
  }, []);

  return (
    <div className="m-8">
  <div className="flex flex-wrap justify-center gap-4">
    {stories?.map((story) => (
      <div key={story.details} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]">
        <StoryCard {...story} />
      </div>
    ))}
  </div>
</div>

    
  );
}
