import { useContext } from "react"
import { CartContext } from "../../Contexts/ContextsCart/CartProvider"
import { UserDataContext } from "../../Contexts/ContextsUserData/ContextsUserData"
import { Link } from "react-router-dom"
import LayoutUserInfo from "./LayoutUserInfo"
import iconCart from '../../../assets/img/icons/header/cart.png'
import logo from '../../../assets/img/icons/logo/logo.png'
import './Header.scss'

export default function HeaderUser () {

    const cart = useContext(CartContext)
    const userData = useContext(UserDataContext)

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__row">
                        <div className="logo">
                            <Link to={`${Object.keys(userData).length === 0 ? '/' : '/app'}`} className="logo-link">
                                <img className="logo-img" src={logo}  alt="logo" />
                                <h3 className='logo-title__h3'>
                                    ShopEasy
                                </h3>
                            </Link>
                        </div>
                        <div className='wrapper-header-main'>
                            <Link to={'/app/cart'} className='header-cart'>
                                <img className='header-cart__img' src={iconCart} alt="img_cart" />
                                <p className='header-cart__p'>{cart.length}</p>
                            </Link>
                            <LayoutUserInfo/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}