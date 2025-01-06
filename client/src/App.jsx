import { useState, useEffect, useContext } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/ClientVer/Headers/Header"
import ClientVerApp from "./ClientVerApp"
import { SetProductsContext } from "./components/Contexts/ContextsProducts/ProductsProvider"
import { SetIsLoadingContext } from "./components/Contexts/ContextsIsLoading/IsLoadingProvider"
import { SetCartContext } from "./components/Contexts/ContextsCart/CartProvider"
import ProductItem from "./components/ProductItem/ProductItem"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import Cart from "./components/Cart/Cart"
import ModalsMain from "./components/Modals/ModalsMain/ModalsMain"
import Order from "./components/Order/Order"
import Information from "./components/Order/Pages/Information/Information"
import Payment from './components/Order/Pages/Payment/Payment'
import Confirmation from './components/Order/Pages/Confirmation/Confirmation'
import ProtectedRouteApp from "./components/ProtectedRouteApp/ProtectedRouteApp"
import axios from "axios"

export default function App () {

    const location = useLocation()
    const setIsLoading = useContext(SetIsLoadingContext)
    const setProducts = useContext(SetProductsContext)
    const setCart = useContext(SetCartContext)

    useEffect(() => {
        const funcGetProducts = async () => {
            try {
                
                const response = await axios.get('https://fakestoreapi.com/products')

                if (response) {
                    setProducts(response.data)
                    setIsLoading(false)
                } else {
                    console.error('Error: get products api')
                }

            } catch (error) {
                console.error('Error: get products api', error)
            }
        }
        funcGetProducts()
    },[])

    useEffect(() => {
        const updatedCart = localStorage.getItem('cart')
        const cartTimeStamp = localStorage.getItem('cartTimeStamp')

        if (updatedCart && cartTimeStamp) {

            const parsedCart = JSON.parse(updatedCart)
            const currentTime = Date.now()
            const timeDifference = currentTime - Number(cartTimeStamp)
            const maxTimeCart = 24 * 60 * 60 * 1000

            if (timeDifference > maxTimeCart) {

                localStorage.removeItem('cart')
                localStorage.removeItem('cartTimeStamp')
                setCart([])

            } else {
                setCart(parsedCart)
            }

        }
    }, [])

    return (
        <>
            
                <ModalsMain>
                    <div className="wrapper">
                        {!(location.pathname == '/login' || location.pathname == '/signup' || location.pathname.startsWith('/app')) && <Header/>}
                        <Routes>
                            <Route path="/" element={<ClientVerApp/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path="/item/:id/:title" element={<ProductItem/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/order" element={<Order/>}>
                                <Route index element={<Navigate to="information" replace/>}/>
                                <Route path="information" element={<Information/>}/>
                                <Route path="payment" element={<Payment/>}/>
                                <Route path="confirmation" element={<Confirmation/>}/>
                            </Route>
                            <Route path="/app" element={<ProtectedRouteApp/>}>
                                <Route path="user/:username" />
                            </Route>
                        </Routes>
                    </div> 
                </ModalsMain>
                
        </>
    )
}