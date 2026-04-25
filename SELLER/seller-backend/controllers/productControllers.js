import Product from "../mongodb/model/index.js";
import Order from "../mongodb/model/order.model.js";
import mongoose from "mongoose";

console.log("📦 productControllers file LOADED");

export const createProduct = async (req, res) => {
  console.log("🚀 createProduct HIT");
  try {
    const images = req.files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));

    const product = await Product.create({
      ...req.body,
      images
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("🔥 CREATE PRODUCT ERROR 🔥");
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

export const getProductsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const products = await Product.find({ shopId });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

export const getOrdersByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    // Assuming each item in Order.items has a shopId or productId we can link
    // For simplicity, we fetch orders where at least one item's productId belongs to this shop
    // Or if the items already have shopId
    const orders = await Order.find({ "items.shopId": shopId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};

