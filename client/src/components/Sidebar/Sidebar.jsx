import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import heart from '../../assets/img/icons/footer/heart.png'
import { setCategoryContext } from "../Contexts"
import './Sidebar.scss'

export default function Sidebar ({updateTab}) {

    const [category, setCategory] = useState(['All'])
    const setCategoryInMain = useContext(setCategoryContext)
    
    useEffect(() => {
        const funcGetCategory = async () => {
            try {
                
                const response = await axios.get('https://fakestoreapi.com/products/categories')

                if (response) {
                    setCategory([...category,...response.data])
                    setCategoryInMain(response.data)
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