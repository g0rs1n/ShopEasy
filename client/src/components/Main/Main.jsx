import { useState, useEffect } from "react"
import Sidebar from '../Sidebar/Sidebar'
import Products from "../Products/Products"
import './Main.scss'

export default function Main () {
    return (
        <>
            <div className="wrapper-main">
                <Sidebar/>
                <Products/>
            </div>
        </>
    )
}