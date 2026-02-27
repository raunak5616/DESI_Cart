import productModel from "../mongodb/models/productModel.js"
import user from "../mongodb/models/shop.model.js";

export const getProducts = async (req,res) =>{
    try {
        console.log("🚀 GET PRODUCTS HIT")  ;
        const product = await productModel.find();
        res.status(200).json(product);
    } catch (error) {
        console.log("🔥 GET PRODUCTS ERROR 🔥", error)
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message,
            stack: error.stack,
        });
    }
}

export const getShop = async (req,res) =>{
    try {
        console.log("🚀 GET SHOP HIT")  ;
        const shop = await user.find();
        res.status(200).json(shop);
    } catch (error) {
        console.log("🔥 GET SHOP ERROR 🔥", error)
        res.status(500).json({
            message: "Failed to fetch shop",
            error: error.message,
            stack: error.stack,
        });
    }
}