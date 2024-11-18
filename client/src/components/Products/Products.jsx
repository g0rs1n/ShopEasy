import { useState, useEffect, useContext} from 'react'
import axios from 'axios'
import iconBuy from '../../assets/img/icons/products/buy-icon.png'
import iconLoading from '../../assets/img/icons/loading/loading.png'
import arrowPrev from '../../assets/img/icons/paginations/left-arrow.png'
import arrowNext from '../../assets/img/icons/paginations/right-arrow.png'
import { CartContext, SetCartContext, SetModalIsOpenContext} from '../Contexts'
import './Products.scss'
import { Link } from 'react-router-dom'

export default function Products ({activeTab, currentPage, setCurrentPage, setProductsForCart}) {

    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const productsPerPage = 12

    const filterProducts = activeTab === 'All' ? products :
    products.filter(product => product.category === activeTab)

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const clickPaginate = (number) => {
        setCurrentPage(number)
    }

    useEffect(() => {
        const funcGetProducts = async () => {
            try {
                
                const response = await axios.get('https://fakestoreapi.com/products')

                if (response) {
                    setProducts(response.data)
                    setProductsForCart(response.data)
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
            <div className='wrapper-products'>
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
                       <div className='products'>
                            {
                                currentProducts.map((product) => {
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            product = {product}
                                        />
                                    )
                                })
                            }
                        </div>
                        <Paginations
                            productsPerPage = {productsPerPage}
                            totalProducts = {filterProducts.length}
                            clickPaginate = {clickPaginate}
                            setCurrentPage = {setCurrentPage}
                            currentPage = {currentPage}
                        /> 
                    </>
                }
            </div>
        </>
    )
}

function ProductItem ({product}) {

    const cart = useContext(CartContext)
    const setCart = useContext(SetCartContext)
    const setModalIsOpen = useContext(SetModalIsOpenContext)

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

    return (
        <>
            <div className='product-item'>
                <div className='product-item-image'>
                    <img src={product.image} alt="image" className="product-item-image__img" />
                </div>
                <div className='products-item-main'>
                   <div className='product-item-title'>
                        <Link to={`/item/${product.id}/${encodeURIComponent(product.title)}`} className="product-item-title__link">
                            {product.title}
                        </Link>
                    </div>
                    <div className='product-item-price'>
                        <p className="product-item-price__p">
                            {product.price}
                        </p> 
                        <div className='product-item-buy'>
                            <img onClick={() => handleOnClickBuy(product)} src={iconBuy} alt="buy_icon" className="product-item-buy__img" />
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}

function Paginations ({productsPerPage, totalProducts, clickPaginate, setCurrentPage, currentPage}) {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    const handleClickButtonPrevArrow = () => setCurrentPage(prev => prev - 1)
    const handleClickButtonNextArrow = () => setCurrentPage(prev => prev + 1)

    return (
        <>
            <div className='paginations'>
                { 
                    currentPage != 1 ? <img onClick={handleClickButtonPrevArrow} className='paginations-arrow__img' src={arrowPrev} alt="prev-arrow" /> : ''
                }
                <ul className='paginations-list'> 
                    {
                        pageNumbers.map((number) => {
                            return (
                                <li key={number} onClick={() => clickPaginate(number)} className='paginations-list-item'>
                                    {number}
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    currentPage != pageNumbers.length ? <img onClick={handleClickButtonNextArrow} className='paginations-arrow__img' src={arrowNext} alt="next-arrow" /> : ''
                }
            </div>
        </>
    )
}