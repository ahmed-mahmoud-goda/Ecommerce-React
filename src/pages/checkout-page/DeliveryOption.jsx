import axios from "axios";
import dayjs from "dayjs";

function DeliveryOption({deliveryOption, priceString, cartItem, getCartData}) {
    const updateDeliveryOption = async()=>{
        await axios.put(`/api/cart-items/${cartItem.productId}`,{
            deliveryOptionId: deliveryOption.id
        })

        await getCartData();
    }
    return (
        <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
            <input type="radio" className="delivery-option-input"
                checked={deliveryOption.id === cartItem.deliveryOptionId}
                onChange={()=>{}}
                name={`delivery-option-${cartItem.productId}`} />
            <div>
                <div className="delivery-option-date">
                    {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                </div>
                <div className="delivery-option-price">
                    {priceString}
                </div>
            </div>
        </div>
    );
}

export default DeliveryOption;