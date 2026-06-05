import { Routes, Route } from 'react-router'
import Home from './pages/home-page/Home'
import './App.css'
import Checkout from './pages/checkout-page/Checkout'
import Orders from './pages/orders-page/Orders'
import Tracking from './pages/tracking-page/tracking'

function App() {

  return (
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='orders' element={<Orders/>}/>
        <Route path='tracking' element={<Tracking/>}/>
      </Routes>
  )
}

export default App
