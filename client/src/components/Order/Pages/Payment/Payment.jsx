import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CheckIsActivePageContext } from '../../../Contexts/ContextsOrder/ContextsOrder'
import { useOrderStore } from '../../../../store/orderStore/orderStore'
import { UserDataContext } from '../../../Contexts/ContextsUserData/ContextsUserData';
import { FormControlLabel, FormControl, RadioGroup, Radio } from '@mui/material';
import {StyledPayment as SP, MuiStyles as MUI} from './StyledPayment'

export default function Payment () {

    const types = [
        {value: "card", label: "Payment by card"},
        {value: "delivery", label: "Payment on delivery"},
        {value: "bonus", label: "Payment with bonuses"},
    ]
    const navigate = useNavigate()
    const checkIsActivePage = useContext(CheckIsActivePageContext)
    const userData = useContext(UserDataContext)
    const {orderData, setOrderData} = useOrderStore()

    useEffect(() => {
        checkIsActivePage()
    }, [])

    const handleOnChangePaymentType = (e) => {
        const value = e.target.value
        setOrderData({paymentType: value})
    }
    const handleOnClickButton = (e,page) => {
        e.preventDefault()
        const basePath = Object.keys(userData).length === 0 ? '/order' : '/app/order'
        navigate(`${basePath}/${page}`)
    }
    
    return (
        <>
            <SP.WrapperPayment>
                <SP.Payment>
                    <FormControl>
                        <RadioGroup
                            value={orderData.paymentType || null}
                            onChange={handleOnChangePaymentType}
                        >
                            {   
                                types.map(({value, label}) => (
                                    <FormControlLabel
                                        key={value}
                                        value={value}
                                        label={label}
                                        control={<Radio
                                            sx={MUI.RadioStyles}
                                        />}
                                        sx={MUI.LabelStyles}
                                    />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <SP.WrapperButton>
                        <SP.Button onClick={(e) => handleOnClickButton(e,'confirmation')}>Continue</SP.Button>
                    </SP.WrapperButton>
                </SP.Payment>
            </SP.WrapperPayment>
        </>
    )
}