import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/connect";
import User from "@/models/user"
import { generateUsername } from "@/lib/userNameGenerator";


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User is already registered" },
        { status: 400 }
      );
    }

    const profileName  = await generateUsername()
    await User.create({ email, password, profileName });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}
