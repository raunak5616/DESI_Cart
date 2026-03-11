import { useEffect, useState } from "react"
import { getProducts } from "../../apiCalls/productapi"
import RecipeReviewCard from "../../components/productCard";

export const ShopByProduct = () =>{
    const [productsbyshop, setProductsByShop] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchProductByShop = async () =>{
        try {
            const data = await getProducts();
            setProductsByShop(data);
        } catch (error) {
            console.error("🔥 FETCH PRODUCTS by shop ERROR 🔥", error);
        }finally{
            setLoading(false);
        }
    }
    fetchProductByShop();
    },[]);
    if(loading){
        return <p>product loading...</p>
    }
return(
    <main className="flex flex-wrap gap-6 justify-center mt-4">
         {productsbyshop.map((product) => (
           <div
             key={product._id || product.id}
             className="flex"
             style={{ width: "345px" }}
           >
             <RecipeReviewCard product={product} />
           </div>
         ))}
       </main>
)
}

