import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgetPassword from './views/auth/ForgetPassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/forget-password' element={<ForgetPassword />} />


      <Route path='/' element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
      
    
  )
}

export default App
