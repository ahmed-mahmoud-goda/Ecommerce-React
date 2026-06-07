import axios from 'axios';
import { useState, useEffect } from 'react';
import './orders.css'
import Header from '../../components/header/Header';
import dayjs from 'dayjs';
import OrderProduct from './OrderProduct';

function Orders({ cart, getCartData}) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
        const getOrdersData = async ()=>{
            const res = await axios.get("/api/orders?expand=products");
            setOrders(res.data);
        }
        getOrdersData();
  }, [])

  return (
    <>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    {
                      return (
                        <OrderProduct key={orderProduct.product.id} getCartData={getCartData} order={order} orderProduct={orderProduct} />
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
}

export default Orders