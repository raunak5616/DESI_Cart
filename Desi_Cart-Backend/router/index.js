import { Login, signup } from "../authControler/auth.controller.js";
import express from "express";
import {getProducts, getProductsByShopId, getShop } from "../authControler/productController.js";
import { getProfile, updateProfile } from "../authControler/profile.controller.js";
import { upload } from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/products", getProducts);
router.get("/profile/:id", verifyToken, getProfile);
router.get("/productsById/:id", getProductsByShopId);
router.get("/shop", getShop);
router.post("/signup",signup);
router.post("/login",Login);
router.post("/profileUpdate",verifyToken,upload.single("images"),updateProfile);

// Orders
router.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { Order } = await import("../mongodb/models/paymentModel.js"); // dynamic import to avoid circular or early load issues
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order history" });
  }
});


export default router;