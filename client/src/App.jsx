import { useState } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/ClientVer/Headers/Header"
import ClientVerApp from "./ClientVerApp"
import { CartContext, SetCartContext } from "./components/Contexts"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"

export default function App () {

    const location = useLocation()
    const [productsForCart, setProductsForCart] = useState([])
    const [cart, setCart] = useState([])
    const [cartCounter, setCartCounter] = useState(0)

    return (
        <>
            <CartContext.Provider value={cart}>
                <SetCartContext.Provider value={setCart}>
                    <div className="wrapper">
                        {!(location.pathname == '/login' || location.pathname == '/signup') && <Header cartCounter={cartCounter} setCartCounter={setCartCounter}/>}
                        <Routes>
                            <Route path="/" element={<ClientVerApp setProductsForCart={setProductsForCart}/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                        </Routes>
                    </div>
                </SetCartContext.Provider>
            </CartContext.Provider>
        </>
    )
}