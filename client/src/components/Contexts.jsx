import { createContext } from "react";

// Cart Context
export const CartContext = createContext([])
export const SetCartContext = createContext(null)

// Modal Context

export const ModalIsOpenContext = createContext(false)
export const SetModalIsOpenContext = createContext(null)

// Product Context

export const ProductsContext = createContext([])
export const IsLoadingContext = createContext(true)