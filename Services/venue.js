import Venue from "../models/venue.js";
import { NotFoundError } from "../errors/not-found.js";

export const create = async (data) => {
    const venue = await Venue.create(data);
    return venue;
};

export const index = async () => {
    const venues = await Venue.find({});
    return venues;
};

export const find = async (param, config) => {
    const venue = await Venue.findOne(param, config);
    if (!venue) throw new NotFoundError("Venue not found");
    return venue;
};

export const update = async (id, data) => {
    const venue = await Venue.findByIdAndUpdate(id, data, {
        returnDocument: "after",
    });
    if (!venue) throw new NotFoundError("Venue not found");
    return venue;
};

export const remove = async (id) => {
    const venue = await Venue.findByIdAndDelete(id);
    if (!venue) throw new NotFoundError("Venue not found");
    return venue;
};