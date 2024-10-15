import {Link} from 'react-router-dom'
import './Header.scss'
import logo from '../../../assets/img/icons/logo/logo.png'

export default function Header () {
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
                        <div className="header-button">
                            <Link className="header-button__login" to={'/login'} >Login</Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}