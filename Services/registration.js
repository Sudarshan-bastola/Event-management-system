import Registration from "../models/registration.js";
import { NotFoundError } from "../errors/not-found.js";

export const create = async (data) => {
  return Registration.create(data);
};

export const index = async () => {
  return Registration.find({})
    .populate("user", "name email")
    .populate("event", "title eventDate");
};

export const find = async (id, userId, role) => {
  let query = { _id: id };

  if (role === "attendee") {
    query.user = userId;
  }

  const registration = await Registration.findOne(query)
    .populate("user", "name email")
    .populate("event", "title eventDate");

  if (!registration) {
    throw new NotFoundError("Registration not found");
  }

  return registration;
};

export const update = async (id, data, organizerId) => {
  const registration = await Registration.findById(id).populate("event");

  if (!registration) {
    throw new NotFoundError("Registration not found");
  }

  if (registration.event.organizer.toString() !== organizerId) {
    throw new NotFoundError(
      "You are not authorized to update this registration.",
    );
  }

  registration.registrationStatus = data.registrationStatus;

  await registration.save();

  return registration.populate([
    {
      path: "user",
      select: "name email",
    },
    {
      path: "event",
      select: "title eventDate",
    },
  ]);
};

export const remove = async (id, userId) => {
  const registration = await Registration.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!registration) {
    throw new NotFoundError(
      "Registration not found or you are not authorized.",
    );
  }

  return registration;
};
