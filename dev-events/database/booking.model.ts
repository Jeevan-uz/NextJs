import { Schema, model, models, Document, Types } from "mongoose";
import Event from "./event.model";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          // RFC 5322 compliant email validation regex
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  },
);

// Pre-save hook to validate events exists before creating booking
BookingSchema.pre("save", async function () {
  // 1. Removed 'next' from here
  const booking = this as IBooking;

  // Only validate eventId if it's new or modified
  if (booking.isModified("eventId") || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select("_id");

      if (!eventExists) {
        const error = new Error(
          `Event with ID ${booking.eventId} does not exist`,
        );
        error.name = "ValidationError";
        throw error; // 2. Throw the error instead of returning next(error)
      }
    } catch (error: any) {
      // If the error is our ValidationError from above, just re-throw it
      if (error.name === "ValidationError") {
        throw error;
      }

      // Otherwise, it's a database or format error
      const validationError = new Error(
        "Invalid events ID format or database error",
      );
      validationError.name = "ValidationError";
      throw validationError; // 3. Throw the error instead of returning next(error)
    }
  }

  // 4. No need to call next() at the bottom!
  // An async function resolving successfully tells Mongoose to proceed.
});

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Create compound index for common queries (events bookings by date)
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Create index on email for user booking lookups
BookingSchema.index({ email: 1 });

// Enforce one booking per events per email
BookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: "uniq_event_email" },
);
const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
