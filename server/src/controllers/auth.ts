import { User, UserDocument } from "../models/User";
import { UserDeleted } from "../models/DeletedUsers";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import { validationResult } from "express-validator";
import { failed, successData, successMessage } from "../helpers/response";
import jwt from "jsonwebtoken";
/**
 * POST /login
 * Sign in using email and password.
 */
const checkError = (res: Response,req: Request) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json(failed(errors.array()));
    }
    return true;
    
};
export const postLogin = (req: Request, res: Response,next: NextFunction) => {
    checkError(res,req);
    const {email,password} = req.body;
    User.findOne({ email },(err,userFound) => {
        if(err && !userFound){
            return res.status(505).json(failed(err));
        }
        else if(userFound && !err){
            userFound.comparePassword(password,(err,match) => {
                if(err) return res.status(442).json(failed(err));
                if(match){
                    //jwt token
                    const dataToSign =  {
                        email:userFound.email,
                        accountType:userFound.accountType,
                        username: userFound.username,
                        avatar: userFound.gravatar(50)
                    };
                    jwt.sign(dataToSign,process.env.JWT_SECRET_KEY,{expiresIn:"7d"},(err,token) => {
                        if (err) { return next(err); }
    
                        const data = {
                            token,
                            ...dataToSign
                        };
                        res.status(200).json(successData(data));
                    });
                }
            });
        } else {
            res.status(403).json(failed("Email not Found"));
        }
    });
};

/**
 * POST /signup
 * Create a new local account.
 */
export const postSignup = (req: Request, res: Response, next: NextFunction) => {
    checkError(res,req);
    const {email,password,username} = req.body;
    User.findOne({ email },(err,userFound) => {
        if(err && !userFound){
            return res.status(505).json(failed(err));
        }
        else if(userFound && !err){

            res.status(403).json(failed("email has already been taken"));
        } else {
            const user = new User({
                email,
                password,
                username
            });
        
            user.save().then(userDoc => {
                const dataToSign =  {
                    email:userDoc.email,
                    accountType:userDoc.accountType,
                    username: userDoc.username,
                    avatar: userDoc.gravatar(50)
                };
                jwt.sign(dataToSign,process.env.JWT_SECRET_KEY,{expiresIn:"7d"},(err,token) => {
                    if (err) { return next(err); }

                    const data = {
                        token,
                        ...dataToSign
                    };
                    res.status(200).json(successData(data));
                });
            });
        }
    });
};

/**
 * POST /account/profile
 * Update profile information.
 */
export const postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
    checkError(res,req);
    User.findById(req.body.user.id, (err, user: UserDocument) => {
        if (err) { return next(err); }
        user.email = req.body.email || "";
        user.name = req.body.name || "";
        user.gender = req.body.gender || "";
        user.location = req.body.location || "";
        user.website = req.body.website || "";
        user.save((err: WriteError) => {
            if (err) {
                return next(err);
            }
            res.status(200).json(successMessage("Profile information has been updated."));
        });
    });
};

/**
 * POST /account/password
 * Update current password.
 */
export const postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
    checkError(res,req);
    User.findById(req.body.user.id, (err, user: UserDocument) => {
        if (err) { return next(err); }
        user.password = req.body.password;
        user.save((err: WriteError) => {
            if (err) { return next(err); }
            res.status(200).json(successMessage("Password has been changed."));
        });
    });
};

/**
 * POST /account/delete
 * Delete user account.
 */
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({ _id: req.params.userId }, (err,userFound) => {
        if (err) { return next(err); }
        UserDeleted.create(userFound).then(done => {
            User.deleteOne({_id: req.params.userId},(err) => {
                if (err) { return next(err); }
                res.status(200).json(successMessage("Deleted Document Successfully"));
            });
        });
    });
};
