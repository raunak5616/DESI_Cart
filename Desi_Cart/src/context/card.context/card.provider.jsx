import { useReducer } from "react";
import { cartReducer } from "../../Reducer/cartReducer";
import { CartContext } from "./cart.context";



const initialState = {
  cart: [],
  favourite: [],
};

export const CartProvider = ({ children }) => {
  const [{ cart, favourite }, cartDispatch] = useReducer(
    cartReducer,
    initialState
  );

  return (
    <CartContext.Provider value={{ cart, favourite, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};


