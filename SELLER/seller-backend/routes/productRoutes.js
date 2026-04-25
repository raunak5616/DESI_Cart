import express from "express";
import { upload } from "../middleware/upload.js";
import { 
  createProduct, 
  getProductsByShop, 
  updateProduct, 
  deleteProduct, 
  getOrdersByShop, 
  updateOrderStatus 
} from "../controllers/productControllers.js";
import { Login, Signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", upload.array("images", 5), createProduct);

// Orders — must be BEFORE /:shopId so Express doesn't treat "orders" as a shopId
router.get("/orders/:shopId", getOrdersByShop);
router.patch("/orders/:orderId/status", updateOrderStatus);

// Products
router.get("/:shopId", getProductsByShop);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.post("/signup",upload.single("images"), Signup);
router.post("/login", Login);


export default router;
