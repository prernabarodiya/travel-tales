// app/api/updateUser/route.ts

import { connect } from "@/lib/connect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await connect(); // connect to DB

  try {
    const body = await req.json();
    const { userId, profileName, email, image } = body;

    if (!userId || !profileName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updateData: any = {
      profileName,
      email,
    };

    if (image !== undefined && image !== null && image !== "") {
      updateData.image = image;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
