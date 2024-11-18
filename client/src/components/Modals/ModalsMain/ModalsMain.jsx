import { useState, useEffect} from "react"
import { ModalIsOpenContext, SetModalIsOpenContext } from "../../Contexts"
import {Transition} from 'react-transition-group'
import './ModalsMain.scss'

export default function ModalsMain ({children}) {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        let timer;
        if (modalIsOpen) {
            timer = setTimeout(() => {
                setModalIsOpen(false)
            }, 3000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [modalIsOpen])

    return (
        <>
            <ModalIsOpenContext.Provider value={modalIsOpen}>
                <SetModalIsOpenContext.Provider value={setModalIsOpen}>
                    {children}
                    <Transition in={modalIsOpen} timeout={350} unmountOnExit={true}>
                        {(state) => (
                            <div className={`modalMain-wrapper modalMain-wrapper-${state}`}>
                                <div className="modalMain">
                                    <div className="modalMain-title">
                                        <h3 className="modalMain-title__h3">
                                            Item added to your cart!
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Transition>
                </SetModalIsOpenContext.Provider>
            </ModalIsOpenContext.Provider>
        </>
    )
}