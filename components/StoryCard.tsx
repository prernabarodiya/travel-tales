import Story from "@/types/story";

export default function StoryCard(story: Story) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-md bg-white">
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
      </div>
    </div>
  );
}
