// models/Service.ts
import { Schema, model, models, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

ServiceSchema.pre("save", function () {
  const service = this;

  if (service.isModified("title") || service.isNew) {
    if (service.title) {
      service.slug = generateSlug(service.title);
    }
  }
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

ServiceSchema.index({ slug: 1 }, { unique: true });

const Service = models.Service || model<IService>("Service", ServiceSchema);

export default Service;
