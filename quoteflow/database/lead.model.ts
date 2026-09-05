import { Schema, model, models, Document, Types } from "mongoose";
import Service from "./service.model";

export interface ILead extends Document {
  customerName: string;
  email: string;
  selectedServices: Types.ObjectId[];
  totalEstimatedPrice: number;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
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
    selectedServices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "At least one service must be selected"],
      },
    ],
    totalEstimatedPrice: {
      type: Number,
      required: [true, "Total estimated price is required"],
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ["New", "Contacted", "In Progress", "Closed"],
        message: "{VALUE} is not a valid status",
      },
      default: "New",
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to validate all services exist before creating the lead
LeadSchema.pre("save", async function () {
  const lead = this as ILead;

  // Only validate selectedServices if it's new or modified
  if (lead.isModified("selectedServices") || lead.isNew) {
    if (lead.selectedServices && lead.selectedServices.length > 0) {
      try {
        // Count how many of the provided service IDs actually exist in the DB
        const existingServicesCount = await Service.countDocuments({
          _id: { $in: lead.selectedServices },
        });

        // If the count doesn't match the array length, some IDs are invalid/missing
        if (existingServicesCount !== lead.selectedServices.length) {
          const error = new Error("One or more selected Services do not exist");
          error.name = "ValidationError";
          throw error;
        }
      } catch (error: any) {
        // If the error is our ValidationError from above, just re-throw it
        if (error.name === "ValidationError") {
          throw error;
        }

        // Otherwise, it's a database or format error (e.g. invalid ObjectId format)
        const validationError = new Error(
          "Invalid service ID format or database error",
        );
        validationError.name = "ValidationError";
        throw validationError;
      }
    }
  }
});

// Create index on email for quick customer history lookups
LeadSchema.index({ email: 1 });

// Create index on status for quick filtering in admin dashboards (e.g. finding all "New" leads)
LeadSchema.index({ status: 1 });

// Create compound index for sorting leads by status and creation date
LeadSchema.index({ status: 1, createdAt: -1 });

const Lead = models.Lead || model<ILead>("Lead", LeadSchema);

export default Lead;
