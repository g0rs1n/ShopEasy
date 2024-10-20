import { useState } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/ClientVer/Headers/Header"
import ClientVerApp from "./ClientVerApp"
import { CartContext, SetCartContext } from "./components/Contexts"

export default function App () {

    const [productsForCart, setProductsForCart] = useState([])
    const [cart, setCart] = useState([])
    const [cartCounter, setCartCounter] = useState(0)

    return (
        <>
            <CartContext.Provider value={cart}>
                <SetCartContext.Provider value={setCart}>
                    <div className="wrapper">
                        <Header cartCounter={cartCounter} setCartCounter={setCartCounter}/>
                        <Routes>
                            <Route path="/" element={<ClientVerApp setProductsForCart={setProductsForCart}/>}/>
                        </Routes>
                    </div>
                </SetCartContext.Provider>
            </CartContext.Provider>
        </>
    )
}