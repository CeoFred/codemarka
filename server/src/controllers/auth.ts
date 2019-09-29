import { User, UserDocument } from "../models/User";
import { UserDeleted } from "../models/DeletedUsers";
import { Request, Response, NextFunction } from "express";

import nodemailer from "nodemailer";
import { WriteError } from "mongodb";
import { validationResult } from "express-validator";
import { failed, successData, successMessage } from "../helpers/response";
import jwt from "jsonwebtoken";


const options  = { algorithm: "HS256", noTimestamp: false, audience: "users", issuer: "colab", subject: "auth",expiresIn:"7d" };

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass // generated ethereal password
//         }
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: "\"Fred Foo 👻\" <foo@example.com>", // sender address
//         to: "johnsonmessilo19@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>" // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

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

const signToken =  (dataToSign: object,res: Response,next: NextFunction) => {
    jwt.sign(dataToSign,process.env.JWT_SECRET_KEY,options,(err,token) => {
        if (err) { return next(err); }
        res.status(200).json(successData({token}));
    });
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
                    signToken(dataToSign,res,next);
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
                signToken(dataToSign,res,next);
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


export const logout = () => {

};

/**
 * POST /auth/token/refresh
 * @returns string
 * @param token string
 * @requires token
 * @method POST
 * @description Refresh a token
 */

export const refreshToken = (req: Request, res: Response) => {
    const oldToken = req.body.token;
    // const tokenGenerator = ;
    const refreshOptions = {verify: { audience: "users", issuer: "colab" }};
    const payload: any = jwt.verify(oldToken,process.env.JWT_SECRET_KEY , refreshOptions.verify);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;
    delete payload.aud;
    delete payload.iss;
    delete payload.sub;
    const token2 = jwt.sign(payload, process.env.JWT_SECRET_KEY,options);
    res.status(201).json(successMessage(token2));
};  