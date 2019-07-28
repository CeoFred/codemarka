import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult,body } from "express-validator";
import { failed, } from "../helpers/response";

export const validate = function(req: Request,res:  Response, next: NextFunction): any{
    check("email", "Email is not valid").isEmail().exists();
    check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).exists();
    check("confirmPassword", "Passwords do not match").equals(req.body.password);
    body("email").not().isEmpty().trim().escape();
    body("password").not().isEmpty().trim().escape();
    body("username").not().isEmpty().trim().escape().exists();

    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(403).json(failed(errors));
    }
    next();
};