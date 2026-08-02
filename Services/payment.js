import Payment from "../models/payment.js";
import Registration from "../models/registration.js";
import Event from "../models/event.js";
import { NotFoundError } from "../errors/not-found.js";
import { ValidationError } from "../errors/validation.js";

// Create Payment (Attendee)
export const create = async (data, userId) => {
  const registration = await Registration.findById(data.registration);

  if (!registration) {
    throw new NotFoundError("Registration not found");
  }

  // Registration must belong to logged in attendee
  if (registration.user.toString() !== userId) {
    throw new ValidationError("You can only pay for your own registration.");
  }

  // Prevent duplicate payment
  const existingPayment = await Payment.findOne({
    registration: registration._id,
  });

  if (existingPayment) {
    throw new ValidationError("Payment already exists for this registration.");
  }

  const payment = await Payment.create(data);

  return payment.populate({
    path: "registration",
    populate: [
      {
        path: "user",
        select: "name email",
      },
      {
        path: "event",
        select: "title eventDate",
      },
    ],
  });
};

// View Payments
export const index = async (userId, role) => {
  // Admin can view everything
  if (role === "admin") {
    return Payment.find().populate({
      path: "registration",
      populate: [
        {
          path: "user",
          select: "name email",
        },
        {
          path: "event",
          select: "title organizer",
        },
      ],
    });
  }

  // Organizer sees payments for own events
  if (role === "organizer") {
    const events = await Event.find({
      organizer: userId,
    }).select("_id");

    const eventIds = events.map((event) => event._id);

    const registrations = await Registration.find({
      event: { $in: eventIds },
    }).select("_id");

    const registrationIds = registrations.map(
      (registration) => registration._id,
    );

    return Payment.find({
      registration: { $in: registrationIds },
    }).populate({
      path: "registration",
      populate: [
        {
          path: "user",
          select: "name email",
        },
        {
          path: "event",
          select: "title",
        },
      ],
    });
  }

  throw new ValidationError("Unauthorized");
};

// View Single Payment
export const find = async (id, userId, role) => {
  const payment = await Payment.findById(id).populate({
    path: "registration",
    populate: [
      {
        path: "user",
        select: "name email",
      },
      {
        path: "event",
        select: "title organizer",
      },
    ],
  });

  if (!payment) {
    throw new NotFoundError("Payment not found");
  }

  if (role === "admin") {
    return payment;
  }

  if (
    role === "attendee" &&
    payment.registration.user._id.toString() === userId
  ) {
    return payment;
  }

  if (
    role === "organizer" &&
    payment.registration.event.organizer.toString() === userId
  ) {
    return payment;
  }

  throw new ValidationError("Unauthorized");
};

// Organizer updates payment status
export const update = async (id, data, organizerId) => {
  const payment = await Payment.findById(id).populate({
    path: "registration",
    populate: {
      path: "event",
      select: "organizer",
    },
  });

  if (!payment) {
    throw new NotFoundError("Payment not found");
  }

  if (payment.registration.event.organizer.toString() !== organizerId) {
    throw new ValidationError("You are not authorized to update this payment.");
  }

  payment.paymentStatus = data.paymentStatus;

  await payment.save();

  return payment.populate({
    path: "registration",
    populate: [
      {
        path: "user",
        select: "name email",
      },
      {
        path: "event",
        select: "title",
      },
    ],
  });
};

// Admin deletes payment
export const remove = async (id) => {
  const payment = await Payment.findByIdAndDelete(id);

  if (!payment) {
    throw new NotFoundError("Payment not found");
  }

  return payment;
};
