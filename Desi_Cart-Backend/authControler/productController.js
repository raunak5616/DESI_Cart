import productModel from "../mongodb/models/productModel.js"

export const getProducts = async (req,res) =>{
    try {
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