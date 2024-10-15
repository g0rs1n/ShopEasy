import { useState, useEffect } from "react"
import axios from 'axios'
import heart from '../../assets/img/icons/footer/heart.png'
import './Sidebar.scss'

export default function Sidebar () {

    const [category, setCategory] = useState([])
    
    useEffect(() => {
        const funcGetCategory = async () => {
            try {
                
                const response = await axios.get('https://fakestoreapi.com/products/categories')

                response ? setCategory(response.data) : console.error('Error: get all category api')

            } catch (error) {
                console.error('Error: get all cetegory api', error)
            }
        }
        funcGetCategory()
    })

    return (
        <>
            <div className="wrapper-sidebar">
                <div className="sidebar">
                    <ul className="sidebar-list">
                        {
                            category.map((category) => {
                                return (
                                    <ItemList
                                        category={category}
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

function ItemList ({category}) {
    return (
        <>
            <li key={category} className="sidebar-list-item">
                {category}
            </li>
        </>
    )
}