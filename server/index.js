import express from "express"; 
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import router from "./routes/auth.js"

// Configurations 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
dotenv.config(); 

const app = express(); 
app.use(express.json()); 
app.use(bodyParser.json({limit: "30mb", extended: true})); 
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

// Routes 
app.use(cors());
app.use("/auth", router)


// MONGOOSE SETUP
const PORT = process.env.PORT || 6001; 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 

}).then(() => {
    app.listen(PORT, () => console.log(`Server Port ${PORT}`)); 
}).catch((error) => console.log(`${error} did not connect`)); 


