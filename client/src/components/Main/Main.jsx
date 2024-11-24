import { useState } from "react"
import Sidebar from '../Sidebar/Sidebar'
import Products from "../Products/Products"
import './Main.scss'

export default function Main () {

    const [activeTab, setActiveTab] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const updateTab = (tab) => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    const [category, setCategory] = useState([])

    return (
        <>
            <div className="wrapper-main">
                <Sidebar
                    updateTab = {updateTab}
                />
                <Products 
                    activeTab = {activeTab}
                    currentPage = {currentPage}
                    setCurrentPage = {setCurrentPage}
                />
            </div>
        </>
    )
}