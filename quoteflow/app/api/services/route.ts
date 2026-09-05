import { Service } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "Inavlid JSON dat format" },
        { status: 400 },
      );
    }
    const createdEvent = await Service.create(event);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );

    // const file = formData.get("image") as File

    // if(!file) {
    //     return NextResponse.json(
    //         {message: "Image file is required"},
    //         {status: 400}
    //     )
    // }

    // const arrayBuffer = await new Promise((resolve, reject)) => {
    //     cloudinary.uploader
    // .upload_stream(
    //   { resource_type: "image", folder: "DevEvents" },
    //   (error, results) => {
    //     if (error) return reject(error);

    //     resolve(results);
    //   },
    // )
    // .end(buffer);
    // }
  } catch (e) {
    console.error("EVENT CREATION ERROR:", e);
    console.log("Mongo URI exists:", !!process.env.MONGODB_URI);

    return NextResponse.json(
      { message: "Event failed", error: e instanceof Error ? e.message : e },
      { status: 500 },
    );
  }
}
