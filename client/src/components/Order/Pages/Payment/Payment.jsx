import { useState, useEffect, useContext } from 'react'
import { CheckIsActivePageContext } from '../../../Contexts/ContextsOrder/ContextsOrder'
import './Payment.scss'

export default function Payment () {

    const checkIsActivePage = useContext(CheckIsActivePageContext)

    useEffect(() => {
        checkIsActivePage()
    }, [])
    
    return (
        <>
        
        </>
    )
}