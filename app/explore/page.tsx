
"use client"
import AllTales from "@/components/getTales";
import Navbar from "@/components/Navbar";
export default function Explore() {
  return (
<div>
    <Navbar></Navbar>
    <div className=" bg-gradient-to-br from-blue-100 via-white to-pink-300 px-6 py-20">
      {/* Welcome Card */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100  backdrop-blur-md shadow-lg rounded-2xl p-8 text-center border border-white/40">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
            🌍 Welcome to TravelTales!
          </h1>
          <p className="text-gray-700 text-lg">
            Dive into real stories from travelers around the world. Get inspired, explore new places, and maybe even plan your next adventure!
          </p>
        </div>
      </div>


      {/* Tales Grid */}
      <div className="text-black">
       
        <AllTales />
      </div>
    </div>
    </div>
  );
}
