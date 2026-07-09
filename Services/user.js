import User from "../models/user.js";

import {NotFoundError} from '../errors/not-found.js';

export const create = async (data) => {
    
    const user = await User.create(data);

    const {password, ...userwithoutpassoword} = user.toObject();

    return userwithoutpassoword;
}

export const index = async () => {
     
     const users = await User.find({}, {passoword: 0});

     return users;
}

export const find = async (param , config) => {

    const user = await User.findOne(param,config);
    if (!user) throw new NotFoundError('User not found');
    return user;
}

export const update = async (id,data) => {
    const user = await User.findByIdAndUpdate(id , data , {
        returnDocument: 'after',
        projection: {
            password: 0
        }
    });
    if (!user) throw new NotFoundError('User not found');
    return user;
}

export const remove = async (id) => {
    const user = await User.findByIdAndDelete(id, {projection: {password: 0}})
    if (!user) throw new NotFoundError('User not found');
    return user
}