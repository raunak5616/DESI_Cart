export const cartReducer = (state, { type, payload }) => {
  switch (type) {

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...payload, qty: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== payload),
      };

    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorite: [...state.favorite, payload],
      };

    case "REMOVE_FROM_FAVORITE":
      return {
        ...state,
        favorite: state.favorite.filter(item => item._id !== payload),
      };

    case "INCREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === payload
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };

    case "DECREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === payload && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };

    default:
      return state;
  }
};
