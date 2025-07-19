import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/connect";
import User from "@/models/user";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const user = await User.findById(userId).populate({
      path: "stories",
      populate: {
        path: "authorId",
        select: "profileName email", // add any more fields you need
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.stories, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
