import {postDeleteAccount, postLogin, postSignup, postUpdatePassword} from "../controllers/auth";
import express from "express";
import {validate} from "../middleware/authValidate";

const router = express.Router();

router.patch("/user/password/update", validate("passwordUpdate"),postUpdatePassword);

router.post("/user/login",validate("login"), postLogin);

router.post("/user/signup",validate("signup"), postSignup);

router.delete("/:userId", postDeleteAccount);

export default router;
