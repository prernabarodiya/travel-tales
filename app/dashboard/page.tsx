"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Dashboard(){
    const session = useSession()
    const router =useRouter()

    
    return(<>
    <div>
     {session?.data
  ? session.data.user?.name || session.data.user?.email
  : "Travel Tales Dashboard"}

         <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>

     <button
      onClick={() => router.push("/profile")}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Profile
    </button>
    </div>
    </>)
}