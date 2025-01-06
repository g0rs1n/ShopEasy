import { useState, createContext } from "react"

export const ProductsContext = createContext([])
export const SetProductsContext = createContext(null)

export default function ProductsProvider ({children}) {

    const [products, setProducts] = useState([])

    return (
        <>
            <ProductsContext.Provider value={products}>
                <SetProductsContext.Provider value={setProducts}>
                    {children}
                </SetProductsContext.Provider>
            </ProductsContext.Provider>
        </>
    )
}