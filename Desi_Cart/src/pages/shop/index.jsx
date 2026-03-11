import { useEffect, useState } from "react";
import { getShop } from "../../apiCalls/shopApi";
import ShopCard from "../../components/shopCard";
import {useNavigate} from "react-router-dom";
const Shop =  () => { 
    const navigate = useNavigate();
    const [shop, setshop] = useState([]);
    const [loading, setLoading] = useState(true);
   useEffect(()=>{
   const fetchShop = async () =>{
    try {
        const response = await getShop();
        console.log("shop data🚀:", response);
        setshop(response);
    } catch (error) {
        console.error("🔥 FETCH SHOP ERROR 🔥", error);
    }finally{
        setLoading(false);
    }
   }
   fetchShop();
   },[]);
   if(loading){
    return <p className="text-center mt-10">Loading shop...</p>;
   }
    return (
       <main className="flex flex-wrap gap-6 justify-center mt-4">
        {
            shop.map((shops)=>(
                <div key={shops._id || shops.id} className="flex" style={{width:"345px"}} onClick={()=>navigate(`/shopproduct?shopId=${shops._id || shops.id}`)}>
                    <ShopCard shop={shops}/>
                </div>
            ))
        }
       </main>
    )
}
export default Shop;