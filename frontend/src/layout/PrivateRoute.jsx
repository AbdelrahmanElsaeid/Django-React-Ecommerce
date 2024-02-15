import { Navigate } from 'react-router-done'
import { useAuthStore } from '../store/auth'

const PrivateRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn)()
    return loggedIn ? <>{children}</> : <Navigate tos={'/login'} />
}

export default PrivateRoute