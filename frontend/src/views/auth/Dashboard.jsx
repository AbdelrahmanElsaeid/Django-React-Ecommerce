// import React from 'react'
// import { useAuthStore } from '../../store/auth'
// import { Link } from 'react-router-dom' 

// function Dashboard ()  {
//     const [isLoggedIn, setIsLoggedIn] = useAuthStore( (state) => [
//         state.isLoggedIn,
//         state.user
//     ])
//   return (
//     <>
//         {isLoggedIn()
//             ? <div>
//                 <h1>Dashboard</h1>
//                 <Link to={`/logout`}>Logout</Link> 
//             </div> 
//             : <div>
//                 <h1>Home Page</h1>
//                 <Link className='btn btn-primary' to={'/register'}>Register</Link> <br />
//                 <Link className='btn btn-primary' to={'/login'}>Login</Link>
//              </div> 
        
//         }
        
//     </>
//   )
// }

// export default Dashboard