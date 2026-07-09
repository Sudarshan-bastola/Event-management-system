import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event is required"],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// One user can review one event only once
reviewSchema.index({ user: 1, event: 1 }, { unique: true });

export default model("Review", reviewSchema);