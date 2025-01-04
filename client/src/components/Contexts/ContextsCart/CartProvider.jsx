import { useState, createContext } from "react";

export const CartContext = createContext([])
export const SetCartContext = createContext(null)

export default function CartProvider ({children}) {

    const [cart, setCart] = useState([])

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