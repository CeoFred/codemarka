import {postDeleteAccount, postLogin, postSignup} from "../controllers/auth";
import express from "express";
import {validate} from "../middleware/authValidate";

const router = express.Router();

// router.get("/jwt", jwtCheck);

router.post("/user/login",validate, postLogin);

router.post("/user/signup", postSignup);

router.delete("/:userId", postDeleteAccount);

export default router;
