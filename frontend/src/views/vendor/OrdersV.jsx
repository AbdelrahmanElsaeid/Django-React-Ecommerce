import React,{useState, useEffect} from 'react'
import apiInstance from '../../utils/axioxs'
import UserData from '../plugin/UserData'
import Sidebar from './Sidebar'
import {Line, Bar} from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { Link, useLocation } from 'react-router-dom'
import moment from "moment"


function OrdersV() {
    const [orders, setOrders] = useState([])


    useEffect(() => {
        
    
        apiInstance.get(`vendor/orders/${UserData()?.vendor_id}/`).then((res) => {
          console.log(res.data)
          
          setOrders(res.data)
        })
      
      },[])
      return (
        <div className="container-fluid" id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main">
                    <div className="mb-3 mt-3" style={{ marginBottom: 300 }}>
                        <div>
                            <h4><i class="bi bi-cart-check-fill"></i> All Orders  </h4>

                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((o, index) => (
                                        <tr key={index}>
                                            <th scope="row">#{o.oid}</th>
                                            <td>{o.full_name}</td>
                                            <td>{moment(o.date).format("MM/DD/YYYY")}</td>
                                            <td>{o.order_status}</td>
                                            <td>
                                                <Link to={`/vendor/orders/${o.oid}`} className="btn btn-primary mb-1">
                                                    <i className="fas fa-eye" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                    {orders < 1 &&
                                        <h5 className='mt-4 p-3'>No orders yet</h5>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersV