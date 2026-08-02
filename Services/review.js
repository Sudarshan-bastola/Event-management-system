import Review from "../models/review.js";
import Registration from "../models/registration.js";
import { ValidationError } from "../errors/validation.js";
import { NotFoundError } from "../errors/not-found.js";

// Create Review
export const create = async (data) => {
  // User must have registered for event
  const registration = await Registration.findOne({
    user: data.user,
    event: data.event,
  });

  if (!registration) {
    throw new ValidationError("You must register before reviewing this event.");
  }

  // One review per attendee per event
  const existingReview = await Review.findOne({
    user: data.user,
    event: data.event,
  });

  if (existingReview) {
    throw new ValidationError("You have already reviewed this event.");
  }

  const review = await Review.create(data);

  return review.populate([
    {
      path: "user",
      select: "name email",
    },
    {
      path: "event",
      select: "title",
    },
  ]);
};

// All Reviews
export const index = async () => {
  return Review.find()
    .populate("user", "name email")
    .populate("event", "title");
};

// Single Review
export const find = async (id) => {
  const review = await Review.findById(id)
    .populate("user", "name email")
    .populate("event", "title");

  if (!review) {
    throw new NotFoundError("Review not found");
  }

  return review;
};

// Update Own Review
export const update = async (id, data, userId) => {
  const review = await Review.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!review) {
    throw new NotFoundError("Review not found or unauthorized.");
  }

  return review.populate([
    {
      path: "user",
      select: "name email",
    },
    {
      path: "event",
      select: "title",
    },
  ]);
};

// Delete Own Review
export const remove = async (id, userId) => {
  const review = await Review.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!review) {
    throw new NotFoundError("Review not found or unauthorized.");
  }

  return review;
};
