import {postDeleteAccount, postLogin, postSignup, postUpdatePassword,postUpdateProfile,refreshToken} from "../controllers/auth";
import express from "express";
import {validate} from "../middleware/authValidate";

const router = express.Router();
// update password
router.patch("/user/password/update", validate("passwordUpdate"),postUpdatePassword);

//login a user
router.post("/user/login",validate("login"), postLogin);

//signup a user
router.post("/user/signup",validate("signup"), postSignup);

// delete user account
router.delete("/user/delete/:userId", postDeleteAccount);

// refresh jwt token
router.post("/user/token/refresh", refreshToken);

// update user profile
router.patch("/user/profile/update", postUpdateProfile);

export default router;
