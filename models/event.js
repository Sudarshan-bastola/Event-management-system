import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organizer is required"],
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },

    endTime: {
      type: String,
      required: [true, "End time is required"],
    },

    ticketPrice: {
      type: Number,
      default: 0,
      min: [0, "Ticket price cannot be negative"],
    },

    totalSeats: {
      type: Number,
      required: [true, "Total seats is required"],
      min: [1, "Total seats must be at least 1"],
    },

availableSeats: {
  type: Number,
  // available seats cannot be less than 0
  min: [0, "Available seats cannot be negative"],
  validate: {
    validator: function (value) {
      // checks if availableSeats is less than or equal to totalSeats,let value = 50 ans totsl seats = 150
      return value <= this.totalSeats;
    },
    // shows this message if availableSeats is greater than totalSeats
    message: "Available seats cannot be greater than total seats",
  },
},
    image: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", function (next) {
  // runs before saving event

  // if availableSeats is not given while creating event
  if (this.availableSeats == null) {
    // set availableSeats equal to totalSeats by default
    this.availableSeats = this.totalSeats;
  }
});


export default model("Event", eventSchema);