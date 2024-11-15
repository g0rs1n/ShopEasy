import { useState, useEffect } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/ClientVer/Headers/Header"
import ClientVerApp from "./ClientVerApp"
import { CartContext, SetCartContext } from "./components/Contexts"
import ProductItem from "./components/ProductItem/ProductItem"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"

export default function App () {

    const location = useLocation()
    const [productsForCart, setProductsForCart] = useState([])
    const [cart, setCart] = useState([])

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
            <CartContext.Provider value={cart}>
                <SetCartContext.Provider value={setCart}>
                    <div className="wrapper">
                        {!(location.pathname == '/login' || location.pathname == '/signup') && <Header/>}
                        <Routes>
                            <Route path="/" element={<ClientVerApp setProductsForCart={setProductsForCart}/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path="/item/:id/:title" element={<ProductItem/>}/>
                        </Routes>
                    </div>
                </SetCartContext.Provider>
            </CartContext.Provider>
        </>
    )
}