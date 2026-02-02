
import express from "express";
import { connectToDb } from "./mongodb/connection/index.js";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
dotenv.config();
app.get("/", (req, res) => {
  res.send("API running 🚀");
});
async function startServer() {
    try {
        await connectToDb();
        app.listen(5000,()=>{
            console.log("http://localhost:5000");
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();