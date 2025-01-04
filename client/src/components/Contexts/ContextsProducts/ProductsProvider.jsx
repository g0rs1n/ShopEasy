import { useState, useEffect, createContext, useContext } from "react"
import { SetIsLoadingContext } from "../ContextsIsLoading/IsLoadingProvider"
import axios from "axios"

export const ProductsContext = createContext([])
export const SetProductsContext = createContext(null)

export default function ProductsProvider ({children}) {

    const setIsLoading = useContext(SetIsLoadingContext)
    const [products, setProducts] = useState([])

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