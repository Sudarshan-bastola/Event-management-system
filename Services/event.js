import Event from "../models/event.js";
import { NotFoundError } from "../errors/not-found.js";

export const create = async (data) => {
  return Event.create(data);
};

export const index = async () => {
  return Event.find({})
    .populate("organizer", "name email")
    .populate("category", "name")
    .populate("venue", "name city");
};

export const find = async (param, config) => {
  const event = await Event.findOne(param, config)
    .populate("organizer", "name email")
    .populate("category", "name")
    .populate("venue", "name city");

  if (!event) {
    throw new NotFoundError("Event not found");
  }

  return event;
};

export const update = async (id, data, organizerId) => {
  const event = await Event.findOneAndUpdate(
    {
      _id: id,
      organizer: organizerId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!event) {
    throw new NotFoundError("Event not found or you are not authorized.");
  }

  return event;
};

export const remove = async (id, organizerId) => {
  const event = await Event.findOneAndDelete({
    _id: id,
    organizer: organizerId,
  });

  if (!event) {
    throw new NotFoundError("Event not found or you are not authorized.");
  }

  return event;
};
