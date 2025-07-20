

import { useState } from "react";
import Story from "@/types/story";
import FullTale from "./FullTale"; // adjust path if needed

export default function StoryCard(story: Story) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-gray-300  cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {story.images.length > 0 && (
          <img
            src={story.images[0]}
            alt={story.location}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {story.location}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3">
            {story.details}
          </p>
          <p className="text-gray-800 text-sm">
            By: {story.authorId.profileName || story.authorId.email}
          </p>
        </div>
      </div>

      {open && <FullTale story={story} onClose={() => setOpen(false)} />}
    </>
  );
}
