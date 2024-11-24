import { useState, useEffect, useContext } from 'react'
import { CartContext, SetCartContext, ProductsContext } from '../Contexts'
import './Cart.scss'

export default function Cart () {

    const products = useContext(ProductsContext)
    const cart = useContext(CartContext)
    const setCart = useContext(SetCartContext)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    

    useEffect(() => {

        if (!cart || !products || cart.length === 0 || products.length === 0) {
            setFilteredProducts([]);
            return;
        }
        console.log(products)
        console.log(cart)
        const filteredProducts = cart.map(({id, quantity}) => {
            const product = products.find(product => product.id === id)
            return product ? {...product, quantity} : null
        })
        
        const totalSum = filteredProducts.reduce((sum, product) => product ? sum + product.price : sum ,0)
        setFilteredProducts(filteredProducts)
        setTotalPrice(totalSum.toFixed(2))

    }, [cart, products]) 
    
    return (
        <>
            
        </>
    )
}

function CartItem () {
    return (
        <>
        
        </>
    )
}