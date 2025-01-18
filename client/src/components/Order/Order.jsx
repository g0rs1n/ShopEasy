import { useState, useEffect, useContext } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import arrowPrev from '../../assets/img/icons/cart/arrow-prev.png'
import {CheckIsActivePageContext} from '../Contexts/ContextsOrder/ContextsOrder'
import { UserDataContext } from '../Contexts/ContextsUserData/ContextsUserData'
import './Order.scss'

export default function Order () {

    const navigate = useNavigate()
    const location = useLocation()
    const [activePages, setActivePages] = useState({
        pages1: true,
        pages2: false,
        pages3: false,
    })
    const userData = useContext(UserDataContext)

    const checkIsActivePage = () => {
        location.pathname.endsWith('/information') ? setActivePages({...activePages, pages1: true, pages2: false, pages3: false}) : null
        location.pathname.endsWith('/payment') ? setActivePages({...activePages, pages1: true, pages2: true, pages3: false}) : null
        location.pathname.endsWith('/confirmation') ? setActivePages({...activePages, pages1: true, pages2: true, pages3: true}) : null
    }

    const handleClickToFirstPage = () => {
        navigate(`${Object.keys(userData).length === 0 ? '/order/information' : '/app/order/information'}`)
        setActivePages({...activePages, pages1: true, pages2: false, pages3: false})
    }
    const handleClickToSecondPage = () => {
        navigate(`${Object.keys(userData).length === 0 ? '/order/payment' : '/app/order/payment'}`)
        setActivePages({...activePages, pages1: true, pages2: true, pages3: false})
    }
    const handleClickToLastPage = () => {
        navigate(`${Object.keys(userData).length === 0 ? '/order/confirmation' : '/app/order/confirmation'}`)
        setActivePages({...activePages, pages1: true, pages2: true, pages3: true})
    }
    
    const handleClickNextPage = () => {
        navigate('/order/payment')
        setActivePages({...activePages, pages1: true, pages2: true, pages3: false})
    }
    const handleArrowPrev = () => {
        navigate(-1)
    }

    return (
        <>
            <div className='wrapper-order'>
                <div className='order'>
                    <div className='wrapper-order-header'>
                        <div className='order-header'>
                            <div className='order-header-title'>
                                <div onClick={handleArrowPrev} className='order-header-title-link'> 
                                    <img className='order-header-title-link__img' src={arrowPrev} alt="arrowPrev" />
                                </div>
                                <h3 className='order-header-title__h3'>
                                    Checkout - ShopEasy
                                </h3>
                            </div>
                            <div className='order-header-statistics'>
                                <div onClick={handleClickToFirstPage} className={`header-statistics-step ${activePages.pages1 ? 'statistics-active-step' : ''}`}>
                                    <span className='header-statistics-step__span'>1</span>
                                </div>
                                <div className={`header-statistics-line ${activePages.pages2 ? 'statistics-active-line' : ''}`}></div>
                                <div onClick={handleClickToSecondPage} className={`header-statistics-step ${activePages.pages2 ? 'statistics-active-step' : ''}`}>
                                    <span className='header-statistics-step__span'>2</span>
                                </div>
                                <div className={`header-statistics-line ${activePages.pages3 ? 'statistics-active-line' : ''}`}></div>
                                <div onClick={handleClickToLastPage} className={`header-statistics-step ${activePages.pages3 ? 'statistics-active-step' : ''}`}>
                                    <span className='header-statistics-step__span'>3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pages'>
                        <CheckIsActivePageContext.Provider value={checkIsActivePage}>
                            <Outlet/>  
                        </CheckIsActivePageContext.Provider>
                    </div>
                </div>
            </div>
        </>
    )
}