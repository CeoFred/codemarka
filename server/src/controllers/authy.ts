// "use strict";

// import bcrypt from "bcryptjs";
// import { NextFunction, Request, Response } from "express";
// import { check, sanitize, validationResult } from "express-validator";
// import jwt from "jsonwebtoken";
// import {User} from "../models/User";
// import { created, failed, invalid, success } from "../helpers/response";
// declare var process: {
//     env: {
//         JWT_SECRET_KEY: string;
//     };
// };
// /**
//  * POST /login
//  * Authenticate a user.
//  */
// export const login = (req: Request, res: Response) => {
//     check("email", "Email is not valid").isEmail();
//     check("password", "Password cannot be blank").isLength({min: 1});

//     sanitize("email").normalizeEmail({ gmail_remove_dots: false });

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return invalid(res, errors);
//     }

//     User.find({ email: req.body.email })
//         .exec()
//         .then((user: any) => {
//             if (user.length < 1) {
//                 failed(res, {
//                     message: "Invalid email, try signing up",
//                     status: "failed"
//                 });
//             } else {
//                 bcrypt.compare(req.body.password, user[0].password, (err: Error, result: any) => {
//                     if (err) {
//                         return res.status(401).json({
//                             message: "Failed with code x(2e2x)"
//                         });
//                     }
//                     if (result) {

//                         const token = jwt.sign({
//                             data: {
//                                 email: user[0].email,
//                                 userId: user[0]._id,
//                                 username: user[0].username
//                             }
//                         },
//                         process.env.JWT_SECRET_KEY,
//                         {
//                             expiresIn: "7d",
//                             mutatePayload: true
//                         });
//                         req.headers.authorization = "Bearer " + token;
//                         return success(res, {
//                             expires: 7 * (24 * 60 * 60 * 60),
//                             message: "Success",
//                             token,
//                             userId: user[0]._id,
//                             username: user[0].username
//                         });
//                     } else {
//                         return res.status(401).json({
//                             message: "Failed"
//                         });
//                     }

//                 });
//             }
//         })
//         .catch((err: any) => {
//             return res.status(401).json({
//                 code: "22",
//                 message: err,
//                 status: "failed",
//             });
//         });
// };

// export const signup = (req: Request, res: Response) => {
//     check("email", "Email is not valid").isEmail();
//     check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
//     check("userName", "User Name cannot be blank").not().isEmpty();
//     check("confirmPassword", "Passwords do not match").equals(req.body.password);

//     sanitize("email").normalizeEmail({ gmail_remove_dots: false });

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return invalid(res, errors);
//     }

//     const {
//         email,
//         password,
//         username,
//         accountType
//     } = req.body;

//     User.find({email: req.body.email}).exec()
//         .then((user: any) => {
//             if (user.length >= 1) {
//                 res.status(403).json({message : "Email already exist", status: "failed"});
//             } else {
//                 bcrypt.hash(password, 10, (err: any, hash: string) => {
//                     if (err) {
//                         res.status(500).json({
//                             error: err
//                         });
//                     } else {

//                         const newUser = new User({
//                             email,
//                             password: hash,
//                             // tslint:disable-next-line: object-literal-sort-keys
//                             accountType,
//                             username
//                         });

//                         newUser.save()
//                             .then((userRes: any) => {
//                                 const token = jwt.sign({
//                                     data: {
//                                         email: userRes.email,
//                                         userId: userRes._id,
//                                         username: userRes.username
//                                     }
//                                 },
//                                 process.env.JWT_SECRET_KEY,
//                                 {
//                                     expiresIn: "7d",
//                                     mutatePayload: true
//                                 });
//                                 req.headers.authorization = "Bearer " + token;
//                                 return  created(res, {
//                                     message: "User successfully SignedUp",
//                                     token,
//                                     userId: user._id,
//                                     // tslint:disable-next-line: object-literal-sort-keys
//                                     expires: 7 * (24 * 60 * 60 * 60),
//                                     username: user.username
//                                 });

//                             })
//                             .catch((erre: any) => {
//                                 return res.status(500).header("Error:True").json({
//                                     messageMongo: erre
//                                 });
//                             });
//                     }
//                 });

//             }
//         })
//         .catch((err: any) => {
//             return res.status(500).json({
//                 message: err
//             });
//         });

// };

// /**
//  * POST /account/password
//  * Update current password.
//  */
// export const postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
//     check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
//     check("confirmPassword", "Passwords do not match").equals(req.body.password);

//     const errors = validationResult(req);

//     // if (!errors.isEmpty()) {
//     //     req.flash("errors", errors.array());
//     //     return res.redirect("/account");
//     // }

//     // User.findById(req.user.id, (err, user: UserDocument) => {
//     //     if (err) { return next(err); }
//     //     user.password = req.body.password;
//     //     user.save((err: WriteError) => {
//     //         if (err) { return next(err); }
//     //         req.flash("success", { msg: "Password has been changed." });
//     //         res.redirect("/account");
//     //     });
//     // });
// };
// export const deleteAccount = (req: Request , res: Response) => {
//     User.remove({_id: req.params.userId})
//         .exec()
//         .then((result: any) => {
//             res.status(201).header("Validated:True").json({
//                 data: result,
//                 message: "User deleted",
//             });
//         })
//         .catch((err: any) => {
//             return res.status(500).json({
//                 message: err
//             });
//         });
// };
// module.exports = {jwtCheck, login, signup, deleteAccount};
