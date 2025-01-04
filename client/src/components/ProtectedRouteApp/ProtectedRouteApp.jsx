import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import UserVerApp from "../../UserVerApp"
import iconLoading from '../../assets/img/icons/loading/loading.png'
import './ProtectedRouteApp.scss'

export default function ProtectedRouteApp () {

    const navigate = useNavigate()
    const [authStatus, setAuthStatus] = useState({
        errorLogin: null,
        isLoginned: false,
        isLoading: true
    })

    useEffect(() => {
        const checkLogin = async () => {
            try {
                
                const response = await axios.get('http://localhost:5001/api/users/me', {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setAuthStatus(prevStatus => ({
                        ...prevStatus,
                        errorLogin: null,
                        isLoginned: true,
                        isLoading: false
                    }))
                } else if (response.status === 404) {
                    setAuthStatus(prevStatus => ({
                        ...prevStatus,
                        errorLogin: response.data.message,
                        isLoginned: false,
                        isLoading: false
                    }))
                } else {
                    setAuthStatus(prevStatus => ({
                        ...prevStatus,
                        errorLogin: 'Unexpected error occurred',
                        isLoginned: false,
                        isLoading: false
                    }))
                }

            } catch (error) {
                setAuthStatus(prevStatus => ({
                    ...prevStatus,
                    errorLogin: error.response?.data.message || error.message,
                    isLoginned: false,
                    isLoading: false
                }))
                console.error("Error: api check login", error)
            }
        }
        checkLogin()
    },[])

    if (authStatus.isLoading) {
        return (
            <>
                <div className='wrapper-loading-page'>
                    <div className='loading-page'>
                        <img className='loading-page__img' src={iconLoading} alt="loading"/>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {authStatus.errorLogin && 
                <div className="error-block">
                    <h3 className="error-block__h3">
                        {authStatus.errorLogin}
                    </h3>
                </div>
            }
            {
                authStatus.isLoginned ? <UserVerApp/> : <Navigate to={'/login'} replace/>
            }
        </>
    )
}