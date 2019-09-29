import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    tokens: AuthToken[];
    accountType: string;
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
    username: string;
    comparePassword: comparePasswordFunction;
    addToken: addToken;
    gravatar: (size: number) => string;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: boolean) => {}) => void;
type addToken = (token: string,type: string) => void;
export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema({
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

/**
 * Password hash middleware.
 */
// userSchema.pre("save", function save(next: any) {
//     const user = this as UserDocument;
//     if (!user.isModified("password")) { return next(); }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) { return next(err); }
//         bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
//             if (err) { return next(err); }
//             user.password = hash;
//             next();
//         });
//     });
// });

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

const addToken = function(token: string, type: string){
    let tokens = this.tokens;
    tokens.push({accessToken:token,type});
    this.save();
};

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.addToken = addToken;
/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number = 200): string {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const User = mongoose.model<UserDocument>("User", userSchema);
