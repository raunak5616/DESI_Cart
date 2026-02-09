import express from "express";
import { upload } from "../middleware/upload.js";
import { createProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.post(
  "/products",
  upload.array("images", 5),
  createProduct
);

export default router;
