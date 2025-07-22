'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { UploadButton } from "@/utils/uploadthing";

export default function EditTale() {
    const { id } = useParams();

    const [duration, setDuration] = useState<Date | null>(null);
    const [location, setLocation] = useState("");
    const [details, setDetails] = useState("");
    const [images, setImages] = useState<string[]>([])

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const res = await axios.get(`/api/getTaleById/${id}`);
                const story = res.data.story;
                console.log("story is ", story)
                 setDuration(new Date(story.duration));
                setLocation(story.location);
                setDetails(story.details);
                setImages(story.images)
            } catch (error) {
                console.error("Error fetching story:", error);
            }
        };

        if (id) fetchStory();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/editTaleById/${id}`, {
                images,
                location,
                details,
                duration,
            });

            if (res.data) {
                alert("Tale updated successfully!");
            } else {
                alert("Failed to update tale.");
            }
        } catch (err) {
            console.error("Error updating tale:", err);
            alert("Error while editing the tale.");
        }
    };



    const handleImageUpload = (uploadedImages: any[]) => {
        const urls = uploadedImages.map((img) => img.url);
        setImages((prev) => [...prev, ...urls]);
    };
    const removeImage = (urlToRemove: string) => {
        setImages((prev) => prev.filter((url) => url !== urlToRemove));
    };
    return (
        <div>
            <Navbar />

            <div className="p-10 max-w-3xl mx-auto text-blue-800 border rounded-md m-4">
                <h1 className="text-2xl font-bold mb-4 ">Edit Tale</h1>

                <form className="space-y-6">
                    <div>
                        <label className="block font-semibold">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Details</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="w-full border p-2 rounded h-40 "
                        />
                    </div>

                    <div className="text-blue-900">
                        <label className="block font-medium mb-1">Upload Images</label>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                handleImageUpload(res);
                                alert("Images uploaded successfully");
                            }}
                            onUploadError={(error: Error) => {
                                alert("Upload error: " + error.message);
                            }}
                        />
                        {/* 👇 Show uploaded image previews */}
                        {images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                {images.map((url, i) => (
                                    <div key={i} className="relative group">
                                        <img
                                            src={url}
                                            alt={`Uploaded ${i + 1}`}
                                            className="rounded-lg border h-32 w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(url)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    <div>
                        <label className="block font-semibold ">Duration</label>
                        <input
                            type="date"
                            value={duration ? duration.toISOString().split("T")[0] : ""}
                            onChange={(e) => setDuration(new Date(e.target.value))}
                            className="w-full border p-2 rounded "
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
