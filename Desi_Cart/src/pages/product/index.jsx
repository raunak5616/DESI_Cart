import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Amul Taaza Milk",
    qty: "1 L",
    price: 75,
    image: "https://amul.com/files/products/taaza.jpg",
  },
  {
    id: 2,
    name: "Mother Dairy Cow Milk",
    qty: "500 ml",
    price: 30,
    image: "https://amul.com/files/products/cow.jpg",
  },
];

export default function Product() {
  return (
    <div className="flex bg-gray-50 min-h-screen">

      {/* Sidebar */}
      <div className="w-56 bg-white shadow-md sticky top-0 h-screen overflow-y-auto">
        <h2 className="p-4 font-bold text-lg border-b">Categories</h2>
        <ul className="space-y-2 p-3">
          <li className="bg-green-100 text-green-700 p-2 rounded-md font-semibold cursor-pointer">
            Milk
          </li>
          <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            Bread & Pav
          </li>
          <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            Eggs
          </li>
        </ul>
      </div>

      {/* Products Section */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Buy Milk Online</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 relative">

      {/* Delivery Badge */}
      <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
        12 MINS
      </span>

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-32 object-contain mx-auto"
      />

      {/* Info */}
      <h3 className="mt-4 font-semibold text-sm">{product.name}</h3>
      <p className="text-gray-500 text-sm">{product.qty}</p>

      {/* Price + Button */}
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold text-lg">₹{product.price}</span>

        {count === 0 ? (
          <button
            onClick={() => setCount(1)}
            className="border border-green-600 text-green-600 px-4 py-1 rounded-md hover:bg-green-600 hover:text-white transition"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center border border-green-600 rounded-md">
            <button
              onClick={() => setCount(count - 1)}
              className="px-2 text-green-600"
            >
              -
            </button>
            <span className="px-3">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-2 text-green-600"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
