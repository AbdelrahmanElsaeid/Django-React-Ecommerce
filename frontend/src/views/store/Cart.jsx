import React, {useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiInstance from '../../utils/axioxs'
import UserData from '../plugin/UserData'
import CartID from '../plugin/CartID'
import Swal from 'sweetalert2'
import GetCurrentAddress from '../plugin/UserCountry'
import { CartContext } from '../plugin/Context'



const Toast = Swal.mixin({
  toast:"true",
  position:"top",
  showConfirmButton: false,
  timer: 1500,

  timerProgressBar: false
})


function Cart() {

    const [cart, setCart]= useState([])
    const [cartTotal, setCartTotal]= useState([])
    const [productQuantities, setProductQuantities] = useState('')

    const [fullname, setFullName]=useState('')
    const [email, setEmail]=useState('')
    const [mobile, setMobile]=useState('')
    const [state, setState]=useState('')
    const [address, setAddress]=useState('')
    const [country, setFCountry]=useState('')
    const [city, setCity]=useState('')


    const currentAddress = GetCurrentAddress()

    const navigate = useNavigate()


    const userData = UserData()
    const cart_id = CartID()
    const [cartCount, setCartCount] = useContext(CartContext)


    const fetchCartData = (cartId,userId) =>{

        const url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`
        apiInstance.get(url).then((res) => {
            console.log(res.data)
            setCart(res.data)
            setCartCount(res.data.length)

        })
    }




    if (cart_id !== null || cart_id !== undefined){
        if (userData !== undefined){
            useEffect(() => {
                fetchCartData(cart_id, userData?.user_id)
            },[])
        } else {
            useEffect(() => {
                fetchCartData(cart_id,null)
            },[])
        }
    }

    const fetchCartTotal = (cartId,userId) =>{

      const url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`
      apiInstance.get(url).then((res) => {
          console.log(res.data)
          setCartTotal(res.data)
      })
  }

console.log
  

  if (cart_id !== null || cart_id !== undefined){
      if (userData !== undefined){
          useEffect(() => {
              fetchCartTotal(cart_id, userData?.user_id)
          },[])
      } else {
          useEffect(() => {
              fetchCartTotal(cart_id,null)
          },[])
      }
  }

  
  useEffect(() => {
    const initialQuantites = {}
    cart.forEach((c) => {
      initialQuantites[c.product?.id] = c.qty
    })
    setProductQuantities(initialQuantites)
  }, [cart])



  const handleQuantityChange = (event,product_id) => {
    const quantity = event.target.value
    //console.log(quantity)
    //console.log(product_id)

    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product_id]:quantity

    }))
  }



  const updateCart = async (product_id,price,shipping_amount,size,color) => {
    const qtyValue = productQuantities[product_id]
    console.log(qtyValue)

    const formdata = new FormData()

    formdata.append("product_id", product_id)
    formdata.append("user_id", userData?.user_id)
    formdata.append("qty",qtyValue)
    formdata.append("price", price)
    formdata.append("shipping_amount", shipping_amount)
    formdata.append("country", currentAddress.country)
    formdata.append("size", size)
    formdata.append("color", color)
    formdata.append("cart_id", cart_id)

    const response = await apiInstance.post(`cart-view/`,formdata)
    console.log(response.data);
    fetchCartData(cart_id, userData?.user_id)
    fetchCartTotal(cart_id, userData?.user_id)

    Toast.fire({
      icon: "success",
      title: response.data.message
    })
      

    
  }



  const handleDeleteCartItem = async (item_id) => {
    console.log(item_id)
    const url = userData ?.user_id 
        ?`cart-delete/${cart_id}/${item_id}/${userData?.user_id}/` 
        : `cart-delete/${cart_id}/${item_id}/`

    try {
      await apiInstance.delete(url)
      fetchCartData(cart_id, userData?.user_id)
      fetchCartTotal(cart_id, userData?.user_id)
      Toast.fire({
        icon: "success",
        title: "Item Removed from Cart"
      })
      
    } catch (error) {
      console.log(error)
      
    }
        
      
  }



  const handleChange = (event) => {
    const {name, value} = event.target

    switch (name) {
      case 'fullname':
        setFullName(value)
        break;
      case 'email':
        setEmail(value)
        break;

      case 'mobile':
        setMobile(value)
        break;  
      case 'state':
        setState(value)
        break;
      case 'address':
        setAddress(value)
        break;
        
      case 'city':
        setCity(value)
        break;  
      
      case 'country':
      setFCountry(value)
      break; 
    
      default:
        break;
    }

  }


  const createOrder = async () => {
    if (!fullname || !email || !mobile || !address || !city || !country){
      Swal.fire({
        icon:  'warning',
        title: "Missin Fields",
        text: "All Fields are required before checkout!"
      })
    } else{

    try {
      const formdata = new FormData()

      formdata.append("full_name", fullname)
      formdata.append("user_id", userData ? userData.user_id : 0)
      formdata.append("email",email)
      formdata.append("mobile", mobile)
      formdata.append("address", address)
      formdata.append("country", country)
      formdata.append("state", state)
      formdata.append("city", city)
      formdata.append("cart_id", cart_id)
      formdata.append("cart_order_id", cart_id)

      const response = await apiInstance.post(`create-order/`,formdata)
      console.log(response.data);

      navigate(`/checkout/${response.data.order_oid}/`)
      
    } catch (error) {
      console.log(error)
      
    }

  }

  }

  return (
    <main className="mt-5">
    <div className="container">
      <main className="mb-6">
        <div className="container">
          <section className="">
            <div className="row gx-lg-5 mb-5">
              <div className="col-lg-8 mb-4 mb-md-0">
                <section className="mb-5">
                    {cart?.map((c,index) => (

                  <div className="row border-bottom mb-4" key={index}>
                    <div className="col-md-2 mb-4 mb-md-0">
                      <div
                        className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                        data-ripple-color="light"
                      >
                        <Link to=''>
                          <img
                            src={c.product?.image}
                            className="w-100"
                            alt=""
                            style={{ height: "100px", objectFit: "cover", borderRadius: "10px" }}
                          />
                        </Link>
                        <a href="#!">
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "hsla(0, 0%, 98.4%, 0.2)"
                              }}
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-8 mb-4 mb-md-0">
                      <Link to={null} className="fw-bold text-dark mb-4">{c.product?.title}</Link>
                      {c.size !== "No size" && 
                      <p className="mb-0">
                        <span className="text-muted me-2">Size:</span>
                        <span>{c.size}</span>
                      </p>
                      }
                      {c.color !== "No color" && 
                      <p className='mb-0'>
                        <span className="text-muted me-2">Color:</span>
                        <span>{c.color}</span>
                      </p>
                      }
                      <p className='mb-0'>
                        <span className="text-muted me-2">Price:</span>
                        <span>${c.price}</span>
                      </p>
                      <p className='mb-0'>
                        <span className="text-muted me-2">Stock Qty:</span>
                        <span>{c.qty}</span>
                      </p>
                      <p className='mb-0'>
                        <span className="text-muted me-2">Vendor:</span>
                        <span>Desphixs</span>
                      </p>
                      <p className="mt-3">
                        <button onClick={() =>handleDeleteCartItem(c.id)} className="btn btn-danger ">
                          <small><i className="fas fa-trash me-2" />Remove</small>
                        </button>
                      </p>
                    </div>
                    <div className="col-md-2 mb-4 mb-md-0">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="form-outline">
                          <input
                            type="number"
                            className="form-control"
                            value={productQuantities[c.product?.id] || c.qty}
                            min={1}
                            onChange={(e) => handleQuantityChange(e, c.product.id)}

                          />
                        </div>
                        <button onClick={() => updateCart(c.product.id,c.product.price,c.product.shipping_amount,c.color,c.size)} className='ms-2 btn btn-primary'><i className='fas fa-rotate-right'></i></button>
                      </div>
                      <h5 className="mb-2 mt-3 text-center"><span className="align-middle">${c.sub_total}</span></h5>
                    </div>
                  </div>
                  ))}

                  <>
                  {cart.length < 1 &&
                    <h5>Your Cart Is Empty</h5>
                    // <Link to='/'> <i className='fas fa-shopping-cart'></i> Continue Shopping</Link>
                }
                  </>

                </section>
                <div>
                  <h5 className="mb-4 mt-4">Personal Information</h5>
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="full_name"> <i className='fas fa-user'></i> Full Name</label>
                        <input
                          type="text"
                          id=""
                          name='fullname'
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-envelope'></i> Email</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='email'
                          onChange={handleChange}

                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-phone'></i> Mobile</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='mobile'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <h5 className="mb-1 mt-4">Shipping address</h5>

                  <div className="row mb-4">
                    <div className="col-lg-6 mt-3">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"> Address</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='address'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"> City</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='city'
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 mt-3">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"> State</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='state'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1"> Country</label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name='country'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 mb-md-0">
                {/* Section: Summary */}
                <section className="shadow-4 p-4 rounded-5 mb-4">
                  <h5 className="mb-3">Cart Summary</h5>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal </span>
                    <span>${cartTotal.sub_total}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Shipping </span>
                    <span>${cartTotal.shipping}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Tax </span>
                    <span>${cartTotal.tax}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Servive Fee </span>
                    <span>${cartTotal.service_fee}</span>
                  </div>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-between fw-bold mb-5">
                    <span>Total </span>
                    <span>${cartTotal.total}</span>
                  </div>
                  <button onClick={createOrder} className="btn btn-primary btn-rounded w-100" >
                    Got to checkout
                  </button>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </main>
  )
}

export default Cart