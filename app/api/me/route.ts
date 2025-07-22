import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/connect"; // include this if not already

export async function GET(req: NextRequest) {
    try {
        await connect(); // ensure DB is connected

        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "User email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email }).populate({
            path: "stories",
            select: "location images",
        });

        if (!user) {
            return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
