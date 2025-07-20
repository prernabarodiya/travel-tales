"use client "

import Story from "@/types/story";
import { useRouter } from "next/navigation";



export default function FullTale({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) 

{

     const router = useRouter()
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full rounded-2xl p-6 border border-white/20 bg-white/10 backdrop-blur-2xl shadow-xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-3 text-white text-2xl hover:text-red-300 transition"
          onClick={onClose}
        >
          ×
        </button>

        {story.images.length > 0 && (
          <img
            src={story.images[0]}
            alt={story.location}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}

        <h2 className="text-2xl font-semibold mb-2">{story.location}</h2>
        <p className="text-sm text-white/90 mb-4">{story.details}</p>
        <p className="text-xs text-white/60">
          By: {story.authorId.profileName || story.authorId.email}
        </p>

        <button onClick={()=>{
            router.push(`/EditTale/${story._id}`)
        }}>Edit </button>
      </div>
    </div>
  );
}
