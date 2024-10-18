import { useState } from "react"
import Sidebar from '../Sidebar/Sidebar'
import Products from "../Products/Products"
import { categoryContext, setCategoryContext } from "../Contexts"
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
            <categoryContext.Provider value={category}>
                <setCategoryContext.Provider value={setCategory}>
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
                </setCategoryContext.Provider>
            </categoryContext.Provider>
        </>
    )
}