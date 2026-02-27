import axios from "axios";

export const getProducts = async () => {
  const URL = import.meta.env.VITE_MONGO_URI + "/products";
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("🔥 GET PRODUCTS ERROR 🔥", error);
    throw error;
  }
};
