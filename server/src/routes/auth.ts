import {postDeleteAccount, postLogin, postSignup, postUpdatePassword,postUpdateProfile} from "../controllers/auth";
import express from "express";
import {validate} from "../middleware/authValidate";

const router = express.Router();
// update password
router.patch("/user/password/update", validate("passwordUpdate"),postUpdatePassword);

//login a user
router.post("/user/login",validate("login"), postLogin);

//signup a user
router.post("/user/signup",validate("signup"), postSignup);

// delete a user
router.delete("/user/delete/:userId", postDeleteAccount);

//forgot password
router.post("/user/password/recovery", postDeleteAccount);

// update user profile
router.patch("/user/profile/update", postUpdateProfile);

export default router;
