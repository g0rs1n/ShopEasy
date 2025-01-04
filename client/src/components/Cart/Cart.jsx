import { useState, useEffect, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { CartContext, SetCartContext } from '../Contexts/ContextsCart/CartProvider'
import { ProductsContext } from '../Contexts/ContextsProducts/ProductsProvider'
import { IsLoadingContext } from '../Contexts/ContextsIsLoading/IsLoadingProvider'
import iconLoading from '../../assets/img/icons/loading/loading.png'
import iconDelete from '../../assets/img/icons/cart/delete.png'
import arrowPrev from '../../assets/img/icons/cart/arrow-prev.png'
import './Cart.scss'

export default function Cart () {

    const products = useContext(ProductsContext)
    const cart = useContext(CartContext)
    const isLoading = useContext(IsLoadingContext)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    

    useEffect(() => {

        if (!cart || !products || cart.length === 0 || products.length === 0) {
            setFilteredProducts([]);
            return;
        }
        const filteredProducts = cart.map(({id, quantity}) => {
            const product = products.find(product => product.id === id)
            return product ? {...product, quantity} : null
        })
        
        const totalSum = filteredProducts.reduce((sum, product) => product ? (sum + (product.price * product.quantity)) : sum ,0)
        setFilteredProducts(filteredProducts)
        setTotalPrice(totalSum.toFixed(2))

    }, [cart, products]) 
    
    return (
        <>
            <div className='wrapper-cart'>
                {
                    isLoading ? 
                    <>
                        <div className='wrapper-loading-page'>
                            <div className='loading-page'>
                                <img className='loading-page__img' src={iconLoading} alt="loading" />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='cart'>
                            <CartList 
                                filteredProducts={filteredProducts}
                                setTotalPrice={setTotalPrice}
                            />
                            <CartTotalPrice 
                                totalPrice={totalPrice}
                                filteredProducts={filteredProducts}
                            />
                        </div>
                    </>
                }
            </div>
        </>
    )
}

function CartList ({filteredProducts, setTotalPrice}) {

    const cart = useContext(CartContext)
    const setCart = useContext(SetCartContext)

    const handleDeleteAll = () => {
        if (cart.length != 0) {
            localStorage.removeItem('cart')
            localStorage.removeItem('cartTimeStamp')
            setCart([])
            setTotalPrice(0)
        }
    }

    const navigate = useNavigate()

    const handleArrowPrev = () => {
        navigate('/')
    }

    return (
        <>
            <div className="wrapper-cart-list">
                <div className='cart-list-title'>
                    <div onClick={handleArrowPrev} className='cart-list-link'>
                        <img className='cart-list-link__img' src={arrowPrev} alt="prev-page" />
                    </div>
                    <h3 className='cart-list-title__h3'>
                        Your Cart
                    </h3>
                </div>
                {
                    filteredProducts.length === 0 ? 
                    <>
                        <CartNone/>
                    </>
                    :
                    <>
                        <div className='cart-list'>
                            <div className='wrapper-cart-list-remove'>
                                <div className='cart-list-remove'>
                                    <img className='cart-list-remove__img' src={iconDelete} alt="delete" />
                                    <h3 onClick={handleDeleteAll} className='cart-list-remove__h3'>
                                        Delete All
                                    </h3>
                                </div>
                            </div>
                            <div className='wrapper-cart-items'>
                                {
                                    filteredProducts.map((product) => {
                                        return (
                                            <CartItem 
                                                key={product.id}
                                                product = {product}
                                                filteredProducts={filteredProducts}
                                                setTotalPrice={setTotalPrice}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

function CartItem ({product, filteredProducts, setTotalPrice}) {

    const setCart = useContext(SetCartContext)

    const updateCart = (updatedCart) => {
        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        const newTotalPrice = updatedCart.reduce((sum, product) => product ? (sum + (product.price * product.quantity)) : sum ,0)
        setTotalPrice(newTotalPrice.toFixed(2))
        if (!localStorage.getItem('cartTimeStamp')) {
            const currentTime = Date.now()
            localStorage.setItem('cartTimeStamp', currentTime.toString())
        }
    }

    const handleCounterMinus = () => {
        const updatedCart = filteredProducts.map((item) => {
            return item.id === product.id ? {...item, quantity: Math.max(0,item.quantity - 1)} : item
        })
        updateCart(updatedCart)
    }
    const handleCounterPlus = () => {
        const updatedCart = filteredProducts.map((item) => {
            return item.id === product.id ? {...item, quantity: Math.min(999,item.quantity + 1)} : item
        })
        updateCart(updatedCart)
    }
    const handleDelete = (product) => {
        const updatedCart = filteredProducts.filter(item => item.id !== product.id)
        updateCart(updatedCart)
    }

    return (
        <>
            <div className='wrapper-cart-item'>
                <div className='cart-item-image'>
                    <img className='cart-item-image__img' src={product.image} alt="product-img" />
                </div>
                <div className='cart-item'>
                    <div className='cart-item-title'>
                        <Link to={`/item/${product.id}/${encodeURIComponent(product.title)}`} className='cart-item-title__link'>
                            {product.title}
                        </Link>
                        <h3 className='cart-item-title__h3'>
                            {product.price}
                        </h3>
                    </div>
                    <div className='cart-item-buttons'>
                        <div className='cart-button-delete'>
                            <img className='cart-button-delete__img' src={iconDelete} alt="delete" />
                            <h3 onClick={() => handleDelete(product)} className='cart-button-delete__h3'>
                                Delete
                            </h3>
                        </div>
                        <div className='cart-button-counter'>
                            <div onClick={handleCounterMinus} className='cart-counter-change'>
                                <span className='cart-counter-change__span'>-</span>
                            </div>
                            <div className='cart-counter'>
                                {product.quantity}
                            </div>
                            <div onClick={handleCounterPlus} className='cart-counter-change'>
                                <span className='cart-counter-change__span'>+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function CartTotalPrice ({totalPrice, filteredProducts}) {
    return (
        <>
            <div className="wrapper-cart-totalPrice">
                <div className='cart-totalPrice'>
                    {
                        filteredProducts.length === 0 ? 
                        <>
                            <div className='totalPrice-button-none'>
                                <p className='totalPrice-button-none__h3'>
                                    Nothing here... yet
                                </p>
                            </div>
                        </>
                        :
                        <>
                            <div className='totalPrice-button'>
                                <Link to={'/order'} className='totalPrice-button__link'>
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </>
                    }
                    <div className='totalPrice-information'>
                        <p className='totalPrice-information__p'>
                            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} for a total of
                        </p>
                        <span className='totalPrice-information__span'>{totalPrice}</span>
                    </div>
                    <div className='totalPrice-price'>
                        <h3 className='totalPrice-price__h3'>
                            Total price
                        </h3>
                        <span className='totalPrice-price__span'>{totalPrice}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

function CartNone () {
    return (
        <>
            <div className='wrapper-cart-none'>
                <div className='cart-none'>
                    <h3 className='cart-none__h3'>
                        Your cart is empty
                    </h3>
                </div>
            </div>
        </>
    )
}