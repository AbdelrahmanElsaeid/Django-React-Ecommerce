import React, {useEffect,useState} from 'react'
import apiInstance from '../../utils/axioxs'
import { useParams,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { SERVER_URL } from '../../utils/constants'
import UserData from '../plugin/UserData'
import CartID from '../plugin/CartID'


function Checkout() {

    const [order, setOrder] = useState([])
    const [couponCode, setCouponCode]= useState("")
    const [paymentLoading , setPaymentLoading]= useState(false)
    const userData = UserData()
    const cart_id = CartID()

    const param = useParams()

    const fetchOrderData = () => {
      apiInstance.get(`checkout/${param.order_oid}/`).then((res) => {
        //console.log (res.data)
        setOrder(res.data)
    })

    }

    useEffect(() => {
      fetchOrderData()
        
    },[])



      const applyCoupon = async () => {
        const formdata = new FormData()

        formdata.append("coupon_code", couponCode)
        formdata.append("order_oid", order.oid)

        try {
          const response = await apiInstance.post(`coupon/`, formdata)
          console.log (response.data.message)
          Swal.fire({
            icon: response.data.icon,
            title: response.data.message
          })
          fetchOrderData()
        
          
        } catch (error) {

          console.log(error)
          
        }



        

      }

    const payWithStripe = (event) => {
      setPaymentLoading(true)
      event.target.form.submit()
    }

  return (
    <main>
        <main className="mb-4 mt-4">
            <div className="container">
                <section className="">
                    <div className="row gx-lg-5">
                        <div className="col-lg-8 mb-4 mb-md-0">
                            <section className="">
                                <div className="alert alert-warning">
                                    <strong>Review Your Shipping &amp; Order Details </strong>
                                </div>
                                <form>
                      <h5 className="mb-4 mt-4">Shipping address</h5>
                      {/* 2 column grid layout with text inputs for the first and last names */}
                      <div className="row mb-4">

                        <div className="col-lg-12">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Full Name</label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.full_name}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Email</label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.email}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Mobile</label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.mobile}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Address</label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.address}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">City</label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.city}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">State</label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.state}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="form6Example2">Country</label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.country}
                            />
                          </div>
                        </div>
                      </div>


                      <h5 className="mb-4 mt-4">Billing address</h5>
                      <div className="form-check mb-2">
                        <input className="form-check-input me-2" type="checkbox" defaultValue="" id="form6Example8" defaultChecked="" />
                        <label className="form-check-label" htmlFor="form6Example8">
                          Same as shipping address
                        </label>
                      </div>
                    </form>
                            </section>
                            {/* Section: Biling details */}
                        </div>
                        <div className="col-lg-4 mb-4 mb-md-0">
                            {/* Section: Summary */}
                            <section className="shadow-4 p-4 rounded-5 mb-4">
                            <h5 className="mb-3">Cart Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                            <span>Subtotal </span>
                            <span>${order.sub_total}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                            <span>Shipping </span>
                            <span>${order.shipping_amount}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                            <span>Tax </span>
                            <span>${order.tax_fee}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                            <span>Servive Fee </span>
                            <span>${order.service_fee}</span>
                            </div>
                            {order.saved !== "0.00" &&
                            <div className="d-flex text-danger fw-bold justify-content-between">
                            <span>Discount </span>
                            <span>-${order.saved}</span>
                            </div>
                            }
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between fw-bold mb-5">
                            <span>Total </span>
                            <span>${order.total}</span>
                            </div>

                                <div className="shadow p-3 d-flex mt-4 mb-4">
                                    <input onChange={(e) => setCouponCode(e.target.value)}  name="couponCode" type="text" className='form-control' style={{ border: "dashed 1px gray" }} placeholder='Enter Coupon Code' id="" />
                                    <button onClick={applyCoupon} className='btn btn-success ms-1'><i className='fas fa-check-circle'></i></button>
                                </div>

                                {/* {paymentLoading === true &&

                                    <form action={`${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/`} method='POST'>
                                        <button onClick={payWithStripe} disabled type="submit" className="btn btn-primary btn-rounded w-100 mt-2" style={{ backgroundColor: "#635BFF" }}>
                                          Processing... <i className='fas fa-spinner fa spin'></i></button>
                                    </form>
                                } */}

                                {/* {paymentLoading === false && */}

                                    <form action={`${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/${cart_id}/`} method='POST' >
                                        <button onClick={payWithStripe} type="submit" className="btn btn-primary btn-rounded w-100 mt-2" style={{ backgroundColor: "#635BFF" }}>
                                          Pay With Stripe<i className='fas fa-credit-card'></i></button>
                                    </form>
                                {/* } */}

                               

                                {/* <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Flutterwave)</button>
                                <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Paystack)</button>
                                <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Paypal)</button> */}
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </main>
  )
}

export default Checkout