import React, {useEffect, useState} from 'react'
import { login, register } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

function Register() {

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    useEffect(() => {
        if(isLoggedIn()){
            navigate('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const {error} = await register(
            fullname,
            email,
            mobile,
            password,
            password2,
        )
        if (error) {
            alert(JSON.stringify(error))
        } else {
            navigate('/')
        }
    }


  return (
    <>
    <div>Register</div>
    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="" 
        id="" 
        placeholder='Full Name'
        onChange={(e) => setFullname(e.target.value)}
         />
        <br />
        <input 
        type="email" 
        name="" 
        id="" 
        placeholder='Email' 
        onChange={(e) => setEmail(e.target.value)}
        />
        <br />
    <input 
        type="number" 
        name="" 
        id="" 
        placeholder='Mobile Number' 
        onChange={(e) => setMobile(e.target.value)}
        />
    <br />
    <input 
        type="password" 
        name="" 
        id="" 
        placeholder='Enter Password' 
        onChange={(e) => setPassword(e.target.value)}
        />
        <br />
    <input 
        type="password" 
        name="" 
        id="" 
        placeholder='confirm Password' 
        onChange={(e) => setPassword2(e.target.value)}
        />
        <br />

        <button type='submit'>Register</button>

    </form>
    </>
  )
}

export default Register