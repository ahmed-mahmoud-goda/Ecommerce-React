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

  const getCartData = async () => {
      const res = await axios.get("/api/cart-items?expand=product");
      setCart(res.data);
    }

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then(res => setCart(res.data));
  }, [])

  return (
    <Routes>
      <Route index element={<Home cart={cart} getCartData={getCartData}/>} />
      <Route path='checkout' element={<Checkout cart={cart} getCartData={getCartData} />} />
      <Route path='orders' element={<Orders cart={cart} getCartData={getCartData} />} />
      <Route path='tracking/:orderId/:productId' element={<Tracking cart={cart} />} />
    </Routes>
  )
}

export default App
