import {Document, Schema, model} from "mongoose";
import { UserInput } from "./user.interface";

export interface UserDocument extends UserInput, Document{
    createdAt: Date, 
    updatedAt: Date, 
    deletedAt: Date
}

const userSchema = new Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
}, {timestamps: true, collection: 'users'});

export const UserModel  = model<UserDocument>("User", userSchema);