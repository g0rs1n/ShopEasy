import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext, SetCartContext, SetModalIsOpenContext } from '../Contexts'
import iconLoading from '../../assets/img/icons/loading/loading.png'
import axios from 'axios'
import './ProductItem.scss'

export default function ProductItem () {

    const cart = useContext(CartContext)
    const setCart = useContext(SetCartContext)
    const setModalIsOpen = useContext(SetModalIsOpenContext)
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const handleOnClickBuy = (product) => {
        const existingProduct = cart.find(prev => prev.id === product.id)
        let updatedCart;

        if (existingProduct) {
            updatedCart = cart.map(item => item.id === product.id ?
                {...item, quantity: item.quantity + 1} : item
            )
            setModalIsOpen(true)
        } else {
            updatedCart = [...cart, {id: product.id, quantity: 1}]
            setModalIsOpen(true)
        } 

        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))

        if (!localStorage.getItem('cartTimeStamp')) {
            const currentTime = Date.now()
            localStorage.setItem('cartTimeStamp', currentTime.toString())
        }
    }

    useEffect(() => {
        const funcGetProduct = async () => {
            try {
                
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`)

                if (response) {
                    setProduct({
                        ...product, 
                        ...response.data
                    })
                    setIsLoading(false)
                } else {
                    console.log('Error: get product in item')
                }

            } catch (error) {
              console.error('Error: get product in product-item', error)  
            }
        }
        funcGetProduct()
    }, [])


    return (
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
                <div className='wrapper-productItem-page'>
                    <div className="productItem-page">
                        <div className='wrapper-productItem-image-block'>
                            <div className='productItem-image-block'>
                                <img className='productItem-image-block__img' src={product.image} alt="product-image"/>
                            </div>
                        </div>
                        <div className='productItem-main-block'>
                            <div className='productItem-main-title'>
                                <h3 className='productItem-main-title__h3'>
                                    {product.title}
                                </h3>
                            </div>
                            <div className='productItem-main-price'>
                                <p className='productItem-main-price__p'>
                                    {product.price}
                                </p>
                                <p onClick={() => handleOnClickBuy(product)} className='productItem-main-price__button-buy'>
                                    Buy
                                </p>   
                            </div>
                            <div className='productItem-main-description'>
                                <h3 className='productItem-main-description__h3'>
                                    Description:
                                </h3>
                                <p className='productItem-main-description__p'>
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}