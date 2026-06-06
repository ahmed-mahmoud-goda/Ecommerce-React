import { Routes, Route } from 'react-router'
import Home from './pages/home-page/Home'
import './App.css'
import Checkout from './pages/checkout-page/Checkout'
import Orders from './pages/orders-page/Orders'
import Tracking from './pages/tracking-page/tracking'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCartData = async () => {
      const res = await axios.get("/api/cart-items?expand=product");
      setCart(res.data);
    }
    getCartData();
  }, [])

  return (
    <Routes>
      <Route index element={<Home cart={cart} />} />
      <Route path='checkout' element={<Checkout cart={cart} />} />
      <Route path='orders' element={<Orders cart={cart} />} />
      <Route path='tracking/:orderId/:productId' element={<Tracking cart={cart} />} />
    </Routes>
  )
}

export default App
