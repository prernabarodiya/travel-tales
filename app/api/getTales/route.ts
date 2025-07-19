import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/connect";
import Story from "@/models/story";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const stories = await Story.find().populate("authorId", "profileName email");

    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
