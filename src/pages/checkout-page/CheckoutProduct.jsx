import dayjs from "dayjs";
import DeliveryOption from "./DeliveryOption";
import axios from "axios";
import { useState } from "react";

function CheckoutProduct({ cartItem, selectedDeliveryOption, deliveryOptions, getCartData }) {

    const [update, setUpdate] = useState(false);
    const [quantity,setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`api/cart-items/${cartItem.productId}`)
        await getCartData();
    }
    const updateCartItem = async () => {
        if (update) {
            await axios.put(`api/cart-items/${cartItem.productId}`,{
                quantity:(quantity*1)
            })
            await getCartData();
            setUpdate(false);
            return;
        }
        setUpdate(true);
    }

    return (
        <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
                Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
                <img className="product-image"
                    src={cartItem.product.image} />

                <div className="cart-item-details">
                    <div className="product-name">
                        {cartItem.product.name}
                    </div>
                    <div className="product-price">
                        ${(cartItem.product.priceCents / 100).toFixed(2)}
                    </div>
                    <div className="product-quantity">

                        {update ?
                            (
                                <input type="text" placeholder={cartItem.quantity} onChange={(e)=>{setQuantity(e.target.value)}} className="update-quantity" />
                            ) :
                            (
                                <span>
                                    Quantity: <span className="quantity-label">{cartItem.quantity} </span>
                                </span>
                            )}
                        <span onClick={updateCartItem} className="update-quantity-link link-primary">
                            Update
                        </span>

                        <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                            Delete
                        </span>
                    </div>
                </div>

                <div className="delivery-options">
                    <div className="delivery-options-title">
                        Choose a delivery option:
                    </div>

                    {deliveryOptions.map((deliveryOption) => {
                        let priceString = "Free Shipping"
                        if (deliveryOption.priceCents > 0) {
                            priceString = `${(deliveryOption.priceCents / 100).toFixed(2)} - Shipping`;
                        }
                        return (
                            <DeliveryOption key={deliveryOption.id} priceString={priceString} deliveryOption={deliveryOption} cartItem={cartItem} getCartData={getCartData} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CheckoutProduct;