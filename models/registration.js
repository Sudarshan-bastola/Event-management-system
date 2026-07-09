import { Schema, model } from "mongoose";
import Event from "./event.model.js";

const registrationSchema = new Schema(
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

    numberOfTickets: {
      type: Number,
      default: 1,
      min: [1, "At least 1 ticket is required"],
    },

    registrationStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

 // prevents same user from creating multiple registration documents for same event
// one user can still buy multiple tickets using numberOfTickets
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

// runs before saving a registration
registrationSchema.pre("save", async function (next) {
  // find the event for which user is registering
  const event = await Event.findById(this.event);

  // if event is not found, stop and show error
  if (!event) {
    return next(new Error("Event not found"));
  }

  // check if event has enough available seats
  if (event.availableSeats < this.numberOfTickets) {
    return next(new Error("Not enough seats available"));
  }

  // decrease available seats by number of tickets booked
  event.availableSeats -= this.numberOfTickets;

  // save updated event document
  await event.save();

  // continue and save registration document
  next();
});

export default model("Registration", registrationSchema);