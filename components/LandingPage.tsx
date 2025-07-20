"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleShareClick = () => {
    if (session?.user) {
      router.push("/addStory");
    } else {
      router.push("/login"); // Or your actual login route
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-md bg-white/60 shadow-md fixed top-0 w-full z-50">
        <h1 className="text-2xl font-bold text-pink-600">TravelTales</h1>
        <button
          onClick={handleShareClick}
          className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
        >
          Share Your Tale
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-36 pb-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-sm">
          Every Journey Has a Story
        </h2>
        <p className="max-w-xl text-lg md:text-xl text-gray-700 mb-8">
          Join our community of travelers and share your adventures with the world.
        </p>
        <Link href="/explore">
          <button className="bg-pink-500 text-white px-6 py-3 rounded-full text-lg shadow-lg hover:bg-pink-600 transition">
            Explore Tales
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-20 py-16 bg-white/50 backdrop-blur-lg rounded-t-3xl shadow-inner">
        {[
          {
            title: "📍 Add Your Travel Tale",
            desc: "Capture your journeys and let others experience them too.",
          },
          {
            title: "🌍 Discover Global Stories",
            desc: "Explore amazing adventures from around the world.",
          },
          {
            title: "💬 Connect & Inspire",
            desc: "Engage with fellow travelers, comment, and share inspiration.",
          },
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-6">
        © 2025 TravelTales — Made with ❤️ for adventurers.
      </footer>
    </div>
  );
}
