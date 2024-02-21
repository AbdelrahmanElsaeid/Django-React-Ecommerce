import React from 'react'
import { useState } from 'react'
import apiInstance from '../../utils/axioxs'
import { useNavigate } from 'react-router-dom'

function ForgetPassword() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async() => {
        try {
            await apiInstance.get(`user/password-reset/${email}/`).then((res) =>{
                alert("An Email Has been Sent To You")
                // navigate("/create-new-password")

            })

        } catch (error) {
            alert("Email Does Not Exists")
        }
       
    }
  return (
    <div>
        <h1>ForgetPassword</h1>
        <input 
        onChange={(e) => setEmail(e.target.value)}
         type="email" placeholder='Enter Email' name='' id='' />
        <br />
        <br />
        <button onClick={handleSubmit}>Rest Password</button>

    </div>
  )
}

export default ForgetPassword