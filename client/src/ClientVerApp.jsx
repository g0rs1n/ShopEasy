import Main from './components/Main/Main'
import './styles/ClientVerApp.scss'

export default function ClientVerApp ({setProductsForCart}) {
    return (
        <>
            <Main setProductsForCart={setProductsForCart}/>
        </>
    )
}