import { useState, useEffect, createContext } from "react";

export const CartContext = createContext([])
export const SetCartContext = createContext(null)

export default function CartProvider ({children}) {

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
                    {children}
                </SetCartContext.Provider>
            </CartContext.Provider>
        </>
    )
}