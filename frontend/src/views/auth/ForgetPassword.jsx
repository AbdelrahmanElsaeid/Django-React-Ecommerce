import React from 'react'
import { useState } from 'react'
import apiInstance from '../../utils/axioxs'

function ForgetPassword() {
    const [email, setEmail] = useState("")
    const handleSubmit = () => {
        apiInstance.get(`user/password-reset/${email}/`).then((res) =>{
            console.log(res.data);
        })
    }
  return (
    <div>
        <h1>ForgetPassword</h1>
        <input 
        onChange={(e) => setEmail(e.target.value)}
         type="text" placeholder='Enter Email' name='' id='' />
        <br />
        <br />
        <button onClick={handleSubmit}>Rest Password</button>

    </div>
  )
}

export default ForgetPassword