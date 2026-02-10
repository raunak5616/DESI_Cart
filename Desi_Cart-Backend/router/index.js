import { Login, signup } from "../authControler/auth.controller.js";
import express from "express";
import { getProducts } from "../authControler/productController.js";

const router = express.Router();
router.get("/products", getProducts);
router.post("/signup",signup);
router.post("/login",Login);

export default router;