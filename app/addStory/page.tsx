"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { UploadButton } from "@/utils/uploadthing";
import Navbar from "@/components/Navbar";

export default function AddStoryForm() {
    const [location, setLocation] = useState("");
    const [details, setDetails] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
     const [duration, setDuration] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!images || images.length === 0) {
            setError("Please upload at least one image.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);
            setSuccess(null);

            const res = await axios.post("/api/addStory", {
                authorId: session?.user.id,
                location,
                details,
                duration,
                images, // already URLs
            });
console.log("response is ",res)
            setSuccess("Story submitted successfully!");
            setLocation("");
            setDetails("");
            setDuration(null)
            setImages([]);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
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
        <Navbar/>
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-md rounded-2xl space-y-4 text-blue-900"
        >
            <h2 className="text-2xl font-semibold">Add New Travel Story</h2>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <div>
                <label className="block font-medium mb-1">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-lg"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Details</label>
                <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    rows={5}
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
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? "Submitting..." : "Submit Story"}
            </button>
        </form>
        </div>
    );
}
