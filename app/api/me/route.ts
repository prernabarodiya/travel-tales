import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

    const user = await User.findOne({email});

    if (!user) {
        return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
}
