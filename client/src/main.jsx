import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import IsLoadingProvider from "./components/Contexts/ContextsIsLoading/IsLoadingProvider"
import ProductsProvider from './components/Contexts/ContextsProducts/ProductsProvider'
import App from './App'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <IsLoadingProvider>
        <ProductsProvider>
          <App/>
        </ProductsProvider>
      </IsLoadingProvider>
    </BrowserRouter>
  </StrictMode>,
)
