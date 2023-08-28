import express from "express"
import {login, register} from "../controllers/auth.js"
import { trending, movieDetails, seriesDetails } from "../controllers/api.js";

const router = express.Router(); 

router.post("/register", register)

router.post("/login", login) 


router.get('/trending', trending)

router.get('/details/movie/:id', movieDetails)

router.get('/details/series/:id', seriesDetails)


export default router;