import React from 'react'
import { useState } from 'react'
import apiInstance from '../../utils/axioxs'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ForgetPassword() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async() => {
        setIsLoading(true)
        try {
            await apiInstance.get(`user/password-reset/${email}/`).then((res) =>{
                alert("An Email Has been Sent To You")
                setIsLoading(false)
                // navigate("/create-new-password")

            })

        } catch (error) {
            alert("Email Does Not Exists")
            setIsLoading(false)
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
                                <h3 className="text-center">Login</h3>
                                <br />

                                <div className="tab-content">
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-login"
                                        role="tabpanel"
                                        aria-labelledby="tab-login"
                                    >
                                            {/* Email input */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="Email">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="text"
                                                    id="Email"
                                                    name="Email"
                                                    value={email}
                                                    className="form-control"
                                                    onChange={(e) => setEmail(e.target.value)}

                                                />
                                            </div>

                                            {isLoading ===true 

                                            ?<button disabled className='btn btn-primary w-100' >
                                            Processing.....
                                            </button>
                                            :<button onClick={handleSubmit} className='btn btn-primary w-100' type="button">
                                            <i className="fas fa-paper-plane" />
                                            </button>
                                            
                                            }

                                            <div className="text-center">
                                                <p>
                                                    want to sign in? <Link to="/login">Login</Link>
                                                </p>
                                                
                                            </div>

                                            

                                            
                                    </div>
                                </div>
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

export default ForgetPassword