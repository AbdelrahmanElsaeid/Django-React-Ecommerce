import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiInstance from '../../utils/axioxs'
import { Link } from 'react-router-dom'


function CreatePassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [searchParms] = useSearchParams()
    const otp = searchParms.get("otp")
    const uidb64 = searchParms.get("uidb64")
    console.log(otp)
    console.log(uidb64)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handlePasswordSubmit = async(e) => {
        setIsLoading(true)
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
                    setIsLoading(false)

                })
                
            } catch (error) {
                alert("An error occured ")
                setIsLoading(false)
                
            }
        }
    }


  return (
<div>
    <section>
    <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
            {/* Section: Login form */}
            <section className="">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-md-8">
                        <div className="card rounded-5">
                            <div className="card-body p-4">
                                <form onSubmit={handlePasswordSubmit}>
                                            {/* Email input */}
                                            <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="loginPassword">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="form-control"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        {/* Password input */}
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="loginPassword">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                required
                                                className="form-control"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>

                                            {isLoading ===true 

                                            ?<button disabled className='btn btn-primary w-100' >
                                            Processing.....
                                            </button>
                                            :<button  className='btn btn-primary w-100' type="submit">
                                            Save Password <i className="fas fa-check-circle" />
                                            </button>
                                            
                                            }

                                            <div className="text-center">
                                                <p>
                                                    want to sign in? <Link to="/login">Login</Link>
                                                </p>
                                                
                                            </div>
                                </form>    

                                            

                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    
            </section>
        </div>
    </main>
        </section>
    </div>
  )
}

export default CreatePassword
