import { Schema, model } from "mongoose";

const venueSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

// Optional: prevent same venue name in same city
// venueSchema.index({ name: 1, city: 1 }, { unique: true });

export default model("Venue", venueSchema);