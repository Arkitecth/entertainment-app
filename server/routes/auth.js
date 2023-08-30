import express from "express";
import { login, register } from "../controllers/auth.js";
import { trending, details, discover } from "../controllers/api.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/trending", trending);

router.get("/details/:name/:id", details);

router.get("/discover", discover);

export default router;
