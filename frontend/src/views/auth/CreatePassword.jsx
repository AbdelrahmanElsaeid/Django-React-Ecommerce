import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiInstance from '../../utils/axioxs'
function CreatePassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [searchParms] = useSearchParams()
    const otp = searchParms.get("otp")
    const uidb64 = searchParms.get("uidb64")
    console.log(otp)
    console.log(uidb64)
    const navigate = useNavigate()

    const handlePasswordSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("password Does Not Match") 
        } else{
            const formdata = new FormData()
            formdata.append('password',password)
            formdata.append('otp', otp)
            formdata.append('uidb64', uidb64)

            try {
                await apiInstance.post(`user/password-change/`, formdata).then((res) => {
                    console.log(res.data);
                    alert("Password Changed Successfully")
                    navigate("/login")

                })
                
            } catch (error) {
                alert("An error occured ")
                
            }
        }
    }


  return (
    <div>
        <h1>CreatePassword</h1>
        <form onSubmit={handlePasswordSubmit}>
        <input type="password"
        placeholder='Enter Password'
        name=''
        id=''
        onChange={(e) => setPassword(e.target.value)} />
        <br />
        <br />
        <input type="password"
        placeholder='Confirm New Password'
        name=''
        id=''
        onChange={(e) => setConfirmPassword(e.target.value)} />
        <br />
        <br />
        <button>Save New Password</button>
        </form>
    </div>
  )
}

export default CreatePassword
