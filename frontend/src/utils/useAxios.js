import axios  from "axios"
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from "./auth" 
import Cookies from "js-cookie"
import { BASE_URL } from "./constants"

const useAxios = async () => {
    const access_token = Cookies.get("access_token")
    const refresh_token = Cookies.get("refresh_token")

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {Authorization: `Bearer ${access_token}`}
    })

    axiosInstance.interceptors.request.use(async (req) => {
        if (!isAccessTokenExpired(access_token)) {
            return req
        }
        const response = await getRefreshToken(refresh_token)
        setAuthUser(response.access, response.refresh)
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req

    })
    return axiosInstance

}

export default useAxios