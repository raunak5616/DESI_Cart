import CardMedia from "@mui/material/CardMedia";

import "./index.css";
import { useCart } from "../../context/card.context/useCartContext";

export const CartCard = ({ item }) => {

    const { cartDispatch } = useCart();

    const {
        images: [{ url } = {}] = [],
    } = item || {};

    const countInc = () => {
        cartDispatch({
            type: "INCREMENT_QTY",
            payload: item._id,
        });
    };

    const countDec = () => {
        cartDispatch({
            type: "DECREMENT_QTY",
            payload: item._id,
        });
    };
    const cartRemove = () => {
        cartDispatch({
            type: "REMOVE_FROM_CART",
            payload: item._id,
        });
    }
    const addToFav = () => {
        cartDispatch({
            type: "ADD_TO_FAVORITE",
            payload: item,
        })
    }
    return (
        <div className="container1">
            <div className="product">

                <div className="media">
                    <CardMedia
                        component="img"
                        image={url || "/no-image.png"}
                        alt={item?.name}
                        sx={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                        }}
                    />

                </div>

                <div className="des">
                    <h4>{item?.title}</h4>
                    <div className="slug">{item?.slug}</div>

                    <div className="actions">
                        <span onClick={addToFav}>❤️</span>
                        <span onClick={cartRemove}>❌</span>
                    </div>
                </div>

                <div className="qty">
                    <span className="price">
                        ₹{(item?.price * item?.qty).toFixed(2)}
                    </span>

                    <div className="qty-controls">
                        <button
                            className="qty-btn "
                            onClick={countDec}
                            disabled={item.qty === 1}
                        >
                            −
                        </button>

                        <span className="qty-count">
                            {item?.qty}
                        </span>

                        <button
                            className="qty-btn"
                            onClick={countInc}
                            disabled={item.qty === 5}
                        >
                            +
                        </button>
                    </div>

                    {item.qty === 5 && (
                        <p className="limit-text">
                            Maximum quantity reached
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
};
