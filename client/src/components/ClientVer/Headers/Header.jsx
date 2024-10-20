import { useState } from 'react'
import {Link} from 'react-router-dom'
import './Header.scss'
import iconCart from '../../../assets/img/icons/header/cart.png'
import logo from '../../../assets/img/icons/logo/logo.png'

export default function Header ({cartCounter, setCartCounter}) {

    return (
        <>
             <header className="header">
                <div className="container">
                    <div className="header__row">
                        <div className="logo">
                            <Link to={'/'} className="logo-link">
                                <img className="logo-img" src={logo}  alt="logo" />
                                <h3 className='logo-title__h3'>
                                    ShopEasy
                                </h3>
                            </Link>
                        </div>
                        <div className='wrapper-header-main'>
                            <div className='header-cart'>
                                <img className='header-cart__img' src={iconCart} alt="img_cart" />
                                <p className='header-cart__p'>{cartCounter}</p>
                            </div>
                            <div className="header-button">
                                <Link className="header-button__login" to={'/login'} >Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}