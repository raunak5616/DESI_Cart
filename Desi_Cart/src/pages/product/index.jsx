import { useEffect, useState } from "react";
import { getProducts } from "../../apiCalls/productapi";
import RecipeReviewCard from "../../components/productCard";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("🔥 FETCH PRODUCT ERROR 🔥", error);
      }
    };
    fetchproduct();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      
      {/* Sidebar */}
      <div className="w-56 bg-white shadow-md sticky top-0 h-screen overflow-y-auto">
        <h2 className="p-4 font-bold text-lg border-b">Categories</h2>

        <ul className="space-y-2 p-3">
          {categories.map((cat, index) => (
            <li
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`p-2 rounded-md cursor-pointer ${
                selectedCategory === cat
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Products Section */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          Buy {selectedCategory === "All" ? "Products" : selectedCategory} Online
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <RecipeReviewCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}