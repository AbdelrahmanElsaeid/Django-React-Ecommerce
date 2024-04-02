import { useEffect, useState } from 'react'
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
import PaymentSuccess from './views/store/PaymentSuccess'
import Search from './views/store/Search'
import { CartContext } from './views/plugin/Context'
import CartID from './views/plugin/CartID'
import UserData from './views/plugin/UserData'
import apiInstance from './utils/axioxs'
import Account from './views/customer/Account'
import PrivateRoute from './layout/PrivateRoute'
import MainWrapper from './layout/MainWrapper'
import Orders from './views/customer/Orders'
import OrederDetail from './views/customer/OrederDetail'



function App() {
  const [count, setCount] = useState(0)
  const [cartCount, setCartCount] = useState()

  const cart_id = CartID()
  const userData = UserData()

  useEffect(() => {
    const url = userData ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`
        apiInstance.get(url).then((res) => {
          console.log(res.data)
          setCartCount(res.data.length)

        })
            

  })


  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
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
        <Route path='/payment-success/:order_oid/' element={<PaymentSuccess />} />
        <Route path='/search/' element={<Search />} />

        <Route path='/customer/account/' element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path='/customer/order/' element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path='/customer/order/:order_oid/' element={<PrivateRoute><OrederDetail /></PrivateRoute>} />

      </Routes>

    <StoreFooter />
    </BrowserRouter>
    </CartContext.Provider>
      
    
  )
}

export default App
