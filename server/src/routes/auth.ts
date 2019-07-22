import {postDeleteAccount, postLogin, postSignup} from "../controllers/auth";
import express from "express";

const router = express.Router();

// router.get("/jwt", jwtCheck);

router.post("/user/login", postLogin);

router.post("/user/signup", postSignup);

router.delete("/:userId", postDeleteAccount);

export default router;
