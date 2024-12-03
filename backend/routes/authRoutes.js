import express from "express";
import { logout, ngo_login, ngo_signup, volunteer_login, volunteer_signup } from "../controllers/auth.controller.js";
import { report } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/",(req,res) => res.send("Hello World!"));
router.post("/signup/ngo_signup",ngo_signup);
router.post("/signup/volunteer_signup",volunteer_signup);

router.post("/login/ngo_login",ngo_login);
router.post("/login/volunteer_login",volunteer_login);


router.post("/logout",logout);

router.post("/report",report);


export default router;
