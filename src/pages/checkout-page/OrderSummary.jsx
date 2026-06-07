import CheckoutProduct from "./CheckoutProduct";

function OrderSummary({ cart, deliveryOptions, getCartData }) {


    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                })

                return (
                    <CheckoutProduct key={cartItem.productId} cartItem={cartItem} deliveryOptions={deliveryOptions} selectedDeliveryOption={selectedDeliveryOption} getCartData={getCartData} />
                );
            })}

        </div>
    );
}

export default OrderSummary;