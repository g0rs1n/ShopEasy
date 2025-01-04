import { useState, useEffect, useContext } from 'react'
import { CheckIsActivePageContext } from '../../../Contexts/ContextsOrder/ContextsOrder'
import './Information.scss'

export default function Information () {

    const checkIsActivePage = useContext(CheckIsActivePageContext)

    useEffect(() => {
        checkIsActivePage()
    }, [])
    
    return (
        <>
            
        </>
    )
}