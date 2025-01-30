import {create} from 'zustand'

export const useOrderStore = create((set) => ({
    orderData: {},
    setOrderData: (newOrderData) => {
        set((state) => ({
            
        }))
    },
}))

export const useInformationStore = create((set) => ({
    informationData: {},
    setInformationData: (newInformationData) => {
        set((state) => ({
            informationData:{
                ...state.informationData,
                ...newInformationData
            }
        }))
    },
    loadUserData: (userData) => {
        set((state) => ({
            informationData: {
                ...state.informationData,
                ...userData
            }
        }))
    },
}))
