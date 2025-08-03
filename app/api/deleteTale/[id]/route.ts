import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/connect";
import Story from "@/models/story";
import User from "@/models/user";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();

    const { id } = params;

    
    const story = await Story.findById(id);
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    
    const authorId = story.authorId;
    await User.findByIdAndUpdate(authorId, {
      $pull: { stories: id },
    });

    
    await Story.findByIdAndDelete(id);

    return NextResponse.json({ message: "Story deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting story:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
