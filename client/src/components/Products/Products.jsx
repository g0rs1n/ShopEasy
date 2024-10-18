import { useState, useEffect } from 'react'
import axios from 'axios'
import iconBuy from '../../assets/img/icons/products/buy-icon.png'
import arrowPrev from '../../assets/img/icons/paginations/left-arrow.png'
import arrowNext from '../../assets/img/icons/paginations/right-arrow.png'
import './Products.scss'

export default function Products ({activeTab, currentPage, setCurrentPage}) {

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
                />
            </div>
        </>
    )
}

function ProductItem ({product}) {
    return (
        <>
            <div className='product-item'>
                <div className='product-item-image'>
                    <img src={product.image} alt="image" className="product-item-image__img" />
                </div>
                <div className='products-item-main'>
                   <div className='product-item-title'>
                        <h3 className="product-item-title__h3">
                            {product.title}
                        </h3>
                    </div>
                    <div className='product-item-price'>
                        <p className="product-item-price__p">
                            {product.price}
                        </p> 
                        <div className='product-item-buy'>
                            <img src={iconBuy} alt="buy_icon" className="product-item-buy__img" />
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}

function Paginations ({productsPerPage, totalProducts, clickPaginate, setCurrentPage}) {

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
                    pageNumbers.length > 1 ? 
                    <img onClick={handleClickButtonPrevArrow} className='paginations-arrow__img' src={arrowPrev} alt="prev-arrow" /> : ''
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
                    pageNumbers.length > 1 ?
                    <img onClick={handleClickButtonNextArrow} className='paginations-arrow__img' src={arrowNext} alt="next-arrow" /> : ''
                }
            </div>
        </>
    )
}