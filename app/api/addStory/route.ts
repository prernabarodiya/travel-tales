import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/connect";
import Story from "@/models/story";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { authorId, location, details, images } = await req.json();

    if (!authorId || !location || !details || !images?.length) {

        console.log("here i am ",authorId," :::::  ",location,
            " :::  ",images,"  details  :: ",details
        )
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const newStory = await Story.create({
      authorId,
      location,
      details,
      images, // this is an array of image URLs from UploadThing
    });

     await User.findByIdAndUpdate(
      authorId,
      { $push: { stories: newStory._id } },
      { new: true }
    );


    return NextResponse.json({ success: true, story: newStory });
  } catch (err: any) {
    console.error("Story creation failed:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
