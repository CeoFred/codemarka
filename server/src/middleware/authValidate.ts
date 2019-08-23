import {  check,sanitize,body } from "express-validator";
const returnSignupValidation = () => {
    return [ 
        check("username").exists(),
        check("email", "Email is not valid").isEmail(),
        check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).exists(),
        body("email","Email Does not exist").exists(),
        body("password").not().isEmpty().trim().escape(),
        body("username").not().isEmpty().trim().escape(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        sanitize("email").normalizeEmail({ gmail_remove_dots: false })
    ];
};

const returnLoginValidation = () => {
    return [ 
        check("email", "Email is not valid").isEmail().exists(),
        check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).exists(),
        body("password").not().isEmpty().trim().escape(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        sanitize("email").normalizeEmail({ gmail_remove_dots: false })
    ];
};

const returnpasswordUpdateValidation = () => {
    return [
        body("oldPassword").not().isEmpty().trim().escape(),
        body("newPassword").not().isEmpty().trim().escape(),
    ];
};
export const validate = function(method: string): any{
    switch (method) {
        case "signup": return returnSignupValidation();    
            
        case "login":return returnLoginValidation();
            
        case "passwordUpdate": return returnpasswordUpdateValidation();
            
        default: return returnSignupValidation();
                   
    }
};

