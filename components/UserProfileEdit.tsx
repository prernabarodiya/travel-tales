"use client";

import { useState } from "react";
import User from "@/types/user";
import axios from "axios";
import { UploadButton } from "@/utils/uploadthing";

interface Props {
  user: User;
  onClose: () => void;
}

export default function UserProfileEdit({ user, onClose }: Props) {
  const [formData, setFormData] = useState({
    profileName: user.profileName || "",
    email: user.email || "",
    image: user.image || "", // this holds the profile image URL
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (res: any) => {
    if (res && res.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: res[0].url, // set image URL after upload
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await axios.put("/api/updateUser", {
        userId: user._id,
        ...formData,
      });

      setMessage("Profile updated successfully!");
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
      setMessage("Error updating profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100  text-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Profile Name</label>
            <input
              type="text"
              name="profileName"
              value={formData.profileName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleImageUpload}
              onUploadError={(error: Error) => {
                alert("Upload error: " + error.message);
              }}
            />

            {formData.image && (
              <div className="mt-4 relative group w-32 h-32">
                <img
                  src={formData.image}
                  alt="Profile"
                  className="rounded-lg border h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image: "" }))
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
