import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './ProductItem.scss'

export default function ProductItem () {

    const {id} = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        const funcGetProduct = async () => {
            try {
                
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`)

                if (response) {
                    setProduct({
                        ...product, 
                        ...response.data
                    })
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
                            <p className='productItem-main-price__button-buy'>
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