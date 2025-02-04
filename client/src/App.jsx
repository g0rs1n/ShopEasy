import { useState, useEffect, useContext } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/ClientVer/Headers/Header"
import ClientVerApp from "./ClientVerApp"
import { SetCartContext } from "./components/Contexts/ContextsCart/CartProvider"
import UserDataProvider from "./components/Contexts/ContextsUserData/ContextsUserData"
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
import Main from "./components/Main/Main"
import UserPanel from "./components/UserVer/UserPanel/UserPanel"
import { SetProductsContext, SetCategoryContext } from "./components/Contexts/ContextsProducts/ProductsProvider"
import { SetIsLoadingContext } from "./components/Contexts/ContextsIsLoading/IsLoadingProvider"
import axios from "axios"

export default function App () {

    const location = useLocation()
    const setCart = useContext(SetCartContext)
    const setProducts = useContext(SetProductsContext)
    const setCategory = useContext(SetCategoryContext)
    const setIsLoading = useContext(SetIsLoadingContext)

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

    useEffect(() => {
        const funcGetProducts = async () => {
            try {
                
                const productsResponse = await axios.get('https://fakestoreapi.com/products')
                const categoriesResponse = await axios.get('https://fakestoreapi.com/products/categories')

                if (productsResponse.status === 200 && categoriesResponse.status === 200) {
                    setProducts(productsResponse.data)
                    setCategory(prevCategory => {
                        const uniqueCategories = [...new Set([...prevCategory,...categoriesResponse.data])]
                        return uniqueCategories;
                    })
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

    return (
        <>
            <UserDataProvider>
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
                                <Route index element={<Main/>}/>
                                <Route path="user/:username" element={<UserPanel/>}/>
                                <Route path="item/:id/:title" element={<ProductItem/>}/>
                                <Route path="cart" element={<Cart/>}/>
                                <Route path="order" element={<Order/>}>
                                    <Route index element={<Navigate to="information" replace/>}/>
                                    <Route path="information" element={<Information/>}/>
                                    <Route path="payment" element={<Payment/>}/>
                                    <Route path="confirmation" element={<Confirmation/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </div> 
                </ModalsMain>    
            </UserDataProvider>  
        </>
    )
}