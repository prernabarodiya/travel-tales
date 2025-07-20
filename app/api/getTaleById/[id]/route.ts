import Story from "@/models/story";
import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/lib/connect"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;

    const story = await Story.findById(id).populate({
      path: "authorId",
      select: "profileName email",
    });

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ story }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch story:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
