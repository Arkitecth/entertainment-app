import express from "express";
import {
  bookmark,
  getBookmarked,
  login,
  register,
  removeBookmark,
} from "../controllers/auth.js";
import { trending, discover } from "../controllers/api.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/bookmark/:email", bookmark);

router.post("/removeBookmark/:email", removeBookmark);

router.get("/getBookmarks/:email", getBookmarked);

router.get("/trending/:email", trending);

router.get("/discover/:email", discover);

export default router;
