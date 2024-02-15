import { useAuthStore } from "../store/auth"
import axios from "axios"
import jwt_decode from 'jwt-decode'
import Cookies from "js-cookie"



export const login = async (email, password) => {
    try {
        const { data, status } = await axios.post("user/token/", {
            email,
            password
        })
        if (status === 200){
            setAuthUser(data.access, data.refresh)
        }
        return { data, error:null }
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'Something went wrong'
        };
}
}


export const register = async (full_name, email, phone, password, password2) => {
    try {
        const { data } = await axios.post('user/register/', {
            full_name,
            email,
            phone,
            password,
            password2
        })
        await login(email, password)

        // Alert = signed up successsfully

        return { data, error: null }
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || "Something went wrong"
        };
    }
}

export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    useAuthStore.getState().setUser(null)

    // Alert Signed Out Success
}

export const setUser = async () => {
    const accessToken = Cookies.get("access_token")
    const refereshToken = Cookies.get("refresh_token")

    if (!accessToken || !refereshToken) {
        return;
    }
    if (isAccessTokenExpired(accessToken)){
        const response = await getRefreshToken(refereshToken)
        setAuthUser(response.access, response.referesh)
    } else {
        setAuthUser(accessToken, refereshToken)
    }
}


export const setAuthUser = (access_token, referesh_token) => {
    Cookies.set('access_token', access_token,{
        expires: 1,
        secure: true
    })
    Cookies.set('refresh_token', referesh_token,{
        expires: 7,
        secure: true
    })

    const user = jwt_decode(access_token) ?? null
    if (user) {
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false)
}


export const getRefreshToken = async () => {
    const referesh_token = Cookies.get("refresh_token")
    const response = await axios.post('user/token/refresh',{
        refresh: referesh_token
    })

    return response.data
}

export const isAccessTokenExpired = async (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken)
        return decodedToken.exp < Date.now() / 100
    } catch (error) {
        console.log(error);
        return true
    }
}