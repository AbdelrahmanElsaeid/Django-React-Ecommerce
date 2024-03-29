import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgetPassword from './views/auth/ForgetPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoreFooter from './views/base/StoreFooter'
import StoredHeader from './views/base/StoredHeader'
import Products from './views/store/Products'
import ProductDetail from './views/store/ProductDetail'
import Cart from './views/store/Cart'
import Checkout from './views/store/Checkout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <StoredHeader />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
      <Route path='/create-new-password' element={<CreatePassword />} />
      <Route path='/dashboard' element={<Dashboard />} />


      <Route path='/' element={<Products />} />
      <Route path='/product-detail/:slug' element={<ProductDetail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout/:order_oid/' element={<Checkout />} />

    </Routes>

    <StoreFooter />
    </BrowserRouter>
      
    
  )
}

export default App
