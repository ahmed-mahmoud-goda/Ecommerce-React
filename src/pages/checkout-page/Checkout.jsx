import { Link } from 'react-router';
import axios from 'axios';
import './checkout.css'
import './checkout-header.css'
import { useEffect, useState } from 'react';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';


function Checkout({ cart }) {

    const [deliveryOptions, setdeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState([]);
    useEffect(() => {
        const getCheckoutData = async ()=>{
            let res = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
            setdeliveryOptions(res.data);
            res = await axios.get("/api/payment-summary");
            setPaymentSummary(res.data);
        }
        getCheckoutData();
    }, [])

    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link"
                            to="/">3 items</Link>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}

export default Checkout;