import React,{useState, useEffect} from 'react'
import apiInstance from '../../utils/axioxs'
import UserData from '../plugin/UserData'
import { Link, useNavigate } from 'react-router-dom'


function Sidebar() {

    const [profile, setProfile] = useState({})

    const userData = UserData()

    useEffect(() => {
        apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
            setProfile(res.data)
            console.log(res.data)
        })
    },[])




  return (
    <div className="col-lg-3">
          <div className="d-flex justify-content-center align-items-center flex-column mb-4 shadow rounded-3">
            <img
              src={profile.image}
              style={{ width: 120, height: 120, objectFit:"cover", borderRadius:"50%" }}
              alt=""
            />
            <div className="text-center">
              <h3 className="mb-0">{profile.full_name}</h3>
              <p className="mt-0">
                <a href="">Edit Account</a>
              </p>
            </div>
          </div>
          <ol className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  <Link to='/customer/account/' className="text-dark">Account</Link>
</div>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                <Link to='/customer/order/' className="text-dark">Orders</Link>
                </div>
              </div>
              <span className="badge bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                <Link to='/customer/wishlist/' className="text-dark"> Wishlist</Link>
                </div>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                <Link to='/customer/notifications/' className="text-dark"> Notification</Link>
                </div>
              </div>
              <span className="badge bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                <Link to='/customer/settings/' className="text-dark"> Setting</Link>
                  </div>
              </div>
            </li>
          </ol>
        </div>
  )
}

export default Sidebar