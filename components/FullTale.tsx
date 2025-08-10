
"use client";

import Story from "@/types/story";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function FullTale({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  const router = useRouter();

  const session = useSession()
  console.log("here we go ", session.data)


const isAuthor =
  session.data?.user?.email &&
  typeof story.authorId !== "string" &&
  story.authorId?.email === session.data.user.email;



  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/deleteTale/${story._id}`);
      if (res.data) {
        alert("Tale is deleted");
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.error("Error deleting tale:", error);
      alert("Failed to delete tale.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full rounded-2xl p-6 shadow-xl bg-violet-300 text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-3 text-gray-600 text-2xl hover:text-red-500 transition"
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

        <h2 className="text-2xl font-bold mb-2">{story.location}</h2>
        <p className="text-sm mb-4">{story.details}</p>

        {/* Author and Date */}
        <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
          <p>
            By: {story.authorId.profileName || story.authorId.email}
          </p>
          <p>
            {story.duration
              ? new Date(story.duration).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              : ""}
          </p>
        </div>

       {isAuthor && (
  <div className="flex gap-3">
    <button
      onClick={() => router.push(`/EditTale/${story._id}`)}
      className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition"
    >
      Edit
    </button>

    <button
      onClick={handleDelete}
      className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
    >
      Delete
    </button>
  </div>
)}

      </div>
    </div>
  );
}