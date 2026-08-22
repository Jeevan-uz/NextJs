"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    console.log("Creating booking:", {
      eventId,
      slug,
      email,
    });

    const booking = await Booking.create({
      eventId,
      slug,
      email,
    });

    console.log("Booking created:", booking);

    return {
      success: true,
    };
  } catch (e) {
    console.error("CREATE BOOKING ERROR:", e);

    return {
      success: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
};
