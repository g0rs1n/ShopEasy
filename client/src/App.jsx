import { useState, useEffect } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/ClientVer/Headers/Header"
import ClientVerApp from "./ClientVerApp"
import { CartContext, SetCartContext, ProductsContext, IsLoadingContext } from "./components/Contexts"
import ProductItem from "./components/ProductItem/ProductItem"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import Cart from "./components/Cart/Cart"
import ModalsMain from "./components/Modals/ModalsMain/ModalsMain"
import axios from "axios"

export default function App () {

    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

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
            <ProductsContext.Provider value={products}>
                <IsLoadingContext.Provider value={isLoading}>
                    <CartContext.Provider value={cart}>
                        <SetCartContext.Provider value={setCart}>
                            <ModalsMain>
                                <div className="wrapper">
                                    {!(location.pathname == '/login' || location.pathname == '/signup') && <Header/>}
                                    <Routes>
                                        <Route path="/" element={<ClientVerApp/>}/>
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/signup" element={<SignUp/>}/>
                                        <Route path="/item/:id/:title" element={<ProductItem/>}/>
                                        <Route path="/cart" element={<Cart/>}/>
                                    </Routes>
                                </div> 
                            </ModalsMain>
                        </SetCartContext.Provider>
                    </CartContext.Provider>
                </IsLoadingContext.Provider>
            </ProductsContext.Provider>
        </>
    )
}