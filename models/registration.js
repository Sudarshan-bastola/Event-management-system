import { Schema, model } from "mongoose";
import Event from "./event.js";

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

// Runs automatically before a registration document is saved
registrationSchema.pre("save", async function () {

  // Find the event using the event ID stored in this registration
  const event = await Event.findById(this.event);

  // If no event exists with the given ID, stop the save operation
  if (!event) {
    throw new Error("Event not found");
  }

  // Check whether enough seats are available for the requested tickets
  if (event.availableSeats < this.numberOfTickets) {
    throw new Error("Not enough seats available");
  }

  // Reduce the available seats by the number of tickets booked
  event.availableSeats -= this.numberOfTickets;

  // Save the updated event document with the new availableSeats value
  await event.save();

  // No need to call next() because this is an async middleware.
  // If there are no errors, Mongoose automatically continues
  // and saves the registration document.
});
export default model("Registration", registrationSchema);