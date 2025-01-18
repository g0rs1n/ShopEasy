import { useState, createContext } from "react"

export const ProductsContext = createContext([])
export const SetProductsContext = createContext(null)
export const CategoryContext = createContext(null)
export const SetCategoryContext = createContext(null)

export default function ProductsProvider ({children}) {

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(['All'])

    return (
        <>
            <ProductsContext.Provider value={products}>
                <SetProductsContext.Provider value={setProducts}>
                    <CategoryContext.Provider value={category}>
                        <SetCategoryContext.Provider value={setCategory}>
                            {children}
                        </SetCategoryContext.Provider>
                    </CategoryContext.Provider>
                </SetProductsContext.Provider>
            </ProductsContext.Provider>
        </>
    )
}