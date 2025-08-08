import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/connect";
import Story from "@/models/story";

export async function POST(
  req: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connect();

   
    const { location, details, images, duration } = await req.json();
    console.log("Incoming duration:", duration);
console.log("Parsed date:", duration ? new Date(duration) : null);


    const updatedStory = await Story.findByIdAndUpdate(
      id,
      {
        location,
        details,
        images,
        duration: duration ? new Date(duration) : undefined,
      },
      {
        new: true, // return the updated document
        runValidators: true,
      }
    );

    if (!updatedStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ story: updatedStory }, { status: 200 });
  } catch (error) {
    console.error("Error updating story:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
