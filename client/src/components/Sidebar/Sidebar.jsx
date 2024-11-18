import { useState, useEffect } from "react"
import axios from 'axios'
import heart from '../../assets/img/icons/footer/heart.png'
import iconLoading from '../../assets/img/icons/loading/loading.png'
import './Sidebar.scss'

export default function Sidebar ({updateTab}) {

    const [category, setCategory] = useState(['All'])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const funcGetCategory = async () => {
            try {
                
                const response = await axios.get('https://fakestoreapi.com/products/categories')

                if (response) {
                    setCategory([...category,...response.data])
                    setIsLoading(false)
                } else {
                    console.error('Error: get all category api')
                }

            } catch (error) {
                console.error('Error: get all cetegory api', error)
            }
        }
        funcGetCategory()
    },[])

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