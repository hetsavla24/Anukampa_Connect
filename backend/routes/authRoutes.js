import express from "express";
import { login, logout, ngo_signup, volunteer_signup } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup/ngo_signup",ngo_signup);
router.post("/signup/volunteer_signup",volunteer_signup);

router.post("/login",login);

router.post("/logout",logout);


export default router;
