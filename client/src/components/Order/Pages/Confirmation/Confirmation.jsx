import { useState, useEffect, useContext } from 'react'
import { CheckIsActivePageContext } from '../../../Contexts/ContextsOrder/ContextsOrder'
import { CartContext } from '../../../Contexts/ContextsCart/CartProvider'
import { ProductsContext } from '../../../Contexts/ContextsProducts/ProductsProvider'
import { IsLoadingContext } from '../../../Contexts/ContextsIsLoading/IsLoadingProvider'
import { StyledConfirmation as SC } from './StyledConfirmation'
import { useOrderStore } from '../../../../store/orderStore/orderStore'
import {SyncLoader} from 'react-spinners'
import axios from 'axios'
import './Confirmation.scss'

const requiredFields = ['name','surname','phone','email','type','city','department','paymentType']

export default function Confirmation () {

    const products = useContext(ProductsContext)
    const cart = useContext(CartContext)
    const checkIsActivePage = useContext(CheckIsActivePageContext)
    const productsIsLoading = useContext(IsLoadingContext)
    const {orderData} = useOrderStore()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalSum, setTotalSum] = useState(0)
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        checkIsActivePage()

        if (!cart || cart.length === 0) {
            setFilteredProducts([]);
            setIsLoading(false);
        }

        if (productsIsLoading) {
            setIsLoading(true)
            return;
        }

        const filteredProducts = cart.map(({id, quantity}) => {
            const product = products.find(product => product.id === id)
            return product ? {...product, quantity} : null
        })
        const totalSum = filteredProducts.reduce((sum, product) => product ? (sum + (product.price * product.quantity)) : sum ,0)
        setFilteredProducts(filteredProducts)
        setTotalSum(totalSum.toFixed(2))
        setIsLoading(false)
    }, [cart, products, productsIsLoading])

    useEffect(() => {
        const isFormValid = requiredFields.every(key => orderData[key]?.trim())
        setIsDisabled(!isFormValid)
    }, [orderData])
    
    if (isLoading) {
        return (
            <>
                <SC.SpinnerWrapper>
                    <SyncLoader
                        color={'#1477cd'}
                        margin={2}
                        loading={isLoading}
                        size={15}
                        speedMultiplier={1}
                    />
                </SC.SpinnerWrapper>
            </> 
        )
    }

    return (
        <>
            <SC.WrapperConfirmation>
                <SC.ConfirmationPage>
                    <SC.WrapperTitle>
                        <SC.Title>Order information</SC.Title>
                    </SC.WrapperTitle>
                    <SC.WrapperProducts>
                        {
                            filteredProducts.map((product) => {
                                return (
                                    <ProductsItem
                                        key={product.id}
                                        product={product}
                                    />
                                )
                            })
                        }
                    </SC.WrapperProducts>
                    <Delivery/>
                    <Payment/>
                    <Total
                        totalSum={totalSum}
                    />
                </SC.ConfirmationPage>
                <Button 
                    isDisabled={isDisabled}
                />
            </SC.WrapperConfirmation>
        </>
    )
}

function Button ({isDisabled}) {
    return (
        <>
            <SC.WrapperButton>
                <SC.Button disabled={isDisabled}>
                    Place an order
                </SC.Button>
            </SC.WrapperButton>
        </>
    )
}


function ProductsItem ({product}) {
    return (
        <>
            <SC.WrapperProductsItem>
                <SC.ProductsItem>
                    <SC.ProductTitle>
                        <SC.TitleProduct>
                            {product.title}
                        </SC.TitleProduct>
                    </SC.ProductTitle>
                    <SC.ProductInfo>
                        <SC.Quantity>{product.quantity} pc.</SC.Quantity>
                        <SC.Price>{product.price}</SC.Price>
                    </SC.ProductInfo>
                </SC.ProductsItem>
            </SC.WrapperProductsItem>
        </>
    )
}

function Delivery () {

    const {orderData} = useOrderStore()

    return (
        <>
            <SC.DeliveryWrapper>
                {
                    !orderData.type ?
                    <>
                        <div className='confirmation-none-delivery'>
                            <h3 className='confirmation-none-delivery__h3'>You haven't chosen a delivery option yet.</h3>
                        </div>
                    </>
                    :
                    <SC.Delivery>
                        <SC.WrapperItemTitle>
                            <SC.ItemTitle>
                                Delivery 
                            </SC.ItemTitle>
                        </SC.WrapperItemTitle>
                        <SC.WrapperFields>
                            <li className='field-item'>{orderData.type}</li>
                            <li className='field-item'>{orderData.city || "City not selected"}</li>
                            <li className='field-item'>{orderData.department || "Department not selected"}</li>
                        </SC.WrapperFields>
                    </SC.Delivery>
                }
            </SC.DeliveryWrapper>
        </>
    )
}

function Payment () {

    const {orderData} = useOrderStore()

    return (
        <>
            <SC.WrapperPayment>
                <SC.Payment>
                    <SC.WrapperItemTitle>
                        <SC.ItemTitle>
                            Payment
                        </SC.ItemTitle>
                    </SC.WrapperItemTitle>
                    <SC.WrapperFields>
                        <li className='field-item'>{orderData.paymentType || "Payment type not selected"}</li>
                    </SC.WrapperFields>
                </SC.Payment>
            </SC.WrapperPayment>
        </>
    )
}

function Total ({totalSum}) {
    return (
        <>
            <SC.WrapperTotal>
                <SC.Total>
                    <SC.WrapperTotalSum>
                        <SC.TotalTitle>
                            Total pice
                        </SC.TotalTitle>
                        <SC.TotalSum>
                            {totalSum}
                        </SC.TotalSum>
                    </SC.WrapperTotalSum>
                </SC.Total>
            </SC.WrapperTotal>
        </>
    )
}