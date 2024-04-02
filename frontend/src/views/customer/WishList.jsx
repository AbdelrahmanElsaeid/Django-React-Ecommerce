import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axioxs'
import UserData from '../plugin/UserData'
import moment from "moment"
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


const Toast = Swal.mixin({
  toast:"true",
  position:"top",
  showConfirmButton: false,
  timer: 1500,

  timerProgressBar: false
})



function WishList() {

    const [wishlist, setWishlist] = useState([])
    const userData = UserData()


    const fetchDataWishList = async () =>{

        await apiInstance.get(`customer/wishlist/${userData?.user_id}/`).then((res) => {
            setWishlist(res.data)
            console.log("wish is ", wishlist)
        })

    }
    useEffect(() => {
        fetchDataWishList()
    },[])


    
  const addToWishlist = async (productId, userId) => {
    try {
      const formdata = new FormData()

      formdata.append("product_id", productId)
      formdata.append("user_id", userId)

      const response = await apiInstance.post(`customer/wishlist/${userId}/`, formdata)

      console.log(response.data)
      Toast.fire({
        icon: "success",
        title: response.data.message
      })
      fetchDataWishList()
      
    } catch (error) {
      console.log(error)
    }
    
}


    



  return (
    <main className="mt-5">
    <div className="container">
        <section className="">
            <div className="row">
                {/* Sidebar Here */}
                <Sidebar/>


                <div className="col-lg-9 mt-1">
                    <section className="">
                        <main className="mb-5" style={{}}>
                            <div className="container">
                                <section className="">
                                    <div className="row">
                                        <h3 className="mb-3">
                                            <i className="fas fa-heart text-danger" /> Wishlist
                                        </h3>
                                        {wishlist?.map((p, index) => (
                                            <div className="col-lg-4 col-md-12 mb-4" key={index}>
                                                <div className="card">
                                                <div
                                                    className="bg-image hover-zoom ripple"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    <img
                                                    src={p.product.image}
                                                    style={{width:"100%", height:"250px", objectFit:"cover"}}
                                                    className="w-100"
                                                    />
                                                    
                                                </div>
                                                <div className="card-body">
                                                <Link to={`/product-detail/${p.product.slug}`} className="text-center">
                                                    <h5 className="card-title mb-3">{p.product.title}</h5>
                                                </Link>
                                                    <a href="" className="text-center">
                                                    <p>{p.product.category?.title}</p>
                                                    </a>
                                                    <div className='d-flex justify-content-center'>

                                                        <h6 className="mb-3">${p.product.price}</h6>
                                                        <h6 className="mb-3 text-muted ms-2">${p.product.old_price}</h6>
                                                    </div>
                                                    <div className="btn-group">
                                                    
                                                    <button
                                                        onClick={() => addToWishlist(p.product.id, userData?.user_id)}
                                                        type="button"
                                                        className="btn btn-danger px-3 me-1 ms-2"
                                                    >
                                                        <i className="fas fa-heart" />
                                                    </button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        ))}               

                                        {wishlist.length < 1 &&
                                            <h6 className='container'>Your wishlist is Empty </h6>
                                        }

                                    </div>
                                </section>
                            </div>
                        </main>
                    </section>
                </div>
            </div>
        </section>
    </div>
</main>
  )
}

export default WishList