import React, { useEffect, useState} from 'react'
import { login } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import apiInstance from '../../utils/axioxs'
apiInstance 
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    console.log(email)
    
    useEffect(() => {
        if(isLoggedIn()){
            navigate('/')
        }
    })

    const resetForm = () => {
        setEmail("")
        setPassword("")
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const {error} = await login(email, password)
        if (error) {
            setIsLoading(false)
            alert(error)
        } else {
            navigate("/")
            resetForm()
            setIsLoading(false)
        }
        

        

    }

    // const reachgeogle = () => {
    //     const [ee, setEe] = useState()
    //     const clientID = '172043223847-j6l8j4ch6o30rkt7ffjjltj7as438hcb.apps.googleusercontent.com';
    //     const callBackURL= 'http://localhost:5173/';

    //     window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURL}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`)


    //     apiInstance.post(`dj-rest-auth/google/`).then((res) => {
    //         setEe(res.data)
    //         console.log('google', res.data)
    //     })
    // }

    const reachgeogle = () => {
        window.location.href = 'http://localhost:5173/dj-rest-auth/google/'; // Replace with your backend endpoint
      };
    



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
                                        <form  onSubmit={handleLogin}>
                                            {/* Email input */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="Full Name">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    value={email}
                                                    className="form-control"
                                                    onChange={(e) => setEmail(e.target.value)}

                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="loginPassword">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={password}
                                                    className="form-control"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            {isLoading ===true 

                                            ?<button className='btn btn-primary w-100' type="submit">
                                            <span className="mr-2">Sign In </span>
                                            <i className="fas fa-spinner fa-spin" />
                                            </button>
                                            :<button className='btn btn-primary w-100' type="submit">
                                            <span className="mr-2">Sign In </span>
                                            <i className="fas fa-sign-in-alt" />
                                            </button>
                                            
                                            }

                                            

                                            

                                            <div className="text-center">
                                                <p className='mt-4'>
                                                    Don't have an account? <Link to="/register">Register</Link>
                                                </p>
                                                <p className='mt-0'>
                                                    <Link to="/forget-password" className='text-danger'>Forgot Password?</Link>
                                                </p>
                                            </div>
                                        </form>
                                        <button className='btn btn-primary w-100' type="button" onClick={reachgeogle}>
                                            <span className="mr-2">Sign with geogle </span>
                                            <i className="fas fa-sign-in-alt" />
                                            </button>
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
 
 export default Login