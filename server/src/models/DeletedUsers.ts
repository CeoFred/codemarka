import mongoose from "mongoose";

export type UserDeletedDocument = mongoose.Document & {
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    accountType: string;
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
    username: string;
    gravatar: (size: number) => string;
};


const userDeletedSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array,
    username: {
        unique:true,
        type: String
    },
    firstName: String,
    gender: String,
    location: String,
    website: String,
    picture: String,
    accountType: {
        default: "regular",
        type: String
    }
}, { timestamps: true });



export const UserDeleted = mongoose.model<UserDeletedDocument>("UserDeleted", userDeletedSchema);
