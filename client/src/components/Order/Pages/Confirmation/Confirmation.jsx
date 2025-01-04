import { useState, useEffect, useContext } from 'react'
import { CheckIsActivePageContext } from '../../../Contexts/ContextsOrder/ContextsOrder'
import './Confirmation.scss'

export default function Confirmation () {

    const checkIsActivePage = useContext(CheckIsActivePageContext)

    useEffect(() => {
        checkIsActivePage()
    }, [])

    return (
        <>
        
        </>
    )
}