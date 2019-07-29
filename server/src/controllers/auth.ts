import { User, UserDocument } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import { check, validationResult } from "express-validator";
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
export const postLogin = (req: Request, res: Response) => {
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
                    res.status(200).json(successData(userFound));
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
export const postSignup = (req: Request, res: Response) => {
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
                res.status(201).json(successData(userDoc));
            });
        }
    });
};

/**
 * POST /account/profile
 * Update profile information.
 */
// export const postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
//     check("email", "Please enter a valid email address.").isEmail();
//     // eslint-disable-next-line @typescript-eslint/camelcase
//     sanitize("email").normalizeEmail({ gmail_remove_dots: false });

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         req.flash("errors", errors.array());
//         return res.redirect("/account");
//     }

//     User.findById(req.body.user.id, (err, user: UserDocument) => {
//         if (err) { return next(err); }
//         user.email = req.body.email || "";
//         user.profile.name = req.body.name || "";
//         user.profile.gender = req.body.gender || "";
//         user.profile.location = req.body.location || "";
//         user.profile.website = req.body.website || "";
//         user.save((err: WriteError) => {
//             if (err) {
//                 if (err.code === 11000) {
//                     req.flash("errors", { msg: "The email address you have entered is already associated with an account." });
//                     return res.redirect("/account");
//                 }
//                 return next(err);
//             }
//             req.flash("success", { msg: "Profile information has been updated." });
//             res.redirect("/account");
//         });
//     });
// };

/**
 * POST /account/password
 * Update current password.
 */
export const postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
    check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    check("confirmPassword", "Passwords do not match").equals(req.body.password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/account");
    }
    User.findById(req.body.user.id, (err, user: UserDocument) => {
        if (err) { return next(err); }
        user.password = req.body.password;
        user.save((err: WriteError) => {
            if (err) { return next(err); }
            req.flash("success", { msg: "Password has been changed." });
            res.redirect("/account");
        });
    });
};

/**
 * POST /account/delete
 * Delete user account.
 */
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
    User.remove({ _id: req.params.userId }, (err) => {
        if (err) { return next(err); }
        res.status(200).json(successMessage("Deleted Document Successfully"));
    });
};
