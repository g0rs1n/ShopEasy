import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.scss'

export default function Login () {

    const navigate = useNavigate()
    const {register, handleSubmit, formState} = useForm({
        mode: "onChange"
    })
    const [userData, setUserData] = useState({})

    const emailError = formState.errors.email?.message
    const passwordError = formState.errors.password?.message

    const handleOnChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async () => {
        try {
            if (formState.isValid) {
                const response = await axios.post('http://localhost:5001/api/auth/authorization', userData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if (response.status === 201) {
                    navigate('/protected-app', {
                        replace: false
                    })
                }
            }
        } catch (error) {
            if (error.response) {
                const errorStatus = error.response.status
                const errorMsg = error.response.data.error || 'Unknown error'
                console.error(errorStatus, errorMsg)
            } else if (error.request) {
                console.error("The request was sent, but no response was received", error.request)
            } else {
                console.error("Error: post loginData", error)
            }
        }
    }

    return (
        <>
            <div className='wrapper-login-page'>
                <div className='container-main'>
                    <div className='login-page'>
                        <div className='login-title'>
                            <h3 className='login-title__h3'>
                                Login to your ShopEasy account
                            </h3>
                        </div>
                        <div className='wrapper-login-form'>
                            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                                <div className='wrapper-input-sections'>
                                    <div className='wrapper-input-section'>
                                        <label className='login-form__label' htmlFor="email">Email address</label>
                                        <input name='email' type="email" id='email' className='login-form__input'
                                        {...register("email",{
                                            required: 'Invalid email type',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email type'
                                            },
                                            onChange: handleOnChange
                                        })}
                                        />
                                        {emailError && <p className='login-input-error__p'>{emailError}</p>}
                                    </div>
                                    <div className='wrapper-input-section'>
                                        <label className='login-form__label' htmlFor="password">Password</label>
                                        <input name='password' type="password" id='password' className='login-form__input'
                                        {...register("password",{
                                            required: 'This field must not be empty',
                                            onChange: handleOnChange
                                        })}
                                        />
                                        {passwordError && <p className='login-input-error__p'>{passwordError}</p>}
                                    </div>
                                </div>
                                <div className='wrapper-login-button'>
                                    <button  type='submit' className='login-form__button'>Sign in</button>
                                </div>
                            </form>
                        </div>
                        <div className='wrapper-login-footer-section'>
                            <div className='login-footer-section'>
                                <p className='login-footer-section__p'>
                                    New to ShopEasy?
                                </p>
                                <Link to={'/signup'} className='login-footer-section__link'>Create an account</Link>
                            </div>
                            <div className='login-footer-section'>
                                <p className='login-footer-section__p'>
                                    Don't want Login? 
                                </p>
                                <Link to={'/'} className='login-footer-section__link'>Return to Home Page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}