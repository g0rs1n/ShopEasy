import { useState, useEffect, useContext } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import arrowPrev from '../../assets/img/icons/cart/arrow-prev.png'
import {CheckIsActivePageContext, OrderDataContext, SetOrderDataContext} from '../Contexts/ContextsOrder/ContextsOrder'
import { UserDataContext } from '../Contexts/ContextsUserData/ContextsUserData'
import './Order.scss'

export const pageMapping = {
    'information': {pages1: true, pages2: false, pages3: false},
    'payment' : {pages1: true, pages2: true, pages3: false},
    'confirmation' : {pages1: true, pages2: true, pages3: true},
}

export default function Order () {

    const navigate = useNavigate()
    const location = useLocation()
    const [activePages, setActivePages] = useState({
        pages1: true,
        pages2: false,
        pages3: false,
    })
    const [orderData, setOrderData] = useState({})
    const userData = useContext(UserDataContext)

    const checkIsActivePage = () => {
        const path = location.pathname.split('/').pop()
        if (pageMapping[path]){
            setActivePages((prevState) => ({
                ...prevState,
                ...pageMapping[path]
            }))
        }
    }

    const handleClickOnPage = (page) => {
        const basePath = Object.keys(userData).length === 0 ? '/order' : '/app/order'
        navigate(`${basePath}/${page}`)
        setActivePages((prevState) => ({
            ...prevState,
            ...pageMapping[page]
        }))
    }
   
    const handleArrowPrev = () => {
        navigate(`${Object.keys(userData).length === 0 ? '/cart' : '/app/cart'}`)
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
                                <div onClick={() => handleClickOnPage('information')} className={`header-statistics-step ${activePages.pages1 ? 'statistics-active-step' : ''}`}>
                                    <span className='header-statistics-step__span'>1</span>
                                </div>
                                <div className={`header-statistics-line ${activePages.pages2 ? 'statistics-active-line' : ''}`}></div>
                                <div onClick={() => handleClickOnPage('payment')} className={`header-statistics-step ${activePages.pages2 ? 'statistics-active-step' : ''}`}>
                                    <span className='header-statistics-step__span'>2</span>
                                </div>
                                <div className={`header-statistics-line ${activePages.pages3 ? 'statistics-active-line' : ''}`}></div>
                                <div onClick={() => handleClickOnPage('confirmation')} className={`header-statistics-step ${activePages.pages3 ? 'statistics-active-step' : ''}`}>
                                    <span className='header-statistics-step__span'>3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pages'>
                        <OrderDataContext.Provider value={orderData}>
                            <SetOrderDataContext.Provider value={setOrderData}>
                                <CheckIsActivePageContext.Provider value={checkIsActivePage}>
                                    <Outlet/>  
                                </CheckIsActivePageContext.Provider>
                            </SetOrderDataContext.Provider>
                        </OrderDataContext.Provider>
                    </div>
                </div>
            </div>
        </>
    )
}