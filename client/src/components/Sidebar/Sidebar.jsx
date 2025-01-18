import { useContext } from "react"
import heart from '../../assets/img/icons/footer/heart.png'
import iconLoading from '../../assets/img/icons/loading/loading.png'
import { CategoryContext } from "../Contexts/ContextsProducts/ProductsProvider"
import { IsLoadingContext } from "../Contexts/ContextsIsLoading/IsLoadingProvider"
import './Sidebar.scss'

export default function Sidebar ({updateTab}) {

    const category = useContext(CategoryContext)
    const isLoading = useContext(IsLoadingContext)

    return (
        <>
            <div className="wrapper-sidebar">
                <div className="sidebar">
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
                            <ul className="sidebar-list">
                                {
                                    category.map((category) => {
                                        return (
                                            <ItemList
                                                key={category}
                                                category={category}
                                                updateTab = {updateTab}
                                            />
                                        )
                                    })
                                }
                            </ul>
                        </>
                    }
                    <div className="footer-sidebar-wrappper">
                        <div className="footer-sidebar-main">
                            <p className="footer-sidebar-main__p">
                                Made by g0rs1n
                            </p>
                            <img className="footer-sidebar-main__img" src={heart} alt="heart" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ItemList ({category, updateTab}) {
    return (
        <>
            <li onClick={() => updateTab(category)} className="sidebar-list-item">
                {category}
            </li>
        </>
    )
}