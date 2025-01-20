import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {UserDataContext, SetUserDataContext} from "../../Contexts/ContextsUserData/ContextsUserData"

export default function LayoutUserInfo () {

    const userData = useContext(UserDataContext)
    const setUserData = useContext(SetUserDataContext)

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/users/me', {
                    withCredentials: true
                })
                if (response.status === 200) {
                    setUserData(response.data)
                }
            } catch (error) {
                if (error.response) {
                    const errorStatus = error.response.status
                    const errorMsg = error.response.data.error || 'Unknown error'
                    console.error(errorStatus, errorMsg)
                } else if (error.request) {
                    console.error("The request was sent, but no response was received", error.request)
                } else {
                    console.error("Error: get userData", error)
                }
            }
        }
        getUserData()
    }, [])

    return (
        <>
            <Link to={`/app/user/${userData.name ? userData.name : 'User'}`}>
                <div className="userinfo-button">
                    <div className="userinfo-name">
                        <p className="userinfo-name__p">
                            {userData.name ? userData.name : 'User'}
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
}