import { Link } from "react-router";
import { useParams } from "react-router";
import './tracking.css'
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function Tracking({ cart }) {

    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getTrackingData = async () => {
            const res = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(res.data)
        }
        getTrackingData()

    }, [orderId])

    if (!order) {
        return null;
    }

    const productInfo = order.products.find((p) => {
        return p.productId === productId;
    });

    const orderTime = dayjs(order.orderTimeMs);
    const deliveryTime = dayjs(productInfo.estimatedDeliveryTimeMs);
    const currentTime = dayjs();


    const totalDuration = deliveryTime.diff(orderTime);
    const elapsed = currentTime.diff(orderTime);

    let progress = elapsed / totalDuration;

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    const progressPercent = progress * 100;

    return (
        <>
            <Header cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(order.orderTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {productInfo.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {productInfo.quantity}
                    </div>

                    <img className="product-image" src={productInfo.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${progress < 0.33 ? 'current-status' : ''}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${progress >= 0.33 && progress < 1 ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${progress >= 1 ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar" style={{ width: `${progressPercent}%` }}>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Tracking